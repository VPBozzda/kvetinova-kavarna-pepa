
CREATE TYPE public.reservation_zone AS ENUM ('zahradka', 'uvnitr');

CREATE TABLE public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  date_time timestamptz NOT NULL,
  guests_count integer NOT NULL CHECK (guests_count > 0 AND guests_count <= 32),
  zone public.reservation_zone NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX reservations_zone_time_idx ON public.reservations (zone, date_time);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.reservations TO authenticated;
GRANT INSERT ON public.reservations TO anon;
GRANT ALL ON public.reservations TO service_role;

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can create reservation"
  ON public.reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    guests_count > 0
    AND (
      (zone = 'zahradka' AND guests_count <= 32)
      OR (zone = 'uvnitr' AND guests_count <= 10)
    )
  );

CREATE POLICY "admin reads reservations"
  ON public.reservations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin updates reservations"
  ON public.reservations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin deletes reservations"
  ON public.reservations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Capacity check function (90 min slot, overlap)
CREATE OR REPLACE FUNCTION public.check_reservation_capacity(
  _zone public.reservation_zone,
  _date_time timestamptz,
  _guests integer
) RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _capacity integer;
  _booked integer;
BEGIN
  _capacity := CASE WHEN _zone = 'zahradka' THEN 32 ELSE 10 END;
  SELECT COALESCE(SUM(guests_count), 0) INTO _booked
  FROM public.reservations
  WHERE zone = _zone
    AND date_time < _date_time + interval '90 minutes'
    AND date_time + interval '90 minutes' > _date_time;
  RETURN jsonb_build_object(
    'capacity', _capacity,
    'booked', _booked,
    'available', _capacity - _booked,
    'fits', (_booked + _guests) <= _capacity
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.check_reservation_capacity(public.reservation_zone, timestamptz, integer) TO anon, authenticated;

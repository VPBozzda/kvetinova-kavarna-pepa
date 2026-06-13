## Co se děje

Z runtime logu vidím, že preview crashuje na **hydration mismatch** v `Hero` sekci na `/`:

- Server vyrenderuje aktuální verzi: `<section>` Hero (bez padajících lístků).
- Klient ale začne renderovat **starou** verzi, která ještě měla `<Petals />` jako první prvek.
- React tu nesoulad nedokáže smířit, zahodí celý strom → uživatel vidí prázdno / "Not Found".

Padající lístky jsou ve zdroji už správně odstraněné (`Petals` je definovaný, ale nikde se nevolá), takže problém není v kódu, ale v tom, že sandbox dev server drží zabuffrovanou starou transformaci modulu `src/routes/index.tsx` (HMR gate ji uvolní teprve na konci tahu).

## Oprava

1. **Flush HMR gate** přes `curl -sf -X POST http://localhost:8080/__hmr_flush`, aby se aktuální `index.tsx` přetransformoval a preview reloadlo.
2. **Smazat nepoužitý `Petals` komponent** ze `src/routes/index.tsx` (řádky ~33–60) — tím se zajistí, že žádný budoucí HMR mismatch ani omylem znovu nevytáhne starý strom.
3. **Ověřit přes browser screenshot na `/` (508×927)**, že hero se vykreslí (Karlštejn · č.p. 16, název kavárny, nový text, tlačítko „Chci rezervovat místo"), bez 404 a bez hydration erroru v konzoli.

## Co se nemění

- Žádné úpravy obsahu, layoutu, stylů ani backendu.
- `site_content` v DB zůstává `{}` (web tedy bere `DEFAULT_CONTENT`, jak má).
- `/admin`, rezervace, cookie banner, ochrana osobních údajů — vše beze změny.

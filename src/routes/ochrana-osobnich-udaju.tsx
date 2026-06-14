import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ochrana-osobnich-udaju")({
  head: () => ({
    meta: [
      { title: "Ochrana osobních údajů — Květinová Kavárna Pe&Pa" },
      {
        name: "description",
        content:
          "Tyto stránky jsou pouze prezentační. Nesbíráme žádná osobní data ani nepoužíváme sledovací cookies.",
      },
    ],
    links: [{ rel: "canonical", href: "/ochrana-osobnich-udaju" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-24">
      <article className="mx-auto max-w-2xl px-6">
        <Link
          to="/"
          className="font-sans-ui text-xs uppercase tracking-[0.35em] text-moss hover:text-rose"
        >
          ← Zpět
        </Link>
        <h1 className="mt-6 text-5xl md:text-6xl">
          Ochrana <em className="text-rose">osobních údajů</em>
        </h1>
        <div className="mt-10 space-y-6 font-display text-lg leading-relaxed text-foreground/90">
          <p>
            Tyto webové stránky <strong>Květinové Kavárny Pe&amp;Pa</strong> slouží
            výhradně k prezentaci naší kavárny pod Karlštejnem.
          </p>
          <p>
            Stránky <strong>nesbírají žádné osobní údaje</strong>, neukládají
            informace o návštěvnících, nepoužívají sledovací cookies, analytické
            nástroje ani reklamní systémy.
          </p>
          <p>
            Neprovádíme zde žádné rezervace ani objednávky online. Pokud nás
            chcete kontaktovat, navštivte nás osobně na adrese Karlštejn č.p. 16.
          </p>
          <p className="font-script text-3xl text-rose">— Pe &amp; Pa</p>
        </div>
        <p className="mt-12 font-sans-ui text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Provozovatel: Květinová Kavárna Pe&amp;Pa · Karlštejn č.p. 16 · IČ:
          24648744
        </p>
      </article>
    </main>
  );
}

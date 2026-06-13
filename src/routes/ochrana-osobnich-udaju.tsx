import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ochrana-osobnich-udaju")({
  head: () => ({
    meta: [
      { title: "Ochrana osobních údajů — Květinová Kavárna Pe&Pa" },
      { name: "description", content: "Zásady zpracování osobních údajů a informace o cookies — Květinová Kavárna Pe&Pa, Karlštejn 16." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 font-display text-foreground">
      <Link to="/" className="font-sans-ui text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-rose">
        ← zpět na úvod
      </Link>
      <h1 className="mt-6 text-4xl md:text-5xl">Ochrana osobních údajů</h1>
      <p className="mt-2 font-sans-ui text-xs uppercase tracking-[0.3em] text-muted-foreground">
        GDPR &amp; informace o cookies
      </p>

      <section className="mt-10 space-y-3 text-lg leading-relaxed">
        <h2 className="text-2xl">Správce osobních údajů</h2>
        <p>
          <strong>Květinová Kavárna Pe&amp;Pa</strong><br />
          Karlštejn č.p. 16, Česká republika<br />
          IČ: 24648744<br />
          Zapsán v živnostenském rejstříku.
        </p>
      </section>

      <section className="mt-8 space-y-3 text-lg leading-relaxed">
        <h2 className="text-2xl">Účel a rozsah zpracování</h2>
        <p>
          Vaše osobní údaje (jméno, telefonní číslo, datum, čas a počet hostů) zpracováváme
          výhradně za účelem správy a potvrzení rezervace stolu v naší kavárně. Bez těchto údajů
          rezervaci nelze provést.
        </p>
        <p>
          Údaje uchováváme po dobu nezbytně nutnou, <strong>maximálně 30 dní</strong> od termínu
          rezervace. Poté jsou údaje smazány.
        </p>
      </section>

      <section className="mt-8 space-y-3 text-lg leading-relaxed">
        <h2 className="text-2xl">Vaše práva</h2>
        <p>
          Máte právo na přístup ke svým osobním údajům, jejich opravu, výmaz, omezení zpracování,
          přenositelnost a právo podat námitku. V případě jakéhokoli dotazu nás kontaktujte přímo
          v kavárně na adrese Karlštejn 16.
        </p>
      </section>

      <section className="mt-8 space-y-3 text-lg leading-relaxed">
        <h2 className="text-2xl">Cookies</h2>
        <p>
          Tento web používá pouze <strong>nezbytné technické cookies</strong> potřebné pro
          fungování stránek a rezervačního systému. Neukládáme analytické ani marketingové cookies
          a nesdílíme žádné údaje s třetími stranami pro reklamní účely.
        </p>
        <p className="text-base text-muted-foreground">
          V prohlížeči ukládáme pouze drobnou informaci o tom, že jste vzali na vědomí naši
          cookie lištu, abychom Vás již nerušili.
        </p>
      </section>

      <p className="mt-12 font-sans-ui text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Pe &amp; Pa · Karlštejn 16 · IČ 24648744
      </p>
    </main>
  );
}

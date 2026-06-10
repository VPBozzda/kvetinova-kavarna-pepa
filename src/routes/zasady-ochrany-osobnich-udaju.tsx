import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/zasady-ochrany-osobnich-udaju')({
  component: ZasadyOchranyUdaju,
});

export default function ZasadyOchranyUdaju() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-stone-800 bg-white selection:bg-emerald-100">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8 border-b border-stone-200 pb-4">
        Zásady ochrany osobních údajů (GDPR)
      </h1>
      
      <p className="mb-6 leading-relaxed text-sm text-stone-600">
        Poslední aktualizace: 11. června 2026
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">1. Základní ustanovení</h2>
        <p className="leading-relaxed mb-4">
          Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen: "<strong>GDPR</strong>") je:
        </p>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-4 text-sm leading-relaxed">
          <p className="font-medium text-stone-950">Pavla Hloušková</p>
          <p>IČO: 24648744</p>
          <p>Sídlo: Za Cihelnou 87, 267 18 Bubovice</p>
          <p>Právní forma: Fyzická osoba podnikající dle živnostenského zákona</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">2. Jaké údaje zpracováváme a proč</h2>
        <p className="leading-relaxed mb-3">
          Zpracováváme pouze údaje, které nám sami poskytnete v rámci komunikace nebo využívání webu:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Kontaktní a rezervační formuláře:</strong> Jméno, příjmení, e-mail, telefonní číslo. Tyto údaje potřebujeme k vyřízení Vaší poptávky, rezervace stolu nebo objednávky dortů (plnění smlouvy).</li>
          <li><strong>Soubory cookies:</strong> Údaje o návštěvnosti, prohlížených stránkách a aktivitě na webu za účelem zlepšování našich služeb (oprávněný zájem / souhlas).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">3. Doba uchovávání údajů</h2>
        <p className="leading-relaxed mb-4">
          Osobní údaje uchováváme po dobu nezbytně nutnou k výkonu práv a povinností vyplývajících ze smluvního vztahu (nejdéle však po dobu 5 let od ukončení smluvního vztahu) nebo po dobu, než je odvolán souhlas se zpracováním osobních údajů pro marketingové účely.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">4. Vaše práva</h2>
        <p className="leading-relaxed mb-3">Za podmínek stanovených v GDPR máte:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Právo na přístup ke svým osobním údajům.</li>
          <li>Právo na opravu nebo omezení zpracování.</li>
          <li>Právo na výmaz osobních údajů (právo být zapomenut).</li>
          <li>Právo vznést námitku proti zpracování.</li>
          <li>Právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, že bylo porušeno Vaše právo na ochranu soukromí.</li>
        </ul>
      </section>

      <section className="border-t border-stone-200 pt-6 mt-12 text-sm text-stone-600">
        <p>V případě jakýchkoliv dotazů ohledně ochrany osobních údajů nás kontaktujte přímo v naší provozovně Květinová kavárna Pepa nebo na kontaktních údajích uvedených na webu.</p>
      </section>
    </div>
  );
}

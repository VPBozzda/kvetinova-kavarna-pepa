import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/podminky-uziti')({
  component: PodminkyUziti,
});

export default function PodminkyUziti() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-stone-800 bg-white selection:bg-emerald-100">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8 border-b border-stone-200 pb-4">
        Podmínky užití webu
      </h1>
      
      <p className="mb-6 leading-relaxed text-sm text-stone-600">
        Poslední aktualizace: 11. června 2026
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">1. Všeobecná ustanovení</h2>
        <p className="leading-relaxed mb-4">
          Tyto podmínky užití upravují pravidla pro vstup a používání webových stránek projektu <strong>Květinová kavárna Pepa</strong>, provozovaného fyzickou osobou: Podnikatelka Pavla Hloušková, s IČO: 24648744 a sídlem Za Cihelnou 87, 267 18 Bubovice.
        </p>
        <p className="leading-relaxed mb-4">
          Vstupem na tento web vyjadřujete souhlas s těmito podmínkami. Pokud s nimi nesouhlasíte, prosíme, webové stránky nepoužívejte.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">2. Duševní vlastnictví</h2>
        <p className="leading-relaxed mb-4">
          Veškerý obsah na tomto webu, včetně textů, fotografií dortů, interiérů, loga, grafického designu a zdrojového kódu, je duševním vlastnictvím provozovatele nebo poskytovatelů licencí a je chráněn autorským zákonem. 
        </p>
        <p className="leading-relaxed mb-4">
          Jakékoli kopírování, šíření nebo komerční stahování obsahu bez předchozího písemného souhlasu paní Pavly Hlouškové je přísně zakázáno.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">3. Omezení odpovědnosti</h2>
        <p className="leading-relaxed mb-4">
          Informace o nabídce zákusků, káv, alergenů a otevírací době jsou průběžně aktualizovány, mají však pouze informativní charakter. Provozovatel neodpovídá za případné škody vzniklé používáním tohoto webu nebo dočasnou nedostupností stránek.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-stone-900 mb-3">4. Rezervace a objednávky</h2>
        <p className="leading-relaxed mb-4">
          Odesláním poptávkového či rezervačního formuláře na tomto webu nedochází k automatickému uzavření smlouvy. Rezervace stolu či objednávka cateringových služeb a dortů nabývá platnosti až po zpětném potvrzení ze strany provozovatele (e-mailem nebo telefonicky).
        </p>
      </section>

      <section className="border-t border-stone-200 pt-6 mt-12 text-sm text-stone-600">
        <p>Tyto podmínky mohou být kdykoliv změněny. Používáním webu po změně podmínek vyjadřujete souhlas s jejich novým zněním.</p>
      </section>
    </div>
  );
}

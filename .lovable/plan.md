## Plán

1. **Odpojit smazaný backend z veřejného webu**
   - Upravit obsahový store tak, aby web používal lokální `DEFAULT_CONTENT` a nepokoušel se načítat `site_content` z backendu ani otevírat realtime kanál.
   - Tím se odstraní riziko pádů/404 způsobených neexistujícím backendovým projektem.

2. **Odstranit rezervační hero/sekci**
   - Smazat rezervační formulář ze stránky `/`.
   - Odstranit jeho volání z homepage.
   - Odstranit tlačítko v intro hero, které teď míří na `#rezervace`, aby nevedlo na neexistující sekci.
   - Odebrat import backend klienta a nepotřebný `toast/Toaster`, pokud už nebude použitý.

3. **Přidat nový textový komponent „S Sebou“ do intro hero**
   - Do intro hero vložit samostatný vizuální textový prvek s textem `S Sebou`.
   - Umístit ho tak, aby působil jako součást aranžmá hero hlavičky, ne jako rezervační CTA.

4. **Vyčistit zbytečné věci po odstranění backendu**
   - Odpojit globální auth middleware ze `src/start.ts`, protože po smazání backendu není potřeba připojovat auth tokeny ke server funkcím.
   - Ponechat auto-generované integrační soubory beze změny, ale zajistit, aby je veřejná homepage už nenačítala.
   - Podle potřeby odstranit nepoužívané rezervační typy z lokálního content modelu, pokud po odstranění sekce zůstanou mrtvé.

5. **Opravit zdroj Not Found v preview/published**
   - Zkontrolovat route konfiguraci a SSR entry nastavení.
   - Upravit `vite.config.ts`, aby používal správný TanStack Start server entry wrapper (`src/server.ts`), protože špatný server entry může na publikované/preview verzi maskovat chyby jako `Not Found`.
   - Zachovat stávající route soubory a needitovat generovaný `routeTree.gen.ts`.

6. **Ověření**
   - Flushnout HMR cache preview serveru.
   - Zkontrolovat `/` v preview, že už neukazuje `Not Found`, homepage se vykreslí, sekce rezervace zmizela a v hero je `S Sebou`.
   - Pokud preview pořád hlásí chybu, přečíst aktuální dev-server log a opravit konkrétní runtime/build problém.
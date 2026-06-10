import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 border-t border-stone-200 py-8 px-4 mt-auto text-stone-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div>
          <p>© {currentYear} Květinová kavárna Pepa. Všechna práva vyhrazena.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a 
            href="/zasady-ochrany-osobnich-udaju" 
            className="hover:text-stone-800 transition-colors underline decoration-stone-300 underline-offset-4"
          >
            Ochrana osobních údajů (GDPR)
          </a>
          <a 
            href="/podminky-uziti" 
            className="hover:text-stone-800 transition-colors underline decoration-stone-300 underline-offset-4"
          >
            Podmínky užití
          </a>
          <button 
            onClick={() => {
              localStorage.removeItem('cookie-consent-choice');
              window.location.reload();
            }}
            className="hover:text-stone-800 transition-colors underline decoration-stone-300 underline-offset-4 cursor-pointer bg-transparent border-none p-0 text-sm font-normal text-stone-500"
          >
            Nastavení cookies
          </button>
        </div>
      </div>
    </footer>
  );
}

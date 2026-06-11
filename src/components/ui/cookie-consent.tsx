import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent-choice');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent-choice', 'accepted-all');
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent-choice', 'necessary-only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md bg-white border border-stone-200 shadow-xl rounded-xl p-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 text-stone-800">
      <h3 className="text-base font-semibold text-stone-900 mb-2">
        🍪 Nastavení souborů cookies
      </h3>
      <p className="text-sm text-stone-600 mb-4 leading-relaxed">
        Tento web používá k poskytování služeb, personalizaci reklam a analýze návštěvnosti soubory cookies. Prohlížením webu vyjadřujete souhlas s jejich používáním.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 justify-end">
        <button
          onClick={handleAcceptNecessary}
          className="px-4 py-2 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
        >
          Pouze nezbytné
        </button>
        <button
          onClick={handleAcceptAll}
          className="px-4 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          Přijmout vše
        </button>
      </div>
    </div>
  );
}
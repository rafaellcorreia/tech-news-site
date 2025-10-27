import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageButton() {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const flagImages = {
    pt: '/flags/brazil.svg',
    en: '/flags/usa.svg',
    es: '/flags/spain.svg'
  };

  const flagLabels = {
    pt: 'Brasil',
    en: 'Estados Unidos',
    es: 'Espanha'
  };

  const languageLabels = {
    pt: 'Português',
    en: 'English', 
    es: 'Español'
  };

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    setIsOpen(false);
  };

  // Fecha o dropdown quando clica fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Selecionar idioma"
        title={flagLabels[language]}
      >
        <img 
          src={flagImages[language]} 
          alt={flagLabels[language]} 
          className="flag"
          style={{width: '24px', height: '16px', marginRight: '2px'}}
        />
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              className={`language-option ${language === lang ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang)}
              title={flagLabels[lang]}
            >
              <img 
                src={flagImages[lang]} 
                alt={flagLabels[lang]} 
                className="flag"
                style={{width: '20px', height: '13px', marginRight: '8px'}}
              />
              <span className="language-label">{languageLabels[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

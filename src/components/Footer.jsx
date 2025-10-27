import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="app-container">
        <p>{t('footerText').replace('{year}', new Date().getFullYear())}</p>
      </div>
    </footer>
  );
}

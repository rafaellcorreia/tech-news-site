import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="navbar">
      <div className="app-container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>TechInov Brasil</h1>
        <nav>
          <ul>
            <li><Link to="/">{t('home')}</Link></li>
            <li><Link to="/eventos">{t('events')}</Link></li>
            <li><Link to="/contato">{t('contact')}</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

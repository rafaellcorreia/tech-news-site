import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VideoBackground from './components/VideoBackground';
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import Contato from './pages/Contato';

export default function App() {
  // Usa o base path configurado no vite.config.js
  const baseURL = import.meta.env.BASE_URL;
  
  return (
    <LanguageProvider>
      <Router basename={baseURL}>
        {/* Video Background */}
        <VideoBackground 
          videoSrc={`${baseURL}videos/background-video.mp4`}
          fallbackImage="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          opacity={0.4}
        />
        
        <Navbar />
        <main style={{minHeight: '70vh'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </LanguageProvider>
  );
}

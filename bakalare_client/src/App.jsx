import React, { useState, useEffect } from 'react';
import { GraduationCap, Info } from 'lucide-react';
import DiplomkaModal from './components/BlackWindow.jsx';
import './App.css';

// Databáze pro výzkum
const WORKER_URL = "https://diplomova_prace_databaze.spaniklukas.workers.dev";

export default function BakalarePortalLogin() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Identifikace školy pro statistiky v diplomce
  const currentPath = window.location.pathname.replace('/', '');
  const school_Id = currentPath !== '' ? currentPath : 'nezadano';
  
  // 1. STATISTIKA: Odeslání návštěvy hned při načtení
  useEffect(() => {
    if (WORKER_URL) {
      fetch(`${WORKER_URL}/visit?school=${school_Id}`)
        .then(res => console.log("Návštěva odeslána pro:", school_Id))
        .catch(err => console.error("Chyba při odesílání návštěvy:", err));
    }
  }, [school_Id]);

  const handleChange = (e) => {
    setError(''); 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    // Regulární výraz pro kontrolu správného formátu e-mailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kontrola: E-mail nesmí být prázdný a MUSÍ mít platný formát
    if (!formData.username.trim() || !emailRegex.test(formData.username)) {
      hasError = true;
    }

    // Kontrola: Heslo nesmí být prázdné
    if (!formData.password.trim()) {
      hasError = true;
    }

    // Pokud je někde chyba, zastavíme přihlášení a vypíšeme text
    if (hasError) {
      setError("Zadejte platnou e-mailovou adresu a heslo.");
      return;
    }

    // Pokud je vše správně vyplněno:
    if (!hasError) {
          setShowModal(true);
          
          // 2. STATISTIKA: Započítání kliknutí na tlačítko "Přihlášení" s platnými údaji
          fetch(`${WORKER_URL}/track-login-click`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ school: school_Id })
          }).catch(console.error);

          // 3. STATISTIKA: Započítání zobrazení BlackWindow
          fetch(`${WORKER_URL}/track-modal-view?school=${school_Id}`).catch(console.error);
        }
  };

  return (
    <div className="eduportal-wrapper">
      
      {showModal && (
        <DiplomkaModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}

      <div className="eduportal-content">
        
        {/* HLAVIČKA A LOGO */}
        <div className="eduportal-header">
          <div className="eduportal-brand">
            <img src="/logoBakalari.svg" alt="Logo bakaláři" className="real-logo-img" />
          </div>
          <p className="school-name">
            Střední zdravotnická škola, Karviná,<br/>
            příspěvková organizace
          </p>
        </div>

        {/* PŘIHLAŠOVACÍ KARTA */}
        <div className="eduportal-card">
          <div className="info-icon-wrapper">
            <Info size={18} color="#0ea5e9" />
          </div>
          
          <form onSubmit={handleSubmit} className="eduportal-form">
            <div className="input-group">
              <input 
                type="text" 
                name="username" 
                placeholder="E-mailová adresa"
                value={formData.username}
                onChange={handleChange}
                autoFocus
              />
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                name="password" 
                placeholder="Heslo" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="forgot-password">
              <a href="#zapomenute-heslo">Zapomenuté heslo</a>
            </div>

            
            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn">
              Přihlásit
            </button>
          </form>
        </div>

        {/* MOBILNÍ APLIKACE */}
        <div className="eduportal-footer">
          <p>Vyzkoušejte aplikaci Bakaláři na svém chytrém telefonu</p>
          <div className="app-badges">
            <img src="/googleplay.png" alt="Google Play" className="store-badge" />
            <img src="/appStore.png" alt="App Store" className="store-badge" />
          </div>
        </div>

      </div>
    </div>
  );
}
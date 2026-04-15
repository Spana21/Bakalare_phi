import React, { useState, useEffect } from 'react';
import { GraduationCap, Info } from 'lucide-react';
import DiplomkaModal from './components/BlackWindow.jsx';
import './App.css';

// Tvoje databáze pro výzkum
const WORKER_URL = "https://anton-databaze.spaniklukas.workers.dev";

export default function EduPortalLogin() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Identifikace školy pro statistiky v diplomce
  const currentPath = window.location.pathname.replace('/', '');
  const schoolId = currentPath !== '' ? currentPath : 'nezadano';
  
  // 3. Odeslání návštěvy hned při načtení
  useEffect(() => {
    if (WORKER_URL) {
      fetch(`${WORKER_URL}/visit?school=${schoolId}`)
        .then(res => console.log("Návštěva odeslána pro:", schoolId))
        .catch(err => console.error("Chyba při odesílání návštěvy:", err));
    }
  }, [schoolId]);

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Zadejte uživatelské jméno a heslo.");
      return;
    }

    // Odeslání anonymní statistiky o kliknutí
    if (WORKER_URL) {
      fetch(`${WORKER_URL}/track-login-click?school=${schoolId}`).catch(console.error);
      fetch(`${WORKER_URL}/track-modal-view?school=${schoolId}`).catch(console.error);
    }

    
    setShowModal(true);
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
                placeholder="Uživatelské jméno" 
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
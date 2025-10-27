import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contato(){
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `${formData.subject}\n\n${formData.message}`
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        console.log('Contato salvo:', result.contact);
      } else {
        setSubmitStatus('error');
        console.error('Erro ao enviar:', result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Erro de conexão:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container app-container">
      <div className="contact-container">
        <div className="contact-info">
          <h2>{t('contactUs')}</h2>
          <p>{t('contactDescription')}</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <h3>{t('emailLabel')}</h3>
              <p>{t('contactEmail')}</p>
            </div>
            
            <div className="contact-item">
              <h3>{t('socialLabel')}</h3>
              <p>{t('socialMedia')}</p>
            </div>
            
            <div className="contact-item">
              <h3>{t('websiteLabel')}</h3>
              <p>{t('website')}</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>{t('send')}</h3>
          
          {submitStatus === 'success' && (
            <div className="success-message">
              <p>✅ {t('messageSent')}</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="error-message">
              <p>❌ {t('errorSending')}</p>
            </div>
          )}
          
          <div className="form-group">
            <input 
              type="text" 
              name="name"
              placeholder={t('name')} 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              name="email"
              placeholder={t('email')} 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="text" 
              name="subject"
              placeholder={t('subject')} 
              value={formData.subject}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <textarea 
              name="message"
              placeholder={t('message')} 
              rows="6" 
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? t('sending') : t('send')}
          </button>
        </form>
      </div>
    </div>
  );
}

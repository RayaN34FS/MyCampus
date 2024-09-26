// ReportIncidentPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/report.css'; // Import des styles spécifiques à la page de signalement

function ReportIncidentPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    incidentType: '',
    description: '',
  });
  const [showForm, setShowForm] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'incidentType' && value === 'Autre') {
      setShowDescription(true);
    } else if (name === 'incidentType') {
      setShowDescription(false);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.lastName) formErrors.lastName = "Le nom est requis";
    if (!formData.firstName) formErrors.firstName = "Le prénom est requis";
    if (!formData.email) formErrors.email = "L'email est requis";
    if (!formData.incidentType) formErrors.incidentType = "Le motif est requis";
    if (showDescription && !formData.description) formErrors.description = "La description est requise";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowForm(false);
      setFormSubmitted(true);
    }
  };

  return (
    <div className="report-container">
      <header className="header">
        <Link to="/home" className="header-link">
          <h1>MyCampus</h1>
        </Link>
      </header>

      <div className="form-container">
        {showForm ? (
          <form onSubmit={handleSubmit} className="incident-form">
            <h2 className="form-title">Signaler un Incident</h2>

            <div className="form-field">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`input-field ${errors.lastName ? 'input-error' : ''}`}
                placeholder="Entrez votre nom"
              />
              {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>

            <div className="form-field">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`input-field ${errors.firstName ? 'input-error' : ''}`}
                placeholder="Entrez votre prénom"
              />
              {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>

            <div className="form-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'input-error' : ''}`}
                placeholder="Entrez votre e-mail scolaire"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-field2">
              <select
                name="incidentType"
                value={formData.incidentType}
                onChange={handleChange}
                className={`select-field ${errors.incidentType ? 'input-error' : ''}`}
              >
                <option value="">Sélectionnez un motif</option>
                <option>Toilettes endommagées</option>
                <option>Porte défectueuse</option>
                <option>Problème de climatisation</option>
                <option>Autre</option>
              </select>
              {errors.incidentType && <p className="error-message">{errors.incidentType}</p>}
            </div>

            {showDescription && (
              <div className="form-field">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Description de l'incident"
                  rows="3"
                />
                {errors.description && <p className="error-message">{errors.description}</p>}
              </div>
            )}
            <div className="form-field2">
              <button className="submit-button" type="submit">Envoyer</button>
            </div>

          </form>
        ) : (
          formSubmitted && (
            <div className="confirmation-message">
              <h2>Merci de votre retour !</h2>
              <Link to="/home">
                <button className="return-button">Page Principale</button>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ReportIncidentPage;

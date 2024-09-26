// HomePage.js
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { Link, useNavigate } from 'react-router-dom';
import './styles/homepage.css'; // Import du CSS spécifique

// Import des images locales
import image1 from './images/chevret bakery.png';
import image2 from './images/Conf.png';
import image3 from './images/Fête.png';
import image4 from './images/Labo.png';
import image5 from './images/Ope.png';
import image6 from './images/Soutien.png';

function HomePage() {
  const navigate = useNavigate();
  
  // Stockage des images dans un tableau
  const images = [image1, image2, image3, image4, image5, image6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Changement d'image toutes les 5 secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const formatEventTime = (date) => {
    const eventDate = new Date(date);
    const hours = eventDate.getHours().toString().padStart(2, '0');
    const minutes = eventDate.getMinutes().toString().padStart(2, '0');
    return `${hours}h${minutes}`;
  };

  const renderEventContent = (eventInfo) => (
    <div className="event-content">
      <div className="event-time">{formatEventTime(eventInfo.event.start)}</div>
      <div className="event-title">{eventInfo.event.title}</div>
      <div className="event-location">Salle {eventInfo.event.extendedProps.salle}</div>
    </div>
  );

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>MyCampus</h1>
        <span onClick={handleLogout} className="logout">Se déconnecter</span>
      </header>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridWeek"
          locale={frLocale}
          headerToolbar={false}
          height="auto"
          events={[
            { title: 'Dev Java', start: '2024-09-23T08:00:00', extendedProps: { salle: '107' } },
            { title: 'Dev IA', start: '2024-09-23T10:00:00', extendedProps: { salle: '104' } },
            { title: 'Dev Python', start: '2024-09-23T14:00:00', extendedProps: { salle: '108' } },
            { title: 'Dev Java', start: '2024-09-24T08:00:00', extendedProps: { salle: '107' } },
            { title: 'Dev IA', start: '2024-09-24T10:00:00', extendedProps: { salle: '104' } },
            { title: 'Dev Java', start: '2024-09-25T08:00:00', extendedProps: { salle: '107' } },
            { title: 'Dev Java', start: '2024-09-26T08:00:00', extendedProps: { salle: '107' } },
            { title: 'Dev IA', start: '2024-09-26T10:00:00', extendedProps: { salle: '104' } },
            { title: 'Dev Java', start: '2024-09-27T08:00:00', extendedProps: { salle: '107' } },
            // autres événements...
          ]}
          eventContent={renderEventContent}
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
          allDaySlot={false}
          weekends={false}
        />
      </div>

      <div className="image-gallery">
        <img
          src={images[currentImageIndex]}
          alt={`Gallery ${currentImageIndex}`}
          className="gallery-image"
        />
      </div>

      <div className="incident-button-container">
        <Link to="/report" className="incident-button">Signaler un incident</Link>
      </div>
    </div>
  );
}

export default HomePage;

// HomePage.js
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { createApi } from 'unsplash-js';
import { Link, useNavigate } from 'react-router-dom';
import './styles/homepage.css'; // Import du CSS spécifique

const unsplash = createApi({
  accessKey: 'tTCREfXze17kqilEtztuJFajxv3wk60Wc-dCCKqMQVA',
});

function HomePage() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const fetchImages = () => {
    unsplash.photos.getRandom({ count: 5 }).then((result) => {
      if (result.errors) {
        console.log('Erreur de chargement des images : ', result.errors);
      } else {
        const fetchedImages = result.response.map((image) => image.urls.full);
        setImages(fetchedImages);
      }
    }).catch((error) => {
      console.error('Erreur lors de la récupération des images:', error);
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
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
        {images.length > 0 && (
          <img
            src={images[currentImageIndex]}
            alt="Gallery"
            className="gallery-image"
          />
        )}
      </div>

      <div className="incident-button-container">
        <Link to="/report" className="incident-button">Signaler un incident</Link>
      </div>
    </div>
  );
}

export default HomePage;

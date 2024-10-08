import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonInput, IonButton } from '@ionic/react';
import { FaSearchLocation, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { WiStrongWind, WiBarometer, WiSunrise, WiSunset } from 'react-icons/wi';
import WeatherService from '../services/WeatherService';
import './Home.css';

const Home: React.FC = () => {
  const layananCuaca = new WeatherService();
  const [kota, setKota] = useState('');
  const [cuaca, setCuaca] = useState({
    lokasi: '',
    suhu: '',
    deskripsi: '',
    ikon: '',
    angin: '',
    tekanan: '',
    matahariTerbit: '',
    matahariTerbenam: '',
  });
  const [errorAlert, setErrorAlert] = useState(false);

  const capitalizeDescription = (description: string) => {
    return description
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const fetchCuaca = async (kota: string) => {
    if (kota.trim() === '') return;
    try {
      const data = await layananCuaca.getData(kota, 'id');
      const terbit = new Date(data.sys.sunrise * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const terbenam = new Date(data.sys.sunset * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const deskripsiCuaca = capitalizeDescription(data.weather[0].description);
      const suhuBulat = Math.round(data.main.temp);

      setCuaca({
        lokasi: data.name,
        suhu: suhuBulat.toString(),
        deskripsi: deskripsiCuaca,
        ikon: data.weather[0].icon,
        angin: `${data.wind.speed.toFixed(2)} m/s`,
        tekanan: `${data.main.pressure} hPa`,
        matahariTerbit: terbit,
        matahariTerbenam: terbenam,
      });
      setErrorAlert(false);
    } catch (error) {
      setErrorAlert(true);
    }
  };

  useEffect(() => {
    fetchCuaca('Manado');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (kota.trim()) {
      fetchCuaca(kota);
    } else {
      setErrorAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent>
        {errorAlert && (
          <div className="error-message">
            <FaExclamationCircle className="error-icon" />
            <span>
              <strong>Kota</strong> tidak ditemukan. Silakan periksa kembali.
            </span>
            <FaTimes className="close-error" onClick={() => setErrorAlert(false)} />
          </div>
        )}
        <div className="weather-container">
          <div className="title-box">
            <h2 className="sliding-title">Dayen Manoppo - Aplikasi Cuaca</h2>
          </div>

          <div className="search-container">
            <IonInput placeholder="Masukkan nama kota" value={kota} onIonChange={(e) => setKota(e.detail.value!)} className="city-input" clearInput />
            <IonButton onClick={handleSubmit} className="search-button">
              <FaSearchLocation />
            </IonButton>
          </div>

          <div className="weather-info">
            <h1 className="temperature">{cuaca.suhu ? `${cuaca.suhu}°C` : 'Memuat...'}</h1>
            {cuaca.ikon && <img src={`https://openweathermap.org/img/wn/${cuaca.ikon}@2x.png`} alt={cuaca.suhu} className="weather-icon" />}
            <h2 className="location">{cuaca.lokasi}</h2>
            <p className="description">{cuaca.deskripsi}</p>

            <div className="additional-info-grid">
              <div className="additional-info-item">
                <WiStrongWind className="info-icon" />
                <p>Angin</p>
                <span>{cuaca.angin}</span>
              </div>
              <div className="additional-info-item">
                <WiBarometer className="info-icon" />
                <p>Tekanan</p>
                <span>{cuaca.tekanan}</span>
              </div>
              <div className="additional-info-item">
                <WiSunrise className="info-icon" />
                <p>Matahari Terbit</p>
                <span>{cuaca.matahariTerbit}</span>
              </div>
              <div className="additional-info-item">
                <WiSunset className="info-icon" />
                <p>Matahari Terbenam</p>
                <span>{cuaca.matahariTerbenam}</span>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

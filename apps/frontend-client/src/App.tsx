import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

// CSS dosyasını çağırıyoruz
import './App.css';

// --- İKON AYARLARI ---
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Courier {
  id: string;
  name: string;
  currentLocation: { lat: number; lng: number } | null;
}

// --- AKILLI HARİTA KONTROLÜ (BEYİN) ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MapController = ({ couriers, forceRecenter, onRecenterDone }: any) => {
  const map = useMap();
  
  // 🧠 KİLİT NOKTA: Bu değişken sayesinde harita sadece İLK SEFERDE odaklanır.
  // Sonraki güncellemelerde (2 saniyede bir) harita kıpırdamaz, sadece markerlar hareket eder.
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Kurye yoksa hesaplama yapma
    if (couriers.length === 0) return;

    // --- ODAKLAMA FONKSİYONU ---
    const fitMap = () => {
      // 1. Kurye noktalarını topla
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const points = couriers
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((c: any) => c.currentLocation)
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((c: any) => [
          Number(c.currentLocation.lat),
          Number(c.currentLocation.lng)
        ] as [number, number]);

      if (points.length > 0) {
        map.invalidateSize(); // Haritayı kendine getir
        
        let bounds = L.latLngBounds(points);
        
        // 🛠️ MANTIK 1: KENAR BOŞLUĞU (GÜZEL GÖZÜKSÜN)
        // Kuryeler ekranın tam dibine yapışmasın diye alanı %20 genişletiyoruz.
        bounds = bounds.pad(0.2); 

        // 🛠️ MANTIK 2: ZOOM LİMİTLERİ (ZOOM IN/OUT DENGESİ)
        map.fitBounds(bounds, { 
          animate: true,      // Yumuşak geçiş
          padding: [50, 50],  // Ekstra piksel boşluğu
          
          // 👇 BURASI ÇOK ÖNEMLİ:
          // Eğer kuryeler uzaksa (Elazığ-Malatya), harita otomatik 8-9 zoom yapar.
          // Eğer kuryeler dibdibeyse, harita en fazla 15 zoom yapar (Mahalle görünümü).
          // Böylece hem uzaktakini hem yakındakini en iyi oranda gösterir.
          maxZoom: 15 
        });
      }
    };

    // SENARYO A: İlk Açılış
    // Veri ilk geldiğinde (1 saniye bekleyip) herkesi ekrana sığdırır.
    if (isFirstLoad.current) {
      const timer = setTimeout(() => {
        fitMap();
        isFirstLoad.current = false; // 🔒 KİLİDİ VUR: Bir daha otomatik oynama!
      }, 1000);
      return () => clearTimeout(timer);
    }

    // SENARYO B: Kullanıcı Butona Bastı
    // "Ekran sabitlenmesini önlemek" istediğin için, sonraki odaklamaları
    // sadece sen "🔍 Tümü" butonuna basarsan yaparız.
    if (forceRecenter) {
      fitMap();
      onRecenterDone();
    }
    
    // Not: couriers dependency'de olduğu için markerlar her 2 saniyede bir güncellenir
    // ama 'fitMap' çalışmaz (çünkü isFirstLoad false oldu).
  }, [couriers, map, forceRecenter, onRecenterDone]);

  return null;
};

function App() {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [triggerRecenter, setTriggerRecenter] = useState(false);

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/couriers');
        setCouriers(response.data);
      } catch (error) {
        console.error("Hata:", error);
      }
    };
    fetchCouriers();
    const interval = setInterval(fetchCouriers, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      
      <MapContainer 
        center={[39.0, 35.0]} // Açılışta Türkiye geneli (MapController bunu ezecek)
        zoom={6} 
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {couriers.map((courier) => (
          courier.currentLocation && (
            <Marker 
              key={courier.id} 
              position={[Number(courier.currentLocation.lat), Number(courier.currentLocation.lng)]}
            >
              <Popup>
                <div className="popup-content">
                  <strong>{courier.name}</strong> <br/>
                  📦 Aktif
                </div>
              </Popup>
            </Marker>
          )
        ))}

        <MapController 
          couriers={couriers} 
          forceRecenter={triggerRecenter} 
          onRecenterDone={() => setTriggerRecenter(false)}
        />
      </MapContainer>

      {/* Bilgi Kutusu */}
      <div className="info-box">
        <strong>Canlı Takip</strong> <br/>
        Aktif Kurye: {couriers.length}
      </div>

      {/* Buton */}
      <button 
        className="recenter-button"
        onClick={() => setTriggerRecenter(true)}
      >
        🔍 Tümü
      </button>

    </div>
  );
}

export default App;
// Kurye Durumları (Enum)
export enum CourierStatus {
  OFFLINE = 'OFFLINE', // Çevrimdışı
  IDLE = 'IDLE',       // Boşta, iş bekliyor
  BUSY = 'BUSY',       // Meşgul, paket taşıyor
}

// Kurye Arayüzü (Interface)
export interface ICourier {
  id: string;
  name: string;
  status: CourierStatus; // Yukarıdaki Enum'ı kullanıyoruz
  score: number;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}
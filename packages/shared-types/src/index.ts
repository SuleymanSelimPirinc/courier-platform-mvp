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

// ============================================
// ESNAF (MERCHANT) TİPLERİ
// ============================================

// Doğrulama Durumu
export enum VerificationStatus {
  PENDING = 'PENDING',       // Beklemede
  VERIFIED = 'VERIFIED',     // Onaylandı
  REJECTED = 'REJECTED',     // Reddedildi
  SUSPENDED = 'SUSPENDED',   // Askıya alındı
}

// Esnaf Kategorileri
export enum MerchantCategory {
  RESTAURANT = 'RESTAURANT',           // Restoran, Kafe, Pastane
  MARKET = 'MARKET',                   // Market, Bakkal, Kasap
  PHARMACY = 'PHARMACY',               // Eczane
  DRY_CLEANING = 'DRY_CLEANING',       // Kuru temizleme
  FLORIST = 'FLORIST',                 // Çiçekçi
  DOCUMENT = 'DOCUMENT',               // Noter, Avukat
  OTHER = 'OTHER',                     // Diğer
}

// Esnaf Arayüzü (Interface)
export interface IMerchant {
  id: string;
  name: string;
  category: MerchantCategory;
  taxNumber: string;
  verificationStatus: VerificationStatus;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  email?: string;
  workingHours?: {
    open: string;
    close: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// AUTHENTICATION TİPLERİ
// ============================================

// Kullanıcı Rolleri
export enum UserRole {
  COURIER = 'COURIER',     // Kurye
  MERCHANT = 'MERCHANT',   // Esnaf
  ADMIN = 'ADMIN',         // Yönetici
}

// JWT Payload
export interface IJwtPayload {
  sub: string;       // User ID
  email: string;
  role: UserRole;
}
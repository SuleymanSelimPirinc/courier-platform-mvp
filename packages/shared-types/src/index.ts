// Kurye Durumları (Enum)
export enum CourierStatus {
  OFFLINE = 'OFFLINE', // Çevrimdışı
  IDLE = 'IDLE',       // Boşta, iş bekliyor
  BUSY = 'BUSY',       // Meşgul, paket taşıyor
}

// Araç Tipleri (Enum)
export enum VehicleType {
  WALKER = 'WALKER',         // Yaya
  BICYCLE = 'BICYCLE',       // Bisiklet
  MOTORCYCLE = 'MOTORCYCLE', // Motor
  CAR = 'CAR',               // Araba
  VAN = 'VAN',               // Minivan/Panelvan
  TRUCK = 'TRUCK',           // Kamyonet
}

// Kurye Arayüzü (Interface)
export interface ICourier {
  id: string;
  name: string;
  status: CourierStatus;
  vehicleType?: VehicleType; // Opsiyonel şimdilik
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

// ============================================
// TESLİMAT (DELIVERY) TİPLERİ
// ============================================

// Paket Boyutları
export enum PackageSize {
  SMALL = 'SMALL',     // Zarf, dosya (< 2kg)
  MEDIUM = 'MEDIUM',   // Ayakkabı kutusu (2-10kg)
  LARGE = 'LARGE',     // Koli (10-30kg)
  XLARGE = 'XLARGE',   // Mobilya, beyaz eşya (>30kg)
}

// Teslimat Durumları
export enum DeliveryStatus {
  PENDING = 'PENDING',       // Kurye bekleniyor
  ASSIGNED = 'ASSIGNED',     // Kurye atandı
  PICKED_UP = 'PICKED_UP',   // Paket alındı
  DELIVERED = 'DELIVERED',   // Teslim edildi
  CANCELLED = 'CANCELLED',   // İptal edildi
}

// Teslimat Arayüzü (Interface)
export interface IDelivery {
  id: string;
  merchantId: string;
  courierId?: string;
  status: DeliveryStatus;
  pickupAddress: string;
  pickupLocation: { lat: number; lng: number };
  dropoffAddress: string;
  dropoffLocation: { lat: number; lng: number };
  packageDescription: string;
  packageSize?: PackageSize; // Yeni alan
  estimatedPrice?: number;
  notes?: string;
  createdAt: Date;
  assignedAt?: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
}
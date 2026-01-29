export declare enum CourierStatus {
    OFFLINE = "OFFLINE",// Çevrimdışı
    IDLE = "IDLE",// Boşta, iş bekliyor
    BUSY = "BUSY"
}
export interface ICourier {
    id: string;
    name: string;
    status: CourierStatus;
    score: number;
    currentLocation?: {
        lat: number;
        lng: number;
    };
}
export declare enum VerificationStatus {
    PENDING = "PENDING",// Beklemede
    VERIFIED = "VERIFIED",// Onaylandı
    REJECTED = "REJECTED",// Reddedildi
    SUSPENDED = "SUSPENDED"
}
export declare enum MerchantCategory {
    RESTAURANT = "RESTAURANT",// Restoran, Kafe, Pastane
    MARKET = "MARKET",// Market, Bakkal, Kasap
    PHARMACY = "PHARMACY",// Eczane
    DRY_CLEANING = "DRY_CLEANING",// Kuru temizleme
    FLORIST = "FLORIST",// Çiçekçi
    DOCUMENT = "DOCUMENT",// Noter, Avukat
    OTHER = "OTHER"
}
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
export declare enum UserRole {
    COURIER = "COURIER",// Kurye
    MERCHANT = "MERCHANT",// Esnaf
    ADMIN = "ADMIN"
}
export interface IJwtPayload {
    sub: string;
    email: string;
    role: UserRole;
}
export declare enum DeliveryStatus {
    PENDING = "PENDING",// Kurye bekleniyor
    ASSIGNED = "ASSIGNED",// Kurye atandı
    PICKED_UP = "PICKED_UP",// Paket alındı
    DELIVERED = "DELIVERED",// Teslim edildi
    CANCELLED = "CANCELLED"
}
export interface IDelivery {
    id: string;
    merchantId: string;
    courierId?: string;
    status: DeliveryStatus;
    pickupAddress: string;
    pickupLocation: {
        lat: number;
        lng: number;
    };
    dropoffAddress: string;
    dropoffLocation: {
        lat: number;
        lng: number;
    };
    packageDescription: string;
    estimatedPrice?: number;
    notes?: string;
    createdAt: Date;
    assignedAt?: Date;
    pickedUpAt?: Date;
    deliveredAt?: Date;
}

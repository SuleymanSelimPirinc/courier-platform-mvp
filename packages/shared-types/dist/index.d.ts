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

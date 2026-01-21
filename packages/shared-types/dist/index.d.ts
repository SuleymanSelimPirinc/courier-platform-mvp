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

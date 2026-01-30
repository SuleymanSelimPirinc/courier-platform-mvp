"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatus = exports.PackageSize = exports.UserRole = exports.MerchantCategory = exports.VerificationStatus = exports.VehicleType = exports.CourierStatus = void 0;
// Kurye Durumları (Enum)
var CourierStatus;
(function (CourierStatus) {
    CourierStatus["OFFLINE"] = "OFFLINE";
    CourierStatus["IDLE"] = "IDLE";
    CourierStatus["BUSY"] = "BUSY";
})(CourierStatus || (exports.CourierStatus = CourierStatus = {}));
// Araç Tipleri (Enum)
var VehicleType;
(function (VehicleType) {
    VehicleType["WALKER"] = "WALKER";
    VehicleType["BICYCLE"] = "BICYCLE";
    VehicleType["MOTORCYCLE"] = "MOTORCYCLE";
    VehicleType["CAR"] = "CAR";
    VehicleType["VAN"] = "VAN";
    VehicleType["TRUCK"] = "TRUCK";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
// ============================================
// ESNAF (MERCHANT) TİPLERİ
// ============================================
// Doğrulama Durumu
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["PENDING"] = "PENDING";
    VerificationStatus["VERIFIED"] = "VERIFIED";
    VerificationStatus["REJECTED"] = "REJECTED";
    VerificationStatus["SUSPENDED"] = "SUSPENDED";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
// Esnaf Kategorileri
var MerchantCategory;
(function (MerchantCategory) {
    MerchantCategory["RESTAURANT"] = "RESTAURANT";
    MerchantCategory["MARKET"] = "MARKET";
    MerchantCategory["PHARMACY"] = "PHARMACY";
    MerchantCategory["DRY_CLEANING"] = "DRY_CLEANING";
    MerchantCategory["FLORIST"] = "FLORIST";
    MerchantCategory["DOCUMENT"] = "DOCUMENT";
    MerchantCategory["OTHER"] = "OTHER";
})(MerchantCategory || (exports.MerchantCategory = MerchantCategory = {}));
// ============================================
// AUTHENTICATION TİPLERİ
// ============================================
// Kullanıcı Rolleri
var UserRole;
(function (UserRole) {
    UserRole["COURIER"] = "COURIER";
    UserRole["MERCHANT"] = "MERCHANT";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
// ============================================
// TESLİMAT (DELIVERY) TİPLERİ
// ============================================
// Paket Boyutları
var PackageSize;
(function (PackageSize) {
    PackageSize["SMALL"] = "SMALL";
    PackageSize["MEDIUM"] = "MEDIUM";
    PackageSize["LARGE"] = "LARGE";
    PackageSize["XLARGE"] = "XLARGE";
})(PackageSize || (exports.PackageSize = PackageSize = {}));
// Teslimat Durumları
var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus["PENDING"] = "PENDING";
    DeliveryStatus["ASSIGNED"] = "ASSIGNED";
    DeliveryStatus["PICKED_UP"] = "PICKED_UP";
    DeliveryStatus["DELIVERED"] = "DELIVERED";
    DeliveryStatus["CANCELLED"] = "CANCELLED";
})(DeliveryStatus || (exports.DeliveryStatus = DeliveryStatus = {}));

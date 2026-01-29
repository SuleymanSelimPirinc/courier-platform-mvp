"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.MerchantCategory = exports.VerificationStatus = exports.CourierStatus = void 0;
// Kurye Durumları (Enum)
var CourierStatus;
(function (CourierStatus) {
    CourierStatus["OFFLINE"] = "OFFLINE";
    CourierStatus["IDLE"] = "IDLE";
    CourierStatus["BUSY"] = "BUSY";
})(CourierStatus || (exports.CourierStatus = CourierStatus = {}));
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

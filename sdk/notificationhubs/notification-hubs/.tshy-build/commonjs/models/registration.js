"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmRegistrationDescription = createAdmRegistrationDescription;
exports.createAdmTemplateRegistrationDescription = createAdmTemplateRegistrationDescription;
exports.createAppleRegistrationDescription = createAppleRegistrationDescription;
exports.createAppleTemplateRegistrationDescription = createAppleTemplateRegistrationDescription;
exports.createBaiduRegistrationDescription = createBaiduRegistrationDescription;
exports.createBaiduTemplateRegistrationDescription = createBaiduTemplateRegistrationDescription;
exports.createBrowserRegistrationDescription = createBrowserRegistrationDescription;
exports.createBrowserTemplateRegistrationDescription = createBrowserTemplateRegistrationDescription;
exports.createFcmLegacyRegistrationDescription = createFcmLegacyRegistrationDescription;
exports.createFcmLegacyTemplateRegistrationDescription = createFcmLegacyTemplateRegistrationDescription;
exports.createFcmV1RegistrationDescription = createFcmV1RegistrationDescription;
exports.createFcmV1TemplateRegistrationDescription = createFcmV1TemplateRegistrationDescription;
exports.createWindowsRegistrationDescription = createWindowsRegistrationDescription;
exports.createWindowsTemplateRegistrationDescription = createWindowsTemplateRegistrationDescription;
exports.createXiaomiRegistrationDescription = createXiaomiRegistrationDescription;
exports.createXiaomiTemplateRegistrationDescription = createXiaomiTemplateRegistrationDescription;
/**
 * Creates an ADM registration description.
 * @param description - A partial ADM registration description.
 * @returns A created ADM registration description.
 */
function createAdmRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "Adm" });
}
/**
 * Creates an ADM template registration description.
 * @param description - A partial ADM template registration description.
 * @returns A created ADM template registration description.
 */
function createAdmTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "AdmTemplate" });
}
/**
 * Creates an Apple registration description.
 * @param description - A partial Apple registration description.
 * @returns A created Apple registration description.
 */
function createAppleRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "Apple" });
}
/**
 * Creates an Apple template registration description.
 * @param description - A partial Apple template registration description.
 * @returns A created Apple template registration description.
 */
function createAppleTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "AppleTemplate" });
}
/**
 * Creates a Baidu registration description.
 * @param description - A partial Baidu registration description.
 * @returns A created Baidu registration description.
 */
function createBaiduRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "Baidu" });
}
/**
 * Creates a Baidu template registration description.
 * @param description - A partial Baidu template registration description.
 * @returns A created Baidu template registration description.
 */
function createBaiduTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "BaiduTemplate" });
}
/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push registration description.
 * @returns A created Web Push registration description.
 */
function createBrowserRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "Browser" });
}
/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push template registration description.
 * @returns A created Web Push template registration description.
 */
function createBrowserTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "BrowserTemplate" });
}
/**
 * Creates a Firebase Legacy registration description.
 * @param description - A partial GCM registration description.
 * @returns A created GCM registration description.
 */
function createFcmLegacyRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "Gcm" });
}
/**
 * Creates a GCM template registration description.
 * @param description - A partial GCM template registration description.
 * @returns A created GCM template registration description.
 */
function createFcmLegacyTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "GcmTemplate" });
}
/**
 * Creates a Firebase V1 registration description.
 * @param description - A partial FCM V1 registration description.
 * @returns A created FCM V1 registration description.
 */
function createFcmV1RegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "FcmV1" });
}
/**
 * Creates a FCM V1 template registration description.
 * @param description - A partial FCM V1 template registration description.
 * @returns A created FCM V1 template registration description.
 */
function createFcmV1TemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "FcmV1Template" });
}
/**
 * Creates a Windows registration description.
 * @param description - A partial Windows registration description.
 * @returns A created Windows registration description.
 */
function createWindowsRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "Windows" });
}
/**
 * Creates a Windows template registration description.
 * @param description - A partial Windows template registration description.
 * @returns A created Windows template registration description.
 */
function createWindowsTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "WindowsTemplate" });
}
/**
 * Creates a Xiaomi registration description.
 * @param description - A partial Xiaomi registration description.
 * @returns A created Xiaomi registration description.
 */
function createXiaomiRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "Xiaomi" });
}
/**
 * Creates a Xiaomi template registration description.
 * @param description - A partial Xiaomi template registration description.
 * @returns A created Xiaomi template registration description.
 */
function createXiaomiTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { kind: "XiaomiTemplate" });
}
//# sourceMappingURL=registration.js.map
"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppleInstallation = createAppleInstallation;
exports.createAdmInstallation = createAdmInstallation;
exports.createBaiduInstallation = createBaiduInstallation;
exports.createFcmLegacyInstallation = createFcmLegacyInstallation;
exports.createFcmV1Installation = createFcmV1Installation;
exports.createXiaomiInstallation = createXiaomiInstallation;
exports.createWindowsInstallation = createWindowsInstallation;
exports.createBrowserInstallation = createBrowserInstallation;
/**
 * Creates an Apple based installation.
 * @param installation - A partial installation used to create the Apple installation.
 * @returns The newly created Apple installation.
 */
function createAppleInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "apns" });
}
/**
 * Creates an Amazon Device Messaging (ADM) based installation.
 * @param installation - A partial installation used to create the ADM installation.
 * @returns The newly created ADM installation.
 */
function createAdmInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "adm" });
}
/**
 * Creates a Baidu based installation.
 * @param installation - A partial installation used to create the Baidu installation.
 * @returns The newly created Baidu installation.
 */
function createBaiduInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "baidu" });
}
/**
 * Creates a Firebase legacy HTTP based installation.
 * @param installation - A partial installation used to create the Firebase Legacy HTTP installation.
 * @returns The newly created Baidu installation.
 */
function createFcmLegacyInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "gcm" });
}
/**
 * Creates an Firebase V1 Cloud Messaging based installation.
 * @param installation - A partial installation used to create the Firebase V1 Cloud Messaging installation.
 * @returns The newly created Firebase V1 Cloud Messaging installation.
 */
function createFcmV1Installation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "fcmv1" });
}
/**
 * Creates a Xiaomi based installation.
 * @param installation - A partial installation used to create the Xiaomi installation.
 * @returns The newly created Xiaomi installation.
 */
function createXiaomiInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "xiaomi" });
}
/**
 * Creates a Windows Notification Services (WNS) based installation.
 * @param installation - A partial installation used to create the WNS installation.
 * @returns The newly created WNS installation.
 */
function createWindowsInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "wns" });
}
/**
 * Creates a Web Push based installation.
 * @param installation - A partial installation used to create the Web Push installation.
 * @returns The newly created Web Push installation.
 */
function createBrowserInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "browser" });
}
//# sourceMappingURL=installation.js.map
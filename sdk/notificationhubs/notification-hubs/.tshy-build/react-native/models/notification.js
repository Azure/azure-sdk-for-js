// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as Constants from "../utils/constants.js";
function isString(value) {
    return typeof value === "string" || value instanceof String;
}
/**
 * Creates a notification to send to an Apple device.
 * @param notification - A partial message used to create a message for Apple.
 * @returns A newly created Apple.
 */
export function createAppleNotification(notification) {
    const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);
    return Object.assign(Object.assign({}, notification), { body, platform: "apple", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to an Amazon Device Messaging device.
 * @param notification - A partial message used to create a message for Amazon Device Messaging.
 * @returns A newly created Amazon Device Messaging.
 */
export function createAdmNotification(notification) {
    const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);
    return Object.assign(Object.assign({}, notification), { body, platform: "adm", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to a Baidu registered device.
 * @param notification - A partial message used to create a message for Baidu.
 * @returns A newly created Baidu.
 */
export function createBaiduNotification(notification) {
    const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);
    return Object.assign(Object.assign({}, notification), { body, platform: "baidu", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to a browser.
 * @param notification - A partial message used to create a message for a browser.
 * @returns A newly created Web Push browser.
 */
export function createBrowserNotification(notification) {
    const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);
    return Object.assign(Object.assign({}, notification), { body, platform: "browser", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase notification.
 */
export function createFcmLegacyNotification(notification) {
    const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);
    return Object.assign(Object.assign({}, notification), { body, platform: "gcm", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase notification.
 */
export function createFcmV1Notification(notification) {
    const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);
    return Object.assign(Object.assign({}, notification), { body, platform: "fcmv1", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to Xiaomi.
 * @param notification - A partial message used to create a message for Xiaomi.
 * @returns A newly created Xiaomi notification.
 */
export function createXiaomiNotification(notification) {
    const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);
    return Object.assign(Object.assign({}, notification), { body, platform: "xiaomi", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a template notification.
 * @param notification - A partial message used to be used for a template notification.
 * @returns A newly created Firebase.
 */
export function createTemplateNotification(notification) {
    const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);
    return Object.assign(Object.assign({}, notification), { body, platform: "template", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to WNS.
 * @param notification - The WNS notification to send.
 * @returns A newly created WNS message.
 */
export function createWindowsNotification(notification) {
    if ((notification === null || notification === void 0 ? void 0 : notification.headers) && notification.headers["X-WNS-Type"]) {
        const wnsType = notification.headers["X-WNS-Type"];
        switch (wnsType) {
            case Constants.WNS_TOAST:
                return createWindowsToastNotification(notification);
            case Constants.WNS_TITLE:
                return createWindowsTileNotification(notification);
            case Constants.WNS_BADGE:
                return createWindowsBadgeNotification(notification);
            case Constants.WNS_RAW:
                return createWindowsRawNotification(notification);
            default:
                throw new Error(`Invalid WNS type: ${wnsType}`);
        }
    }
    else {
        throw new Error(`Missing WNS type in headers`);
    }
}
/**
 * Creates a badge message to send to WNS.
 * @param notification - A partial message used to create a badge message for WNS.
 * @returns A newly created WNS badge.
 */
export function createWindowsBadgeNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "windows", contentType: Constants.XML_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    if (!result.headers[Constants.WNS_TYPE_NAME]) {
        result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_BADGE;
    }
    return result;
}
/**
 * Creates a tile message to send to WNS.
 * @param notification - A partial message used to create a tile message for WNS.
 * @returns A newly created WNS tile.
 */
export function createWindowsTileNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "windows", contentType: Constants.XML_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    if (!result.headers[Constants.WNS_TYPE_NAME]) {
        result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_TITLE;
    }
    return result;
}
/**
 * Creates a toast message to send to WNS.
 * @param notification - A partial message used to create a toast message for WNS.
 * @returns A newly created WNS toast.
 */
export function createWindowsToastNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "windows", contentType: Constants.XML_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    if (!result.headers[Constants.WNS_TYPE_NAME]) {
        result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_TOAST;
    }
    return result;
}
/**
 * Creates a notification to send to WNS in wns/raw format..
 * @param notification - A partial message used to create a message for WNS in XML format.
 * @returns A newly created WNS message using XML.
 */
export function createWindowsRawNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "windows", contentType: Constants.STREAM_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    if (!result.headers[Constants.WNS_TYPE_NAME]) {
        result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_RAW;
    }
    return result;
}
//# sourceMappingURL=notification.js.map
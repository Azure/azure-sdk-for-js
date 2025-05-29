"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppleNotificationBody = createAppleNotificationBody;
exports.createFirebaseLegacyNotificationBody = createFirebaseLegacyNotificationBody;
exports.createFirebaseV1NotificationBody = createFirebaseV1NotificationBody;
exports.createAdmNotificationBody = createAdmNotificationBody;
exports.createBaiduNotificationBody = createBaiduNotificationBody;
exports.createWindowsBadgeNotificationBody = createWindowsBadgeNotificationBody;
const core_xml_1 = require("@azure/core-xml");
/**
 * Creates an APNs native message to send to Notification Hubs.
 * @param nativeMessage - The Apple native message properties to set.
 * @param additionalProperties - Additional properties for Apple messages.
 * @returns An AppleNotification to send to Notification Hubs.
 */
function createAppleNotificationBody(nativeMessage) {
    return JSON.stringify(nativeMessage);
}
/**
 * Creates a FcmLegacyNotification from a native Firebase payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The JSON body to send to Notification Hubs.
 */
function createFirebaseLegacyNotificationBody(nativeMessage) {
    return JSON.stringify(nativeMessage);
}
/**
 * Creates a FcmV1Notification from a native Firebase payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The JSON body to send to Notification Hubs.
 */
function createFirebaseV1NotificationBody(nativeMessage) {
    return JSON.stringify(nativeMessage);
}
/**
 * Creates a AdmNotification from a native ADM payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The AdmNotification to send to Notification Hubs.
 */
function createAdmNotificationBody(nativeMessage) {
    return JSON.stringify(nativeMessage);
}
/**
 * Creates a BaiduNotification from a native Baidu payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The JSON body to send to Notification Hubs.
 */
function createBaiduNotificationBody(nativeMessage) {
    return JSON.stringify(nativeMessage);
}
/**
 * Builds a WindowsNotification from a Windows Badge.
 * @param nativeMessage - The Windows Badge Message to build.
 * @returns The WNS XML created with the badge information.
 */
function createWindowsBadgeNotificationBody(nativeMessage) {
    const badge = {
        $: { value: nativeMessage.value },
    };
    return (0, core_xml_1.stringifyXML)(badge, { rootName: "badge" });
}
//# sourceMappingURL=notificationBodyBuilder.js.map
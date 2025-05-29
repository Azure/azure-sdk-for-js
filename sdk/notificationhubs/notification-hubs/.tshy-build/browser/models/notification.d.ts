import type { AdmNativeMessage, AppleNativeMessage, FirebaseLegacyNativeMessage, FirebaseV1NativeMessage } from "./notificationBodyBuilder.js";
import type { AppleHeaders, WindowsHeaders } from "./notificationHeaderBuilder.js";
/**
 * Represents a notification that can be sent to a device.
 */
export interface NotificationCommon {
    /**
     * The body for the push notification.
     */
    body: string;
    /**
     * The headers to include for the push notification.
     */
    headers?: Record<string, unknown>;
}
/**
 * The common notification parameters to accept a string body or JSON body.
 */
export interface NotificationCommonParams {
    /**
     * The body for the push notification.
     */
    body: string | unknown;
    /**
     * The headers to include for the push notification.
     */
    headers?: Record<string, unknown>;
}
/**
 * Represents a JSON notification hub.
 */
export interface JsonNotification extends NotificationCommon {
    /**
     * The content type for the push notification.
     */
    contentType: "application/json;charset=utf-8";
}
/**
 * Represents an Apple APNs push notification.
 */
export interface AppleNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "apple";
}
/**
 * Represents an Apple notification that can be sent to a device.
 */
export interface AppleNotificationParams {
    /**
     * The body for the push notification.
     */
    body: string | AppleNativeMessage;
    /**
     * The headers to include for the push notification.
     */
    headers?: AppleHeaders;
}
/**
 * Creates a notification to send to an Apple device.
 * @param notification - A partial message used to create a message for Apple.
 * @returns A newly created Apple.
 */
export declare function createAppleNotification(notification: AppleNotificationParams): AppleNotification;
/**
 * Represents an Amazon Device Messaging (ADM) push notification.
 */
export interface AdmNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "adm";
}
/**
 * Represents an ADM notification that can be sent to a device.
 */
export interface AdmNotificationParams {
    /**
     * The body for the push notification.
     */
    body: string | AdmNativeMessage;
    /**
     * The headers to include for the push notification.
     */
    headers?: Record<string, string>;
}
/**
 * Creates a notification to send to an Amazon Device Messaging device.
 * @param notification - A partial message used to create a message for Amazon Device Messaging.
 * @returns A newly created Amazon Device Messaging.
 */
export declare function createAdmNotification(notification: AdmNotificationParams): AdmNotification;
/**
 * Represents a Baidu push notification.
 */
export interface BaiduNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "baidu";
}
/**
 * Creates a notification to send to a Baidu registered device.
 * @param notification - A partial message used to create a message for Baidu.
 * @returns A newly created Baidu.
 */
export declare function createBaiduNotification(notification: NotificationCommonParams): BaiduNotification;
/**
 * Represents a Browser push notification.
 */
export interface BrowserNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "browser";
}
/**
 * Creates a notification to send to a browser.
 * @param notification - A partial message used to create a message for a browser.
 * @returns A newly created Web Push browser.
 */
export declare function createBrowserNotification(notification: NotificationCommonParams): BrowserNotification;
/**
 * Represents a Firebase legacy HTTP push notification.
 */
export interface FcmLegacyNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "gcm";
}
/**
 * Represents an Firebase Legacy notification that can be sent to a device.
 */
export interface FcmLegacyNotificationParams {
    /**
     * The body for the push notification.
     */
    body: string | FirebaseLegacyNativeMessage;
    /**
     * The headers to include for the push notification.
     */
    headers?: Record<string, string>;
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase notification.
 */
export declare function createFcmLegacyNotification(notification: FcmLegacyNotificationParams): FcmLegacyNotification;
/**
 * Represents an Firebase V1 API notification that can be sent to a device.
 */
export interface FcmV1Notification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "fcmv1";
}
/**
 * Represents an Firebase V1 notification that can be sent to a device.
 */
export interface FcmV1NotificationParams {
    /**
     * The body for the push notification.
     */
    body: string | FirebaseV1NativeMessage;
    /**
     * The headers to include for the push notification.
     */
    headers?: Record<string, string>;
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase notification.
 */
export declare function createFcmV1Notification(notification: FcmV1NotificationParams): FcmV1Notification;
/**
 * Represents a Xiaomi push notification.
 */
export interface XiaomiNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "xiaomi";
}
/**
 * Creates a notification to send to Xiaomi.
 * @param notification - A partial message used to create a message for Xiaomi.
 * @returns A newly created Xiaomi notification.
 */
export declare function createXiaomiNotification(notification: NotificationCommonParams): XiaomiNotification;
/**
 * Represents a template based push notification.
 */
export interface TemplateNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "template";
}
/**
 * Creates a template notification.
 * @param notification - A partial message used to be used for a template notification.
 * @returns A newly created Firebase.
 */
export declare function createTemplateNotification(notification: NotificationCommonParams): TemplateNotification;
/**
 * Represents the possible WNS content-types.
 */
export type WindowsContentType = "application/xml" | "application/octet-stream";
/**
 * Represents a Windows Notification Services (WNS) push notification.
 */
export interface WindowsNotification extends NotificationCommon {
    /**
     * The platform for the push notification.
     */
    platform: "windows";
    /**
     * The content type for the push notification.
     */
    contentType: WindowsContentType;
}
/**
 * Represents a WNS notification that can be sent to a device.
 */
export interface WnsNotificationParams {
    /**
     * The body for the push notification.
     */
    body: string;
    /**
     * The headers to include for the push notification.
     */
    headers?: WindowsHeaders;
}
/**
 * Creates a notification to send to WNS.
 * @param notification - The WNS notification to send.
 * @returns A newly created WNS message.
 */
export declare function createWindowsNotification(notification: WnsNotificationParams): WindowsNotification;
/**
 * Creates a badge message to send to WNS.
 * @param notification - A partial message used to create a badge message for WNS.
 * @returns A newly created WNS badge.
 */
export declare function createWindowsBadgeNotification(notification: WnsNotificationParams): WindowsNotification;
/**
 * Creates a tile message to send to WNS.
 * @param notification - A partial message used to create a tile message for WNS.
 * @returns A newly created WNS tile.
 */
export declare function createWindowsTileNotification(notification: WnsNotificationParams): WindowsNotification;
/**
 * Creates a toast message to send to WNS.
 * @param notification - A partial message used to create a toast message for WNS.
 * @returns A newly created WNS toast.
 */
export declare function createWindowsToastNotification(notification: WnsNotificationParams): WindowsNotification;
/**
 * Creates a notification to send to WNS in wns/raw format..
 * @param notification - A partial message used to create a message for WNS in XML format.
 * @returns A newly created WNS message using XML.
 */
export declare function createWindowsRawNotification(notification: WnsNotificationParams): WindowsNotification;
/**
 * Represents the possible push notification messages types.
 */
export type Notification = AppleNotification | AdmNotification | BaiduNotification | BrowserNotification | FcmLegacyNotification | FcmV1Notification | XiaomiNotification | WindowsNotification | TemplateNotification;
//# sourceMappingURL=notification.d.ts.map
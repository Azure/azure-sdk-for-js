// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Constants from "../utils/constants.js";
import {
  AdmNativeMessage,
  AppleNativeMessage,
  FirebaseLegacyNativeMessage,
  FirebaseV1NativeMessage,
} from "./notificationBodyBuilder.js";
import { AppleHeaders, WindowsHeaders } from "./notificationHeaderBuilder.js";

function isString(value: unknown): value is string {
  return typeof value === "string" || value instanceof String;
}

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
export function createAppleNotification(notification: AppleNotificationParams): AppleNotification {
  const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);

  return {
    ...notification,
    body,
    platform: "apple",
    contentType: Constants.JSON_CONTENT_TYPE,
  };
}

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
export function createAdmNotification(notification: AdmNotificationParams): AdmNotification {
  const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);

  return {
    ...notification,
    body,
    platform: "adm",
    contentType: Constants.JSON_CONTENT_TYPE,
  };
}

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
export function createBaiduNotification(notification: NotificationCommonParams): BaiduNotification {
  const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);

  return {
    ...notification,
    body,
    platform: "baidu",
    contentType: Constants.JSON_CONTENT_TYPE,
  };
}

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
export function createBrowserNotification(
  notification: NotificationCommonParams,
): BrowserNotification {
  const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);

  return {
    ...notification,
    body,
    platform: "browser",
    contentType: Constants.JSON_CONTENT_TYPE,
  };
}

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
export function createFcmLegacyNotification(
  notification: FcmLegacyNotificationParams,
): FcmLegacyNotification {
  const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);

  return {
    ...notification,
    body,
    platform: "gcm",
    contentType: Constants.JSON_CONTENT_TYPE,
  };
}

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
export function createFcmV1Notification(notification: FcmV1NotificationParams): FcmV1Notification {
  const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);

  return {
    ...notification,
    body,
    platform: "fcmv1",
    contentType: Constants.JSON_CONTENT_TYPE,
  };
}

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
export function createXiaomiNotification(
  notification: NotificationCommonParams,
): XiaomiNotification {
  const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);

  return {
    ...notification,
    body,
    platform: "xiaomi",
    contentType: Constants.JSON_CONTENT_TYPE,
  };
}

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
export function createTemplateNotification(
  notification: NotificationCommonParams,
): TemplateNotification {
  const body = isString(notification.body) ? notification.body : JSON.stringify(notification.body);

  return {
    ...notification,
    body,
    platform: "template",
    contentType: Constants.JSON_CONTENT_TYPE,
  };
}

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
export function createWindowsNotification(
  notification: WnsNotificationParams,
): WindowsNotification {
  if (notification?.headers && notification.headers["X-WNS-Type"]) {
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
  } else {
    throw new Error(`Missing WNS type in headers`);
  }
}

/**
 * Creates a badge message to send to WNS.
 * @param notification - A partial message used to create a badge message for WNS.
 * @returns A newly created WNS badge.
 */
export function createWindowsBadgeNotification(
  notification: WnsNotificationParams,
): WindowsNotification {
  const result: WindowsNotification = {
    ...notification,
    platform: "windows",
    contentType: Constants.XML_CONTENT_TYPE,
  };

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
export function createWindowsTileNotification(
  notification: WnsNotificationParams,
): WindowsNotification {
  const result: WindowsNotification = {
    ...notification,
    platform: "windows",
    contentType: Constants.XML_CONTENT_TYPE,
  };

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
export function createWindowsToastNotification(
  notification: WnsNotificationParams,
): WindowsNotification {
  const result: WindowsNotification = {
    ...notification,
    platform: "windows",
    contentType: Constants.XML_CONTENT_TYPE,
  };

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
export function createWindowsRawNotification(
  notification: WnsNotificationParams,
): WindowsNotification {
  const result: WindowsNotification = {
    ...notification,
    platform: "windows",
    contentType: Constants.STREAM_CONTENT_TYPE,
  };

  if (!result.headers) {
    result.headers = {};
  }

  if (!result.headers[Constants.WNS_TYPE_NAME]) {
    result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_RAW;
  }

  return result;
}

/**
 * Represents the possible push notification messages types.
 */
export type Notification =
  | AppleNotification
  | AdmNotification
  | BaiduNotification
  | BrowserNotification
  | FcmLegacyNotification
  | FcmV1Notification
  | XiaomiNotification
  | WindowsNotification
  | TemplateNotification;

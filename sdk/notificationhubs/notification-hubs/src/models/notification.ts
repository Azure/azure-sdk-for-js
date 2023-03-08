// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Constants from "../utils/constants.js";

/**
 * Represents a notification hub.
 */
export interface NotificationCommon {
  /**
   * The body for the push notification.
   */
  body: string;

  /**
   * The headers to include for the push notification.
   */
  headers?: Record<string, string>;
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
 * Creates a notification to send to an Apple device.
 * @param notification - A partial message used to create a message for Apple.
 * @returns A newly created Apple.
 */
export function createAppleNotification(notification: NotificationCommon): AppleNotification {
  return {
    ...notification,
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
 * Creates a notification to send to an Amazon Device Messaging device.
 * @param notification - A partial message used to create a message for Amazon Device Messaging.
 * @returns A newly created Amazon Device Messaging.
 */
export function createAdmNotification(notification: NotificationCommon): AdmNotification {
  return {
    ...notification,
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
export function createBaiduNotification(notification: NotificationCommon): BaiduNotification {
  return {
    ...notification,
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
export function createBrowserNotification(notification: NotificationCommon): BrowserNotification {
  return {
    ...notification,
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
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase notification.
 */
export function createFcmLegacyNotification(
  notification: NotificationCommon
): FcmLegacyNotification {
  return {
    ...notification,
    platform: "gcm",
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
export function createXiaomiNotification(notification: NotificationCommon): XiaomiNotification {
  return {
    ...notification,
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
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase.
 */
export function createTemplateNotification(notification: NotificationCommon): TemplateNotification {
  return {
    ...notification,
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
  platform: "wns";

  /**
   * The content type for the push notification.
   */
  contentType: WindowsContentType;
}

/**
 * Creates a badge message to send to WNS.
 * @param notification - A partial message used to create a badge message for WNS.
 * @returns A newly created WNS badge.
 */
export function createWindowsBadgeNotification(
  notification: NotificationCommon
): WindowsNotification {
  const result: WindowsNotification = {
    ...notification,
    platform: "wns",
    contentType: Constants.XML_CONTENT_TYPE,
  };

  if (!result.headers) {
    result.headers = {};
  }

  result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_BADGE;

  return result;
}

/**
 * Creates a tile message to send to WNS.
 * @param notification - A partial message used to create a tile message for WNS.
 * @returns A newly created WNS tile.
 */
export function createWindowsTileNotification(
  notification: NotificationCommon
): WindowsNotification {
  const result: WindowsNotification = {
    ...notification,
    platform: "wns",
    contentType: Constants.XML_CONTENT_TYPE,
  };

  if (!result.headers) {
    result.headers = {};
  }

  result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_TITLE;

  return result;
}

/**
 * Creates a toast message to send to WNS.
 * @param notification - A partial message used to create a toast message for WNS.
 * @returns A newly created WNS toast.
 */
export function createWindowsToastNotification(
  notification: NotificationCommon
): WindowsNotification {
  const result: WindowsNotification = {
    ...notification,
    platform: "wns",
    contentType: Constants.XML_CONTENT_TYPE,
  };

  if (!result.headers) {
    result.headers = {};
  }

  result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_TOAST;

  return result;
}

/**
 * Creates a notification to send to WNS in wns/raw format..
 * @param notification - A partial message used to create a message for WNS in XML format.
 * @returns A newly created WNS message using XML.
 */
export function createWindowsRawNotification(
  notification: NotificationCommon
): WindowsNotification {
  const result: WindowsNotification = {
    ...notification,
    platform: "wns",
    contentType: Constants.STREAM_CONTENT_TYPE,
  };

  if (!result.headers) {
    result.headers = {};
  }

  result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_RAW;

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
  | XiaomiNotification
  | WindowsNotification
  | TemplateNotification;

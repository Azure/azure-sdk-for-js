// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const JSON_CONTENT_TYPE = "application/json;charset=utf-8";
const XML_CONTENT_TYPE = "application/xml";
const STREAM_CONTENT_TYPE = "application/octet-stream";

const WNS_TYPE_NAME = "X-WNS-Type";
const WNS_RAW = "wns/raw";
const WNS_BADGE = "wns/badge";
const WNS_TITLE = "wns/tile";
const WNS_TOAST = "wns/toast";

/**
 * Represents a notification hub message.
 */
export interface NotificationHubMessageCommon {
  /**
   * The body for the push notification.
   */
  body: string;

  /**
   * The headers to include for the push notification.
   */
  headers?: Record<string, string>;

  /**
   * The platform for the push notification.
   */
  platform: string;

  /**
   * The content type for the push notification.
   */
  contentType: string;
}

/**
 * Represents a JSON notification hub message.
 */
export interface JsonNotificationMessage extends NotificationHubMessageCommon {
  /**
   * The content type for the push notification.
   */
  contentType: "application/json;charset=utf-8";
}

/**
 * Represents an Apple APNs push notification message.
 */
export interface AppleMessage extends JsonNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "apple";
}

/**
 * Creates a message to send to an Apple device.
 * @param message - A partial message used to create a message for Apple.
 * @returns A newly created Apple message.
 */
export function createAppleMessage(message: Omit<AppleMessage, "platform" | "contentType">): AppleMessage {
  return {
    ...message,
    platform: "apple",
    contentType: JSON_CONTENT_TYPE,
  };
}

/**
 * Represents an Amazon Device Messaging (ADM) push notification message.
 */
export interface AdmMessage extends JsonNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "adm";
}

/**
 * Creates a message to send to an Amazon Device Messaging device.
 * @param message - A partial message used to create a message for Amazon Device Messaging.
 * @returns A newly created Amazon Device Messaging message.
 */
export function createAdmMessage(message: Omit<AdmMessage, "platform" | "contentType">): AdmMessage {
  return {
    ...message,
    platform: "adm",
    contentType: JSON_CONTENT_TYPE,
  };
}

/**
 * Represents a Baidu push notification message.
 */
export interface BaiduMessage extends JsonNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "baidu";
}

/**
 * Creates a message to send to a Baidu registered device.
 * @param message - A partial message used to create a message for Baidu.
 * @returns A newly created Baidu message.
 */
export function createBaiduMessage(message: Omit<BaiduMessage, "platform" | "contentType">): BaiduMessage {
  return {
    ...message,
    platform: "baidu",
    contentType: JSON_CONTENT_TYPE,
  };
}

/**
 * Represents a Browser push notification message.
 */
export interface BrowserMessage extends JsonNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "browser";
}

/**
 * Creates a message to send to a browser.
 * @param message - A partial message used to create a message for a browser.
 * @returns A newly created Web Push browser message.
 */
export function createBrowserMessage(message: Omit<BrowserMessage, "platform" | "contentType">): BrowserMessage {
  return {
    ...message,
    platform: "browser",
    contentType: JSON_CONTENT_TYPE,
  };
}

/**
 * Represents a Firebase legacy HTTP push notification message.
 */
export interface FirebaseLegacyMessage extends JsonNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "gcm";
}

/**
 * Creates a message to send to Firebase.
 * @param message - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase message.
 */
export function createFirebaseLegacyMessage(message: Omit<FirebaseLegacyMessage, "platform" | "contentType">): FirebaseLegacyMessage {
  return {
    ...message,
    platform: "gcm",
    contentType: JSON_CONTENT_TYPE,
  };
}

/**
 * Represents a template based push notification message.
 */
export interface TemplateMessage extends JsonNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "template";
}

/**
 * Creates a message to send to Firebase.
 * @param message - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase message.
 */
export function createTemplateMessage(message: Omit<TemplateMessage, "platform" | "contentType">): TemplateMessage {
  return {
    ...message,
    platform: "template",
    contentType: JSON_CONTENT_TYPE,
  };
}

/**
 * Represents the possible WNS content-types.
 */
export type WindowsContentType = "application/xml" | "application/octet-stream";

/**
 * Represents a Windows Notification Services (WNS) push notification message.
 */
export interface WindowsMessage extends NotificationHubMessageCommon {
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
 * @param message - A partial message used to create a badge message for WNS.
 * @returns A newly created WNS badge message.
 */
export function createBadgeMessage(message: Omit<WindowsMessage, "platform" | "contentType">): WindowsMessage {
  const result: WindowsMessage = {
    ...message,
    platform: "wns",
    contentType: XML_CONTENT_TYPE,
  };

  if (!result.headers) {
    result.headers = {};
  }

  result.headers[WNS_TYPE_NAME] = WNS_BADGE; 

  return result;
}

/**
 * Creates a tile message to send to WNS.
 * @param message - A partial message used to create a tile message for WNS.
 * @returns A newly created WNS tile message.
 */
export function createWindowsTileMessage(message: Omit<WindowsMessage, "platform" | "contentType">): WindowsMessage {
  const result: WindowsMessage = {
    ...message,
    platform: "wns",
    contentType: XML_CONTENT_TYPE,
  };

  if (!result.headers) {
    result.headers = {};
  }

  result.headers[WNS_TYPE_NAME] = WNS_TITLE; 

  return result;
}

/**
 * Creates a toast message to send to WNS.
 * @param message - A partial message used to create a toast message for WNS.
 * @returns A newly created WNS toast message.
 */
export function createWindowsToastMessage(message: Omit<WindowsMessage, "platform" | "contentType">): WindowsMessage {
  const result: WindowsMessage = {
    ...message,
    platform: "wns",
    contentType: XML_CONTENT_TYPE,
  };

  if (!result.headers) {
    result.headers = {};
  }

  result.headers[WNS_TYPE_NAME] = WNS_TOAST; 

  return result;
}

/**
 * Creates a message to send to WNS in wns/raw format..
 * @param message - A partial message used to create a message for WNS in XML format.
 * @returns A newly created WNS message using XML.
 */
export function createWindowsRawMessage(message: Omit<WindowsMessage, "platform" | "contentType">): WindowsMessage {
  const result: WindowsMessage = {
    ...message,
    platform: "wns",
    contentType: STREAM_CONTENT_TYPE,
  };

  if (!result.headers) {
    result.headers = {};
  }

  result.headers[WNS_TYPE_NAME] = WNS_RAW; 

  return result;
}

/**
 * Represents the possible push notification messages types.
 */
export type NotificationHubMessage =
  | AppleMessage
  | AdmMessage
  | BaiduMessage
  | BrowserMessage
  | FirebaseLegacyMessage
  | WindowsMessage
  | TemplateMessage;

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
 * Represents an Amazon Device Messaging (ADM) push notification message.
 */
export interface AdmMessage extends JsonNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "adm";
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
 * Represents a Browser push notification message.
 */
export interface BrowserMessage extends JsonNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "browser";
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
 * Represents a template based push notification message.
 */
export interface TemplateMessage extends JsonNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "template";
}

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
 * Represents the possible WNS content-types.
 */
export type WindowsContentType = "application/xml" | "application/octet-stream";

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

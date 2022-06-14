// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";

/**
 * Describes the options that can be provided while creating the NotificationHubsClient.
 */
export interface NotificationHubsClientOptions extends CommonClientOptions {}

/**
 * Describes a response from the Notification Hubs which includes a tracking ID, correlation ID and location.
 */
export interface NotificationHubResponse {
  /**
   * The Tracking ID of the operation.
   */
  trackingId?: string;

  /**
   * The correlation ID of the operation.
   */
  correlationId?: string;

  /**
   * The location of the operation.
   */
  location?: string;
}

/**
 * Represents an installation for a device for Notification Hubs.
 */
export interface InstallationCommon {
  /**
   * The ID for the installation.
   */
  installationId: string;

  /**
   * The User ID for the installation used for targeting.
   */
  userId?: string;

  /**
   * The installation expiration time.
   */
  readonly expirationTime: string;

  /**
   * The last update date of the installation.
   */
  readonly lastUpdate: string;

  /**
   * The platform for the installation.
   */
  platform: string;

  /**
   * The tags used for targeting this installation.
   */
  tags?: string[];

  /**
   * The templates for the installation.
   */
  templates?: Record<string, InstallationTemplate>;
}

/**
 * Represents an installation with a string based device token.
 */
export interface DeviceTokenInstallation extends InstallationCommon {
  /**
   * The push channel for a device.
   */
  pushChannel: string;
}

/**
 * Represents an Apple APNs based installation.
 */
export interface AppleInstallation extends DeviceTokenInstallation {
  /**
   * The platform for the installation.
   */
  platform: "apple";
}

/**
 * Represents an Amazon Device Messaging (ADM) based installation.
 */
export interface ADMInstallation extends DeviceTokenInstallation {
  /**
   * The platform for the installation.
   */
  platform: "adm";
}

/**
 * Represents a Baidu based installation.
 */
export interface BaiduInstallation extends DeviceTokenInstallation {
  /**
   * The platform for the installation.
   */
  platform: "baidu";
}

/**
 * Represents a Firebase Legacy HTTP installation.
 */
export interface FirebaseLegacyInstallation extends DeviceTokenInstallation {
  /**
   * The platform for the installation.
   */
  platform: "gcm";
}

/**
 * Represents a Windows Notification Services (WNS) based installation.
 */
export interface WindowsInstallation extends DeviceTokenInstallation {
  /**
   * The platform for the installation.
   */
  platform: "wns";
}

/**
 * Represents the push channel for a Browser Push installation.
 */
export interface BrowserPushChannel {
  /**
   * The P256DH for the browser push installation.
   */
  p256dh: string;

  /**
   * The auth secret for the browser push installation.
   */
  auth: string;

  /**
   * The endpoint URL for the browser push installation.
   */
  endpoint: string;
}

/**
 * Represents a Browser/Web Push based installation.
 */
export interface BrowserInstallation extends InstallationCommon {

  /**
   * The push channel for the Web Push API.
   */
  pushChannel: BrowserPushChannel;

  /**
   * The platform for the installation.
   */
  platform: "browser";
}

/**
 * Represents the types of installations available in Notification Hubs.
 */
export type Installation =
  | AppleInstallation
  | ADMInstallation
  | BaiduInstallation
  | BrowserInstallation
  | FirebaseLegacyInstallation
  | WindowsInstallation;

/**
 * Represents an installation template.
 */
export interface InstallationTemplate {
  /**
   * The body for the installation template.
   */
  body: string;

  /**
   * Headers to include for the template send.
   */
  headers: Record<string, string>;

  /**
   * The tags to include for the template.
   */
  tags?: string[];

  /**
   * The expiration date for the template.
   */
  expiry?: string;
}

/**
 * Represents the JSON Patch types of add, remove and replace.
 */
export type JSONPatchOperation = "add" | "remove" | "replace";

/**
 * Represents a patch operation for the installation.
 */
export interface InstallationPatch {
  /**
   * The patch operation.
   */
  op: JSONPatchOperation;

  /**
   * The path for the patch operation.
   */
  path: string;

  /**
   * The value to add or replace for the operation.
   */
  value?: string;
}

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
  headers: Record<string, string>;

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
export interface JSONNotificationMessage extends NotificationHubMessageCommon {
  /**
   * The content type for the push notification.
   */
  contentType: "application/json;charset=utf-8";
}

/**
 * Represents an Apple APNs push notification message.
 */
export interface AppleMessage extends JSONNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "apple";
}

/**
 * Represents an Amazon Device Messaging (ADM) push notification message.
 */
export interface ADMMessage extends JSONNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "adm";
}

/**
 * Represents a Baidu push notification message.
 */
export interface BaiduMessage extends JSONNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "baidu";
}

/**
 * Represents a Browser push notification message.
 */
export interface BrowserMessage extends JSONNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "browser";
}

/**
 * Represents a Firebase legacy HTTP push notification message.
 */
export interface FirebaseLegacyMessage extends JSONNotificationMessage {
  /**
   * The platform for the push notification.
   */
  platform: "gcm";
}

/**
 * Represents a template based push notification message.
 */
export interface TemplateMessage extends JSONNotificationMessage {
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
  | ADMMessage
  | BaiduMessage
  | BrowserMessage
  | FirebaseLegacyMessage
  | WindowsMessage
  | TemplateMessage;

/**
 * Represents the send operation options that can be set.
 */
export interface SendOperationOptions extends OperationOptions {
  /**
   * Set to true to enable debug send.
   */
  debug?: boolean;
}

/**
 * Represents the types of push channels available for Notification Hubs.
 */
export type PushHandle = BrowserPushChannel | string;

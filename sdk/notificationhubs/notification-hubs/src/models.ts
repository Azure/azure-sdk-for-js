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
export interface Installation {
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
export interface DeviceTokenInstallation extends Installation {
  pushChannel: string;
}

/**
 * Represents an Apple APNs based installation.
 */
export interface AppleInstallation extends DeviceTokenInstallation {
  platform: "apple";
}

/**
 * Represents an Amazon Device Messaging (ADM) based installation.
 */
export interface ADMInstallation extends DeviceTokenInstallation {
  platform: "adm";
}

/**
 * Represents a Baidu based installation.
 */
export interface BaiduInstallation extends DeviceTokenInstallation {
  platform: "baidu";
}

/**
 * Represents a Firebase Legacy HTTP installation.
 */
export interface FirebaseLegacyInstallation extends DeviceTokenInstallation {
  platform: "gcm";
}

/**
 * Represents a Windows Notification Services (WNS) based installation.
 */
export interface WindowsInstallation extends DeviceTokenInstallation {
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
export interface BrowserInstallation extends Installation {
  pushChannel: BrowserPushChannel;

  platform: "browser";
}

/**
 * Represents the types of installations available in Notification Hubs.
 */
export type InstallationType =
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
export type JSONPatchType = "add" | "remove" | "replace";

/**
 * Represents a patch operation for the installation.
 */
export interface InstallationPatch {
  /**
   * The patch operation.
   */
  op: JSONPatchType;

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
export interface NotificationHubMessage {
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
 * Represents an Apple APNs push notification message.
 */
export interface AppleMessage extends NotificationHubMessage {
  platform: "apple";

  contentType: "application/json;charset=utf-8";
}

/**
 * Represents an Amazon Device Messaging (ADM) push notification message.
 */
export interface ADMMessage extends NotificationHubMessage {
  platform: "adm";

  contentType: "application/json;charset=utf-8";
}

/**
 * Represents a Baidu push notification message.
 */
export interface BaiduMessage extends NotificationHubMessage {
  platform: "baidu";

  contentType: "application/json;charset=utf-8";
}

/**
 * Represents a Browser push notification message.
 */
export interface BrowserMessage extends NotificationHubMessage {
  platform: "browser";

  contentType: "application/json;charset=utf-8";
}

/**
 * Represents a Firebase legacy HTTP push notification message.
 */
export interface FirebaseLegacyMessage extends NotificationHubMessage {
  platform: "gcm";

  contentType: "application/json;charset=utf-8";
}

/**
 * Represents a Windows Notification Services (WNS) push notification message.
 */
export interface WindowsMessage extends NotificationHubMessage {
  platform: "wns";

  contentType: WindowsContentType;
}

/**
 * Represents the possible WNS content-types.
 */
export type WindowsContentType = "application/xml" | "application/octet-stream";

/**
 * Represents a template based push notification message.
 */
export interface TemplateMessage extends NotificationHubMessage {
  platform: "template";

  contentType: "application/json;charset=utf-8";
}

/**
 * Represents the possible push notification messages types.
 */
export type NotificationHubMessageType =
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
export type PushHandleType = BrowserPushChannel | string;

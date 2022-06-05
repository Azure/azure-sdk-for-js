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

export interface Installation {
  installationId: string;

  userId?: string;

  readonly expirationTime: string;

  readonly lastUpdate: string;

  platform: string;

  tags?: string[];

  templates?: Record<string, InstallationTemplate>;
}

export interface DeviceTokenInstallation extends Installation {
  pushChannel: string;
}

export interface AppleInstallation extends DeviceTokenInstallation {
  platform: "apple";
}

export interface ADMInstallation extends DeviceTokenInstallation {
  platform: "adm";
}

export interface BaiduInstallation extends DeviceTokenInstallation {
  platform: "baidu";
}

export interface FirebaseLegacyInstallation extends DeviceTokenInstallation {
  platform: "gcm";
}

export interface WindowsInstallation extends DeviceTokenInstallation {
  platform: "wns";
}

export interface BrowserPushChannel {
  p256dh: string;

  auth: string;

  endpoint: string;
}

export interface BrowserInstallation extends Installation {
  pushChannel: BrowserPushChannel;

  platform: "browser";
}

export type InstallationType =
  | AppleInstallation
  | ADMInstallation
  | BaiduInstallation
  | BrowserInstallation
  | FirebaseLegacyInstallation
  | WindowsInstallation;

export interface InstallationTemplate {
  body: string;

  headers: Record<string, string>;

  tags?: string[];

  expiry?: string;
}

export type JSONPatchType = "add" | "remove" | "replace";

export interface InstallationPatch {
  op: JSONPatchType;

  path: string;

  value?: string;
}

export interface NotificationHubMessage {
  body: string;

  headers: Record<string, string>;

  platform: string;

  contentType: string;
}

export interface AppleMessage extends NotificationHubMessage {
  platform: "apple";

  contentType: "application/json;charset=utf-8";
}

export interface ADMMessage extends NotificationHubMessage {
  platform: "adm";

  contentType: "application/json;charset=utf-8";
}

export interface BaiduMessage extends NotificationHubMessage {
  platform: "baidu";

  contentType: "application/json;charset=utf-8";
}

export interface BrowserMessage extends NotificationHubMessage {
  platform: "browser";

  contentType: "application/json;charset=utf-8";
}

export interface FirebaseLegacyMessage extends NotificationHubMessage {
  platform: "gcm";

  contentType: "application/json;charset=utf-8";
}

export interface WindowsMessage extends NotificationHubMessage {
  platform: "wns";

  contentType: WindowsContentType;
}

export type WindowsContentType = "application/xml" | "application/octet-stream";

export interface TemplateMessage extends NotificationHubMessage {
  platform: "template";

  contentType: "application/json;charset=utf-8";
}

export type NotificationHubMessageType =
  | AppleMessage
  | ADMMessage
  | BaiduMessage
  | BrowserMessage
  | FirebaseLegacyMessage
  | WindowsMessage
  | TemplateMessage;

export interface SendOperationOptions extends OperationOptions {
  debug?: boolean;
}

export type PushHandleType = BrowserPushChannel | string;

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

export function createAppleInstallation(installation: Omit<AppleInstallation, "platform">): AppleInstallation {
  return {
    ...installation,
    platform: "apple",
  };
}

/**
 * Represents an Amazon Device Messaging (ADM) based installation.
 */
export interface AdmInstallation extends DeviceTokenInstallation {
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
  | AdmInstallation
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
export type JsonPatchOperation = "add" | "remove" | "replace";

/**
 * Represents a patch operation for the installation.
 */
export interface InstallationPatch {
  /**
   * The patch operation.
   */
  op: JsonPatchOperation;

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
 * Represents the types of push channels available for Notification Hubs.
 */
export type PushHandle = BrowserPushChannel | string;

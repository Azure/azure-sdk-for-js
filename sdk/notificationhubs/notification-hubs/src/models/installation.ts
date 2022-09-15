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
  readonly expirationTime?: string;

  /**
   * The last update date of the installation.
   */
  readonly lastUpdate?: string;

  /**
   * The platform for the installation.
   */
  platform: "apns" | "adm" | "baidu" | "browser" | "gcm" | "wns";

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
  platform: "apns";
}

/**
 * Creates an Apple based installation.
 * @param installation - A partial installation used to create the Apple installation.
 * @returns The newly created Apple installation.
 */
export function createAppleInstallation(
  installation: Omit<AppleInstallation, "platform">
): AppleInstallation {
  return {
    ...installation,
    platform: "apns",
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
 * Creates an Amazon Device Messaging (ADM) based installation.
 * @param installation - A partial installation used to create the ADM installation.
 * @returns The newly created ADM installation.
 */
export function createAdmInstallation(
  installation: Omit<AdmInstallation, "platform">
): AdmInstallation {
  return {
    ...installation,
    platform: "adm",
  };
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
 * Creates a Baidu based installation.
 * @param installation - A partial installation used to create the Baidu installation.
 * @returns The newly created Baidu installation.
 */
export function createBaiduInstallation(
  installation: Omit<BaiduInstallation, "platform">
): BaiduInstallation {
  return {
    ...installation,
    platform: "baidu",
  };
}

/**
 * Represents a Firebase Legacy HTTP installation.
 */
export interface FcmLegacyInstallation extends DeviceTokenInstallation {
  /**
   * The platform for the installation.
   */
  platform: "gcm";
}

/**
 * Creates a Firebase legacy HTTP based installation.
 * @param installation - A partial installation used to create the Firebase Legacy HTTP installation.
 * @returns The newly created Baidu installation.
 */
export function createFcmLegacyInstallation(
  installation: Omit<FcmLegacyInstallation, "platform">
): FcmLegacyInstallation {
  return {
    ...installation,
    platform: "gcm",
  };
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
 * Creates a Windows Notification Services (WNS) based installation.
 * @param installation - A partial installation used to create the WNS installation.
 * @returns The newly created WNS installation.
 */
export function createWindowsInstallation(
  installation: Omit<WindowsInstallation, "platform">
): WindowsInstallation {
  return {
    ...installation,
    platform: "wns",
  };
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
 * Creates a Web Push based installation.
 * @param installation - A partial installation used to create the Web Push installation.
 * @returns The newly created Web Push installation.
 */
export function createBrowserInstallation(
  installation: Omit<BrowserInstallation, "platform">
): BrowserInstallation {
  return {
    ...installation,
    platform: "browser",
  };
}

/**
 * Represents the types of installations available in Notification Hubs.
 */
export type Installation =
  | AppleInstallation
  | AdmInstallation
  | BaiduInstallation
  | BrowserInstallation
  | FcmLegacyInstallation
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
}

/**
 * Represents the JSON Patch types of add, remove and replace.
 */
export type JsonPatchOperation = "add" | "remove" | "replace";

/**
 * Represents a patch operation.
 */
export interface JsonPatch {
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

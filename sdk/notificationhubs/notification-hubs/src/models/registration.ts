// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents the types of registration descriptions.
 */
export type RegistrationType =
  | "Adm"
  | "AdmTemplate"
  | "Apple"
  | "AppleTemplate"
  | "Baidu"
  | "BaiduTemplate"
  | "Browser"
  | "BrowserTemplate"
  | "Gcm"
  | "GcmTemplate"
  | "Fcm"
  | "FcmTemplate"
  | "Mpns"
  | "MpnsTemplate"
  | "Windows"
  | "WindowsTemplate";

/**
 * Represents a registration description.
 */
export interface RegistrationDescriptionCommon {
  /**
   * The registration ID.
   */
  registrationId?: string;

  /**
   * The expiration time of the registration.
   */
  expirationTime?: Date;

  /**
   * The ETag associated with this description.
   */
  eTag?: string;

  /**
   * The tags associated with the registration.
   */
  tags?: string[];

  /**
   * A dictionary of push variables associated with property bag.
   */
  pushVariables?: Record<string, string>;

  /**
   * The type of the registration.
   */
  platform: RegistrationType;
}

/**
 * Represents the description of a template registration.
 */
export interface TemplateRegistrationDescription {
  /**
   * The body template.
   */
  bodyTemplate: string;

  /**
   * The name of the template.
   */
  templateName?: string;
}

/**
 * Represents the description of the Amazon Device Messaging (ADM) registration.
 */
export interface AdmRegistrationDescription extends RegistrationDescriptionCommon {
  /**
   * The Amazon Device Messaging registration identifier.
   */
  admRegistrationId: string;

  /**
   * The type of the registration.
   */
  platform: "Adm";
}

/**
 * Creates an ADM registration description.
 * @param description - A partial ADM registration description.
 * @returns A created ADM registration description.
 */
export function createAdmRegistrationDescription(
  description: Omit<AdmRegistrationDescription, "platform">
): AdmRegistrationDescription {
  return {
    ...description,
    platform: "Adm",
  };
}

/**
 * Represents the description of the Amazon Device Messaging (ADM) template registration.
 */
export interface AdmTemplateRegistrationDescription
  extends Omit<AdmRegistrationDescription, "platform">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  platform: "AdmTemplate";
}

/**
 * Creates an ADM template registration description.
 * @param description - A partial ADM template registration description.
 * @returns A created ADM template registration description.
 */
export function createAdmTemplateRegistrationDescription(
  description: Omit<AdmTemplateRegistrationDescription, "platform">
): AdmTemplateRegistrationDescription {
  return {
    ...description,
    platform: "AdmTemplate",
  };
}

/**
 * Represents the description of apple registration.
 */
export interface AppleRegistrationDescription extends RegistrationDescriptionCommon {
  /**
   * The APNs device token.
   */
  deviceToken: string;

  /**
   * The type of the registration.
   */
  platform: "Apple";
}

/**
 * Creates an Apple registration description.
 * @param description - A partial Apple registration description.
 * @returns A created Apple registration description.
 */
export function createAppleRegistrationDescription(
  description: Omit<AppleRegistrationDescription, "platform">
): AppleRegistrationDescription {
  return {
    ...description,
    platform: "Apple",
  };
}

/**
 * Represents the description of the Apple template registration.
 */
export interface AppleTemplateRegistrationDescription
  extends Omit<AppleRegistrationDescription, "platform">,
    TemplateRegistrationDescription {
  /**
   * The expiry date.
   */
  expiry?: Date;

  /**
   * The notification priority.
   */
  priority?: string;

  /**
   * The APNS headers.
   */
  apnsHeaders?: Record<string, string>;

  /**
   * The type of the registration.
   */
  platform: "AppleTemplate";
}

/**
 * Creates an Apple template registration description.
 * @param description - A partial Apple template registration description.
 * @returns A created Apple template registration description.
 */
export function createAppleTemplateRegistrationDescription(
  description: Omit<AppleTemplateRegistrationDescription, "platform">
): AppleTemplateRegistrationDescription {
  return {
    ...description,
    platform: "AppleTemplate",
  };
}

/**
 * Represents a Baidu registration description.
 */
export interface BaiduRegistrationDescription extends RegistrationDescriptionCommon {
  /**
   * The Baidu user identifier.
   */
  baiduUserId: string;

  /**
   * The Baidu channel identifier.
   */
  baiduChannelId: string;

  /**
   * The type of the registration.
   */
  platform: "Baidu";
}

/**
 * Creates a Baidu registration description.
 * @param description - A partial Baidu registration description.
 * @returns A created Baidu registration description.
 */
export function createBaiduRegistrationDescription(
  description: Omit<BaiduRegistrationDescription, "platform">
): BaiduRegistrationDescription {
  return {
    ...description,
    platform: "Baidu",
  };
}

/**
 * Represents a Baidu template registration description.
 */
export interface BaiduTemplateRegistrationDescription
  extends Omit<BaiduRegistrationDescription, "platform">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  platform: "BaiduTemplate";
}

/**
 * Creates a Baidu template registration description.
 * @param description - A partial Baidu template registration description.
 * @returns A created Baidu template registration description.
 */
export function createBaiduTemplateRegistrationDescription(
  description: Omit<BaiduTemplateRegistrationDescription, "platform">
): BaiduTemplateRegistrationDescription {
  return {
    ...description,
    platform: "BaiduTemplate",
  };
}

/**
 * Represents a Browser Push registration description.
 */
export interface BrowserRegistrationDescription extends RegistrationDescriptionCommon {
  /**
   * The Browser push endpoint.
   */
  endpoint: string;

  /**
   * The Browser push P256DH.
   */
  p256DH: string;

  /**
   * The Browser push auth secret.
   */
  auth: string;

  /**
   * The type of the registration.
   */
  platform: "Browser";
}

/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push registration description.
 * @returns A created Web Push registration description.
 */
export function createBrowserRegistrationDescription(
  description: Omit<BrowserRegistrationDescription, "platform">
): BrowserRegistrationDescription {
  return {
    ...description,
    platform: "Browser",
  };
}

/**
 * Represents a Browser Push remplate registration description.
 */
export interface BrowserTemplateRegistrationDescription
  extends Omit<BrowserRegistrationDescription, "platform">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  platform: "BrowserTemplate";
}

/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push template registration description.
 * @returns A created Web Push template registration description.
 */
export function createBrowserTemplateRegistrationDescription(
  description: Omit<BrowserTemplateRegistrationDescription, "platform">
): BrowserTemplateRegistrationDescription {
  return {
    ...description,
    platform: "BrowserTemplate",
  };
}

/**
 * Represents Notification Hub registration description for Google Cloud Messaging.
 * @deprecated Use FcmRegistrationDescription instead.
 */
export interface GcmRegistrationDescription extends RegistrationDescriptionCommon {
  /**
   * Registration id obtained from the Google Cloud Messaging service.
   */
  gcmRegistrationId: string;

  /**
   * The type of the registration.
   */
  platform: "Gcm";
}

/**
 * @deprecated Use createFcmRegistrationDescription instead.
 * Creates a GCM registration description.
 * @param description - A partial GCM registration description.
 * @returns A created GCM registration description.
 */
export function createGcmRegistrationDescription(
  description: Omit<GcmRegistrationDescription, "platform">
): GcmRegistrationDescription {
  return {
    ...description,
    platform: "Gcm",
  };
}

/**
 * @deprecated Use createFcmTemplateRegistrationDescription instead.
 * Represents Notification Hub template registration description for Google Cloud Messaging.
 * @deprecated Use FcmTemplateRegistrationDescription instead
 */
export interface GcmTemplateRegistrationDescription
  extends Omit<GcmRegistrationDescription, "platform">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  platform: "GcmTemplate";
}

/**
 * @deprecated Use createFcmTemplateRegistrationDescription instead.
 * Creates a GCM template registration description.
 * @param description - A partial GCM template registration description.
 * @returns A created GCM template registration description.
 */
export function createGcmTemplateRegistrationDescription(
  description: Omit<GcmTemplateRegistrationDescription, "platform">
): GcmTemplateRegistrationDescription {
  return {
    ...description,
    platform: "GcmTemplate",
  };
}

/**
 * Represents Notification Hub registration description for Firebase Legacy HTTP API.
 */
export interface FcmRegistrationDescription extends RegistrationDescriptionCommon {
  /**
   * Registration id obtained from the Google Cloud Messaging service.
   */
  fcmRegistrationId: string;

  /**
   * The type of the registration.
   */
  platform: "Fcm";
}

/**
 * Creates an FCM registration description.
 * @param description - A partial FCM registration description.
 * @returns A created FCM registration description.
 */
export function createFcmRegistrationDescription(
  description: Omit<FcmRegistrationDescription, "platform">
): FcmRegistrationDescription {
  return {
    ...description,
    platform: "Fcm",
  };
}

/**
 * Represents Notification Hub template registration description for Firebase Legacy HTTP API.
 */
export interface FcmTemplateRegistrationDescription
  extends Omit<FcmRegistrationDescription, "platform">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  platform: "FcmTemplate";
}

/**
 * Creates an FCM template registration description.
 * @param description - A partial FCM template registration description.
 * @returns A created FCM template registration description.
 */
export function createFcmTemplateRegistrationDescription(
  description: Omit<FcmTemplateRegistrationDescription, "platform">
): FcmTemplateRegistrationDescription {
  return {
    ...description,
    platform: "FcmTemplate",
  };
}

/**
 * Represents a Windows Phone Notification Services registration description.
 * @deprecated Windows Phone is no longer supported.
 */
export interface MpnsRegistrationDescription extends RegistrationDescriptionCommon {
  /**
   * The channel URI.
   */
  channelUri: string;

  /**
   * The type of the registration.
   */
  platform: "Mpns";
}

/**
 * @deprecated Windows Phone is no longer supported.
 * Creates an MPNS registration description.
 * @param description - A partial MPNS registration description.
 * @returns A created MPNS registration description.
 */
export function createMpnsRegistrationDescription(
  description: Omit<MpnsRegistrationDescription, "platform">
): MpnsRegistrationDescription {
  return {
    ...description,
    platform: "Mpns",
  };
}

/**
 * Represents a Windows Phone Notification Services template registration.
 * @deprecated Windows Phone is no longer supported.
 */
export interface MpnsTemplateRegistrationDescription
  extends Omit<MpnsRegistrationDescription, "platform">,
    TemplateRegistrationDescription {
  /**
   * The WNS headers.
   */
  mpnsHeaders?: Record<string, string>;

  /**
   * The type of the registration.
   */
  platform: "MpnsTemplate";
}

/**
 * @deprecated Windows Phone is no longer supported.
 * Creates an MPNS template registration description.
 * @param description - A partial MPNS template registration description.
 * @returns A created MPNS template registration description.
 */
export function createMpnsTemplateRegistrationDescription(
  description: Omit<MpnsTemplateRegistrationDescription, "platform">
): MpnsTemplateRegistrationDescription {
  return {
    ...description,
    platform: "MpnsTemplate",
  };
}

/**
 * Represents a Windows Notification Services (WNS) registration description.
 */
export interface WindowsRegistrationDescription extends RegistrationDescriptionCommon {
  /**
   * The channel URI.
   */
  channelUri: string;

  /**
   * The type of the registration.
   */
  platform: "Windows";
}

/**
 * Creates a Windows registration description.
 * @param description - A partial Windows registration description.
 * @returns A created Windows registration description.
 */
export function createWindowsRegistrationDescription(
  description: Omit<WindowsRegistrationDescription, "platform">
): WindowsRegistrationDescription {
  return {
    ...description,
    platform: "Windows",
  };
}

/**
 * Represents a Windows Notification Services (WNS) template registration.
 */
export interface WindowsTemplateRegistrationDescription
  extends Omit<WindowsRegistrationDescription, "platform">,
    TemplateRegistrationDescription {
  /**
   * The WNS headers.
   */
  wnsHeaders?: Record<string, string>;

  /**
   * The type of the registration.
   */
  platform: "WindowsTemplate";
}

/**
 * Creates a Windows template registration description.
 * @param description - A partial Windows template registration description.
 * @returns A created Windows template registration description.
 */
export function createWindowsTemplateRegistrationDescription(
  description: Omit<WindowsTemplateRegistrationDescription, "platform">
): WindowsTemplateRegistrationDescription {
  return {
    ...description,
    platform: "WindowsTemplate",
  };
}

/**
 * Describes the types of registration descriptions.
 */
export type RegistrationDescription =
  | AdmRegistrationDescription
  | AdmTemplateRegistrationDescription
  | AppleRegistrationDescription
  | AppleTemplateRegistrationDescription
  | BaiduRegistrationDescription
  | BaiduTemplateRegistrationDescription
  | BrowserRegistrationDescription
  | BrowserTemplateRegistrationDescription
  | GcmRegistrationDescription
  | GcmTemplateRegistrationDescription
  | FcmRegistrationDescription
  | FcmTemplateRegistrationDescription
  | MpnsRegistrationDescription
  | MpnsTemplateRegistrationDescription
  | WindowsRegistrationDescription
  | WindowsTemplateRegistrationDescription;

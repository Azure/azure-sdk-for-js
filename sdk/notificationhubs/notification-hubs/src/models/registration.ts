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
  etag?: string;

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
  type: RegistrationType;
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
  type: "Adm";
}

/**
 * Creates an ADM registration description.
 * @param description - A partial ADM registration description.
 * @returns A created ADM registration description.
 */
export function createAdmRegistrationDescription(
  description: Omit<AdmRegistrationDescription, "type">
): AdmRegistrationDescription {
  return {
    ...description,
    type: "Adm",
  };
}

/**
 * Represents the description of the Amazon Device Messaging (ADM) template registration.
 */
export interface AdmTemplateRegistrationDescription
  extends Omit<AdmRegistrationDescription, "type">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  type: "AdmTemplate";
}

/**
 * Creates an ADM template registration description.
 * @param description - A partial ADM template registration description.
 * @returns A created ADM template registration description.
 */
export function createAdmTemplateRegistrationDescription(
  description: Omit<AdmTemplateRegistrationDescription, "type">
): AdmTemplateRegistrationDescription {
  return {
    ...description,
    type: "AdmTemplate",
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
  type: "Apple";
}

/**
 * Creates an Apple registration description.
 * @param description - A partial Apple registration description.
 * @returns A created Apple registration description.
 */
export function createAppleRegistrationDescription(
  description: Omit<AppleRegistrationDescription, "type">
): AppleRegistrationDescription {
  return {
    ...description,
    type: "Apple",
  };
}

/**
 * The priority of the Apple push notification.
 */
export type ApplePriority = "10" | "5";

/**
 * Represents the description of the Apple template registration.
 */
export interface AppleTemplateRegistrationDescription
  extends Omit<AppleRegistrationDescription, "type">,
    TemplateRegistrationDescription {
  /**
   * The expiry date.
   */
  expiry?: Date;

  /**
   * The notification priority.
   */
  priority?: ApplePriority;

  /**
   * The APNS headers.
   */
  apnsHeaders?: Record<string, string>;

  /**
   * The type of the registration.
   */
  type: "AppleTemplate";
}

/**
 * Creates an Apple template registration description.
 * @param description - A partial Apple template registration description.
 * @returns A created Apple template registration description.
 */
export function createAppleTemplateRegistrationDescription(
  description: Omit<AppleTemplateRegistrationDescription, "type">
): AppleTemplateRegistrationDescription {
  return {
    ...description,
    type: "AppleTemplate",
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
  type: "Baidu";
}

/**
 * Creates a Baidu registration description.
 * @param description - A partial Baidu registration description.
 * @returns A created Baidu registration description.
 */
export function createBaiduRegistrationDescription(
  description: Omit<BaiduRegistrationDescription, "type">
): BaiduRegistrationDescription {
  return {
    ...description,
    type: "Baidu",
  };
}

/**
 * Represents a Baidu template registration description.
 */
export interface BaiduTemplateRegistrationDescription
  extends Omit<BaiduRegistrationDescription, "type">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  type: "BaiduTemplate";
}

/**
 * Creates a Baidu template registration description.
 * @param description - A partial Baidu template registration description.
 * @returns A created Baidu template registration description.
 */
export function createBaiduTemplateRegistrationDescription(
  description: Omit<BaiduTemplateRegistrationDescription, "type">
): BaiduTemplateRegistrationDescription {
  return {
    ...description,
    type: "BaiduTemplate",
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
  p256dh: string;

  /**
   * The Browser push auth secret.
   */
  auth: string;

  /**
   * The type of the registration.
   */
  type: "Browser";
}

/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push registration description.
 * @returns A created Web Push registration description.
 */
export function createBrowserRegistrationDescription(
  description: Omit<BrowserRegistrationDescription, "type">
): BrowserRegistrationDescription {
  return {
    ...description,
    type: "Browser",
  };
}

/**
 * Represents a Browser Push remplate registration description.
 */
export interface BrowserTemplateRegistrationDescription
  extends Omit<BrowserRegistrationDescription, "type">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  type: "BrowserTemplate";
}

/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push template registration description.
 * @returns A created Web Push template registration description.
 */
export function createBrowserTemplateRegistrationDescription(
  description: Omit<BrowserTemplateRegistrationDescription, "type">
): BrowserTemplateRegistrationDescription {
  return {
    ...description,
    type: "BrowserTemplate",
  };
}

/**
 * Represents Notification Hub registration description for Google Cloud Messaging.
 */
export interface GcmRegistrationDescription extends RegistrationDescriptionCommon {
  /**
   * Registration id obtained from the Google Cloud Messaging service.
   */
  gcmRegistrationId: string;

  /**
   * The type of the registration.
   */
  type: "Gcm";
}

/**
 * Creates a Firebase Legacy registration description.
 * @param description - A partial GCM registration description.
 * @returns A created GCM registration description.
 */
export function createFcmLegacyRegistrationDescription(
  description: Omit<GcmRegistrationDescription, "type">
): GcmRegistrationDescription {
  return {
    ...description,
    type: "Gcm",
  };
}

/**
 * Represents Notification Hub template registration description for Firebase Legacy Cloud Messaging.
 */
export interface GcmTemplateRegistrationDescription
  extends Omit<GcmRegistrationDescription, "type">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  type: "GcmTemplate";
}

/**
 * Creates a GCM template registration description.
 * @param description - A partial GCM template registration description.
 * @returns A created GCM template registration description.
 */
export function createFcmLegacyTemplateRegistrationDescription(
  description: Omit<GcmTemplateRegistrationDescription, "type">
): GcmTemplateRegistrationDescription {
  return {
    ...description,
    type: "GcmTemplate",
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
  type: "Mpns";
}

/**
 * Represents a Windows Phone Notification Services template registration.
 * @deprecated Windows Phone is no longer supported.
 */
export interface MpnsTemplateRegistrationDescription
  extends Omit<MpnsRegistrationDescription, "type">,
    TemplateRegistrationDescription {
  /**
   * The WNS headers.
   */
  mpnsHeaders?: Record<string, string>;

  /**
   * The type of the registration.
   */
  type: "MpnsTemplate";
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
  type: "Windows";
}

/**
 * Creates a Windows registration description.
 * @param description - A partial Windows registration description.
 * @returns A created Windows registration description.
 */
export function createWindowsRegistrationDescription(
  description: Omit<WindowsRegistrationDescription, "type">
): WindowsRegistrationDescription {
  return {
    ...description,
    type: "Windows",
  };
}

/**
 * Represents a Windows Notification Services (WNS) template registration.
 */
export interface WindowsTemplateRegistrationDescription
  extends Omit<WindowsRegistrationDescription, "type">,
    TemplateRegistrationDescription {
  /**
   * The WNS headers.
   */
  wnsHeaders?: Record<string, string>;

  /**
   * The type of the registration.
   */
  type: "WindowsTemplate";
}

/**
 * Creates a Windows template registration description.
 * @param description - A partial Windows template registration description.
 * @returns A created Windows template registration description.
 */
export function createWindowsTemplateRegistrationDescription(
  description: Omit<WindowsTemplateRegistrationDescription, "type">
): WindowsTemplateRegistrationDescription {
  return {
    ...description,
    type: "WindowsTemplate",
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
  | MpnsRegistrationDescription
  | MpnsTemplateRegistrationDescription
  | WindowsRegistrationDescription
  | WindowsTemplateRegistrationDescription;

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents the types of registration descriptions.
 */
export type RegistrationType =
  "adm" |
  "admTemplate" |
  "apple" |
  "appleTemplate" |
  "baidu" |
  "baiduTemplate" |
  "browser" |
  "browserTemplate" |
  "gcm" |
  "gcmTemplate" |
  "fcm" |
  "fcmTemplate" |
  "mpns" |
  "mpnsTemplate" |
  "windows" |
  "windowsTemplate";

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
  platform: "adm";
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
  platform: "admTemplate";
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
  platform: "apple";
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
  platform: "appleTemplate";
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
  platform: "baidu";
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
  platform: "baiduTemplate";
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
  platform: "browser";
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
  platform: "browserTemplate";
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
  platform: "gcm";
}

/**
 * Represents Notification Hub template registration description for Google Cloud Messaging.
 * @deprecated Use FcmTemplateRegistrationDescription instead
 */
export interface GcmTemplateRegistrationDescription
  extends Omit<GcmRegistrationDescription, "platform">,
    TemplateRegistrationDescription {
  /**
   * The type of the registration.
   */
  platform: "gcmTemplate";
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
  platform: "fcm";
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
  platform: "fcmTemplate";
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
  platform: "mpns";
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
  platform: "mpnsTemplate";
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
  platform: "windows";
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
  platform: "windowsTemplate";
}

/**
 * Describes the types of registration descriptions.
 */
export type RegistrationDescription = 
  AdmRegistrationDescription |
  AdmTemplateRegistrationDescription |
  AppleRegistrationDescription |
  AppleTemplateRegistrationDescription |
  BaiduRegistrationDescription |
  BaiduTemplateRegistrationDescription |
  BrowserRegistrationDescription |
  BrowserTemplateRegistrationDescription |
  GcmRegistrationDescription |
  GcmTemplateRegistrationDescription |
  FcmRegistrationDescription |
  FcmTemplateRegistrationDescription |
  MpnsRegistrationDescription |
  MpnsTemplateRegistrationDescription |
  WindowsRegistrationDescription |
  WindowsTemplateRegistrationDescription;

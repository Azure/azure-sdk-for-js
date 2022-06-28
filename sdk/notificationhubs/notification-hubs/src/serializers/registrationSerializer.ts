// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents a registration description.
 */
export interface RegistrationDescription {
  /**
   * The registration ID.
   */
  registrationId: string;

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
  templateName: string;
}

/**
 * Represents the description of the Amazon Device Messaging (ADM) registration.
 */
export interface ADMRegistrationDescription extends RegistrationDescription {
  /**
   * The Amazon Device Messaging registration identifier.
   */
  admRegistrationId: string;
}

export interface ADMTemplateRegistrationDescription
  extends ADMRegistrationDescription,
    TemplateRegistrationDescription {}

/**
 * Represents the description of apple registration.
 */
export interface AppleRegistrationDescription extends RegistrationDescription {
  /**
   * The APNs device token.
   */
  deviceToken: string;
}

/**
 * Represents the description of the Apple template registration.
 */
export interface AppleTemplateRegistrationDescription
  extends AppleRegistrationDescription,
    TemplateRegistrationDescription {
  /**
   * The expiry date.
   */
  expiryDate?: string;

  /**
   * The notification priority.
   */
  priority?: string;

  /**
   * The APNS headers.
   */
  apnsHeaders?: Record<string, string>;
}

/**
 * Represents a Baidu registration description.
 */
export interface BaiduRegistrationDescription extends RegistrationDescription {
  /**
   * The Baidu user identifier.
   */
  baiduUserId: string;

  /**
   * The Baidu channel identifier.
   */
  baiduChannelId: string;
}

/**
 * Represents a Baidu template registration description.
 */
export interface BaiduTemplateRegistrationDescription
  extends BaiduRegistrationDescription,
    TemplateRegistrationDescription {}

/**
 * Represents a Browser Push registration description.
 */
export interface BrowserRegistrationDescription extends RegistrationDescription {
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
}

/**
 * Represents a Browser Push remplate registration description.
 */
export interface BrowserTemplateRegistrationDescription
  extends BrowserRegistrationDescription,
    TemplateRegistrationDescription {}

/**
 * Represents Notification Hub registration description for Firebase Legacy HTTP API.
 */
export interface FirebaseLegacyRegistrationDescription extends RegistrationDescription {
  /**
   * Registration id obtained from the Google Cloud Messaging service.
   */
  fcmLegacyRegistrationId: string;
}

/**
 * Represents Notification Hub template registration description for Firebase Legacy HTTP API.
 */
export interface FirebaseLegacyTemplateRegistrationDescription
  extends FirebaseLegacyRegistrationDescription,
    TemplateRegistrationDescription {}

/**
 * Represents a Windows Notification Services (WNS) registration description.
 */
export interface WindowsRegistrationDescription {
  /**
   * The channel URI.
   */
  channelUri: URL;
}

/**
 * Represents a Windows Notification Services (WNS) template registration.
 */
export interface WindowsTemplateRegistrationDescription
  extends WindowsRegistrationDescription,
    TemplateRegistrationDescription {
  /**
   * The WNS headers.
   */
  wnsHeaders?: string[];
}

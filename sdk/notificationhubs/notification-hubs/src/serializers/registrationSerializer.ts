// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { 
  getDateOrUndefined, 
  getString, 
  getStringOrUndefined, 
  getTagsOrUndefined, 
  isDefined,
} from "../utils/xmlUtils";

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
  templateName?: string;
}

/**
 * Represents the description of the Amazon Device Messaging (ADM) registration.
 */
export interface AdmRegistrationDescription extends RegistrationDescription {
  /**
   * The Amazon Device Messaging registration identifier.
   */
  admRegistrationId: string;
}

export interface AdmTemplateRegistrationDescription
  extends AdmRegistrationDescription,
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
  expiry?: Date;

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
  wnsHeaders?: Record<string, string>;
}

function getHeadersOrUndefined(value?: { Header: string, Value: string }[]): Record<string, string> | undefined {
  if (!isDefined(value)) {
    return undefined;
  }

  const headerObj: Record<string, string> = {};
  for (const { Header, Value } of value) {
    headerObj[Header] = Value;
  }

  return headerObj;
}

function createRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): RegistrationDescription {
  let pushVariables: Record<string, string> | undefined;
  const unparsed = getStringOrUndefined(rawRegistrationDescription["PushVariables"])
  if (unparsed) {
    pushVariables = JSON.parse(unparsed) as Record<string, string>;
  }

  return {
    registrationId: getString(rawRegistrationDescription["RegistrationId"], "registrationId"),
    expirationTime: getDateOrUndefined(rawRegistrationDescription["ExpirationTime"]),
    eTag: getStringOrUndefined(rawRegistrationDescription["ETag"]),
    tags: getTagsOrUndefined(rawRegistrationDescription["Tags"]),
    pushVariables: pushVariables,
  };
}

function createTemplateRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): TemplateRegistrationDescription {
  return {
    bodyTemplate: getString(rawRegistrationDescription["BodyTemplate"], "bodyTemplate"),
    templateName: getStringOrUndefined(rawRegistrationDescription["TemplateName"]),
    ...createRegistrationDescription(rawRegistrationDescription)
  };
}

/**
 * @internal
 * Creates an ADM registration description from incoming XML property bag.
 */
export function createAdmRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): AdmRegistrationDescription {
  return {
    admRegistrationId: getString(rawRegistrationDescription["AdmRegistrationId"], "admRegistrationId"),
    ...createRegistrationDescription(rawRegistrationDescription),
  };
}

/**
 * @internal
 * Creates an ADM template registration description from incoming XML property bag.
 */
export function createAdmTemplateRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): AdmTemplateRegistrationDescription {
  return {
    ...createAdmRegistrationDescription(rawRegistrationDescription),
    ...createTemplateRegistrationDescription(rawRegistrationDescription),
  }
}

/**
 * @internal
 * Creates an Apple registration description from incoming XML property bag.
 */
export function createAppleRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): AppleRegistrationDescription {
  return {
    deviceToken: getString(rawRegistrationDescription["DeviceToken"], "deviceToken"),
    ...createRegistrationDescription(rawRegistrationDescription),
  };
}

/**
 * @internal
 * Creates an Apple template registration description from incoming XML property bag.
 */
export function createAppleTemplateRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): AppleTemplateRegistrationDescription {
  return {
    priority: getStringOrUndefined(rawRegistrationDescription["Priority"]),
    apnsHeaders: getHeadersOrUndefined(rawRegistrationDescription["ApnsHeaders"]?.["ApnsHeader"]),
    ...createAppleRegistrationDescription(rawRegistrationDescription),
    ...createTemplateRegistrationDescription(rawRegistrationDescription),
  }
}

/**
 * @internal
 * Creates a Baidu registration description from incoming XML property bag.
 */
export function createBaiduRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): BaiduRegistrationDescription {
  return {
    baiduChannelId: getString(rawRegistrationDescription["BaiduChannelId"], "baiduChannelId"),
    baiduUserId: getString(rawRegistrationDescription["BaiduUserId"], "baiduUserId"),
    ...createRegistrationDescription(rawRegistrationDescription),
  };
}

/**
 * @internal
 * Creates a Baidu template registration description from incoming XML property bag.
 */
export function createBaiduTemplateRegistration(
  rawRegistrationDescription: Record<string, any>
): BaiduTemplateRegistrationDescription {
  return {
    ...createBaiduRegistrationDescription(rawRegistrationDescription),
    ...createTemplateRegistrationDescription(rawRegistrationDescription),
  }
}

/**
 * @internal
 * Creates an FCM registration description from incoming XML property bag.
 */
export function createFirebaseLegacyRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): FirebaseLegacyRegistrationDescription {
  return {
    fcmLegacyRegistrationId: getString(rawRegistrationDescription["GcmRegistrationId"], "fcmLegacyRegistrationId"),
    ...createRegistrationDescription(rawRegistrationDescription),
  }
}

/**
 * @internal
 * Creates an FCM template registration description from incoming XML property bag.
 */
export function createFirebaseLegacyTemplateRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): FirebaseLegacyTemplateRegistrationDescription {
  return {
    ...createFirebaseLegacyRegistrationDescription(rawRegistrationDescription),
    ...createTemplateRegistrationDescription(rawRegistrationDescription),
  };
}

/**
 * @internal
 * Creates a Windows registration description from incoming XML property bag.
 */
export function createWindowsRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): WindowsRegistrationDescription {
  return {
    channelUri: new URL(getString(rawRegistrationDescription["ChannelUri"], "channelUri")),
    ...createRegistrationDescription(rawRegistrationDescription),
  };
}

/**
 * @internal
 * Creates a Windows template registration description from incoming XML property bag.
 */
export function createWindowsTemplateRegistrationDescription(
  rawRegistrationDescription: Record<string, any>
): WindowsTemplateRegistrationDescription {
  return {
    wnsHeaders: getHeadersOrUndefined(rawRegistrationDescription["WnsHeaders"]?.["WnsHeader"]),
    ...createWindowsRegistrationDescription(rawRegistrationDescription),
    ...createTemplateRegistrationDescription(rawRegistrationDescription),
  }
}

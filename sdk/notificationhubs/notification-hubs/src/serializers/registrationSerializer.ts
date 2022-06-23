// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";
import { parseXML } from "@azure/core-xml";
import { 
  getDateOrUndefined, 
  getString, 
  getStringOrUndefined, 
  getTagsOrUndefined, 
  isDefined,
} from "../utils/xmlUtils";

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

/**
 * Represents a registration description parser from the incoming XML.
 */
export interface RegistrationDescriptionParser {
  /**
   * @internal
   * Creates a registration type from the incoming entry.
   */
  parseRegistrationEntry: (bodyText: string) => Promise<RegistrationDescription>;
  /**
   * @internal
   * Creates a list of registrations from an incoming ATOM XML Feed.
   */  
  parseRegistrationFeed: (bodyText: string) => Promise<RegistrationDescription[]>;
  /**
   * @internal
   * Creates an Amazon Device Messaging (ADM) registration description from the incoming parsed XML.
   */
  createAdmRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AdmRegistrationDescription;
  /**
   * @internal
   * Creates an Amazon Device Messaging (ADM) template registration description from the incoming parsed XML.
   */
  createAdmTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AdmTemplateRegistrationDescription;
  /**
   * @internal
   * Creates an Apple Platform Notification Services (APNs) registration description from the incoming parsed XML.
   */
  createAppleRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AppleRegistrationDescription;
  /**
   * @internal
   * Creates an Apple Platform Notification Services (APNs) template registration description from the incoming parsed XML.
   */
  createAppleTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AppleTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Baidu registration description from the incoming parsed XML.
   */
  createBaiduRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BaiduRegistrationDescription;
  /**
   * @internal
   * Creates a Baidu template registration description from the incoming parsed XML.
   */
  createBaiduTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BaiduTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Web Push registration description from the incoming parsed XML.
   */
  createBrowserRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BrowserRegistrationDescription;
  /**
   * @internal
   * Creates a Web Push template registration description from the incoming parsed XML.
   */
  createBrowserTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BrowserTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Google Cloud Messaging (GCM) registration description from the incoming parsed XML.
   */
  createGcmRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => GcmRegistrationDescription;
  /**
   * @internal
   * Creates a Google Cloud Messaging (GCM) template registration description from the incoming parsed XML.
   */
  createGcmTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => GcmTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Firebase Cloud Messaging (GCM) registration description from the incoming parsed XML.
   */
  createFcmRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => FcmRegistrationDescription;
  /**
   * @internal
   * Creates a Firebase Cloud Messaging (GCM) template registration description from the incoming parsed XML.
   */
  createFcmTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => FcmTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Microsoft Phone Notification Services (MPNS) registration description from the incoming parsed XML.
   */
  createMpnsRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => MpnsRegistrationDescription;
  /**
   * @internal
   * Creates a Microsoft Phone Notification Services (MPNS) template registration description from the incoming parsed XML.
   */
  createMpnsTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => MpnsTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Windows Notification Services (WNS) registration description from the incoming parsed XML.
   */
  createWindowsRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => WindowsRegistrationDescription;
  /**
   * @internal
   * Creates a Windows Notification Services (WNS) template registration description from the incoming parsed XML.
   */
  createWindowsTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => WindowsTemplateRegistrationDescription;
}

export const registrationDescriptionParser: RegistrationDescriptionParser = {
  /**
   * @internal
   * Creates a registration type from the incoming entry.
   */
  async parseRegistrationEntry(bodyText: string): Promise<RegistrationDescription> {
    const xml = await parseXML(bodyText, { includeRoot: true });
    const keyName = Object.keys(xml.entry.content)[0];
    const content = xml.entry.content[keyName];
    const methodName = `create${keyName}`;

    const method = this[methodName as keyof RegistrationDescriptionParser] as any;
    if (!methodName) {
      throw new RestError(`${keyName} is not a supported registration type`, { statusCode: 500 });
    }

    return method.call(this, content) as RegistrationDescription;
  },

  /**
   * @internal
   * Creates a list of registrations from an incoming ATOM XML Feed.
   */
  async parseRegistrationFeed(bodyText: string): Promise<RegistrationDescription[]> {
    const xml = await parseXML(bodyText, { includeRoot: true });
    const results = [];
    for (const entry of xml.feed.entry) {
      delete entry.content["$"];
      
      const keyName = Object.keys(entry.content)[0];
      const methodName = `create${keyName}`;
      const content = entry.content[keyName];
      const method = this[methodName as keyof RegistrationDescriptionParser] as any;
      if (!methodName) {
        throw new RestError(`${keyName} is not a supported registration type`, { statusCode: 500 });
      }

      results.push(method.call(this, content) as RegistrationDescription);
    }

    return results;
  },

  /**
   * @internal
   * Creates an ADM registration description from incoming XML property bag.
   */
  createAdmRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): AdmRegistrationDescription {
    return {
      admRegistrationId: getString(rawRegistrationDescription["AdmRegistrationId"], "admRegistrationId"),
      ...createRegistrationDescription(rawRegistrationDescription),
      platform: "adm",
    };
  },

  /**
   * @internal
   * Creates an ADM template registration description from incoming XML property bag.
   */
  createAdmTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): AdmTemplateRegistrationDescription {
    return {
      ...this.createAdmRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      platform: "admTemplate",
    }
  },

  /**
   * @internal
   * Creates an Apple registration description from incoming XML property bag.
   */
  createAppleRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): AppleRegistrationDescription {
    return {
      deviceToken: getString(rawRegistrationDescription["DeviceToken"], "deviceToken"),
      ...createRegistrationDescription(rawRegistrationDescription),
      platform: "apple",
    };
  },

  /**
   * @internal
   * Creates an Apple template registration description from incoming XML property bag.
   */
  createAppleTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): AppleTemplateRegistrationDescription {
    return {
      priority: getStringOrUndefined(rawRegistrationDescription["Priority"]),
      apnsHeaders: getHeadersOrUndefined(rawRegistrationDescription["ApnsHeaders"]?.["ApnsHeader"]),
      ...this.createAppleRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      platform: "appleTemplate",
    }
  },

/**
 * @internal
 * Creates a Baidu registration description from incoming XML property bag.
 */
  createBaiduRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): BaiduRegistrationDescription {
    return {
      baiduChannelId: getString(rawRegistrationDescription["BaiduChannelId"], "baiduChannelId"),
      baiduUserId: getString(rawRegistrationDescription["BaiduUserId"], "baiduUserId"),
      ...createRegistrationDescription(rawRegistrationDescription),
      platform: "baidu",
    };
  },

  /**
   * @internal
   * Creates a Baidu template registration description from incoming XML property bag.
   */
  createBaiduTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): BaiduTemplateRegistrationDescription {
    return {
      ...this.createBaiduRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      platform: "baiduTemplate",
    };
  },

  /**
   * @internal
   * Creates a Browser registration description from incoming XML property bag.
   */
  createBrowserRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): BrowserRegistrationDescription {
    return {
      endpoint: getString(rawRegistrationDescription["Endpoint"], "endpoint"),
      p256DH: getString(rawRegistrationDescription["P256DH"], "p256DH"),
      auth: getString(rawRegistrationDescription["Auth"], "auth"),
      ...createRegistrationDescription(rawRegistrationDescription),
      platform: "browser",
    }
  },

  /**
   * @internal
   * Creates a Browser template registration description from incoming XML property bag.
   */
  createBrowserTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): BrowserTemplateRegistrationDescription {
    return {
      ...this.createBrowserRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      platform: "browserTemplate",
    };
  },

/**
 * @internal
 * Creates an GCM registration description from incoming XML property bag.
 */
  createGcmRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): GcmRegistrationDescription {
    return {
      gcmRegistrationId: getString(rawRegistrationDescription["GcmRegistrationId"], "gcmRegistrationId"),
      ...createRegistrationDescription(rawRegistrationDescription),
      platform: "gcm",
    }
  },

  /**
   * @internal
   * Creates an FCM template registration description from incoming XML property bag.
   */
  createGcmTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): GcmTemplateRegistrationDescription {
    return {
      ...this.createGcmRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      platform: "gcmTemplate",
    };
  },

/**
 * @internal
 * Creates an FCM registration description from incoming XML property bag.
 */
  createFcmRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): FcmRegistrationDescription {
    return {
      fcmRegistrationId: getString(rawRegistrationDescription["FcmRegistrationId"], "fcmRegistrationId"),
      ...createRegistrationDescription(rawRegistrationDescription),
      platform: "fcm",
    }
  },

  /**
   * @internal
   * Creates an FCM template registration description from incoming XML property bag.
   */
  createFcmTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): FcmTemplateRegistrationDescription {
    return {
      ...this.createFcmRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      platform: "fcmTemplate",
    };
  },

  /**
   * @internal
   * Creates a Windows Phone registration description from incoming XML property bag.
   */
  createMpnsRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): MpnsRegistrationDescription {
    return {
      channelUri: getString(rawRegistrationDescription["ChannelUri"], "channelUri"),
      ...createRegistrationDescription(rawRegistrationDescription),
      platform: "mpns",
    };
  },

  /**
   * @internal
   * Creates a Windows Phone template registration description from incoming XML property bag.
   */
  createMpnsTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): MpnsTemplateRegistrationDescription {
    return {
      mpnsHeaders: getHeadersOrUndefined(rawRegistrationDescription["MpnsHeaders"]?.["MpnsHeader"]),
      ...this.createWindowsRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      platform: "mpnsTemplate",
    }
  },

  /**
   * @internal
   * Creates a Windows registration description from incoming XML property bag.
   */
  createWindowsRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): WindowsRegistrationDescription {
    return {
      channelUri: getString(rawRegistrationDescription["ChannelUri"], "channelUri"),
      ...createRegistrationDescription(rawRegistrationDescription),
      platform: "windows",
    };
  },

  /**
   * @internal
   * Creates a Windows template registration description from incoming XML property bag.
   */
  createWindowsTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>
  ): WindowsTemplateRegistrationDescription {
    return {
      wnsHeaders: getHeadersOrUndefined(rawRegistrationDescription["WnsHeaders"]?.["WnsHeader"]),
      ...this.createWindowsRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      platform: "windowsTemplate",
    }
  }
};

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
): Omit<RegistrationDescriptionCommon, "platform"> {
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

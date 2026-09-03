// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AdmRegistrationDescription,
  AdmTemplateRegistrationDescription,
  AppleRegistrationDescription,
  AppleTemplateRegistrationDescription,
  BaiduRegistrationDescription,
  BaiduTemplateRegistrationDescription,
  BrowserRegistrationDescription,
  BrowserTemplateRegistrationDescription,
  GcmRegistrationDescription,
  GcmTemplateRegistrationDescription,
  FcmV1RegistrationDescription,
  FcmV1TemplateRegistrationDescription,
  MpnsRegistrationDescription,
  MpnsTemplateRegistrationDescription,
  RegistrationDescription,
  RegistrationDescriptionCommon,
  TemplateRegistrationDescription,
  XiaomiRegistrationDescription,
  XiaomiTemplateRegistrationDescription,
  WindowsRegistrationDescription,
  WindowsTemplateRegistrationDescription,
} from "../models/registration.js";
import {
  getDateOrUndefined,
  getString,
  getStringOrUndefined,
  getTagsOrUndefined,
  isDefined,
} from "../utils/utils.js";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { RestError } from "@azure/core-rest-pipeline";
import { serializeToAtomXmlRequest } from "../utils/xmlUtils.js";

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
  createAdmRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => AdmRegistrationDescription;
  /**
   * @internal
   * Creates an Amazon Device Messaging (ADM) template registration description from the incoming parsed XML.
   */
  createAdmTemplateRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => AdmTemplateRegistrationDescription;
  /**
   * @internal
   * Creates an Apple Platform Notification Services (APNs) registration description from the incoming parsed XML.
   */
  createAppleRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => AppleRegistrationDescription;
  /**
   * @internal
   * Creates an Apple Platform Notification Services (APNs) template registration description from the incoming parsed XML.
   */
  createAppleTemplateRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => AppleTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Baidu registration description from the incoming parsed XML.
   */
  createBaiduRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => BaiduRegistrationDescription;
  /**
   * @internal
   * Creates a Baidu template registration description from the incoming parsed XML.
   */
  createBaiduTemplateRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => BaiduTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Web Push registration description from the incoming parsed XML.
   */
  createBrowserRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => BrowserRegistrationDescription;
  /**
   * @internal
   * Creates a Web Push template registration description from the incoming parsed XML.
   */
  createBrowserTemplateRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => BrowserTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Firebase V1 Cloud Messaging (FCM) registration description from the incoming parsed XML.
   */
  createFcmV1RegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => FcmV1RegistrationDescription;
  /**
   * @internal
   * Creates a Firebase V1 Cloud Messaging (FCM) template registration description from the incoming parsed XML.
   */
  createFcmV1TemplateRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => FcmV1TemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Google Cloud Messaging (GCM) registration description from the incoming parsed XML.
   */
  createGcmRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => GcmRegistrationDescription;
  /**
   * @internal
   * Creates a Google Cloud Messaging (GCM) template registration description from the incoming parsed XML.
   */
  createGcmTemplateRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => GcmTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Microsoft Phone Notification Services (MPNS) registration description from the incoming parsed XML.
   */
  createMpnsRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => MpnsRegistrationDescription;
  /**
   * @internal
   * Creates a Microsoft Phone Notification Services (MPNS) template registration description from the incoming parsed XML.
   */
  createMpnsTemplateRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => MpnsTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Xiaomi registration description from the incoming parsed XML.
   */
  createXiaomiRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => XiaomiRegistrationDescription;
  /**
   * @internal
   * Creates a Xiaomi template registration description from the incoming parsed XML.
   */
  createXiaomiTemplateRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => XiaomiTemplateRegistrationDescription;
  /**
   * @internal
   * Creates a Windows Notification Services (WNS) registration description from the incoming parsed XML.
   */
  createWindowsRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => WindowsRegistrationDescription;
  /**
   * @internal
   * Creates a Windows Notification Services (WNS) template registration description from the incoming parsed XML.
   */
  createWindowsTemplateRegistrationDescription: (
    rawRegistrationDescription: Record<string, any>,
  ) => WindowsTemplateRegistrationDescription;
}

export const registrationDescriptionParser: RegistrationDescriptionParser = {
  /**
   * @internal
   * Creates a registration type from the incoming entry.
   */
  async parseRegistrationEntry(bodyText: string): Promise<RegistrationDescription> {
    const xml = await parseXML(bodyText, { includeRoot: true });
    delete xml.entry.content["$"];
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
    const results: RegistrationDescription[] = [];
    if (!isDefined(xml.feed.entry)) {
      return results;
    }

    const entries = Array.isArray(xml.feed.entry) ? xml.feed.entry : [xml.feed.entry];

    for (const entry of entries) {
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
    rawRegistrationDescription: Record<string, any>,
  ): AdmRegistrationDescription {
    return {
      admRegistrationId: getString(
        rawRegistrationDescription["AdmRegistrationId"],
        "admRegistrationId",
      ).trim(),
      ...createRegistrationDescription(rawRegistrationDescription),
      kind: "Adm",
    };
  },

  /**
   * @internal
   * Creates an ADM template registration description from incoming XML property bag.
   */
  createAdmTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): AdmTemplateRegistrationDescription {
    return {
      ...this.createAdmRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      kind: "AdmTemplate",
    };
  },

  /**
   * @internal
   * Creates an Apple registration description from incoming XML property bag.
   */
  createAppleRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): AppleRegistrationDescription {
    return {
      deviceToken: getString(rawRegistrationDescription["DeviceToken"], "deviceToken").trim(),
      ...createRegistrationDescription(rawRegistrationDescription),
      kind: "Apple",
    };
  },

  /**
   * @internal
   * Creates an Apple template registration description from incoming XML property bag.
   */
  createAppleTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): AppleTemplateRegistrationDescription {
    return {
      priority: getStringOrUndefined(rawRegistrationDescription["Priority"])?.trim() as "10" | "5",
      apnsHeaders: getHeadersOrUndefined(rawRegistrationDescription["ApnsHeaders"]?.["ApnsHeader"]),
      ...this.createAppleRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      kind: "AppleTemplate",
    };
  },

  /**
   * @internal
   * Creates a Baidu registration description from incoming XML property bag.
   */
  createBaiduRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): BaiduRegistrationDescription {
    return {
      baiduChannelId: getString(
        rawRegistrationDescription["BaiduChannelId"],
        "baiduChannelId",
      ).trim(),
      baiduUserId: getString(rawRegistrationDescription["BaiduUserId"], "baiduUserId").trim(),
      ...createRegistrationDescription(rawRegistrationDescription),
      kind: "Baidu",
    };
  },

  /**
   * @internal
   * Creates a Baidu template registration description from incoming XML property bag.
   */
  createBaiduTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): BaiduTemplateRegistrationDescription {
    return {
      ...this.createBaiduRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      kind: "BaiduTemplate",
    };
  },

  /**
   * @internal
   * Creates a Browser registration description from incoming XML property bag.
   */
  createBrowserRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): BrowserRegistrationDescription {
    return {
      endpoint: getString(rawRegistrationDescription["Endpoint"], "endpoint").trim(),
      p256dh: getString(rawRegistrationDescription["P256DH"], "p256dh").trim(),
      auth: getString(rawRegistrationDescription["Auth"], "auth").trim(),
      ...createRegistrationDescription(rawRegistrationDescription),
      kind: "Browser",
    };
  },

  /**
   * @internal
   * Creates a Browser template registration description from incoming XML property bag.
   */
  createBrowserTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): BrowserTemplateRegistrationDescription {
    return {
      ...this.createBrowserRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      kind: "BrowserTemplate",
    };
  },
  /**
   * @internal
   * Creates an GCM registration description from incoming XML property bag.
   */
  createFcmV1RegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): FcmV1RegistrationDescription {
    return {
      fcmV1RegistrationId: getString(
        rawRegistrationDescription["FcmV1RegistrationId"],
        "fcmV1RegistrationId",
      ).trim(),
      ...createRegistrationDescription(rawRegistrationDescription),
      kind: "FcmV1",
    };
  },

  /**
   * @internal
   * Creates an FCM template registration description from incoming XML property bag.
   */
  createFcmV1TemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): FcmV1TemplateRegistrationDescription {
    return {
      ...this.createFcmV1RegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      kind: "FcmV1Template",
    };
  },

  /**
   * @internal
   * Creates an GCM registration description from incoming XML property bag.
   */
  createGcmRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): GcmRegistrationDescription {
    return {
      gcmRegistrationId: getString(
        rawRegistrationDescription["GcmRegistrationId"],
        "gcmRegistrationId",
      ).trim(),
      ...createRegistrationDescription(rawRegistrationDescription),
      kind: "Gcm",
    };
  },

  /**
   * @internal
   * Creates an FCM template registration description from incoming XML property bag.
   */
  createGcmTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): GcmTemplateRegistrationDescription {
    return {
      ...this.createGcmRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      kind: "GcmTemplate",
    };
  },

  /**
   * @internal
   * Creates a Windows Phone registration description from incoming XML property bag.
   */
  createMpnsRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): MpnsRegistrationDescription {
    return {
      channelUri: getString(rawRegistrationDescription["ChannelUri"], "channelUri").trim(),
      ...createRegistrationDescription(rawRegistrationDescription),
      kind: "Mpns",
    };
  },

  /**
   * @internal
   * Creates a Windows Phone template registration description from incoming XML property bag.
   */
  createMpnsTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): MpnsTemplateRegistrationDescription {
    return {
      mpnsHeaders: getHeadersOrUndefined(rawRegistrationDescription["MpnsHeaders"]?.["MpnsHeader"]),
      ...this.createWindowsRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      kind: "MpnsTemplate",
    };
  },

  /**
   * @internal
   * Creates a Xiaomi registration description from incoming XML property bag.
   */
  createXiaomiRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): XiaomiRegistrationDescription {
    return {
      xiaomiRegistrationId: getString(
        rawRegistrationDescription["XiaomiRegistrationId"],
        "xiaomiRegistrationId",
      ).trim(),
      ...createRegistrationDescription(rawRegistrationDescription),
      kind: "Xiaomi",
    };
  },

  /**
   * @internal
   * Creates a Xiaomi template registration description from incoming XML property bag.
   */
  createXiaomiTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): XiaomiTemplateRegistrationDescription {
    return {
      ...this.createXiaomiRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      kind: "XiaomiTemplate",
    };
  },

  /**
   * @internal
   * Creates a Windows registration description from incoming XML property bag.
   */
  createWindowsRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): WindowsRegistrationDescription {
    return {
      channelUri: getString(rawRegistrationDescription["ChannelUri"], "channelUri").trim(),
      ...createRegistrationDescription(rawRegistrationDescription),
      kind: "Windows",
    };
  },

  /**
   * @internal
   * Creates a Windows template registration description from incoming XML property bag.
   */
  createWindowsTemplateRegistrationDescription(
    rawRegistrationDescription: Record<string, any>,
  ): WindowsTemplateRegistrationDescription {
    return {
      wnsHeaders: getHeadersOrUndefined(rawRegistrationDescription["WnsHeaders"]?.["WnsHeader"]),
      ...this.createWindowsRegistrationDescription(rawRegistrationDescription),
      ...createTemplateRegistrationDescription(rawRegistrationDescription),
      kind: "WindowsTemplate",
    };
  },
};

function getHeadersOrUndefined(
  value?: { Header: string; Value: string }[] | { Header: string; Value: string },
): Record<string, string> | undefined {
  if (!isDefined(value)) {
    return undefined;
  }

  const headerObj: Record<string, string> = {};
  for (const { Header, Value } of Array.isArray(value) ? value : [value]) {
    headerObj[Header] = Value;
  }

  return headerObj;
}

function createRegistrationDescription(
  rawRegistrationDescription: Record<string, any>,
): Omit<RegistrationDescriptionCommon, "kind"> {
  let pushVariables: Record<string, string> | undefined;
  const unparsed = getStringOrUndefined(rawRegistrationDescription["PushVariables"])?.trim();
  if (unparsed) {
    pushVariables = JSON.parse(unparsed) as Record<string, string>;
  }

  return {
    registrationId: getStringOrUndefined(rawRegistrationDescription["RegistrationId"])?.trim(),
    expirationTime: getDateOrUndefined(rawRegistrationDescription["ExpirationTime"]),
    etag: getStringOrUndefined(rawRegistrationDescription["ETag"])?.trim(),
    tags: getTagsOrUndefined(rawRegistrationDescription["Tags"]),
    pushVariables: pushVariables,
  };
}

function createTemplateRegistrationDescription(
  rawRegistrationDescription: Record<string, any>,
): TemplateRegistrationDescription {
  return {
    bodyTemplate: getString(rawRegistrationDescription["BodyTemplate"], "bodyTemplate").trim(),
    templateName: getStringOrUndefined(rawRegistrationDescription["TemplateName"])?.trim(),
    ...createRegistrationDescription(rawRegistrationDescription),
  };
}

/**
 * @internal
 * Represents a serializer for all registration descriptions.
 */
export interface RegistrationDescriptionSerializer {
  /**
   * @internal
   * Serializes a registration description into an ATOM XML string.
   */
  serializeRegistrationDescription(description: RegistrationDescription): string;
  /**
   * @internal
   * Serializes an Amazon Device Messaging (ADM) registration description into an XML object for serialization.
   */
  serializeAdmRegistrationDescription(
    description: Omit<AdmRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes an Amazon Device Messaging (ADM) template registration description into an XML object for serialization.
   */
  serializeAdmTemplateRegistrationDescription(
    description: Omit<AdmTemplateRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes an Apple registration description into an XML object for serialization.
   */
  serializeAppleRegistrationDescription(
    description: Omit<AppleRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes an Apple template registration description into an XML object for serialization.
   */
  serializeAppleTemplateRegistrationDescription(
    description: Omit<AppleRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Baidu registration description into an XML object for serialization.
   */
  serializeBaiduRegistrationDescription(
    description: Omit<BaiduRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Baidu template registration description into an XML object for serialization.
   */
  serializeBaiduTemplateRegistrationDescription(
    description: Omit<BaiduTemplateRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Web Push registration description into an XML object for serialization.
   */
  serializeBrowserRegistrationDescription(
    description: Omit<BrowserRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Web Push template registration description into an XML object for serialization.
   */
  serializeBrowserTemplateRegistrationDescription(
    description: Omit<BrowserTemplateRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Google Cloud Messaging (GCM) registration description into an XML object for serialization.
   */
  serializeFcmV1RegistrationDescription(
    description: Omit<FcmV1RegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Google Cloud Messaging (GCM) template registration description into an XML object for serialization.
   */
  serializeFcmV1TemplateRegistrationDescription(
    description: Omit<FcmV1TemplateRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Google Cloud Messaging (GCM) registration description into an XML object for serialization.
   */
  serializeGcmRegistrationDescription(
    description: Omit<GcmRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Google Cloud Messaging (GCM) template registration description into an XML object for serialization.
   */
  serializeGcmTemplateRegistrationDescription(
    description: Omit<GcmTemplateRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Windows Phone registration description into an XML object for serialization.
   */
  serializeMpnsRegistrationDescription(
    description: Omit<MpnsRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Windows Phone template registration description into an XML object for serialization.
   */
  serializeMpnsTemplateRegistrationDescription(
    description: Omit<MpnsTemplateRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Xiaomi registration description into an XML object for serialization.
   */
  serializeXiaomiRegistrationDescription(
    description: Omit<XiaomiRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Xiaomi template registration description into an XML object for serialization.
   */
  serializeXiaomiTemplateRegistrationDescription(
    description: Omit<XiaomiTemplateRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Windows Notification Services (WNS) registration description into an XML object for serialization.
   */
  serializeWindowsRegistrationDescription(
    description: Omit<WindowsRegistrationDescription, "kind">,
  ): Record<string, any>;
  /**
   * @internal
   * Serializes a Windows Notification Services (WNS) template registration description into an XML object for serialization.
   */
  serializeWindowsTemplateRegistrationDescription(
    description: Omit<WindowsTemplateRegistrationDescription, "kind">,
  ): Record<string, any>;
}

/**
 * Represents a RegistrationDescription serializer.
 */
export const registrationDescriptionSerializer: RegistrationDescriptionSerializer = {
  serializeRegistrationDescription(description: RegistrationDescription): string {
    const rootName = `${description.kind}RegistrationDescription`;
    const methodName = `serialize${rootName}`;

    const method = this[methodName as keyof RegistrationDescriptionSerializer].bind(this) as (
      description: RegistrationDescription,
    ) => Record<string, any>;
    if (!isDefined(method)) {
      throw new RestError(`Undefined platform ${description.kind}`, { statusCode: 400 });
    }

    const registration = method(description) as Record<string, any>;
    const requestObject = serializeToAtomXmlRequest(rootName, registration);

    return stringifyXML(requestObject, { rootName: "entry" });
  },

  /**
   * @internal
   * Serializes an existing ADM registration description to an object for serialization.
   */
  serializeAdmRegistrationDescription(
    description: Omit<AdmRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...serializeRegistrationDescription(description),
      AdmRegistrationId: getString(description.admRegistrationId, "admRegistrationId").trim(),
    };
  },

  /**
   * @internal
   * Serializes an existing ADM template registration description to an object for serialization.
   */
  serializeAdmTemplateRegistrationDescription(
    description: Omit<AdmTemplateRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...this.serializeAdmRegistrationDescription(description),
      ...serializeTemplateRegistrationDescription(description),
    };
  },

  /**
   * @internal
   * Serializes an existing Apple registration description to an object for serialization.
   */
  serializeAppleRegistrationDescription(
    description: Omit<AppleRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...serializeRegistrationDescription(description),
      DeviceToken: getString(description.deviceToken, "deviceToken").trim(),
    };
  },

  /**
   * @internal
   * Serializes an existing Apple template registration description to an object for serialization.
   */
  serializeAppleTemplateRegistrationDescription(
    description: AppleTemplateRegistrationDescription,
  ): Record<string, any> {
    let apnsHeaders: Record<string, any> | undefined;
    if (description.apnsHeaders) {
      apnsHeaders = {
        ApnsHeader: [],
      };

      for (const header of Object.keys(description.apnsHeaders)) {
        apnsHeaders["ApnsHeader"].push({
          Header: header.trim(),
          Value: description.apnsHeaders[header].trim(),
        });
      }
    }

    return {
      ...this.serializeAppleRegistrationDescription(description),
      ...serializeTemplateRegistrationDescription(description),
      Expiry: getStringOrUndefined(description.expiry)?.trim(),
      ApnsHeaders: apnsHeaders,
    };
  },

  /**
   * @internal
   * Serializes an existing Baidu registration description to an object for serialization.
   */
  serializeBaiduRegistrationDescription(
    description: Omit<BaiduRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...serializeRegistrationDescription(description),
      BaiduChannelId: getString(description.baiduChannelId, "baiduChannelId").trim(),
      BaiduUserId: getString(description.baiduUserId, "baiduUserId").trim(),
    };
  },

  /**
   * @internal
   * Serializes an existing Baidu template registration description to an object for serialization.
   */
  serializeBaiduTemplateRegistrationDescription(
    description: Omit<BaiduTemplateRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...this.serializeBaiduRegistrationDescription(description),
      ...serializeTemplateRegistrationDescription(description),
    };
  },

  /**
   * @internal
   * Serializes an existing Browser registration description to an object for serialization.
   */
  serializeBrowserRegistrationDescription(
    description: Omit<BrowserRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...serializeRegistrationDescription(description),
      Endpoint: description.endpoint,
      P256DH: description.p256dh,
      Auth: description.auth,
    };
  },

  /**
   * @internal
   * Serializes an existing Browser template registration description to an object for serialization.
   */
  serializeBrowserTemplateRegistrationDescription(
    description: Omit<BrowserTemplateRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...this.serializeBrowserRegistrationDescription(description),
      ...serializeTemplateRegistrationDescription(description),
    };
  },

  /**
   * @internal
   * Serializes an existing FCM V1 registration description to an object for serialization.
   */
  serializeFcmV1RegistrationDescription(
    description: Omit<FcmV1RegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...serializeRegistrationDescription(description),
      FcmV1RegistrationId: getString(description.fcmV1RegistrationId, "fcmRegistrationId").trim(),
    };
  },

  /**
   * @internal
   * Serializes an existing FCM V1 template registration description to an object for serialization.
   */
  serializeFcmV1TemplateRegistrationDescription(
    description: Omit<FcmV1TemplateRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...this.serializeFcmV1RegistrationDescription(description),
      ...serializeTemplateRegistrationDescription(description),
    };
  },

  /**
   * @internal
   * Serializes an existing GCM registration description to an object for serialization.
   */
  serializeGcmRegistrationDescription(
    description: Omit<GcmRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...serializeRegistrationDescription(description),
      GcmRegistrationId: getString(description.gcmRegistrationId, "gcmRegistrationId").trim(),
    };
  },

  /**
   * @internal
   * Serializes an existing GCM template registration description to an object for serialization.
   */
  serializeGcmTemplateRegistrationDescription(
    description: Omit<GcmTemplateRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...this.serializeGcmRegistrationDescription(description),
      ...serializeTemplateRegistrationDescription(description),
    };
  },

  /**
   * @internal
   * @deprecated Windows Phone is no longer supported.
   * Serializes an existing MPNS registration description to an object for serialization.
   */
  serializeMpnsRegistrationDescription(
    description: Omit<MpnsRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...serializeRegistrationDescription(description),
      ChannelUri: description.channelUri,
    };
  },

  /**
   * @internal
   * @deprecated Windows Phone is no longer supported.
   * Serializes an existing MPNS template registration description to an object for serialization.
   */
  serializeMpnsTemplateRegistrationDescription(
    description: Omit<MpnsTemplateRegistrationDescription, "kind">,
  ): Record<string, any> {
    let mpnsHeaders: Record<string, any> | undefined;
    if (description.mpnsHeaders) {
      mpnsHeaders = {
        MpnsHeader: [],
      };

      for (const header of Object.keys(description.mpnsHeaders)) {
        mpnsHeaders["MpnsHeader"].push({
          Header: header.trim(),
          Value: description.mpnsHeaders[header].trim(),
        });
      }
    }

    return {
      ...this.serializeMpnsRegistrationDescription(description),
      ...serializeTemplateRegistrationDescription(description),
      MpnsHeaders: mpnsHeaders,
    };
  },

  /**
   * @internal
   * Serializes an existing Xiaomi registration description to an object for serialization.
   */
  serializeXiaomiRegistrationDescription(
    description: Omit<XiaomiRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...serializeRegistrationDescription(description),
      XiaomiRegistrationId: getString(
        description.xiaomiRegistrationId,
        "xiaomiRegistrationId",
      ).trim(),
    };
  },

  /**
   * @internal
   * Serializes an existing Xiaomi template registration description to an object for serialization.
   */
  serializeXiaomiTemplateRegistrationDescription(
    description: Omit<XiaomiTemplateRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...this.serializeXiaomiRegistrationDescription(description),
      ...serializeTemplateRegistrationDescription(description),
    };
  },

  /**
   * @internal
   * Serializes an existing Windows registration description to an object for serialization.
   */
  serializeWindowsRegistrationDescription(
    description: Omit<WindowsRegistrationDescription, "kind">,
  ): Record<string, any> {
    return {
      ...serializeRegistrationDescription(description),
      ChannelUri: description.channelUri,
    };
  },

  /**
   * @internal
   * Serializes an existing Windows template registration description to an object for serialization.
   */
  serializeWindowsTemplateRegistrationDescription(
    description: Omit<WindowsTemplateRegistrationDescription, "kind">,
  ): Record<string, any> {
    let wnsHeaders: Record<string, any> | undefined;
    if (description.wnsHeaders) {
      wnsHeaders = {
        WnsHeader: [],
      };

      for (const header of Object.keys(description.wnsHeaders)) {
        wnsHeaders["WnsHeader"].push({
          Header: header.trim(),
          Value: description.wnsHeaders[header].trim(),
        });
      }
    }

    return {
      ...this.serializeWindowsRegistrationDescription(description),
      ...serializeTemplateRegistrationDescription(description),
      WnsHeaders: wnsHeaders,
    };
  },
};

function serializeRegistrationDescription(
  description: Omit<RegistrationDescriptionCommon, "kind">,
): Record<string, any> {
  let tags: string | undefined;
  if (description.tags) {
    tags = description.tags.join(",");
  }

  let pushVariables: string | undefined;
  if (description.pushVariables) {
    pushVariables = JSON.stringify(description.pushVariables);
  }

  return {
    RegistrationId: getStringOrUndefined(description.registrationId),
    Tags: tags,
    PushVariables: pushVariables,
  };
}

function serializeTemplateRegistrationDescription(
  description: TemplateRegistrationDescription,
): Record<string, any> {
  return {
    BodyTemplate: { __cdata: description.bodyTemplate },
    TemplateName: getStringOrUndefined(description.templateName)?.trim(),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type {
  EmailReceiver,
  SmsReceiver,
  AzureAppPushReceiver,
  VoiceReceiver,
  Context,
} from "../actionGroupsApi/models.js";
import {
  emailReceiverArraySerializer,
  emailReceiverArrayDeserializer,
  smsReceiverArraySerializer,
  smsReceiverArrayDeserializer,
  azureAppPushReceiverArraySerializer,
  azureAppPushReceiverArrayDeserializer,
  voiceReceiverArraySerializer,
  voiceReceiverArrayDeserializer,
  contextDeserializer,
  _tenantActionGroupPatchBodyPropertiesSerializer,
} from "../actionGroupsApi/models.js";
import type { TrackedResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The request body which contain contact detail metadata */
export interface TenantNotificationRequestBody {
  /** The value of the supported alert type. Supported alert type value is: servicehealth */
  alertType: string;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: EmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: SmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: TenantActionGroupWebhookReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: AzureAppPushReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: VoiceReceiver[];
}

export function tenantNotificationRequestBodySerializer(item: TenantNotificationRequestBody): any {
  return {
    alertType: item["alertType"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : emailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : smsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupWebhookReceiverArraySerializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArraySerializer(item["voiceReceivers"]),
  };
}

export function tenantActionGroupWebhookReceiverArraySerializer(
  result: Array<TenantActionGroupWebhookReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupWebhookReceiverSerializer(item);
  });
}

export function tenantActionGroupWebhookReceiverArrayDeserializer(
  result: Array<TenantActionGroupWebhookReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupWebhookReceiverDeserializer(item);
  });
}

/** A webhook receiver. */
export interface TenantActionGroupWebhookReceiver {
  /** The name of the webhook receiver. Names must be unique across all receivers within a tenant action group. */
  name: string;
  /** The URI where webhooks should be sent. */
  serviceUri: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** Indicates whether or not use AAD authentication. */
  useAadAuth?: boolean;
  /** Indicates the webhook app object Id for aad auth. */
  objectId?: string;
  /** Indicates the identifier uri for aad auth. */
  identifierUri?: string;
  /** Indicates the tenant id for aad auth. */
  tenantId?: string;
}

export function tenantActionGroupWebhookReceiverSerializer(
  item: TenantActionGroupWebhookReceiver,
): any {
  return {
    name: item["name"],
    serviceUri: item["serviceUri"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    useAadAuth: item["useAadAuth"],
    objectId: item["objectId"],
    identifierUri: item["identifierUri"],
    tenantId: item["tenantId"],
  };
}

export function tenantActionGroupWebhookReceiverDeserializer(
  item: any,
): TenantActionGroupWebhookReceiver {
  return {
    name: item["name"],
    serviceUri: item["serviceUri"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    useAadAuth: item["useAadAuth"],
    objectId: item["objectId"],
    identifierUri: item["identifierUri"],
    tenantId: item["tenantId"],
  };
}

/** The details of the test notification results. */
export interface TenantActionGroupTestNotificationDetailsResponse {
  /** The context info */
  context?: Context;
  /** The overall state */
  state: string;
  /** The completed time */
  completedTime?: string;
  /** The created time */
  createdTime?: string;
  /** The list of action detail */
  actionDetails?: TenantActionGroupActionDetail[];
}

export function tenantActionGroupTestNotificationDetailsResponseDeserializer(
  item: any,
): TenantActionGroupTestNotificationDetailsResponse {
  return {
    context: !item["context"] ? item["context"] : contextDeserializer(item["context"]),
    state: item["state"],
    completedTime: item["completedTime"],
    createdTime: item["createdTime"],
    actionDetails: !item["actionDetails"]
      ? item["actionDetails"]
      : tenantActionGroupActionDetailArrayDeserializer(item["actionDetails"]),
  };
}

export function tenantActionGroupActionDetailArrayDeserializer(
  result: Array<TenantActionGroupActionDetail>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupActionDetailDeserializer(item);
  });
}

/** The action detail */
export interface TenantActionGroupActionDetail {
  /** The mechanism type */
  mechanismType?: string;
  /** The name of the action */
  name?: string;
  /** The status of the action */
  status?: string;
  /** The substatus of the action */
  subState?: string;
  /** The send time */
  sendTime?: string;
  /** The detail of the friendly error message */
  message?: string;
}

export function tenantActionGroupActionDetailDeserializer(
  item: any,
): TenantActionGroupActionDetail {
  return {
    mechanismType: item["mechanismType"],
    name: item["name"],
    status: item["status"],
    subState: item["subState"],
    sendTime: item["sendTime"],
    message: item["message"],
  };
}

/** A tenant action group resource. */
export interface TenantActionGroupResource extends TrackedResource {
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName?: string;
  /** Indicates whether this tenant action group is enabled. If a tenant action group is not enabled, then none of its receivers will receive communications. */
  enabled?: boolean;
  /** The list of email receivers that are part of this tenant action group. */
  emailReceivers?: EmailReceiver[];
  /** The list of SMS receivers that are part of this tenant action group. */
  smsReceivers?: SmsReceiver[];
  /** The list of webhook receivers that are part of this tenant action group. */
  webhookReceivers?: TenantActionGroupWebhookReceiver[];
  /** The list of AzureAppPush receivers that are part of this tenant action group. */
  azureAppPushReceivers?: AzureAppPushReceiver[];
  /** The list of voice receivers that are part of this tenant action group. */
  voiceReceivers?: VoiceReceiver[];
}

export function tenantActionGroupResourceSerializer(item: TenantActionGroupResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "groupShortName",
      "enabled",
      "emailReceivers",
      "smsReceivers",
      "webhookReceivers",
      "azureAppPushReceivers",
      "voiceReceivers",
    ])
      ? undefined
      : _tenantActionGroupResourcePropertiesSerializer(item),
  };
}

export function tenantActionGroupResourceDeserializer(item: any): TenantActionGroupResource {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tenantActionGroupResourcePropertiesDeserializer(item["properties"])),
  };
}

/** A tenant  action group. */
export interface TenantActionGroup {
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName: string;
  /** Indicates whether this tenant action group is enabled. If a tenant action group is not enabled, then none of its receivers will receive communications. */
  enabled: boolean;
  /** The list of email receivers that are part of this tenant action group. */
  emailReceivers?: EmailReceiver[];
  /** The list of SMS receivers that are part of this tenant action group. */
  smsReceivers?: SmsReceiver[];
  /** The list of webhook receivers that are part of this tenant action group. */
  webhookReceivers?: TenantActionGroupWebhookReceiver[];
  /** The list of AzureAppPush receivers that are part of this tenant action group. */
  azureAppPushReceivers?: AzureAppPushReceiver[];
  /** The list of voice receivers that are part of this tenant action group. */
  voiceReceivers?: VoiceReceiver[];
}

export function tenantActionGroupSerializer(item: TenantActionGroup): any {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : emailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : smsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupWebhookReceiverArraySerializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArraySerializer(item["voiceReceivers"]),
  };
}

export function tenantActionGroupDeserializer(item: any): TenantActionGroup {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : emailReceiverArrayDeserializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : smsReceiverArrayDeserializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupWebhookReceiverArrayDeserializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArrayDeserializer(item["voiceReceivers"]),
  };
}

/** A tenant action group object for the body of patch operations. */
export interface TenantActionGroupPatchBody {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function tenantActionGroupPatchBodySerializer(item: TenantActionGroupPatchBody): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _tenantActionGroupPatchBodyPropertiesSerializer(item),
  };
}

/** A list of tenant action groups. */
export interface _TenantActionGroupList {
  /** The TenantActionGroupResource items on this page */
  value: TenantActionGroupResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tenantActionGroupListDeserializer(item: any): _TenantActionGroupList {
  return {
    value: tenantActionGroupResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tenantActionGroupResourceArraySerializer(
  result: Array<TenantActionGroupResource>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupResourceSerializer(item);
  });
}

export function tenantActionGroupResourceArrayDeserializer(
  result: Array<TenantActionGroupResource>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupResourceDeserializer(item);
  });
}

export function _tenantActionGroupResourcePropertiesSerializer(
  item: TenantActionGroupResource,
): any {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : emailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : smsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupWebhookReceiverArraySerializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArraySerializer(item["voiceReceivers"]),
  };
}

export function _tenantActionGroupResourcePropertiesDeserializer(item: any) {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : emailReceiverArrayDeserializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : smsReceiverArrayDeserializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupWebhookReceiverArrayDeserializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArrayDeserializer(item["voiceReceivers"]),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { TrackedResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The request body which contain contact detail metadata */
export interface TenantActionGroupsTenantNotificationRequestBody {
  /** The value of the supported alert type. Supported alert type value is: servicehealth */
  alertType: string;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: TenantActionGroupsEmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: TenantActionGroupsSmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: TenantActionGroupsWebhookReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: TenantActionGroupsAzureAppPushReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: TenantActionGroupsVoiceReceiver[];
}

export function tenantActionGroupsTenantNotificationRequestBodySerializer(
  item: TenantActionGroupsTenantNotificationRequestBody,
): any {
  return {
    alertType: item["alertType"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : tenantActionGroupsEmailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : tenantActionGroupsSmsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupsWebhookReceiverArraySerializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : tenantActionGroupsAzureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : tenantActionGroupsVoiceReceiverArraySerializer(item["voiceReceivers"]),
  };
}

export function tenantActionGroupsEmailReceiverArraySerializer(
  result: Array<TenantActionGroupsEmailReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsEmailReceiverSerializer(item);
  });
}

export function tenantActionGroupsEmailReceiverArrayDeserializer(
  result: Array<TenantActionGroupsEmailReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsEmailReceiverDeserializer(item);
  });
}

/** An email receiver. */
export interface TenantActionGroupsEmailReceiver {
  /** The name of the email receiver. Names must be unique across all receivers within a tenant action group. */
  name: string;
  /** The email address of this receiver. */
  emailAddress: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** The receiver status of the e-mail. */
  readonly status?: TenantActionGroupsReceiverStatus;
}

export function tenantActionGroupsEmailReceiverSerializer(
  item: TenantActionGroupsEmailReceiver,
): any {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function tenantActionGroupsEmailReceiverDeserializer(
  item: any,
): TenantActionGroupsEmailReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    status: item["status"],
  };
}

/** Indicates the status of the receiver. Receivers that are not Enabled will not receive any communications. */
export type TenantActionGroupsReceiverStatus = "NotSpecified" | "Enabled" | "Disabled";

export function tenantActionGroupsSmsReceiverArraySerializer(
  result: Array<TenantActionGroupsSmsReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsSmsReceiverSerializer(item);
  });
}

export function tenantActionGroupsSmsReceiverArrayDeserializer(
  result: Array<TenantActionGroupsSmsReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsSmsReceiverDeserializer(item);
  });
}

/** An SMS receiver. */
export interface TenantActionGroupsSmsReceiver {
  /** The name of the SMS receiver. Names must be unique across all receivers within a tenant action group. */
  name: string;
  /** The country code of the SMS receiver. */
  countryCode: string;
  /** The phone number of the SMS receiver. */
  phoneNumber: string;
  /** The status of the receiver. */
  readonly status?: TenantActionGroupsReceiverStatus;
}

export function tenantActionGroupsSmsReceiverSerializer(item: TenantActionGroupsSmsReceiver): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function tenantActionGroupsSmsReceiverDeserializer(
  item: any,
): TenantActionGroupsSmsReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
    status: item["status"],
  };
}

export function tenantActionGroupsWebhookReceiverArraySerializer(
  result: Array<TenantActionGroupsWebhookReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsWebhookReceiverSerializer(item);
  });
}

export function tenantActionGroupsWebhookReceiverArrayDeserializer(
  result: Array<TenantActionGroupsWebhookReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsWebhookReceiverDeserializer(item);
  });
}

/** A webhook receiver. */
export interface TenantActionGroupsWebhookReceiver {
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

export function tenantActionGroupsWebhookReceiverSerializer(
  item: TenantActionGroupsWebhookReceiver,
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

export function tenantActionGroupsWebhookReceiverDeserializer(
  item: any,
): TenantActionGroupsWebhookReceiver {
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

export function tenantActionGroupsAzureAppPushReceiverArraySerializer(
  result: Array<TenantActionGroupsAzureAppPushReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsAzureAppPushReceiverSerializer(item);
  });
}

export function tenantActionGroupsAzureAppPushReceiverArrayDeserializer(
  result: Array<TenantActionGroupsAzureAppPushReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsAzureAppPushReceiverDeserializer(item);
  });
}

/** The Azure mobile App push notification receiver. */
export interface TenantActionGroupsAzureAppPushReceiver {
  /** The name of the Azure mobile app push receiver. Names must be unique across all receivers within a tenant action group. */
  name: string;
  /** The email address registered for the Azure mobile app. */
  emailAddress: string;
}

export function tenantActionGroupsAzureAppPushReceiverSerializer(
  item: TenantActionGroupsAzureAppPushReceiver,
): any {
  return { name: item["name"], emailAddress: item["emailAddress"] };
}

export function tenantActionGroupsAzureAppPushReceiverDeserializer(
  item: any,
): TenantActionGroupsAzureAppPushReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
  };
}

export function tenantActionGroupsVoiceReceiverArraySerializer(
  result: Array<TenantActionGroupsVoiceReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsVoiceReceiverSerializer(item);
  });
}

export function tenantActionGroupsVoiceReceiverArrayDeserializer(
  result: Array<TenantActionGroupsVoiceReceiver>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsVoiceReceiverDeserializer(item);
  });
}

/** A voice receiver. */
export interface TenantActionGroupsVoiceReceiver {
  /** The name of the voice receiver. Names must be unique across all receivers within a tenant action group. */
  name: string;
  /** The country code of the voice receiver. */
  countryCode: string;
  /** The phone number of the voice receiver. */
  phoneNumber: string;
}

export function tenantActionGroupsVoiceReceiverSerializer(
  item: TenantActionGroupsVoiceReceiver,
): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function tenantActionGroupsVoiceReceiverDeserializer(
  item: any,
): TenantActionGroupsVoiceReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
  };
}

/** The details of the test notification results. */
export interface TenantActionGroupsTestNotificationDetailsResponse {
  /** The context info */
  context?: TenantActionGroupsContext;
  /** The overall state */
  state: string;
  /** The completed time */
  completedTime?: string;
  /** The created time */
  createdTime?: string;
  /** The list of action detail */
  actionDetails?: TenantActionGroupsActionDetail[];
}

export function tenantActionGroupsTestNotificationDetailsResponseDeserializer(
  item: any,
): TenantActionGroupsTestNotificationDetailsResponse {
  return {
    context: !item["context"]
      ? item["context"]
      : tenantActionGroupsContextDeserializer(item["context"]),
    state: item["state"],
    completedTime: item["completedTime"],
    createdTime: item["createdTime"],
    actionDetails: !item["actionDetails"]
      ? item["actionDetails"]
      : tenantActionGroupsActionDetailArrayDeserializer(item["actionDetails"]),
  };
}

/** The context info */
export interface TenantActionGroupsContext {
  /** The source of the notification request */
  notificationSource?: string;
  /** The context id type */
  contextType?: string;
}

export function tenantActionGroupsContextDeserializer(item: any): TenantActionGroupsContext {
  return {
    notificationSource: item["notificationSource"],
    contextType: item["contextType"],
  };
}

export function tenantActionGroupsActionDetailArrayDeserializer(
  result: Array<TenantActionGroupsActionDetail>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsActionDetailDeserializer(item);
  });
}

/** The action detail */
export interface TenantActionGroupsActionDetail {
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

export function tenantActionGroupsActionDetailDeserializer(
  item: any,
): TenantActionGroupsActionDetail {
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
export interface TenantActionGroupsTenantActionGroupResource extends TrackedResource {
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName?: string;
  /** Indicates whether this tenant action group is enabled. If a tenant action group is not enabled, then none of its receivers will receive communications. */
  enabled?: boolean;
  /** The list of email receivers that are part of this tenant action group. */
  emailReceivers?: TenantActionGroupsEmailReceiver[];
  /** The list of SMS receivers that are part of this tenant action group. */
  smsReceivers?: TenantActionGroupsSmsReceiver[];
  /** The list of webhook receivers that are part of this tenant action group. */
  webhookReceivers?: TenantActionGroupsWebhookReceiver[];
  /** The list of AzureAppPush receivers that are part of this tenant action group. */
  azureAppPushReceivers?: TenantActionGroupsAzureAppPushReceiver[];
  /** The list of voice receivers that are part of this tenant action group. */
  voiceReceivers?: TenantActionGroupsVoiceReceiver[];
}

export function tenantActionGroupsTenantActionGroupResourceSerializer(
  item: TenantActionGroupsTenantActionGroupResource,
): any {
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

export function tenantActionGroupsTenantActionGroupResourceDeserializer(
  item: any,
): TenantActionGroupsTenantActionGroupResource {
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
export interface TenantActionGroupsTenantActionGroup {
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName: string;
  /** Indicates whether this tenant action group is enabled. If a tenant action group is not enabled, then none of its receivers will receive communications. */
  enabled: boolean;
  /** The list of email receivers that are part of this tenant action group. */
  emailReceivers?: TenantActionGroupsEmailReceiver[];
  /** The list of SMS receivers that are part of this tenant action group. */
  smsReceivers?: TenantActionGroupsSmsReceiver[];
  /** The list of webhook receivers that are part of this tenant action group. */
  webhookReceivers?: TenantActionGroupsWebhookReceiver[];
  /** The list of AzureAppPush receivers that are part of this tenant action group. */
  azureAppPushReceivers?: TenantActionGroupsAzureAppPushReceiver[];
  /** The list of voice receivers that are part of this tenant action group. */
  voiceReceivers?: TenantActionGroupsVoiceReceiver[];
}

export function tenantActionGroupsTenantActionGroupSerializer(
  item: TenantActionGroupsTenantActionGroup,
): any {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : tenantActionGroupsEmailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : tenantActionGroupsSmsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupsWebhookReceiverArraySerializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : tenantActionGroupsAzureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : tenantActionGroupsVoiceReceiverArraySerializer(item["voiceReceivers"]),
  };
}

export function tenantActionGroupsTenantActionGroupDeserializer(
  item: any,
): TenantActionGroupsTenantActionGroup {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : tenantActionGroupsEmailReceiverArrayDeserializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : tenantActionGroupsSmsReceiverArrayDeserializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupsWebhookReceiverArrayDeserializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : tenantActionGroupsAzureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : tenantActionGroupsVoiceReceiverArrayDeserializer(item["voiceReceivers"]),
  };
}

/** A tenant action group object for the body of patch operations. */
export interface TenantActionGroupsActionGroupPatchBody {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Indicates whether this tenant action group is enabled. If a tenant action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function tenantActionGroupsActionGroupPatchBodySerializer(
  item: TenantActionGroupsActionGroupPatchBody,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _actionGroupPatchBodyPropertiesSerializer(item),
  };
}

/** A tenant action group for patch operations. */
export interface TenantActionGroupsActionGroupPatch {
  /** Indicates whether this tenant action group is enabled. If a tenant action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function tenantActionGroupsActionGroupPatchSerializer(
  item: TenantActionGroupsActionGroupPatch,
): any {
  return { enabled: item["enabled"] };
}

/** A list of tenant action groups. */
export interface _TenantActionGroupsTenantActionGroupList {
  /** The TenantActionGroupResource items on this page */
  value: TenantActionGroupsTenantActionGroupResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tenantActionGroupsTenantActionGroupListDeserializer(
  item: any,
): _TenantActionGroupsTenantActionGroupList {
  return {
    value: tenantActionGroupsTenantActionGroupResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tenantActionGroupsTenantActionGroupResourceArraySerializer(
  result: Array<TenantActionGroupsTenantActionGroupResource>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsTenantActionGroupResourceSerializer(item);
  });
}

export function tenantActionGroupsTenantActionGroupResourceArrayDeserializer(
  result: Array<TenantActionGroupsTenantActionGroupResource>,
): any[] {
  return result.map((item) => {
    return tenantActionGroupsTenantActionGroupResourceDeserializer(item);
  });
}

export function _tenantActionGroupResourcePropertiesSerializer(
  item: TenantActionGroupsTenantActionGroupResource,
): any {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : tenantActionGroupsEmailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : tenantActionGroupsSmsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupsWebhookReceiverArraySerializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : tenantActionGroupsAzureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : tenantActionGroupsVoiceReceiverArraySerializer(item["voiceReceivers"]),
  };
}

export function _tenantActionGroupResourcePropertiesDeserializer(item: any) {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : tenantActionGroupsEmailReceiverArrayDeserializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : tenantActionGroupsSmsReceiverArrayDeserializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : tenantActionGroupsWebhookReceiverArrayDeserializer(item["webhookReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : tenantActionGroupsAzureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : tenantActionGroupsVoiceReceiverArrayDeserializer(item["voiceReceivers"]),
  };
}

export function _actionGroupPatchBodyPropertiesSerializer(
  item: TenantActionGroupsActionGroupPatchBody,
): any {
  return { enabled: item["enabled"] };
}

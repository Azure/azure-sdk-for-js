// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ManagedServiceIdentity, TrackedResource } from "../../models.js";
import {
  systemDataDeserializer,
  managedServiceIdentitySerializer,
  managedServiceIdentityDeserializer,
} from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An action group resource. */
export interface MicrosoftActionGroupsActionGroupResource extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName?: string;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its receivers will receive communications. */
  enabled?: boolean;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: MicrosoftActionGroupsEmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: MicrosoftActionGroupsSmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: MicrosoftActionGroupsWebhookReceiver[];
  /** The list of ITSM receivers that are part of this action group. */
  itsmReceivers?: MicrosoftActionGroupsItsmReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: MicrosoftActionGroupsAzureAppPushReceiver[];
  /** The list of AutomationRunbook receivers that are part of this action group. */
  automationRunbookReceivers?: MicrosoftActionGroupsAutomationRunbookReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: MicrosoftActionGroupsVoiceReceiver[];
  /** The list of logic app receivers that are part of this action group. */
  logicAppReceivers?: MicrosoftActionGroupsLogicAppReceiver[];
  /** The list of azure function receivers that are part of this action group. */
  azureFunctionReceivers?: MicrosoftActionGroupsAzureFunctionReceiver[];
  /** The list of ARM role receivers that are part of this action group. Roles are Azure RBAC roles and only built-in roles are supported. */
  armRoleReceivers?: MicrosoftActionGroupsArmRoleReceiver[];
  /** The list of event hub receivers that are part of this action group. */
  eventHubReceivers?: MicrosoftActionGroupsEventHubReceiver[];
  /** The list of incident receivers that are part of this action group. */
  incidentReceivers?: MicrosoftActionGroupsIncidentReceiver[];
}

export function microsoftActionGroupsActionGroupResourceSerializer(
  item: MicrosoftActionGroupsActionGroupResource,
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
      "itsmReceivers",
      "azureAppPushReceivers",
      "automationRunbookReceivers",
      "voiceReceivers",
      "logicAppReceivers",
      "azureFunctionReceivers",
      "armRoleReceivers",
      "eventHubReceivers",
      "incidentReceivers",
    ])
      ? undefined
      : _actionGroupResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function microsoftActionGroupsActionGroupResourceDeserializer(
  item: any,
): MicrosoftActionGroupsActionGroupResource {
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
      : _actionGroupResourcePropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** An Azure action group. */
export interface MicrosoftActionGroupsActionGroup {
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName: string;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its receivers will receive communications. */
  enabled: boolean;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: MicrosoftActionGroupsEmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: MicrosoftActionGroupsSmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: MicrosoftActionGroupsWebhookReceiver[];
  /** The list of ITSM receivers that are part of this action group. */
  itsmReceivers?: MicrosoftActionGroupsItsmReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: MicrosoftActionGroupsAzureAppPushReceiver[];
  /** The list of AutomationRunbook receivers that are part of this action group. */
  automationRunbookReceivers?: MicrosoftActionGroupsAutomationRunbookReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: MicrosoftActionGroupsVoiceReceiver[];
  /** The list of logic app receivers that are part of this action group. */
  logicAppReceivers?: MicrosoftActionGroupsLogicAppReceiver[];
  /** The list of azure function receivers that are part of this action group. */
  azureFunctionReceivers?: MicrosoftActionGroupsAzureFunctionReceiver[];
  /** The list of ARM role receivers that are part of this action group. Roles are Azure RBAC roles and only built-in roles are supported. */
  armRoleReceivers?: MicrosoftActionGroupsArmRoleReceiver[];
  /** The list of event hub receivers that are part of this action group. */
  eventHubReceivers?: MicrosoftActionGroupsEventHubReceiver[];
  /** The list of incident receivers that are part of this action group. */
  incidentReceivers?: MicrosoftActionGroupsIncidentReceiver[];
}

export function microsoftActionGroupsActionGroupSerializer(
  item: MicrosoftActionGroupsActionGroup,
): any {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : microsoftActionGroupsEmailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : microsoftActionGroupsSmsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : microsoftActionGroupsWebhookReceiverArraySerializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : microsoftActionGroupsItsmReceiverArraySerializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : microsoftActionGroupsAzureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : microsoftActionGroupsAutomationRunbookReceiverArraySerializer(
          item["automationRunbookReceivers"],
        ),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : microsoftActionGroupsVoiceReceiverArraySerializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : microsoftActionGroupsLogicAppReceiverArraySerializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : microsoftActionGroupsAzureFunctionReceiverArraySerializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : microsoftActionGroupsArmRoleReceiverArraySerializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : microsoftActionGroupsEventHubReceiverArraySerializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : microsoftActionGroupsIncidentReceiverArraySerializer(item["incidentReceivers"]),
  };
}

export function microsoftActionGroupsActionGroupDeserializer(
  item: any,
): MicrosoftActionGroupsActionGroup {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : microsoftActionGroupsEmailReceiverArrayDeserializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : microsoftActionGroupsSmsReceiverArrayDeserializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : microsoftActionGroupsWebhookReceiverArrayDeserializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : microsoftActionGroupsItsmReceiverArrayDeserializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : microsoftActionGroupsAzureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : microsoftActionGroupsAutomationRunbookReceiverArrayDeserializer(
          item["automationRunbookReceivers"],
        ),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : microsoftActionGroupsVoiceReceiverArrayDeserializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : microsoftActionGroupsLogicAppReceiverArrayDeserializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : microsoftActionGroupsAzureFunctionReceiverArrayDeserializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : microsoftActionGroupsArmRoleReceiverArrayDeserializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : microsoftActionGroupsEventHubReceiverArrayDeserializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : microsoftActionGroupsIncidentReceiverArrayDeserializer(item["incidentReceivers"]),
  };
}

export function microsoftActionGroupsEmailReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsEmailReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsEmailReceiverSerializer(item);
  });
}

export function microsoftActionGroupsEmailReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsEmailReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsEmailReceiverDeserializer(item);
  });
}

/** An email receiver. */
export interface MicrosoftActionGroupsEmailReceiver {
  /** The name of the email receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The email address of this receiver. */
  emailAddress: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** The receiver status of the e-mail. */
  readonly status?: MicrosoftActionGroupsReceiverStatus;
}

export function microsoftActionGroupsEmailReceiverSerializer(
  item: MicrosoftActionGroupsEmailReceiver,
): any {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function microsoftActionGroupsEmailReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsEmailReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    status: item["status"],
  };
}

/** Indicates the status of the receiver. Receivers that are not Enabled will not receive any communications. */
export type MicrosoftActionGroupsReceiverStatus = "NotSpecified" | "Enabled" | "Disabled";

export function microsoftActionGroupsSmsReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsSmsReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsSmsReceiverSerializer(item);
  });
}

export function microsoftActionGroupsSmsReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsSmsReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsSmsReceiverDeserializer(item);
  });
}

/** An SMS receiver. */
export interface MicrosoftActionGroupsSmsReceiver {
  /** The name of the SMS receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The country code of the SMS receiver. */
  countryCode: string;
  /** The phone number of the SMS receiver. */
  phoneNumber: string;
  /** The status of the receiver. */
  readonly status?: MicrosoftActionGroupsReceiverStatus;
}

export function microsoftActionGroupsSmsReceiverSerializer(
  item: MicrosoftActionGroupsSmsReceiver,
): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function microsoftActionGroupsSmsReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsSmsReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
    status: item["status"],
  };
}

export function microsoftActionGroupsWebhookReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsWebhookReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsWebhookReceiverSerializer(item);
  });
}

export function microsoftActionGroupsWebhookReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsWebhookReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsWebhookReceiverDeserializer(item);
  });
}

/** A webhook receiver. */
export interface MicrosoftActionGroupsWebhookReceiver {
  /** The name of the webhook receiver. Names must be unique across all receivers within an action group. */
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
  /** The principal id of the managed identity. The value can be "None", "SystemAssigned" */
  managedIdentity?: string;
}

export function microsoftActionGroupsWebhookReceiverSerializer(
  item: MicrosoftActionGroupsWebhookReceiver,
): any {
  return {
    name: item["name"],
    serviceUri: item["serviceUri"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    useAadAuth: item["useAadAuth"],
    objectId: item["objectId"],
    identifierUri: item["identifierUri"],
    tenantId: item["tenantId"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsWebhookReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsWebhookReceiver {
  return {
    name: item["name"],
    serviceUri: item["serviceUri"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    useAadAuth: item["useAadAuth"],
    objectId: item["objectId"],
    identifierUri: item["identifierUri"],
    tenantId: item["tenantId"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsItsmReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsItsmReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsItsmReceiverSerializer(item);
  });
}

export function microsoftActionGroupsItsmReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsItsmReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsItsmReceiverDeserializer(item);
  });
}

/** An Itsm receiver. */
export interface MicrosoftActionGroupsItsmReceiver {
  /** The name of the Itsm receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** OMS LA instance identifier. */
  workspaceId: string;
  /** Unique identification of ITSM connection among multiple defined in above workspace. */
  connectionId: string;
  /** JSON blob for the configurations of the ITSM action. CreateMultipleWorkItems option will be part of this blob as well. */
  ticketConfiguration: string;
  /** Region in which workspace resides. Supported values:'centralindia','japaneast','southeastasia','australiasoutheast','uksouth','westcentralus','canadacentral','eastus','westeurope' */
  region: string;
}

export function microsoftActionGroupsItsmReceiverSerializer(
  item: MicrosoftActionGroupsItsmReceiver,
): any {
  return {
    name: item["name"],
    workspaceId: item["workspaceId"],
    connectionId: item["connectionId"],
    ticketConfiguration: item["ticketConfiguration"],
    region: item["region"],
  };
}

export function microsoftActionGroupsItsmReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsItsmReceiver {
  return {
    name: item["name"],
    workspaceId: item["workspaceId"],
    connectionId: item["connectionId"],
    ticketConfiguration: item["ticketConfiguration"],
    region: item["region"],
  };
}

export function microsoftActionGroupsAzureAppPushReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsAzureAppPushReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsAzureAppPushReceiverSerializer(item);
  });
}

export function microsoftActionGroupsAzureAppPushReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsAzureAppPushReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsAzureAppPushReceiverDeserializer(item);
  });
}

/** The Azure mobile App push notification receiver. */
export interface MicrosoftActionGroupsAzureAppPushReceiver {
  /** The name of the Azure mobile app push receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The email address registered for the Azure mobile app. */
  emailAddress: string;
}

export function microsoftActionGroupsAzureAppPushReceiverSerializer(
  item: MicrosoftActionGroupsAzureAppPushReceiver,
): any {
  return { name: item["name"], emailAddress: item["emailAddress"] };
}

export function microsoftActionGroupsAzureAppPushReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsAzureAppPushReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
  };
}

export function microsoftActionGroupsAutomationRunbookReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsAutomationRunbookReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsAutomationRunbookReceiverSerializer(item);
  });
}

export function microsoftActionGroupsAutomationRunbookReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsAutomationRunbookReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsAutomationRunbookReceiverDeserializer(item);
  });
}

/** The Azure Automation Runbook notification receiver. */
export interface MicrosoftActionGroupsAutomationRunbookReceiver {
  /** The Azure automation account Id which holds this runbook and authenticate to Azure resource. */
  automationAccountId: string;
  /** The name for this runbook. */
  runbookName: string;
  /** The resource id for webhook linked to this runbook. */
  webhookResourceId: string;
  /** Indicates whether this instance is global runbook. */
  isGlobalRunbook: boolean;
  /** Indicates name of the webhook. */
  name?: string;
  /** The URI where webhooks should be sent. */
  serviceUri?: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** The principal id of the managed identity. The value can be "None", "SystemAssigned" */
  managedIdentity?: string;
}

export function microsoftActionGroupsAutomationRunbookReceiverSerializer(
  item: MicrosoftActionGroupsAutomationRunbookReceiver,
): any {
  return {
    automationAccountId: item["automationAccountId"],
    runbookName: item["runbookName"],
    webhookResourceId: item["webhookResourceId"],
    isGlobalRunbook: item["isGlobalRunbook"],
    name: item["name"],
    serviceUri: item["serviceUri"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsAutomationRunbookReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsAutomationRunbookReceiver {
  return {
    automationAccountId: item["automationAccountId"],
    runbookName: item["runbookName"],
    webhookResourceId: item["webhookResourceId"],
    isGlobalRunbook: item["isGlobalRunbook"],
    name: item["name"],
    serviceUri: item["serviceUri"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsVoiceReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsVoiceReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsVoiceReceiverSerializer(item);
  });
}

export function microsoftActionGroupsVoiceReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsVoiceReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsVoiceReceiverDeserializer(item);
  });
}

/** A voice receiver. */
export interface MicrosoftActionGroupsVoiceReceiver {
  /** The name of the voice receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The country code of the voice receiver. */
  countryCode: string;
  /** The phone number of the voice receiver. */
  phoneNumber: string;
}

export function microsoftActionGroupsVoiceReceiverSerializer(
  item: MicrosoftActionGroupsVoiceReceiver,
): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function microsoftActionGroupsVoiceReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsVoiceReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
  };
}

export function microsoftActionGroupsLogicAppReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsLogicAppReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsLogicAppReceiverSerializer(item);
  });
}

export function microsoftActionGroupsLogicAppReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsLogicAppReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsLogicAppReceiverDeserializer(item);
  });
}

/** A logic app receiver. */
export interface MicrosoftActionGroupsLogicAppReceiver {
  /** The name of the logic app receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The azure resource id of the logic app receiver. */
  resourceId: string;
  /** The callback url where http request sent to. */
  callbackUrl: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** The principal id of the managed identity. The value can be "None", "SystemAssigned" */
  managedIdentity?: string;
}

export function microsoftActionGroupsLogicAppReceiverSerializer(
  item: MicrosoftActionGroupsLogicAppReceiver,
): any {
  return {
    name: item["name"],
    resourceId: item["resourceId"],
    callbackUrl: item["callbackUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsLogicAppReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsLogicAppReceiver {
  return {
    name: item["name"],
    resourceId: item["resourceId"],
    callbackUrl: item["callbackUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsAzureFunctionReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsAzureFunctionReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsAzureFunctionReceiverSerializer(item);
  });
}

export function microsoftActionGroupsAzureFunctionReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsAzureFunctionReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsAzureFunctionReceiverDeserializer(item);
  });
}

/** An azure function receiver. */
export interface MicrosoftActionGroupsAzureFunctionReceiver {
  /** The name of the azure function receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The azure resource id of the function app. */
  functionAppResourceId: string;
  /** The function name in the function app. */
  functionName: string;
  /** The http trigger url where http request sent to. */
  httpTriggerUrl: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** The principal id of the managed identity. The value can be "None", "SystemAssigned" */
  managedIdentity?: string;
}

export function microsoftActionGroupsAzureFunctionReceiverSerializer(
  item: MicrosoftActionGroupsAzureFunctionReceiver,
): any {
  return {
    name: item["name"],
    functionAppResourceId: item["functionAppResourceId"],
    functionName: item["functionName"],
    httpTriggerUrl: item["httpTriggerUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsAzureFunctionReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsAzureFunctionReceiver {
  return {
    name: item["name"],
    functionAppResourceId: item["functionAppResourceId"],
    functionName: item["functionName"],
    httpTriggerUrl: item["httpTriggerUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsArmRoleReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsArmRoleReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsArmRoleReceiverSerializer(item);
  });
}

export function microsoftActionGroupsArmRoleReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsArmRoleReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsArmRoleReceiverDeserializer(item);
  });
}

/** An arm role receiver. */
export interface MicrosoftActionGroupsArmRoleReceiver {
  /** The name of the arm role receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The arm role id. */
  roleId: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
}

export function microsoftActionGroupsArmRoleReceiverSerializer(
  item: MicrosoftActionGroupsArmRoleReceiver,
): any {
  return {
    name: item["name"],
    roleId: item["roleId"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function microsoftActionGroupsArmRoleReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsArmRoleReceiver {
  return {
    name: item["name"],
    roleId: item["roleId"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function microsoftActionGroupsEventHubReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsEventHubReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsEventHubReceiverSerializer(item);
  });
}

export function microsoftActionGroupsEventHubReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsEventHubReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsEventHubReceiverDeserializer(item);
  });
}

/** An Event hub receiver. */
export interface MicrosoftActionGroupsEventHubReceiver {
  /** The name of the Event hub receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The Event Hub namespace */
  eventHubNameSpace: string;
  /** The name of the specific Event Hub queue */
  eventHubName: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** The tenant Id for the subscription containing this event hub */
  tenantId?: string;
  /** The Id for the subscription containing this event hub */
  subscriptionId: string;
  /** The principal id of the managed identity. The value can be "None", "SystemAssigned" */
  managedIdentity?: string;
}

export function microsoftActionGroupsEventHubReceiverSerializer(
  item: MicrosoftActionGroupsEventHubReceiver,
): any {
  return {
    name: item["name"],
    eventHubNameSpace: item["eventHubNameSpace"],
    eventHubName: item["eventHubName"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsEventHubReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsEventHubReceiver {
  return {
    name: item["name"],
    eventHubNameSpace: item["eventHubNameSpace"],
    eventHubName: item["eventHubName"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    managedIdentity: item["managedIdentity"],
  };
}

export function microsoftActionGroupsIncidentReceiverArraySerializer(
  result: Array<MicrosoftActionGroupsIncidentReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsIncidentReceiverSerializer(item);
  });
}

export function microsoftActionGroupsIncidentReceiverArrayDeserializer(
  result: Array<MicrosoftActionGroupsIncidentReceiver>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsIncidentReceiverDeserializer(item);
  });
}

/** An Incident receiver. */
export interface MicrosoftActionGroupsIncidentReceiver {
  /** The name of the Incident receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The incident service connection */
  connection: MicrosoftActionGroupsIncidentServiceConnection;
  /** The incident management service type */
  incidentManagementService: MicrosoftActionGroupsIncidentManagementService;
  /** Field mappings for the incident service */
  mappings: Record<string, string>;
}

export function microsoftActionGroupsIncidentReceiverSerializer(
  item: MicrosoftActionGroupsIncidentReceiver,
): any {
  return {
    name: item["name"],
    connection: microsoftActionGroupsIncidentServiceConnectionSerializer(item["connection"]),
    incidentManagementService: item["incidentManagementService"],
    mappings: item["mappings"],
  };
}

export function microsoftActionGroupsIncidentReceiverDeserializer(
  item: any,
): MicrosoftActionGroupsIncidentReceiver {
  return {
    name: item["name"],
    connection: microsoftActionGroupsIncidentServiceConnectionDeserializer(item["connection"]),
    incidentManagementService: item["incidentManagementService"],
    mappings: Object.fromEntries(
      Object.entries(item["mappings"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The connection info for Incident Receiver. */
export interface MicrosoftActionGroupsIncidentServiceConnection {
  /** The name of the connection. */
  name: string;
  /** GUID value representing the connection ID for the incident management service. */
  id: string;
}

export function microsoftActionGroupsIncidentServiceConnectionSerializer(
  item: MicrosoftActionGroupsIncidentServiceConnection,
): any {
  return { name: item["name"], id: item["id"] };
}

export function microsoftActionGroupsIncidentServiceConnectionDeserializer(
  item: any,
): MicrosoftActionGroupsIncidentServiceConnection {
  return {
    name: item["name"],
    id: item["id"],
  };
}

/** The incident management service type */
export enum KnownMicrosoftActionGroupsIncidentManagementService {
  /** Icm */
  Icm = "Icm",
}

/**
 * The incident management service type \
 * {@link KnownMicrosoftActionGroupsIncidentManagementService} can be used interchangeably with MicrosoftActionGroupsIncidentManagementService,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Icm**: Icm
 */
export type MicrosoftActionGroupsIncidentManagementService = string;

/** Describes the format of Error response. */
export interface MicrosoftActionGroupsErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function microsoftActionGroupsErrorResponseDeserializer(
  item: any,
): MicrosoftActionGroupsErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** An action group object for the body of patch operations. */
export interface MicrosoftActionGroupsActionGroupPatchBody {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function microsoftActionGroupsActionGroupPatchBodySerializer(
  item: MicrosoftActionGroupsActionGroupPatchBody,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _actionGroupPatchBodyPropertiesSerializer(item),
  };
}

/** An Azure action group for patch operations. */
export interface MicrosoftActionGroupsActionGroupPatch {
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function microsoftActionGroupsActionGroupPatchSerializer(
  item: MicrosoftActionGroupsActionGroupPatch,
): any {
  return { enabled: item["enabled"] };
}

/** A list of action groups. */
export interface _MicrosoftActionGroupsActionGroupList {
  /** The ActionGroupResource items on this page */
  value: MicrosoftActionGroupsActionGroupResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _microsoftActionGroupsActionGroupListDeserializer(
  item: any,
): _MicrosoftActionGroupsActionGroupList {
  return {
    value: microsoftActionGroupsActionGroupResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftActionGroupsActionGroupResourceArraySerializer(
  result: Array<MicrosoftActionGroupsActionGroupResource>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsActionGroupResourceSerializer(item);
  });
}

export function microsoftActionGroupsActionGroupResourceArrayDeserializer(
  result: Array<MicrosoftActionGroupsActionGroupResource>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsActionGroupResourceDeserializer(item);
  });
}

/** The request body which contain contact detail metadata */
export interface MicrosoftActionGroupsNotificationRequestBody {
  /** The value of the supported alert type. Supported alert type values are: servicehealth, metricstaticthreshold, metricsdynamicthreshold, logalertv2, smartalert, webtestalert, logalertv1numresult, logalertv1metricmeasurement, resourcehealth, activitylog, actualcostbudget, forecastedbudget */
  alertType: string;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: MicrosoftActionGroupsEmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: MicrosoftActionGroupsSmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: MicrosoftActionGroupsWebhookReceiver[];
  /** The list of ITSM receivers that are part of this action group. */
  itsmReceivers?: MicrosoftActionGroupsItsmReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: MicrosoftActionGroupsAzureAppPushReceiver[];
  /** The list of AutomationRunbook receivers that are part of this action group. */
  automationRunbookReceivers?: MicrosoftActionGroupsAutomationRunbookReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: MicrosoftActionGroupsVoiceReceiver[];
  /** The list of logic app receivers that are part of this action group. */
  logicAppReceivers?: MicrosoftActionGroupsLogicAppReceiver[];
  /** The list of azure function receivers that are part of this action group. */
  azureFunctionReceivers?: MicrosoftActionGroupsAzureFunctionReceiver[];
  /** The list of ARM role receivers that are part of this action group. Roles are Azure RBAC roles and only built-in roles are supported. */
  armRoleReceivers?: MicrosoftActionGroupsArmRoleReceiver[];
  /** The list of event hub receivers that are part of this action group. */
  eventHubReceivers?: MicrosoftActionGroupsEventHubReceiver[];
  /** The list of incident receivers that are part of this action group. */
  incidentReceivers?: MicrosoftActionGroupsIncidentReceiver[];
}

export function microsoftActionGroupsNotificationRequestBodySerializer(
  item: MicrosoftActionGroupsNotificationRequestBody,
): any {
  return {
    alertType: item["alertType"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : microsoftActionGroupsEmailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : microsoftActionGroupsSmsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : microsoftActionGroupsWebhookReceiverArraySerializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : microsoftActionGroupsItsmReceiverArraySerializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : microsoftActionGroupsAzureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : microsoftActionGroupsAutomationRunbookReceiverArraySerializer(
          item["automationRunbookReceivers"],
        ),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : microsoftActionGroupsVoiceReceiverArraySerializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : microsoftActionGroupsLogicAppReceiverArraySerializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : microsoftActionGroupsAzureFunctionReceiverArraySerializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : microsoftActionGroupsArmRoleReceiverArraySerializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : microsoftActionGroupsEventHubReceiverArraySerializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : microsoftActionGroupsIncidentReceiverArraySerializer(item["incidentReceivers"]),
  };
}

/** The details of the test notification results. */
export interface MicrosoftActionGroupsTestNotificationDetailsResponse {
  /** The context info */
  context?: MicrosoftActionGroupsContext;
  /** The overall state */
  state: string;
  /** The completed time */
  completedTime?: string;
  /** The created time */
  createdTime?: string;
  /** The list of action detail */
  actionDetails?: MicrosoftActionGroupsActionDetail[];
}

export function microsoftActionGroupsTestNotificationDetailsResponseDeserializer(
  item: any,
): MicrosoftActionGroupsTestNotificationDetailsResponse {
  return {
    context: !item["context"]
      ? item["context"]
      : microsoftActionGroupsContextDeserializer(item["context"]),
    state: item["state"],
    completedTime: item["completedTime"],
    createdTime: item["createdTime"],
    actionDetails: !item["actionDetails"]
      ? item["actionDetails"]
      : microsoftActionGroupsActionDetailArrayDeserializer(item["actionDetails"]),
  };
}

/** The context info */
export interface MicrosoftActionGroupsContext {
  /** The source of the notification request */
  notificationSource?: string;
  /** The context id type */
  contextType?: string;
}

export function microsoftActionGroupsContextDeserializer(item: any): MicrosoftActionGroupsContext {
  return {
    notificationSource: item["notificationSource"],
    contextType: item["contextType"],
  };
}

export function microsoftActionGroupsActionDetailArrayDeserializer(
  result: Array<MicrosoftActionGroupsActionDetail>,
): any[] {
  return result.map((item) => {
    return microsoftActionGroupsActionDetailDeserializer(item);
  });
}

/** The action detail */
export interface MicrosoftActionGroupsActionDetail {
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
  detail?: string;
}

export function microsoftActionGroupsActionDetailDeserializer(
  item: any,
): MicrosoftActionGroupsActionDetail {
  return {
    mechanismType: item["MechanismType"],
    name: item["Name"],
    status: item["Status"],
    subState: item["SubState"],
    sendTime: item["SendTime"],
    detail: item["Detail"],
  };
}

/** Describes a receiver that should be resubscribed. */
export interface MicrosoftActionGroupsEnableRequest {
  /** The name of the receiver to resubscribe. */
  receiverName: string;
}

export function microsoftActionGroupsEnableRequestSerializer(
  item: MicrosoftActionGroupsEnableRequest,
): any {
  return { receiverName: item["receiverName"] };
}

export function _actionGroupResourcePropertiesSerializer(
  item: MicrosoftActionGroupsActionGroupResource,
): any {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : microsoftActionGroupsEmailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : microsoftActionGroupsSmsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : microsoftActionGroupsWebhookReceiverArraySerializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : microsoftActionGroupsItsmReceiverArraySerializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : microsoftActionGroupsAzureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : microsoftActionGroupsAutomationRunbookReceiverArraySerializer(
          item["automationRunbookReceivers"],
        ),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : microsoftActionGroupsVoiceReceiverArraySerializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : microsoftActionGroupsLogicAppReceiverArraySerializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : microsoftActionGroupsAzureFunctionReceiverArraySerializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : microsoftActionGroupsArmRoleReceiverArraySerializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : microsoftActionGroupsEventHubReceiverArraySerializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : microsoftActionGroupsIncidentReceiverArraySerializer(item["incidentReceivers"]),
  };
}

export function _actionGroupResourcePropertiesDeserializer(item: any) {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : microsoftActionGroupsEmailReceiverArrayDeserializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : microsoftActionGroupsSmsReceiverArrayDeserializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : microsoftActionGroupsWebhookReceiverArrayDeserializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : microsoftActionGroupsItsmReceiverArrayDeserializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : microsoftActionGroupsAzureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : microsoftActionGroupsAutomationRunbookReceiverArrayDeserializer(
          item["automationRunbookReceivers"],
        ),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : microsoftActionGroupsVoiceReceiverArrayDeserializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : microsoftActionGroupsLogicAppReceiverArrayDeserializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : microsoftActionGroupsAzureFunctionReceiverArrayDeserializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : microsoftActionGroupsArmRoleReceiverArrayDeserializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : microsoftActionGroupsEventHubReceiverArrayDeserializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : microsoftActionGroupsIncidentReceiverArrayDeserializer(item["incidentReceivers"]),
  };
}

export function _actionGroupPatchBodyPropertiesSerializer(
  item: MicrosoftActionGroupsActionGroupPatchBody,
): any {
  return { enabled: item["enabled"] };
}

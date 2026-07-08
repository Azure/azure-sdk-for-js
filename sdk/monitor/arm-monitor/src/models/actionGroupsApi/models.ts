// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ManagedServiceIdentity, TrackedResource } from "../models.js";
import {
  systemDataDeserializer,
  managedServiceIdentitySerializer,
  managedServiceIdentityDeserializer,
} from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An action group resource. */
export interface ActionGroupsApiActionGroupResource extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName?: string;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its receivers will receive communications. */
  enabled?: boolean;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: ActionGroupsApiEmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: ActionGroupsApiSmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: ActionGroupsApiWebhookReceiver[];
  /** The list of ITSM receivers that are part of this action group. */
  itsmReceivers?: ActionGroupsApiItsmReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: ActionGroupsApiAzureAppPushReceiver[];
  /** The list of AutomationRunbook receivers that are part of this action group. */
  automationRunbookReceivers?: ActionGroupsApiAutomationRunbookReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: ActionGroupsApiVoiceReceiver[];
  /** The list of logic app receivers that are part of this action group. */
  logicAppReceivers?: ActionGroupsApiLogicAppReceiver[];
  /** The list of azure function receivers that are part of this action group. */
  azureFunctionReceivers?: ActionGroupsApiAzureFunctionReceiver[];
  /** The list of ARM role receivers that are part of this action group. Roles are Azure RBAC roles and only built-in roles are supported. */
  armRoleReceivers?: ActionGroupsApiArmRoleReceiver[];
  /** The list of event hub receivers that are part of this action group. */
  eventHubReceivers?: ActionGroupsApiEventHubReceiver[];
  /** The list of incident receivers that are part of this action group. */
  incidentReceivers?: ActionGroupsApiIncidentReceiver[];
}

export function actionGroupsApiActionGroupResourceSerializer(
  item: ActionGroupsApiActionGroupResource,
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

export function actionGroupsApiActionGroupResourceDeserializer(
  item: any,
): ActionGroupsApiActionGroupResource {
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
export interface ActionGroupsApiActionGroup {
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName: string;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its receivers will receive communications. */
  enabled: boolean;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: ActionGroupsApiEmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: ActionGroupsApiSmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: ActionGroupsApiWebhookReceiver[];
  /** The list of ITSM receivers that are part of this action group. */
  itsmReceivers?: ActionGroupsApiItsmReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: ActionGroupsApiAzureAppPushReceiver[];
  /** The list of AutomationRunbook receivers that are part of this action group. */
  automationRunbookReceivers?: ActionGroupsApiAutomationRunbookReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: ActionGroupsApiVoiceReceiver[];
  /** The list of logic app receivers that are part of this action group. */
  logicAppReceivers?: ActionGroupsApiLogicAppReceiver[];
  /** The list of azure function receivers that are part of this action group. */
  azureFunctionReceivers?: ActionGroupsApiAzureFunctionReceiver[];
  /** The list of ARM role receivers that are part of this action group. Roles are Azure RBAC roles and only built-in roles are supported. */
  armRoleReceivers?: ActionGroupsApiArmRoleReceiver[];
  /** The list of event hub receivers that are part of this action group. */
  eventHubReceivers?: ActionGroupsApiEventHubReceiver[];
  /** The list of incident receivers that are part of this action group. */
  incidentReceivers?: ActionGroupsApiIncidentReceiver[];
}

export function actionGroupsApiActionGroupSerializer(item: ActionGroupsApiActionGroup): any {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : actionGroupsApiEmailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : actionGroupsApiSmsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : actionGroupsApiWebhookReceiverArraySerializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : actionGroupsApiItsmReceiverArraySerializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : actionGroupsApiAzureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : actionGroupsApiAutomationRunbookReceiverArraySerializer(item["automationRunbookReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : actionGroupsApiVoiceReceiverArraySerializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : actionGroupsApiLogicAppReceiverArraySerializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : actionGroupsApiAzureFunctionReceiverArraySerializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : actionGroupsApiArmRoleReceiverArraySerializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : actionGroupsApiEventHubReceiverArraySerializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : actionGroupsApiIncidentReceiverArraySerializer(item["incidentReceivers"]),
  };
}

export function actionGroupsApiActionGroupDeserializer(item: any): ActionGroupsApiActionGroup {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : actionGroupsApiEmailReceiverArrayDeserializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : actionGroupsApiSmsReceiverArrayDeserializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : actionGroupsApiWebhookReceiverArrayDeserializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : actionGroupsApiItsmReceiverArrayDeserializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : actionGroupsApiAzureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : actionGroupsApiAutomationRunbookReceiverArrayDeserializer(
          item["automationRunbookReceivers"],
        ),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : actionGroupsApiVoiceReceiverArrayDeserializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : actionGroupsApiLogicAppReceiverArrayDeserializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : actionGroupsApiAzureFunctionReceiverArrayDeserializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : actionGroupsApiArmRoleReceiverArrayDeserializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : actionGroupsApiEventHubReceiverArrayDeserializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : actionGroupsApiIncidentReceiverArrayDeserializer(item["incidentReceivers"]),
  };
}

export function actionGroupsApiEmailReceiverArraySerializer(
  result: Array<ActionGroupsApiEmailReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiEmailReceiverSerializer(item);
  });
}

export function actionGroupsApiEmailReceiverArrayDeserializer(
  result: Array<ActionGroupsApiEmailReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiEmailReceiverDeserializer(item);
  });
}

/** An email receiver. */
export interface ActionGroupsApiEmailReceiver {
  /** The name of the email receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The email address of this receiver. */
  emailAddress: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** The receiver status of the e-mail. */
  readonly status?: ActionGroupsApiReceiverStatus;
}

export function actionGroupsApiEmailReceiverSerializer(item: ActionGroupsApiEmailReceiver): any {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function actionGroupsApiEmailReceiverDeserializer(item: any): ActionGroupsApiEmailReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    status: item["status"],
  };
}

/** Indicates the status of the receiver. Receivers that are not Enabled will not receive any communications. */
export type ActionGroupsApiReceiverStatus = "NotSpecified" | "Enabled" | "Disabled";

export function actionGroupsApiSmsReceiverArraySerializer(
  result: Array<ActionGroupsApiSmsReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiSmsReceiverSerializer(item);
  });
}

export function actionGroupsApiSmsReceiverArrayDeserializer(
  result: Array<ActionGroupsApiSmsReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiSmsReceiverDeserializer(item);
  });
}

/** An SMS receiver. */
export interface ActionGroupsApiSmsReceiver {
  /** The name of the SMS receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The country code of the SMS receiver. */
  countryCode: string;
  /** The phone number of the SMS receiver. */
  phoneNumber: string;
  /** The status of the receiver. */
  readonly status?: ActionGroupsApiReceiverStatus;
}

export function actionGroupsApiSmsReceiverSerializer(item: ActionGroupsApiSmsReceiver): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function actionGroupsApiSmsReceiverDeserializer(item: any): ActionGroupsApiSmsReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
    status: item["status"],
  };
}

export function actionGroupsApiWebhookReceiverArraySerializer(
  result: Array<ActionGroupsApiWebhookReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiWebhookReceiverSerializer(item);
  });
}

export function actionGroupsApiWebhookReceiverArrayDeserializer(
  result: Array<ActionGroupsApiWebhookReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiWebhookReceiverDeserializer(item);
  });
}

/** A webhook receiver. */
export interface ActionGroupsApiWebhookReceiver {
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

export function actionGroupsApiWebhookReceiverSerializer(
  item: ActionGroupsApiWebhookReceiver,
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

export function actionGroupsApiWebhookReceiverDeserializer(
  item: any,
): ActionGroupsApiWebhookReceiver {
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

export function actionGroupsApiItsmReceiverArraySerializer(
  result: Array<ActionGroupsApiItsmReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiItsmReceiverSerializer(item);
  });
}

export function actionGroupsApiItsmReceiverArrayDeserializer(
  result: Array<ActionGroupsApiItsmReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiItsmReceiverDeserializer(item);
  });
}

/** An Itsm receiver. */
export interface ActionGroupsApiItsmReceiver {
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

export function actionGroupsApiItsmReceiverSerializer(item: ActionGroupsApiItsmReceiver): any {
  return {
    name: item["name"],
    workspaceId: item["workspaceId"],
    connectionId: item["connectionId"],
    ticketConfiguration: item["ticketConfiguration"],
    region: item["region"],
  };
}

export function actionGroupsApiItsmReceiverDeserializer(item: any): ActionGroupsApiItsmReceiver {
  return {
    name: item["name"],
    workspaceId: item["workspaceId"],
    connectionId: item["connectionId"],
    ticketConfiguration: item["ticketConfiguration"],
    region: item["region"],
  };
}

export function actionGroupsApiAzureAppPushReceiverArraySerializer(
  result: Array<ActionGroupsApiAzureAppPushReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiAzureAppPushReceiverSerializer(item);
  });
}

export function actionGroupsApiAzureAppPushReceiverArrayDeserializer(
  result: Array<ActionGroupsApiAzureAppPushReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiAzureAppPushReceiverDeserializer(item);
  });
}

/** The Azure mobile App push notification receiver. */
export interface ActionGroupsApiAzureAppPushReceiver {
  /** The name of the Azure mobile app push receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The email address registered for the Azure mobile app. */
  emailAddress: string;
}

export function actionGroupsApiAzureAppPushReceiverSerializer(
  item: ActionGroupsApiAzureAppPushReceiver,
): any {
  return { name: item["name"], emailAddress: item["emailAddress"] };
}

export function actionGroupsApiAzureAppPushReceiverDeserializer(
  item: any,
): ActionGroupsApiAzureAppPushReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
  };
}

export function actionGroupsApiAutomationRunbookReceiverArraySerializer(
  result: Array<ActionGroupsApiAutomationRunbookReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiAutomationRunbookReceiverSerializer(item);
  });
}

export function actionGroupsApiAutomationRunbookReceiverArrayDeserializer(
  result: Array<ActionGroupsApiAutomationRunbookReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiAutomationRunbookReceiverDeserializer(item);
  });
}

/** The Azure Automation Runbook notification receiver. */
export interface ActionGroupsApiAutomationRunbookReceiver {
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

export function actionGroupsApiAutomationRunbookReceiverSerializer(
  item: ActionGroupsApiAutomationRunbookReceiver,
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

export function actionGroupsApiAutomationRunbookReceiverDeserializer(
  item: any,
): ActionGroupsApiAutomationRunbookReceiver {
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

export function actionGroupsApiVoiceReceiverArraySerializer(
  result: Array<ActionGroupsApiVoiceReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiVoiceReceiverSerializer(item);
  });
}

export function actionGroupsApiVoiceReceiverArrayDeserializer(
  result: Array<ActionGroupsApiVoiceReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiVoiceReceiverDeserializer(item);
  });
}

/** A voice receiver. */
export interface ActionGroupsApiVoiceReceiver {
  /** The name of the voice receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The country code of the voice receiver. */
  countryCode: string;
  /** The phone number of the voice receiver. */
  phoneNumber: string;
}

export function actionGroupsApiVoiceReceiverSerializer(item: ActionGroupsApiVoiceReceiver): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function actionGroupsApiVoiceReceiverDeserializer(item: any): ActionGroupsApiVoiceReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
  };
}

export function actionGroupsApiLogicAppReceiverArraySerializer(
  result: Array<ActionGroupsApiLogicAppReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiLogicAppReceiverSerializer(item);
  });
}

export function actionGroupsApiLogicAppReceiverArrayDeserializer(
  result: Array<ActionGroupsApiLogicAppReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiLogicAppReceiverDeserializer(item);
  });
}

/** A logic app receiver. */
export interface ActionGroupsApiLogicAppReceiver {
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

export function actionGroupsApiLogicAppReceiverSerializer(
  item: ActionGroupsApiLogicAppReceiver,
): any {
  return {
    name: item["name"],
    resourceId: item["resourceId"],
    callbackUrl: item["callbackUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function actionGroupsApiLogicAppReceiverDeserializer(
  item: any,
): ActionGroupsApiLogicAppReceiver {
  return {
    name: item["name"],
    resourceId: item["resourceId"],
    callbackUrl: item["callbackUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function actionGroupsApiAzureFunctionReceiverArraySerializer(
  result: Array<ActionGroupsApiAzureFunctionReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiAzureFunctionReceiverSerializer(item);
  });
}

export function actionGroupsApiAzureFunctionReceiverArrayDeserializer(
  result: Array<ActionGroupsApiAzureFunctionReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiAzureFunctionReceiverDeserializer(item);
  });
}

/** An azure function receiver. */
export interface ActionGroupsApiAzureFunctionReceiver {
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

export function actionGroupsApiAzureFunctionReceiverSerializer(
  item: ActionGroupsApiAzureFunctionReceiver,
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

export function actionGroupsApiAzureFunctionReceiverDeserializer(
  item: any,
): ActionGroupsApiAzureFunctionReceiver {
  return {
    name: item["name"],
    functionAppResourceId: item["functionAppResourceId"],
    functionName: item["functionName"],
    httpTriggerUrl: item["httpTriggerUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function actionGroupsApiArmRoleReceiverArraySerializer(
  result: Array<ActionGroupsApiArmRoleReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiArmRoleReceiverSerializer(item);
  });
}

export function actionGroupsApiArmRoleReceiverArrayDeserializer(
  result: Array<ActionGroupsApiArmRoleReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiArmRoleReceiverDeserializer(item);
  });
}

/** An arm role receiver. */
export interface ActionGroupsApiArmRoleReceiver {
  /** The name of the arm role receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The arm role id. */
  roleId: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
}

export function actionGroupsApiArmRoleReceiverSerializer(
  item: ActionGroupsApiArmRoleReceiver,
): any {
  return {
    name: item["name"],
    roleId: item["roleId"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function actionGroupsApiArmRoleReceiverDeserializer(
  item: any,
): ActionGroupsApiArmRoleReceiver {
  return {
    name: item["name"],
    roleId: item["roleId"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function actionGroupsApiEventHubReceiverArraySerializer(
  result: Array<ActionGroupsApiEventHubReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiEventHubReceiverSerializer(item);
  });
}

export function actionGroupsApiEventHubReceiverArrayDeserializer(
  result: Array<ActionGroupsApiEventHubReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiEventHubReceiverDeserializer(item);
  });
}

/** An Event hub receiver. */
export interface ActionGroupsApiEventHubReceiver {
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

export function actionGroupsApiEventHubReceiverSerializer(
  item: ActionGroupsApiEventHubReceiver,
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

export function actionGroupsApiEventHubReceiverDeserializer(
  item: any,
): ActionGroupsApiEventHubReceiver {
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

export function actionGroupsApiIncidentReceiverArraySerializer(
  result: Array<ActionGroupsApiIncidentReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiIncidentReceiverSerializer(item);
  });
}

export function actionGroupsApiIncidentReceiverArrayDeserializer(
  result: Array<ActionGroupsApiIncidentReceiver>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiIncidentReceiverDeserializer(item);
  });
}

/** An Incident receiver. */
export interface ActionGroupsApiIncidentReceiver {
  /** The name of the Incident receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The incident service connection */
  connection: ActionGroupsApiIncidentServiceConnection;
  /** The incident management service type */
  incidentManagementService: ActionGroupsApiIncidentManagementService;
  /** Field mappings for the incident service */
  mappings: Record<string, string>;
}

export function actionGroupsApiIncidentReceiverSerializer(
  item: ActionGroupsApiIncidentReceiver,
): any {
  return {
    name: item["name"],
    connection: actionGroupsApiIncidentServiceConnectionSerializer(item["connection"]),
    incidentManagementService: item["incidentManagementService"],
    mappings: item["mappings"],
  };
}

export function actionGroupsApiIncidentReceiverDeserializer(
  item: any,
): ActionGroupsApiIncidentReceiver {
  return {
    name: item["name"],
    connection: actionGroupsApiIncidentServiceConnectionDeserializer(item["connection"]),
    incidentManagementService: item["incidentManagementService"],
    mappings: Object.fromEntries(
      Object.entries(item["mappings"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The connection info for Incident Receiver. */
export interface ActionGroupsApiIncidentServiceConnection {
  /** The name of the connection. */
  name: string;
  /** GUID value representing the connection ID for the incident management service. */
  id: string;
}

export function actionGroupsApiIncidentServiceConnectionSerializer(
  item: ActionGroupsApiIncidentServiceConnection,
): any {
  return { name: item["name"], id: item["id"] };
}

export function actionGroupsApiIncidentServiceConnectionDeserializer(
  item: any,
): ActionGroupsApiIncidentServiceConnection {
  return {
    name: item["name"],
    id: item["id"],
  };
}

/** The incident management service type */
export enum KnownActionGroupsApiIncidentManagementService {
  /** Icm */
  Icm = "Icm",
}

/**
 * The incident management service type \
 * {@link KnownActionGroupsApiIncidentManagementService} can be used interchangeably with ActionGroupsApiIncidentManagementService,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Icm**: Icm
 */
export type ActionGroupsApiIncidentManagementService = string;

/** An action group object for the body of patch operations. */
export interface ActionGroupsApiActionGroupPatchBody {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function actionGroupsApiActionGroupPatchBodySerializer(
  item: ActionGroupsApiActionGroupPatchBody,
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
export interface ActionGroupsApiActionGroupPatch {
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function actionGroupsApiActionGroupPatchSerializer(
  item: ActionGroupsApiActionGroupPatch,
): any {
  return { enabled: item["enabled"] };
}

/** A list of action groups. */
export interface _ActionGroupsApiActionGroupList {
  /** The ActionGroupResource items on this page */
  value: ActionGroupsApiActionGroupResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _actionGroupsApiActionGroupListDeserializer(
  item: any,
): _ActionGroupsApiActionGroupList {
  return {
    value: actionGroupsApiActionGroupResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function actionGroupsApiActionGroupResourceArraySerializer(
  result: Array<ActionGroupsApiActionGroupResource>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiActionGroupResourceSerializer(item);
  });
}

export function actionGroupsApiActionGroupResourceArrayDeserializer(
  result: Array<ActionGroupsApiActionGroupResource>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiActionGroupResourceDeserializer(item);
  });
}

/** The request body which contain contact detail metadata */
export interface ActionGroupsApiNotificationRequestBody {
  /** The value of the supported alert type. Supported alert type values are: servicehealth, metricstaticthreshold, metricsdynamicthreshold, logalertv2, smartalert, webtestalert, logalertv1numresult, logalertv1metricmeasurement, resourcehealth, activitylog, actualcostbudget, forecastedbudget */
  alertType: string;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: ActionGroupsApiEmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: ActionGroupsApiSmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: ActionGroupsApiWebhookReceiver[];
  /** The list of ITSM receivers that are part of this action group. */
  itsmReceivers?: ActionGroupsApiItsmReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: ActionGroupsApiAzureAppPushReceiver[];
  /** The list of AutomationRunbook receivers that are part of this action group. */
  automationRunbookReceivers?: ActionGroupsApiAutomationRunbookReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: ActionGroupsApiVoiceReceiver[];
  /** The list of logic app receivers that are part of this action group. */
  logicAppReceivers?: ActionGroupsApiLogicAppReceiver[];
  /** The list of azure function receivers that are part of this action group. */
  azureFunctionReceivers?: ActionGroupsApiAzureFunctionReceiver[];
  /** The list of ARM role receivers that are part of this action group. Roles are Azure RBAC roles and only built-in roles are supported. */
  armRoleReceivers?: ActionGroupsApiArmRoleReceiver[];
  /** The list of event hub receivers that are part of this action group. */
  eventHubReceivers?: ActionGroupsApiEventHubReceiver[];
  /** The list of incident receivers that are part of this action group. */
  incidentReceivers?: ActionGroupsApiIncidentReceiver[];
}

export function actionGroupsApiNotificationRequestBodySerializer(
  item: ActionGroupsApiNotificationRequestBody,
): any {
  return {
    alertType: item["alertType"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : actionGroupsApiEmailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : actionGroupsApiSmsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : actionGroupsApiWebhookReceiverArraySerializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : actionGroupsApiItsmReceiverArraySerializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : actionGroupsApiAzureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : actionGroupsApiAutomationRunbookReceiverArraySerializer(item["automationRunbookReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : actionGroupsApiVoiceReceiverArraySerializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : actionGroupsApiLogicAppReceiverArraySerializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : actionGroupsApiAzureFunctionReceiverArraySerializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : actionGroupsApiArmRoleReceiverArraySerializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : actionGroupsApiEventHubReceiverArraySerializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : actionGroupsApiIncidentReceiverArraySerializer(item["incidentReceivers"]),
  };
}

/** The details of the test notification results. */
export interface ActionGroupsApiTestNotificationDetailsResponse {
  /** The context info */
  context?: ActionGroupsApiContext;
  /** The overall state */
  state: string;
  /** The completed time */
  completedTime?: string;
  /** The created time */
  createdTime?: string;
  /** The list of action detail */
  actionDetails?: ActionGroupsApiActionDetail[];
}

export function actionGroupsApiTestNotificationDetailsResponseDeserializer(
  item: any,
): ActionGroupsApiTestNotificationDetailsResponse {
  return {
    context: !item["context"]
      ? item["context"]
      : actionGroupsApiContextDeserializer(item["context"]),
    state: item["state"],
    completedTime: item["completedTime"],
    createdTime: item["createdTime"],
    actionDetails: !item["actionDetails"]
      ? item["actionDetails"]
      : actionGroupsApiActionDetailArrayDeserializer(item["actionDetails"]),
  };
}

/** The context info */
export interface ActionGroupsApiContext {
  /** The source of the notification request */
  notificationSource?: string;
  /** The context id type */
  contextType?: string;
}

export function actionGroupsApiContextDeserializer(item: any): ActionGroupsApiContext {
  return {
    notificationSource: item["notificationSource"],
    contextType: item["contextType"],
  };
}

export function actionGroupsApiActionDetailArrayDeserializer(
  result: Array<ActionGroupsApiActionDetail>,
): any[] {
  return result.map((item) => {
    return actionGroupsApiActionDetailDeserializer(item);
  });
}

/** The action detail */
export interface ActionGroupsApiActionDetail {
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

export function actionGroupsApiActionDetailDeserializer(item: any): ActionGroupsApiActionDetail {
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
export interface ActionGroupsApiEnableRequest {
  /** The name of the receiver to resubscribe. */
  receiverName: string;
}

export function actionGroupsApiEnableRequestSerializer(item: ActionGroupsApiEnableRequest): any {
  return { receiverName: item["receiverName"] };
}

export function _actionGroupResourcePropertiesSerializer(
  item: ActionGroupsApiActionGroupResource,
): any {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : actionGroupsApiEmailReceiverArraySerializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : actionGroupsApiSmsReceiverArraySerializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : actionGroupsApiWebhookReceiverArraySerializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : actionGroupsApiItsmReceiverArraySerializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : actionGroupsApiAzureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : actionGroupsApiAutomationRunbookReceiverArraySerializer(item["automationRunbookReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : actionGroupsApiVoiceReceiverArraySerializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : actionGroupsApiLogicAppReceiverArraySerializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : actionGroupsApiAzureFunctionReceiverArraySerializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : actionGroupsApiArmRoleReceiverArraySerializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : actionGroupsApiEventHubReceiverArraySerializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : actionGroupsApiIncidentReceiverArraySerializer(item["incidentReceivers"]),
  };
}

export function _actionGroupResourcePropertiesDeserializer(item: any) {
  return {
    groupShortName: item["groupShortName"],
    enabled: item["enabled"],
    emailReceivers: !item["emailReceivers"]
      ? item["emailReceivers"]
      : actionGroupsApiEmailReceiverArrayDeserializer(item["emailReceivers"]),
    smsReceivers: !item["smsReceivers"]
      ? item["smsReceivers"]
      : actionGroupsApiSmsReceiverArrayDeserializer(item["smsReceivers"]),
    webhookReceivers: !item["webhookReceivers"]
      ? item["webhookReceivers"]
      : actionGroupsApiWebhookReceiverArrayDeserializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : actionGroupsApiItsmReceiverArrayDeserializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : actionGroupsApiAzureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : actionGroupsApiAutomationRunbookReceiverArrayDeserializer(
          item["automationRunbookReceivers"],
        ),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : actionGroupsApiVoiceReceiverArrayDeserializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : actionGroupsApiLogicAppReceiverArrayDeserializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : actionGroupsApiAzureFunctionReceiverArrayDeserializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : actionGroupsApiArmRoleReceiverArrayDeserializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : actionGroupsApiEventHubReceiverArrayDeserializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : actionGroupsApiIncidentReceiverArrayDeserializer(item["incidentReceivers"]),
  };
}

export function _actionGroupPatchBodyPropertiesSerializer(
  item: ActionGroupsApiActionGroupPatchBody,
): any {
  return { enabled: item["enabled"] };
}

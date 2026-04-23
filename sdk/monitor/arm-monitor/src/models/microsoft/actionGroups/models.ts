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
export interface ActionGroupResource extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName?: string;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its receivers will receive communications. */
  enabled?: boolean;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: EmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: SmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: WebhookReceiver[];
  /** The list of ITSM receivers that are part of this action group. */
  itsmReceivers?: ItsmReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: AzureAppPushReceiver[];
  /** The list of AutomationRunbook receivers that are part of this action group. */
  automationRunbookReceivers?: AutomationRunbookReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: VoiceReceiver[];
  /** The list of logic app receivers that are part of this action group. */
  logicAppReceivers?: LogicAppReceiver[];
  /** The list of azure function receivers that are part of this action group. */
  azureFunctionReceivers?: AzureFunctionReceiver[];
  /** The list of ARM role receivers that are part of this action group. Roles are Azure RBAC roles and only built-in roles are supported. */
  armRoleReceivers?: ArmRoleReceiver[];
  /** The list of event hub receivers that are part of this action group. */
  eventHubReceivers?: EventHubReceiver[];
  /** The list of incident receivers that are part of this action group. */
  incidentReceivers?: IncidentReceiver[];
}

export function actionGroupResourceSerializer(item: ActionGroupResource): any {
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

export function actionGroupResourceDeserializer(item: any): ActionGroupResource {
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
export interface ActionGroup {
  /** The short name of the action group. This will be used in SMS messages. */
  groupShortName: string;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its receivers will receive communications. */
  enabled: boolean;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: EmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: SmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: WebhookReceiver[];
  /** The list of ITSM receivers that are part of this action group. */
  itsmReceivers?: ItsmReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: AzureAppPushReceiver[];
  /** The list of AutomationRunbook receivers that are part of this action group. */
  automationRunbookReceivers?: AutomationRunbookReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: VoiceReceiver[];
  /** The list of logic app receivers that are part of this action group. */
  logicAppReceivers?: LogicAppReceiver[];
  /** The list of azure function receivers that are part of this action group. */
  azureFunctionReceivers?: AzureFunctionReceiver[];
  /** The list of ARM role receivers that are part of this action group. Roles are Azure RBAC roles and only built-in roles are supported. */
  armRoleReceivers?: ArmRoleReceiver[];
  /** The list of event hub receivers that are part of this action group. */
  eventHubReceivers?: EventHubReceiver[];
  /** The list of incident receivers that are part of this action group. */
  incidentReceivers?: IncidentReceiver[];
}

export function actionGroupSerializer(item: ActionGroup): any {
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
      : webhookReceiverArraySerializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : itsmReceiverArraySerializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : automationRunbookReceiverArraySerializer(item["automationRunbookReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArraySerializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : logicAppReceiverArraySerializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : azureFunctionReceiverArraySerializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : armRoleReceiverArraySerializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : eventHubReceiverArraySerializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : incidentReceiverArraySerializer(item["incidentReceivers"]),
  };
}

export function actionGroupDeserializer(item: any): ActionGroup {
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
      : webhookReceiverArrayDeserializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : itsmReceiverArrayDeserializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : automationRunbookReceiverArrayDeserializer(item["automationRunbookReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArrayDeserializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : logicAppReceiverArrayDeserializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : azureFunctionReceiverArrayDeserializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : armRoleReceiverArrayDeserializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : eventHubReceiverArrayDeserializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : incidentReceiverArrayDeserializer(item["incidentReceivers"]),
  };
}

export function emailReceiverArraySerializer(result: Array<EmailReceiver>): any[] {
  return result.map((item) => {
    return emailReceiverSerializer(item);
  });
}

export function emailReceiverArrayDeserializer(result: Array<EmailReceiver>): any[] {
  return result.map((item) => {
    return emailReceiverDeserializer(item);
  });
}

/** An email receiver. */
export interface EmailReceiver {
  /** The name of the email receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The email address of this receiver. */
  emailAddress: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
  /** The receiver status of the e-mail. */
  readonly status?: ReceiverStatus;
}

export function emailReceiverSerializer(item: EmailReceiver): any {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function emailReceiverDeserializer(item: any): EmailReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    status: item["status"],
  };
}

/** Indicates the status of the receiver. Receivers that are not Enabled will not receive any communications. */
export type ReceiverStatus = "NotSpecified" | "Enabled" | "Disabled";

export function smsReceiverArraySerializer(result: Array<SmsReceiver>): any[] {
  return result.map((item) => {
    return smsReceiverSerializer(item);
  });
}

export function smsReceiverArrayDeserializer(result: Array<SmsReceiver>): any[] {
  return result.map((item) => {
    return smsReceiverDeserializer(item);
  });
}

/** An SMS receiver. */
export interface SmsReceiver {
  /** The name of the SMS receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The country code of the SMS receiver. */
  countryCode: string;
  /** The phone number of the SMS receiver. */
  phoneNumber: string;
  /** The status of the receiver. */
  readonly status?: ReceiverStatus;
}

export function smsReceiverSerializer(item: SmsReceiver): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function smsReceiverDeserializer(item: any): SmsReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
    status: item["status"],
  };
}

export function webhookReceiverArraySerializer(result: Array<WebhookReceiver>): any[] {
  return result.map((item) => {
    return webhookReceiverSerializer(item);
  });
}

export function webhookReceiverArrayDeserializer(result: Array<WebhookReceiver>): any[] {
  return result.map((item) => {
    return webhookReceiverDeserializer(item);
  });
}

/** A webhook receiver. */
export interface WebhookReceiver {
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

export function webhookReceiverSerializer(item: WebhookReceiver): any {
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

export function webhookReceiverDeserializer(item: any): WebhookReceiver {
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

export function itsmReceiverArraySerializer(result: Array<ItsmReceiver>): any[] {
  return result.map((item) => {
    return itsmReceiverSerializer(item);
  });
}

export function itsmReceiverArrayDeserializer(result: Array<ItsmReceiver>): any[] {
  return result.map((item) => {
    return itsmReceiverDeserializer(item);
  });
}

/** An Itsm receiver. */
export interface ItsmReceiver {
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

export function itsmReceiverSerializer(item: ItsmReceiver): any {
  return {
    name: item["name"],
    workspaceId: item["workspaceId"],
    connectionId: item["connectionId"],
    ticketConfiguration: item["ticketConfiguration"],
    region: item["region"],
  };
}

export function itsmReceiverDeserializer(item: any): ItsmReceiver {
  return {
    name: item["name"],
    workspaceId: item["workspaceId"],
    connectionId: item["connectionId"],
    ticketConfiguration: item["ticketConfiguration"],
    region: item["region"],
  };
}

export function azureAppPushReceiverArraySerializer(result: Array<AzureAppPushReceiver>): any[] {
  return result.map((item) => {
    return azureAppPushReceiverSerializer(item);
  });
}

export function azureAppPushReceiverArrayDeserializer(result: Array<AzureAppPushReceiver>): any[] {
  return result.map((item) => {
    return azureAppPushReceiverDeserializer(item);
  });
}

/** The Azure mobile App push notification receiver. */
export interface AzureAppPushReceiver {
  /** The name of the Azure mobile app push receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The email address registered for the Azure mobile app. */
  emailAddress: string;
}

export function azureAppPushReceiverSerializer(item: AzureAppPushReceiver): any {
  return { name: item["name"], emailAddress: item["emailAddress"] };
}

export function azureAppPushReceiverDeserializer(item: any): AzureAppPushReceiver {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
  };
}

export function automationRunbookReceiverArraySerializer(
  result: Array<AutomationRunbookReceiver>,
): any[] {
  return result.map((item) => {
    return automationRunbookReceiverSerializer(item);
  });
}

export function automationRunbookReceiverArrayDeserializer(
  result: Array<AutomationRunbookReceiver>,
): any[] {
  return result.map((item) => {
    return automationRunbookReceiverDeserializer(item);
  });
}

/** The Azure Automation Runbook notification receiver. */
export interface AutomationRunbookReceiver {
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

export function automationRunbookReceiverSerializer(item: AutomationRunbookReceiver): any {
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

export function automationRunbookReceiverDeserializer(item: any): AutomationRunbookReceiver {
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

export function voiceReceiverArraySerializer(result: Array<VoiceReceiver>): any[] {
  return result.map((item) => {
    return voiceReceiverSerializer(item);
  });
}

export function voiceReceiverArrayDeserializer(result: Array<VoiceReceiver>): any[] {
  return result.map((item) => {
    return voiceReceiverDeserializer(item);
  });
}

/** A voice receiver. */
export interface VoiceReceiver {
  /** The name of the voice receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The country code of the voice receiver. */
  countryCode: string;
  /** The phone number of the voice receiver. */
  phoneNumber: string;
}

export function voiceReceiverSerializer(item: VoiceReceiver): any {
  return { name: item["name"], countryCode: item["countryCode"], phoneNumber: item["phoneNumber"] };
}

export function voiceReceiverDeserializer(item: any): VoiceReceiver {
  return {
    name: item["name"],
    countryCode: item["countryCode"],
    phoneNumber: item["phoneNumber"],
  };
}

export function logicAppReceiverArraySerializer(result: Array<LogicAppReceiver>): any[] {
  return result.map((item) => {
    return logicAppReceiverSerializer(item);
  });
}

export function logicAppReceiverArrayDeserializer(result: Array<LogicAppReceiver>): any[] {
  return result.map((item) => {
    return logicAppReceiverDeserializer(item);
  });
}

/** A logic app receiver. */
export interface LogicAppReceiver {
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

export function logicAppReceiverSerializer(item: LogicAppReceiver): any {
  return {
    name: item["name"],
    resourceId: item["resourceId"],
    callbackUrl: item["callbackUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function logicAppReceiverDeserializer(item: any): LogicAppReceiver {
  return {
    name: item["name"],
    resourceId: item["resourceId"],
    callbackUrl: item["callbackUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function azureFunctionReceiverArraySerializer(result: Array<AzureFunctionReceiver>): any[] {
  return result.map((item) => {
    return azureFunctionReceiverSerializer(item);
  });
}

export function azureFunctionReceiverArrayDeserializer(
  result: Array<AzureFunctionReceiver>,
): any[] {
  return result.map((item) => {
    return azureFunctionReceiverDeserializer(item);
  });
}

/** An azure function receiver. */
export interface AzureFunctionReceiver {
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

export function azureFunctionReceiverSerializer(item: AzureFunctionReceiver): any {
  return {
    name: item["name"],
    functionAppResourceId: item["functionAppResourceId"],
    functionName: item["functionName"],
    httpTriggerUrl: item["httpTriggerUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function azureFunctionReceiverDeserializer(item: any): AzureFunctionReceiver {
  return {
    name: item["name"],
    functionAppResourceId: item["functionAppResourceId"],
    functionName: item["functionName"],
    httpTriggerUrl: item["httpTriggerUrl"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
    managedIdentity: item["managedIdentity"],
  };
}

export function armRoleReceiverArraySerializer(result: Array<ArmRoleReceiver>): any[] {
  return result.map((item) => {
    return armRoleReceiverSerializer(item);
  });
}

export function armRoleReceiverArrayDeserializer(result: Array<ArmRoleReceiver>): any[] {
  return result.map((item) => {
    return armRoleReceiverDeserializer(item);
  });
}

/** An arm role receiver. */
export interface ArmRoleReceiver {
  /** The name of the arm role receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The arm role id. */
  roleId: string;
  /** Indicates whether to use common alert schema. */
  useCommonAlertSchema?: boolean;
}

export function armRoleReceiverSerializer(item: ArmRoleReceiver): any {
  return {
    name: item["name"],
    roleId: item["roleId"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function armRoleReceiverDeserializer(item: any): ArmRoleReceiver {
  return {
    name: item["name"],
    roleId: item["roleId"],
    useCommonAlertSchema: item["useCommonAlertSchema"],
  };
}

export function eventHubReceiverArraySerializer(result: Array<EventHubReceiver>): any[] {
  return result.map((item) => {
    return eventHubReceiverSerializer(item);
  });
}

export function eventHubReceiverArrayDeserializer(result: Array<EventHubReceiver>): any[] {
  return result.map((item) => {
    return eventHubReceiverDeserializer(item);
  });
}

/** An Event hub receiver. */
export interface EventHubReceiver {
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

export function eventHubReceiverSerializer(item: EventHubReceiver): any {
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

export function eventHubReceiverDeserializer(item: any): EventHubReceiver {
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

export function incidentReceiverArraySerializer(result: Array<IncidentReceiver>): any[] {
  return result.map((item) => {
    return incidentReceiverSerializer(item);
  });
}

export function incidentReceiverArrayDeserializer(result: Array<IncidentReceiver>): any[] {
  return result.map((item) => {
    return incidentReceiverDeserializer(item);
  });
}

/** An Incident receiver. */
export interface IncidentReceiver {
  /** The name of the Incident receiver. Names must be unique across all receivers within an action group. */
  name: string;
  /** The incident service connection */
  connection: IncidentServiceConnection;
  /** The incident management service type */
  incidentManagementService: IncidentManagementService;
  /** Field mappings for the incident service */
  mappings: Record<string, string>;
}

export function incidentReceiverSerializer(item: IncidentReceiver): any {
  return {
    name: item["name"],
    connection: incidentServiceConnectionSerializer(item["connection"]),
    incidentManagementService: item["incidentManagementService"],
    mappings: item["mappings"],
  };
}

export function incidentReceiverDeserializer(item: any): IncidentReceiver {
  return {
    name: item["name"],
    connection: incidentServiceConnectionDeserializer(item["connection"]),
    incidentManagementService: item["incidentManagementService"],
    mappings: Object.fromEntries(
      Object.entries(item["mappings"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The connection info for Incident Receiver. */
export interface IncidentServiceConnection {
  /** The name of the connection. */
  name: string;
  /** GUID value representing the connection ID for the incident management service. */
  id: string;
}

export function incidentServiceConnectionSerializer(item: IncidentServiceConnection): any {
  return { name: item["name"], id: item["id"] };
}

export function incidentServiceConnectionDeserializer(item: any): IncidentServiceConnection {
  return {
    name: item["name"],
    id: item["id"],
  };
}

/** The incident management service type */
export enum KnownIncidentManagementService {
  /** Icm */
  Icm = "Icm",
}

/**
 * The incident management service type \
 * {@link KnownIncidentManagementService} can be used interchangeably with IncidentManagementService,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Icm**: Icm
 */
export type IncidentManagementService = string;

/** An action group object for the body of patch operations. */
export interface ActionGroupPatchBody {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function actionGroupPatchBodySerializer(item: ActionGroupPatchBody): any {
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
export interface ActionGroupPatch {
  /** Indicates whether this action group is enabled. If an action group is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function actionGroupPatchSerializer(item: ActionGroupPatch): any {
  return { enabled: item["enabled"] };
}

/** A list of action groups. */
export interface _ActionGroupList {
  /** The ActionGroupResource items on this page */
  value: ActionGroupResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _actionGroupListDeserializer(item: any): _ActionGroupList {
  return {
    value: actionGroupResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function actionGroupResourceArraySerializer(result: Array<ActionGroupResource>): any[] {
  return result.map((item) => {
    return actionGroupResourceSerializer(item);
  });
}

export function actionGroupResourceArrayDeserializer(result: Array<ActionGroupResource>): any[] {
  return result.map((item) => {
    return actionGroupResourceDeserializer(item);
  });
}

/** The request body which contain contact detail metadata */
export interface NotificationRequestBody {
  /** The value of the supported alert type. Supported alert type values are: servicehealth, metricstaticthreshold, metricsdynamicthreshold, logalertv2, smartalert, webtestalert, logalertv1numresult, logalertv1metricmeasurement, resourcehealth, activitylog, actualcostbudget, forecastedbudget */
  alertType: string;
  /** The list of email receivers that are part of this action group. */
  emailReceivers?: EmailReceiver[];
  /** The list of SMS receivers that are part of this action group. */
  smsReceivers?: SmsReceiver[];
  /** The list of webhook receivers that are part of this action group. */
  webhookReceivers?: WebhookReceiver[];
  /** The list of ITSM receivers that are part of this action group. */
  itsmReceivers?: ItsmReceiver[];
  /** The list of AzureAppPush receivers that are part of this action group. */
  azureAppPushReceivers?: AzureAppPushReceiver[];
  /** The list of AutomationRunbook receivers that are part of this action group. */
  automationRunbookReceivers?: AutomationRunbookReceiver[];
  /** The list of voice receivers that are part of this action group. */
  voiceReceivers?: VoiceReceiver[];
  /** The list of logic app receivers that are part of this action group. */
  logicAppReceivers?: LogicAppReceiver[];
  /** The list of azure function receivers that are part of this action group. */
  azureFunctionReceivers?: AzureFunctionReceiver[];
  /** The list of ARM role receivers that are part of this action group. Roles are Azure RBAC roles and only built-in roles are supported. */
  armRoleReceivers?: ArmRoleReceiver[];
  /** The list of event hub receivers that are part of this action group. */
  eventHubReceivers?: EventHubReceiver[];
  /** The list of incident receivers that are part of this action group. */
  incidentReceivers?: IncidentReceiver[];
}

export function notificationRequestBodySerializer(item: NotificationRequestBody): any {
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
      : webhookReceiverArraySerializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : itsmReceiverArraySerializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : automationRunbookReceiverArraySerializer(item["automationRunbookReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArraySerializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : logicAppReceiverArraySerializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : azureFunctionReceiverArraySerializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : armRoleReceiverArraySerializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : eventHubReceiverArraySerializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : incidentReceiverArraySerializer(item["incidentReceivers"]),
  };
}

/** The details of the test notification results. */
export interface TestNotificationDetailsResponse {
  /** The context info */
  context?: Context;
  /** The overall state */
  state: string;
  /** The completed time */
  completedTime?: string;
  /** The created time */
  createdTime?: string;
  /** The list of action detail */
  actionDetails?: ActionDetail[];
}

export function testNotificationDetailsResponseDeserializer(
  item: any,
): TestNotificationDetailsResponse {
  return {
    context: !item["context"] ? item["context"] : contextDeserializer(item["context"]),
    state: item["state"],
    completedTime: item["completedTime"],
    createdTime: item["createdTime"],
    actionDetails: !item["actionDetails"]
      ? item["actionDetails"]
      : actionDetailArrayDeserializer(item["actionDetails"]),
  };
}

/** The context info */
export interface Context {
  /** The source of the notification request */
  notificationSource?: string;
  /** The context id type */
  contextType?: string;
}

export function contextDeserializer(item: any): Context {
  return {
    notificationSource: item["notificationSource"],
    contextType: item["contextType"],
  };
}

export function actionDetailArrayDeserializer(result: Array<ActionDetail>): any[] {
  return result.map((item) => {
    return actionDetailDeserializer(item);
  });
}

/** The action detail */
export interface ActionDetail {
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

export function actionDetailDeserializer(item: any): ActionDetail {
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
export interface EnableRequest {
  /** The name of the receiver to resubscribe. */
  receiverName: string;
}

export function enableRequestSerializer(item: EnableRequest): any {
  return { receiverName: item["receiverName"] };
}

export function _actionGroupResourcePropertiesSerializer(item: ActionGroupResource): any {
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
      : webhookReceiverArraySerializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : itsmReceiverArraySerializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArraySerializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : automationRunbookReceiverArraySerializer(item["automationRunbookReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArraySerializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : logicAppReceiverArraySerializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : azureFunctionReceiverArraySerializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : armRoleReceiverArraySerializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : eventHubReceiverArraySerializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : incidentReceiverArraySerializer(item["incidentReceivers"]),
  };
}

export function _actionGroupResourcePropertiesDeserializer(item: any) {
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
      : webhookReceiverArrayDeserializer(item["webhookReceivers"]),
    itsmReceivers: !item["itsmReceivers"]
      ? item["itsmReceivers"]
      : itsmReceiverArrayDeserializer(item["itsmReceivers"]),
    azureAppPushReceivers: !item["azureAppPushReceivers"]
      ? item["azureAppPushReceivers"]
      : azureAppPushReceiverArrayDeserializer(item["azureAppPushReceivers"]),
    automationRunbookReceivers: !item["automationRunbookReceivers"]
      ? item["automationRunbookReceivers"]
      : automationRunbookReceiverArrayDeserializer(item["automationRunbookReceivers"]),
    voiceReceivers: !item["voiceReceivers"]
      ? item["voiceReceivers"]
      : voiceReceiverArrayDeserializer(item["voiceReceivers"]),
    logicAppReceivers: !item["logicAppReceivers"]
      ? item["logicAppReceivers"]
      : logicAppReceiverArrayDeserializer(item["logicAppReceivers"]),
    azureFunctionReceivers: !item["azureFunctionReceivers"]
      ? item["azureFunctionReceivers"]
      : azureFunctionReceiverArrayDeserializer(item["azureFunctionReceivers"]),
    armRoleReceivers: !item["armRoleReceivers"]
      ? item["armRoleReceivers"]
      : armRoleReceiverArrayDeserializer(item["armRoleReceivers"]),
    eventHubReceivers: !item["eventHubReceivers"]
      ? item["eventHubReceivers"]
      : eventHubReceiverArrayDeserializer(item["eventHubReceivers"]),
    incidentReceivers: !item["incidentReceivers"]
      ? item["incidentReceivers"]
      : incidentReceiverArrayDeserializer(item["incidentReceivers"]),
  };
}

export function _actionGroupPatchBodyPropertiesSerializer(item: ActionGroupPatchBody): any {
  return { enabled: item["enabled"] };
}

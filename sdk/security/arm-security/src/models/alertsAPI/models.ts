// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../../static-helpers/serialization/serialize-record.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Security alert */
export interface AlertsAPIAlert extends ProxyResource {
  /** Schema version. */
  readonly version?: string;
  /** Unique identifier for the detection logic (all alert instances from the same detection logic will have the same alertType). */
  readonly alertType?: string;
  /** Unique identifier for the alert. */
  readonly systemAlertId?: string;
  /** The name of Azure Security Center pricing tier which powering this alert. Learn more: https://docs.microsoft.com/en-us/azure/security-center/security-center-pricing */
  readonly productComponentName?: string;
  /** The display name of the alert. */
  readonly alertDisplayName?: string;
  /** Description of the suspicious activity that was detected. */
  readonly description?: string;
  /** The risk level of the threat that was detected. Learn more: https://docs.microsoft.com/en-us/azure/security-center/security-center-alerts-overview#how-are-alerts-classified. */
  readonly severity?: AlertsAPIAlertSeverity;
  /** The kill chain related intent behind the alert. For list of supported values, and explanations of Azure Security Center's supported kill chain intents. */
  readonly intent?: AlertsAPIIntent;
  /** The UTC time of the first event or activity included in the alert in ISO8601 format. */
  readonly startTimeUtc?: Date;
  /** The UTC time of the last event or activity included in the alert in ISO8601 format. */
  readonly endTimeUtc?: Date;
  /** The resource identifiers that can be used to direct the alert to the right product exposure group (tenant, workspace, subscription etc.). There can be multiple identifiers of different type per alert. */
  readonly resourceIdentifiers?: AlertsAPIResourceIdentifierUnion[];
  /** Manual action items to take to remediate the alert. */
  readonly remediationSteps?: string[];
  /** The name of the vendor that raises the alert. */
  readonly vendorName?: string;
  /** The life cycle status of the alert. */
  readonly status?: AlertsAPIAlertStatus;
  /** Links related to the alert */
  readonly extendedLinks?: Record<string, string>[];
  /** A direct link to the alert page in Azure Portal. */
  readonly alertUri?: string;
  /** The UTC time the alert was generated in ISO8601 format. */
  readonly timeGeneratedUtc?: Date;
  /** The name of the product which published this alert (Microsoft Sentinel, Microsoft Defender for Identity, Microsoft Defender for Endpoint, Microsoft Defender for Office, Microsoft Defender for Cloud Apps, and so on). */
  readonly productName?: string;
  /** The UTC processing end time of the alert in ISO8601 format. */
  readonly processingEndTimeUtc?: Date;
  /** A list of entities related to the alert. */
  readonly entities?: AlertsAPIAlertEntity[];
  /** This field determines whether the alert is an incident (a compound grouping of several alerts) or a single alert. */
  readonly isIncident?: boolean;
  /** Key for corelating related alerts. Alerts with the same correlation key considered to be related. */
  readonly correlationKey?: string;
  /** Custom properties for the alert. */
  extendedProperties?: Record<string, string>;
  /** The display name of the resource most related to this alert. */
  readonly compromisedEntity?: string;
  /** kill chain related techniques behind the alert. */
  readonly techniques?: string[];
  /** Kill chain related sub-techniques behind the alert. */
  readonly subTechniques?: string[];
  /** Changing set of properties depending on the supportingEvidence type. */
  supportingEvidence?: AlertsAPIAlertPropertiesSupportingEvidence;
}

export function alertsAPIAlertDeserializer(item: any): AlertsAPIAlert {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _alertPropertiesDeserializer(item["properties"])),
  };
}

/** describes security alert properties. */
export interface AlertsAPIAlertProperties {
  /** Schema version. */
  readonly version?: string;
  /** Unique identifier for the detection logic (all alert instances from the same detection logic will have the same alertType). */
  readonly alertType?: string;
  /** Unique identifier for the alert. */
  readonly systemAlertId?: string;
  /** The name of Azure Security Center pricing tier which powering this alert. Learn more: https://docs.microsoft.com/en-us/azure/security-center/security-center-pricing */
  readonly productComponentName?: string;
  /** The display name of the alert. */
  readonly alertDisplayName?: string;
  /** Description of the suspicious activity that was detected. */
  readonly description?: string;
  /** The risk level of the threat that was detected. Learn more: https://docs.microsoft.com/en-us/azure/security-center/security-center-alerts-overview#how-are-alerts-classified. */
  readonly severity?: AlertsAPIAlertSeverity;
  /** The kill chain related intent behind the alert. For list of supported values, and explanations of Azure Security Center's supported kill chain intents. */
  readonly intent?: AlertsAPIIntent;
  /** The UTC time of the first event or activity included in the alert in ISO8601 format. */
  readonly startTimeUtc?: Date;
  /** The UTC time of the last event or activity included in the alert in ISO8601 format. */
  readonly endTimeUtc?: Date;
  /** The resource identifiers that can be used to direct the alert to the right product exposure group (tenant, workspace, subscription etc.). There can be multiple identifiers of different type per alert. */
  readonly resourceIdentifiers?: AlertsAPIResourceIdentifierUnion[];
  /** Manual action items to take to remediate the alert. */
  readonly remediationSteps?: string[];
  /** The name of the vendor that raises the alert. */
  readonly vendorName?: string;
  /** The life cycle status of the alert. */
  readonly status?: AlertsAPIAlertStatus;
  /** Links related to the alert */
  readonly extendedLinks?: Record<string, string>[];
  /** A direct link to the alert page in Azure Portal. */
  readonly alertUri?: string;
  /** The UTC time the alert was generated in ISO8601 format. */
  readonly timeGeneratedUtc?: Date;
  /** The name of the product which published this alert (Microsoft Sentinel, Microsoft Defender for Identity, Microsoft Defender for Endpoint, Microsoft Defender for Office, Microsoft Defender for Cloud Apps, and so on). */
  readonly productName?: string;
  /** The UTC processing end time of the alert in ISO8601 format. */
  readonly processingEndTimeUtc?: Date;
  /** A list of entities related to the alert. */
  readonly entities?: AlertsAPIAlertEntity[];
  /** This field determines whether the alert is an incident (a compound grouping of several alerts) or a single alert. */
  readonly isIncident?: boolean;
  /** Key for corelating related alerts. Alerts with the same correlation key considered to be related. */
  readonly correlationKey?: string;
  /** Custom properties for the alert. */
  extendedProperties?: Record<string, string>;
  /** The display name of the resource most related to this alert. */
  readonly compromisedEntity?: string;
  /** kill chain related techniques behind the alert. */
  readonly techniques?: string[];
  /** Kill chain related sub-techniques behind the alert. */
  readonly subTechniques?: string[];
  /** Changing set of properties depending on the supportingEvidence type. */
  supportingEvidence?: AlertsAPIAlertPropertiesSupportingEvidence;
}

export function alertsAPIAlertPropertiesDeserializer(item: any): AlertsAPIAlertProperties {
  return {
    version: item["version"],
    alertType: item["alertType"],
    systemAlertId: item["systemAlertId"],
    productComponentName: item["productComponentName"],
    alertDisplayName: item["alertDisplayName"],
    description: item["description"],
    severity: item["severity"],
    intent: item["intent"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    resourceIdentifiers: !item["resourceIdentifiers"]
      ? item["resourceIdentifiers"]
      : alertsAPIResourceIdentifierUnionArrayDeserializer(item["resourceIdentifiers"]),
    remediationSteps: !item["remediationSteps"]
      ? item["remediationSteps"]
      : item["remediationSteps"].map((p: any) => {
          return p;
        }),
    vendorName: item["vendorName"],
    status: item["status"],
    extendedLinks: !item["extendedLinks"]
      ? item["extendedLinks"]
      : item["extendedLinks"].map((p: any) => {
          return Object.fromEntries(Object.entries(p).map(([k1, p1]: [string, any]) => [k1, p1]));
        }),
    alertUri: item["alertUri"],
    timeGeneratedUtc: !item["timeGeneratedUtc"]
      ? item["timeGeneratedUtc"]
      : new Date(item["timeGeneratedUtc"]),
    productName: item["productName"],
    processingEndTimeUtc: !item["processingEndTimeUtc"]
      ? item["processingEndTimeUtc"]
      : new Date(item["processingEndTimeUtc"]),
    entities: !item["entities"]
      ? item["entities"]
      : alertsAPIAlertEntityArrayDeserializer(item["entities"]),
    isIncident: item["isIncident"],
    correlationKey: item["correlationKey"],
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : Object.fromEntries(
          Object.entries(item["extendedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    compromisedEntity: item["compromisedEntity"],
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    supportingEvidence: !item["supportingEvidence"]
      ? item["supportingEvidence"]
      : alertsAPIAlertPropertiesSupportingEvidenceDeserializer(item["supportingEvidence"]),
  };
}

/** The risk level of the threat that was detected. Learn more: https://docs.microsoft.com/en-us/azure/security-center/security-center-alerts-overview#how-are-alerts-classified. */
export enum KnownAlertsAPIAlertSeverity {
  /** Informational */
  Informational = "Informational",
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * The risk level of the threat that was detected. Learn more: https://docs.microsoft.com/en-us/azure/security-center/security-center-alerts-overview#how-are-alerts-classified. \
 * {@link KnownAlertsAPIAlertSeverity} can be used interchangeably with AlertsAPIAlertSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Informational**: Informational \
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type AlertsAPIAlertSeverity = string;

/** The kill chain related intent behind the alert. For list of supported values, and explanations of Azure Security Center's supported kill chain intents. */
export enum KnownAlertsAPIIntent {
  /** Unknown */
  Unknown = "Unknown",
  /** PreAttack could be either an attempt to access a certain resource regardless of a malicious intent, or a failed attempt to gain access to a target system to gather information prior to exploitation. This step is usually detected as an attempt, originating from outside the network, to scan the target system and find a way in.  Further details on the PreAttack stage can be read in [MITRE Pre-Att&ck matrix](https://attack.mitre.org/matrices/pre/). */
  PreAttack = "PreAttack",
  /** InitialAccess is the stage where an attacker manages to get foothold on the attacked resource. */
  InitialAccess = "InitialAccess",
  /** Persistence is any access, action, or configuration change to a system that gives a threat actor a persistent presence on that system. */
  Persistence = "Persistence",
  /** Privilege escalation is the result of actions that allow an adversary to obtain a higher level of permissions on a system or network. */
  PrivilegeEscalation = "PrivilegeEscalation",
  /** Defense evasion consists of techniques an adversary may use to evade detection or avoid other defenses. */
  DefenseEvasion = "DefenseEvasion",
  /** Credential access represents techniques resulting in access to or control over system, domain, or service credentials that are used within an enterprise environment. */
  CredentialAccess = "CredentialAccess",
  /** Discovery consists of techniques that allow the adversary to gain knowledge about the system and internal network. */
  Discovery = "Discovery",
  /** Lateral movement consists of techniques that enable an adversary to access and control remote systems on a network and could, but does not necessarily, include execution of tools on remote systems. */
  LateralMovement = "LateralMovement",
  /** The execution tactic represents techniques that result in execution of adversary-controlled code on a local or remote system. */
  Execution = "Execution",
  /** Collection consists of techniques used to identify and gather information, such as sensitive files, from a target network prior to exfiltration. */
  Collection = "Collection",
  /** Exfiltration refers to techniques and attributes that result or aid in the adversary removing files and information from a target network. */
  Exfiltration = "Exfiltration",
  /** The command and control tactic represents how adversaries communicate with systems under their control within a target network. */
  CommandAndControl = "CommandAndControl",
  /** Impact events primarily try to directly reduce the availability or integrity of a system, service, or network; including manipulation of data to impact a business or operational process. */
  Impact = "Impact",
  /** Probing could be either an attempt to access a certain resource regardless of a malicious intent, or a failed attempt to gain access to a target system to gather information prior to exploitation. */
  Probing = "Probing",
  /** Exploitation is the stage where an attacker manages to get a foothold on the attacked resource. This stage is relevant for compute hosts and resources such as user accounts, certificates etc. */
  Exploitation = "Exploitation",
}

/**
 * The kill chain related intent behind the alert. For list of supported values, and explanations of Azure Security Center's supported kill chain intents. \
 * {@link KnownAlertsAPIIntent} can be used interchangeably with AlertsAPIIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **PreAttack**: PreAttack could be either an attempt to access a certain resource regardless of a malicious intent, or a failed attempt to gain access to a target system to gather information prior to exploitation. This step is usually detected as an attempt, originating from outside the network, to scan the target system and find a way in.  Further details on the PreAttack stage can be read in [MITRE Pre-Att&ck matrix](https:\//attack.mitre.org\/matrices\/pre\/). \
 * **InitialAccess**: InitialAccess is the stage where an attacker manages to get foothold on the attacked resource. \
 * **Persistence**: Persistence is any access, action, or configuration change to a system that gives a threat actor a persistent presence on that system. \
 * **PrivilegeEscalation**: Privilege escalation is the result of actions that allow an adversary to obtain a higher level of permissions on a system or network. \
 * **DefenseEvasion**: Defense evasion consists of techniques an adversary may use to evade detection or avoid other defenses. \
 * **CredentialAccess**: Credential access represents techniques resulting in access to or control over system, domain, or service credentials that are used within an enterprise environment. \
 * **Discovery**: Discovery consists of techniques that allow the adversary to gain knowledge about the system and internal network. \
 * **LateralMovement**: Lateral movement consists of techniques that enable an adversary to access and control remote systems on a network and could, but does not necessarily, include execution of tools on remote systems. \
 * **Execution**: The execution tactic represents techniques that result in execution of adversary-controlled code on a local or remote system. \
 * **Collection**: Collection consists of techniques used to identify and gather information, such as sensitive files, from a target network prior to exfiltration. \
 * **Exfiltration**: Exfiltration refers to techniques and attributes that result or aid in the adversary removing files and information from a target network. \
 * **CommandAndControl**: The command and control tactic represents how adversaries communicate with systems under their control within a target network. \
 * **Impact**: Impact events primarily try to directly reduce the availability or integrity of a system, service, or network; including manipulation of data to impact a business or operational process. \
 * **Probing**: Probing could be either an attempt to access a certain resource regardless of a malicious intent, or a failed attempt to gain access to a target system to gather information prior to exploitation. \
 * **Exploitation**: Exploitation is the stage where an attacker manages to get a foothold on the attacked resource. This stage is relevant for compute hosts and resources such as user accounts, certificates etc.
 */
export type AlertsAPIIntent = string;

export function alertsAPIResourceIdentifierUnionArrayDeserializer(
  result: Array<AlertsAPIResourceIdentifierUnion>,
): any[] {
  return result.map((item) => {
    return alertsAPIResourceIdentifierUnionDeserializer(item);
  });
}

/** A resource identifier for an alert which can be used to direct the alert to the right product exposure group (tenant, workspace, subscription etc.). */
export interface AlertsAPIResourceIdentifier {
  /** There can be multiple identifiers of different type per alert, this field specify the identifier type. */
  /** The discriminator possible values: AzureResource, LogAnalytics */
  type: AlertsAPIResourceIdentifierType;
}

export function alertsAPIResourceIdentifierDeserializer(item: any): AlertsAPIResourceIdentifier {
  return {
    type: item["type"],
  };
}

/** Alias for AlertsAPIResourceIdentifierUnion */
export type AlertsAPIResourceIdentifierUnion =
  | AlertsAPIAzureResourceIdentifier
  | AlertsAPILogAnalyticsIdentifier
  | AlertsAPIResourceIdentifier;

export function alertsAPIResourceIdentifierUnionDeserializer(
  item: any,
): AlertsAPIResourceIdentifierUnion {
  switch (item["type"]) {
    case "AzureResource":
      return alertsAPIAzureResourceIdentifierDeserializer(item as AlertsAPIAzureResourceIdentifier);

    case "LogAnalytics":
      return alertsAPILogAnalyticsIdentifierDeserializer(item as AlertsAPILogAnalyticsIdentifier);

    default:
      return alertsAPIResourceIdentifierDeserializer(item);
  }
}

/** There can be multiple identifiers of different type per alert, this field specify the identifier type. */
export enum KnownAlertsAPIResourceIdentifierType {
  /** AzureResource */
  AzureResource = "AzureResource",
  /** LogAnalytics */
  LogAnalytics = "LogAnalytics",
}

/**
 * There can be multiple identifiers of different type per alert, this field specify the identifier type. \
 * {@link KnownAlertsAPIResourceIdentifierType} can be used interchangeably with AlertsAPIResourceIdentifierType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureResource**: AzureResource \
 * **LogAnalytics**: LogAnalytics
 */
export type AlertsAPIResourceIdentifierType = string;

/** Azure resource identifier. */
export interface AlertsAPIAzureResourceIdentifier extends AlertsAPIResourceIdentifier {
  /** ARM resource identifier for the cloud resource being alerted on */
  readonly azureResourceId?: string;
  /** There can be multiple identifiers of different type per alert, this field specify the identifier type. */
  type: "AzureResource";
}

export function alertsAPIAzureResourceIdentifierDeserializer(
  item: any,
): AlertsAPIAzureResourceIdentifier {
  return {
    type: item["type"],
    azureResourceId: item["azureResourceId"],
  };
}

/** Represents a Log Analytics workspace scope identifier. */
export interface AlertsAPILogAnalyticsIdentifier extends AlertsAPIResourceIdentifier {
  /** The LogAnalytics workspace id that stores this alert. */
  readonly workspaceId?: string;
  /** The azure subscription id for the LogAnalytics workspace storing this alert. */
  readonly workspaceSubscriptionId?: string;
  /** The azure resource group for the LogAnalytics workspace storing this alert */
  readonly workspaceResourceGroup?: string;
  /** (optional) The LogAnalytics agent id reporting the event that this alert is based on. */
  readonly agentId?: string;
  /** There can be multiple identifiers of different type per alert, this field specify the identifier type. */
  type: "LogAnalytics";
}

export function alertsAPILogAnalyticsIdentifierDeserializer(
  item: any,
): AlertsAPILogAnalyticsIdentifier {
  return {
    type: item["type"],
    workspaceId: item["workspaceId"],
    workspaceSubscriptionId: item["workspaceSubscriptionId"],
    workspaceResourceGroup: item["workspaceResourceGroup"],
    agentId: item["agentId"],
  };
}

/** The life cycle status of the alert. */
export enum KnownAlertsAPIAlertStatus {
  /** An alert which doesn't specify a value is assigned the status 'Active' */
  Active = "Active",
  /** An alert which is in handling state */
  InProgress = "InProgress",
  /** Alert closed after handling */
  Resolved = "Resolved",
  /** Alert dismissed as false positive */
  Dismissed = "Dismissed",
}

/**
 * The life cycle status of the alert. \
 * {@link KnownAlertsAPIAlertStatus} can be used interchangeably with AlertsAPIAlertStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: An alert which doesn't specify a value is assigned the status 'Active' \
 * **InProgress**: An alert which is in handling state \
 * **Resolved**: Alert closed after handling \
 * **Dismissed**: Alert dismissed as false positive
 */
export type AlertsAPIAlertStatus = string;

export function alertsAPIAlertEntityArrayDeserializer(result: Array<AlertsAPIAlertEntity>): any[] {
  return result.map((item) => {
    return alertsAPIAlertEntityDeserializer(item);
  });
}

/** Changing set of properties depending on the entity type. */
export interface AlertsAPIAlertEntity {
  /** Type of entity */
  readonly type?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function alertsAPIAlertEntityDeserializer(item: any): AlertsAPIAlertEntity {
  return {
    additionalProperties: serializeRecord(item, ["type"]),
    type: item["type"],
  };
}

/** Changing set of properties depending on the supportingEvidence type. */
export interface AlertsAPIAlertPropertiesSupportingEvidence {
  /** Type of the supportingEvidence */
  readonly type?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function alertsAPIAlertPropertiesSupportingEvidenceDeserializer(
  item: any,
): AlertsAPIAlertPropertiesSupportingEvidence {
  return {
    additionalProperties: serializeRecord(item, ["type"]),
    type: item["type"],
  };
}

/** List of security alerts */
export interface _AlertsAPIAlertList {
  /** The Alert items on this page */
  value?: AlertsAPIAlert[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertsAPIAlertListDeserializer(item: any): _AlertsAPIAlertList {
  return {
    value: !item["value"] ? item["value"] : alertsAPIAlertArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertsAPIAlertArrayDeserializer(result: Array<AlertsAPIAlert>): any[] {
  return result.map((item) => {
    return alertsAPIAlertDeserializer(item);
  });
}

/** Alert Simulator request body. */
export interface AlertsAPIAlertSimulatorRequestBody {
  /** Alert Simulator request body data. */
  properties?: AlertsAPIAlertSimulatorRequestPropertiesUnion;
}

export function alertsAPIAlertSimulatorRequestBodySerializer(
  item: AlertsAPIAlertSimulatorRequestBody,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : alertsAPIAlertSimulatorRequestPropertiesUnionSerializer(item["properties"]),
  };
}

/** Describes properties of an alert simulation request */
export interface AlertsAPIAlertSimulatorRequestProperties {
  /** The kind of alert simulation. */
  /** The discriminator possible values: Bundles */
  kind: AlertsAPIKind;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function alertsAPIAlertSimulatorRequestPropertiesSerializer(
  item: AlertsAPIAlertSimulatorRequestProperties,
): any {
  return { ...serializeRecord(item.additionalProperties ?? {}), kind: item["kind"] };
}

/** Alias for AlertsAPIAlertSimulatorRequestPropertiesUnion */
export type AlertsAPIAlertSimulatorRequestPropertiesUnion =
  | AlertsAPIAlertSimulatorBundlesRequestProperties
  | AlertsAPIAlertSimulatorRequestProperties;

export function alertsAPIAlertSimulatorRequestPropertiesUnionSerializer(
  item: AlertsAPIAlertSimulatorRequestPropertiesUnion,
): any {
  switch (item.kind) {
    case "Bundles":
      return alertsAPIAlertSimulatorBundlesRequestPropertiesSerializer(
        item as AlertsAPIAlertSimulatorBundlesRequestProperties,
      );

    default:
      return alertsAPIAlertSimulatorRequestPropertiesSerializer(item);
  }
}

/** The kind of alert simulation. */
export enum KnownAlertsAPIKind {
  /** Simulate alerts according to bundles */
  Bundles = "Bundles",
}

/**
 * The kind of alert simulation. \
 * {@link KnownAlertsAPIKind} can be used interchangeably with AlertsAPIKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bundles**: Simulate alerts according to bundles
 */
export type AlertsAPIKind = string;

/** Simulate alerts according to this bundles. */
export interface AlertsAPIAlertSimulatorBundlesRequestProperties extends AlertsAPIAlertSimulatorRequestProperties {
  /** Bundles list. */
  bundles?: AlertsAPIBundleType[];
  /** The kind of alert simulation. */
  kind: "Bundles";
}

export function alertsAPIAlertSimulatorBundlesRequestPropertiesSerializer(
  item: AlertsAPIAlertSimulatorBundlesRequestProperties,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    kind: item["kind"],
    bundles: !item["bundles"]
      ? item["bundles"]
      : item["bundles"].map((p: any) => {
          return p;
        }),
  };
}

/** Alert Simulator supported bundles. */
export enum KnownAlertsAPIBundleType {
  /** AppServices */
  AppServices = "AppServices",
  /** DNS */
  DNS = "DNS",
  /** KeyVaults */
  KeyVaults = "KeyVaults",
  /** KubernetesService */
  KubernetesService = "KubernetesService",
  /** ResourceManager */
  ResourceManager = "ResourceManager",
  /** SqlServers */
  SqlServers = "SqlServers",
  /** StorageAccounts */
  StorageAccounts = "StorageAccounts",
  /** VirtualMachines */
  VirtualMachines = "VirtualMachines",
  /** CosmosDbs */
  CosmosDbs = "CosmosDbs",
}

/**
 * Alert Simulator supported bundles. \
 * {@link KnownAlertsAPIBundleType} can be used interchangeably with AlertsAPIBundleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AppServices**: AppServices \
 * **DNS**: DNS \
 * **KeyVaults**: KeyVaults \
 * **KubernetesService**: KubernetesService \
 * **ResourceManager**: ResourceManager \
 * **SqlServers**: SqlServers \
 * **StorageAccounts**: StorageAccounts \
 * **VirtualMachines**: VirtualMachines \
 * **CosmosDbs**: CosmosDbs
 */
export type AlertsAPIBundleType = string;

export function _alertPropertiesDeserializer(item: any) {
  return {
    version: item["version"],
    alertType: item["alertType"],
    systemAlertId: item["systemAlertId"],
    productComponentName: item["productComponentName"],
    alertDisplayName: item["alertDisplayName"],
    description: item["description"],
    severity: item["severity"],
    intent: item["intent"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    resourceIdentifiers: !item["resourceIdentifiers"]
      ? item["resourceIdentifiers"]
      : alertsAPIResourceIdentifierUnionArrayDeserializer(item["resourceIdentifiers"]),
    remediationSteps: !item["remediationSteps"]
      ? item["remediationSteps"]
      : item["remediationSteps"].map((p: any) => {
          return p;
        }),
    vendorName: item["vendorName"],
    status: item["status"],
    extendedLinks: !item["extendedLinks"]
      ? item["extendedLinks"]
      : item["extendedLinks"].map((p: any) => {
          return Object.fromEntries(Object.entries(p).map(([k1, p1]: [string, any]) => [k1, p1]));
        }),
    alertUri: item["alertUri"],
    timeGeneratedUtc: !item["timeGeneratedUtc"]
      ? item["timeGeneratedUtc"]
      : new Date(item["timeGeneratedUtc"]),
    productName: item["productName"],
    processingEndTimeUtc: !item["processingEndTimeUtc"]
      ? item["processingEndTimeUtc"]
      : new Date(item["processingEndTimeUtc"]),
    entities: !item["entities"]
      ? item["entities"]
      : alertsAPIAlertEntityArrayDeserializer(item["entities"]),
    isIncident: item["isIncident"],
    correlationKey: item["correlationKey"],
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : Object.fromEntries(
          Object.entries(item["extendedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    compromisedEntity: item["compromisedEntity"],
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    supportingEvidence: !item["supportingEvidence"]
      ? item["supportingEvidence"]
      : alertsAPIAlertPropertiesSupportingEvidenceDeserializer(item["supportingEvidence"]),
  };
}

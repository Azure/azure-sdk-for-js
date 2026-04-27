// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { OperationStatus } from "../common/models.js";
import { operationStatusDeserializer } from "../common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Microsoft Defender for Cloud is provided in two pricing tiers: free and standard. The standard tier offers advanced security capabilities, while the free tier offers basic security features. */
export interface Pricing extends ExtensionResource {
  /** Indicates whether the Defender plan is enabled on the selected scope. Microsoft Defender for Cloud is provided in two pricing tiers: free and standard. The standard tier offers advanced security capabilities, while the free tier offers basic security features. */
  pricingTier?: PricingTier;
  /** The sub-plan selected for a Standard pricing configuration, when more than one sub-plan is available. Each sub-plan enables a set of security features. When not specified, full plan is applied. For VirtualMachines plan, available sub plans are 'P1' & 'P2', where for resource level only 'P1' sub plan is supported. */
  subPlan?: string;
  /** The duration left for the subscriptions free trial period - in ISO 8601 format (e.g. P3Y6M4DT12H30M5S). */
  readonly freeTrialRemainingTime?: string;
  /** Optional. If `pricingTier` is `Standard` then this property holds the date of the last time the `pricingTier` was set to `Standard`, when available (e.g 2023-03-01T12:42:42.1921106Z). */
  readonly enablementTime?: Date;
  /** If set to "False", it allows the descendants of this scope to override the pricing configuration set on this scope (allows setting inherited="False"). If set to "True", it prevents overrides and forces this pricing configuration on all the descendants of this scope. This field is only available for subscription-level pricing. */
  enforce?: Enforce;
  /** "inherited" = "True" indicates that the current scope inherits its pricing configuration from its parent. The ID of the parent scope that provides the inherited configuration is displayed in the "inheritedFrom" field. On the other hand, "inherited" = "False" indicates that the current scope has its own pricing configuration explicitly set, and does not inherit from its parent. This field is read only and available only for resource-level pricing. */
  readonly inherited?: Inherited;
  /** The id of the scope inherited from. "Null" if not inherited. This field is only available for resource-level pricing. */
  readonly inheritedFrom?: string;
  /** This field is available for subscription-level only, and reflects the coverage status of the resources under the subscription. Please note: The "pricingTier" field reflects the plan status of the subscription. However, since the plan status can also be defined at the resource level, there might be misalignment between the subscription's plan status and the resource status. This field helps indicate the coverage status of the resources. */
  readonly resourcesCoverageStatus?: ResourcesCoverageStatus;
  /** Optional. List of extensions offered under a plan. */
  extensions?: Extension[];
  /** Optional. True if the plan is deprecated. If there are replacing plans they will appear in `replacedBy` property */
  readonly deprecated?: boolean;
  /** Optional. List of plans that replace this plan. This property exists only if this plan is deprecated. */
  readonly replacedBy?: string[];
}

export function pricingSerializer(item: Pricing): any {
  return {
    properties: areAllPropsUndefined(item, ["pricingTier", "subPlan", "enforce", "extensions"])
      ? undefined
      : _pricingPropertiesSerializer(item),
  };
}

export function pricingDeserializer(item: any): Pricing {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _pricingPropertiesDeserializer(item["properties"])),
  };
}

/** Pricing properties for the relevant scope */
export interface PricingProperties {
  /** Indicates whether the Defender plan is enabled on the selected scope. Microsoft Defender for Cloud is provided in two pricing tiers: free and standard. The standard tier offers advanced security capabilities, while the free tier offers basic security features. */
  pricingTier: PricingTier;
  /** The sub-plan selected for a Standard pricing configuration, when more than one sub-plan is available. Each sub-plan enables a set of security features. When not specified, full plan is applied. For VirtualMachines plan, available sub plans are 'P1' & 'P2', where for resource level only 'P1' sub plan is supported. */
  subPlan?: string;
  /** The duration left for the subscriptions free trial period - in ISO 8601 format (e.g. P3Y6M4DT12H30M5S). */
  readonly freeTrialRemainingTime?: string;
  /** Optional. If `pricingTier` is `Standard` then this property holds the date of the last time the `pricingTier` was set to `Standard`, when available (e.g 2023-03-01T12:42:42.1921106Z). */
  readonly enablementTime?: Date;
  /** If set to "False", it allows the descendants of this scope to override the pricing configuration set on this scope (allows setting inherited="False"). If set to "True", it prevents overrides and forces this pricing configuration on all the descendants of this scope. This field is only available for subscription-level pricing. */
  enforce?: Enforce;
  /** "inherited" = "True" indicates that the current scope inherits its pricing configuration from its parent. The ID of the parent scope that provides the inherited configuration is displayed in the "inheritedFrom" field. On the other hand, "inherited" = "False" indicates that the current scope has its own pricing configuration explicitly set, and does not inherit from its parent. This field is read only and available only for resource-level pricing. */
  readonly inherited?: Inherited;
  /** The id of the scope inherited from. "Null" if not inherited. This field is only available for resource-level pricing. */
  readonly inheritedFrom?: string;
  /** This field is available for subscription-level only, and reflects the coverage status of the resources under the subscription. Please note: The "pricingTier" field reflects the plan status of the subscription. However, since the plan status can also be defined at the resource level, there might be misalignment between the subscription's plan status and the resource status. This field helps indicate the coverage status of the resources. */
  readonly resourcesCoverageStatus?: ResourcesCoverageStatus;
  /** Optional. List of extensions offered under a plan. */
  extensions?: Extension[];
  /** Optional. True if the plan is deprecated. If there are replacing plans they will appear in `replacedBy` property */
  readonly deprecated?: boolean;
  /** Optional. List of plans that replace this plan. This property exists only if this plan is deprecated. */
  readonly replacedBy?: string[];
}

export function pricingPropertiesSerializer(item: PricingProperties): any {
  return {
    pricingTier: item["pricingTier"],
    subPlan: item["subPlan"],
    enforce: item["enforce"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : extensionArraySerializer(item["extensions"]),
  };
}

export function pricingPropertiesDeserializer(item: any): PricingProperties {
  return {
    pricingTier: item["pricingTier"],
    subPlan: item["subPlan"],
    freeTrialRemainingTime: item["freeTrialRemainingTime"],
    enablementTime: !item["enablementTime"]
      ? item["enablementTime"]
      : new Date(item["enablementTime"]),
    enforce: item["enforce"],
    inherited: item["inherited"],
    inheritedFrom: item["inheritedFrom"],
    resourcesCoverageStatus: item["resourcesCoverageStatus"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : extensionArrayDeserializer(item["extensions"]),
    deprecated: item["deprecated"],
    replacedBy: !item["replacedBy"]
      ? item["replacedBy"]
      : item["replacedBy"].map((p: any) => {
          return p;
        }),
  };
}

/** Indicates whether the Defender plan is enabled on the selected scope. Microsoft Defender for Cloud is provided in two pricing tiers: free and standard. The standard tier offers advanced security capabilities, while the free tier offers basic security features. */
export enum KnownPricingTier {
  /** Get free Microsoft Defender for Cloud experience with basic security features */
  Free = "Free",
  /** Get the standard Microsoft Defender for Cloud experience with advanced security features */
  Standard = "Standard",
}

/**
 * Indicates whether the Defender plan is enabled on the selected scope. Microsoft Defender for Cloud is provided in two pricing tiers: free and standard. The standard tier offers advanced security capabilities, while the free tier offers basic security features. \
 * {@link KnownPricingTier} can be used interchangeably with PricingTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free**: Get free Microsoft Defender for Cloud experience with basic security features \
 * **Standard**: Get the standard Microsoft Defender for Cloud experience with advanced security features
 */
export type PricingTier = string;

/** If set to "False", it allows the descendants of this scope to override the pricing configuration set on this scope (allows setting inherited="False"). If set to "True", it prevents overrides and forces this pricing configuration on all the descendants of this scope. This field is only available for subscription-level pricing. */
export enum KnownEnforce {
  /** Allows the descendants of this scope to override the pricing configuration set on this scope (allows setting inherited="False") */
  False = "False",
  /** Prevents overrides and forces the current scope's pricing configuration to all descendants */
  True = "True",
}

/**
 * If set to "False", it allows the descendants of this scope to override the pricing configuration set on this scope (allows setting inherited="False"). If set to "True", it prevents overrides and forces this pricing configuration on all the descendants of this scope. This field is only available for subscription-level pricing. \
 * {@link KnownEnforce} can be used interchangeably with Enforce,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **False**: Allows the descendants of this scope to override the pricing configuration set on this scope (allows setting inherited="False") \
 * **True**: Prevents overrides and forces the current scope's pricing configuration to all descendants
 */
export type Enforce = string;

/** "inherited" = "True" indicates that the current scope inherits its pricing configuration from its parent. The ID of the parent scope that provides the inherited configuration is displayed in the "inheritedFrom" field. On the other hand, "inherited" = "False" indicates that the current scope has its own pricing configuration explicitly set, and does not inherit from its parent. This field is read only and available only for resource-level pricing. */
export enum KnownInherited {
  /** Indicates that the current scope is inheriting its pricing configuration from its parent */
  True = "True",
  /** Indicates that the current scope sets its own pricing configuration and does not inherit it from its parent */
  False = "False",
}

/**
 * "inherited" = "True" indicates that the current scope inherits its pricing configuration from its parent. The ID of the parent scope that provides the inherited configuration is displayed in the "inheritedFrom" field. On the other hand, "inherited" = "False" indicates that the current scope has its own pricing configuration explicitly set, and does not inherit from its parent. This field is read only and available only for resource-level pricing. \
 * {@link KnownInherited} can be used interchangeably with Inherited,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Indicates that the current scope is inheriting its pricing configuration from its parent \
 * **False**: Indicates that the current scope sets its own pricing configuration and does not inherit it from its parent
 */
export type Inherited = string;

/** This field is available for subscription-level only, and reflects the coverage status of the resources under the subscription. Please note: The "pricingTier" field reflects the plan status of the subscription. However, since the plan status can also be defined at the resource level, there might be misalignment between the subscription's plan status and the resource status. This field helps indicate the coverage status of the resources. */
export enum KnownResourcesCoverageStatus {
  /** This value indicates that all resources associated with the subscription have the Defender plan enabled. */
  FullyCovered = "FullyCovered",
  /** This value indicates that some resources under the subscription have the Defender plan enabled, while others have it disabled. There is a mixed coverage status among resources. */
  PartiallyCovered = "PartiallyCovered",
  /** This value indicates that the Defender plan is disabled for all resources under the subscription. None of the resources are protected by the Defender plan. */
  NotCovered = "NotCovered",
}

/**
 * This field is available for subscription-level only, and reflects the coverage status of the resources under the subscription. Please note: The "pricingTier" field reflects the plan status of the subscription. However, since the plan status can also be defined at the resource level, there might be misalignment between the subscription's plan status and the resource status. This field helps indicate the coverage status of the resources. \
 * {@link KnownResourcesCoverageStatus} can be used interchangeably with ResourcesCoverageStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FullyCovered**: This value indicates that all resources associated with the subscription have the Defender plan enabled. \
 * **PartiallyCovered**: This value indicates that some resources under the subscription have the Defender plan enabled, while others have it disabled. There is a mixed coverage status among resources. \
 * **NotCovered**: This value indicates that the Defender plan is disabled for all resources under the subscription. None of the resources are protected by the Defender plan.
 */
export type ResourcesCoverageStatus = string;

export function extensionArraySerializer(result: Array<Extension>): any[] {
  return result.map((item) => {
    return extensionSerializer(item);
  });
}

export function extensionArrayDeserializer(result: Array<Extension>): any[] {
  return result.map((item) => {
    return extensionDeserializer(item);
  });
}

/** A plan's extension properties */
export interface Extension {
  /** The extension name. Supported values are: <br><br>**AgentlessDiscoveryForKubernetes** - Provides zero footprint, API-based discovery of Kubernetes clusters, their configurations and deployments. The collected data is used to create a contextualized security graph for Kubernetes clusters, provide risk hunting capabilities, and visualize risks and threats to  Kubernetes environments and workloads.<br>Available for CloudPosture plan and Containers plan.<br><br>**OnUploadMalwareScanning** - Limits the GB to be scanned per month for each storage account within the subscription. Once this limit reached on a given storage account, Blobs won't be scanned during current calendar month.<br>Available for StorageAccounts plan (DefenderForStorageV2 sub plans).<br><br>**SensitiveDataDiscovery** - Sensitive data discovery identifies Blob storage container with sensitive data such as credentials, credit cards, and more, to help prioritize and investigate security events.<br>Available for StorageAccounts plan (DefenderForStorageV2 sub plan) and CloudPosture plan.<br><br>**ContainerRegistriesVulnerabilityAssessments** - Provides vulnerability management for images stored in your container registries.<br>Available for CloudPosture plan and Containers plan.<br><br>**MdeDesignatedSubscription** - Direct onboarding is a seamless integration between Defender for Endpoint and Defender for Cloud that doesn't require extra software deployment on your servers. The onboarded resources will be presented under a designated Azure Subscription you configure<br>Available for VirtualMachines plan (P1 and P2 sub plans).<br><br>**AgentlessVmScanning** - Scans your machines for installed software, vulnerabilities, malware and secret scanning without relying on agents or impacting machine performance. Learn more here https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-agentless-data-collection.<br>Available for CloudPosture plan, VirtualMachines plan (P2 sub plan) and Containers plan.<br><br>**EntraPermissionsManagement** - Permissions Management provides Cloud Infrastructure Entitlement Management (CIEM) capabilities that helps organizations to manage and control user access and entitlements in their cloud infrastructure - important attack vector for cloud environments.<br>Permissions Management analyzes all permissions and active usage, and suggests recommendations to reduce permissions to enforce the principle of least privilege. Learn more here https://learn.microsoft.com/en-us/azure/defender-for-cloud/permissions-management.<br>Available for CloudPosture plan. <br><br>**FileIntegrityMonitoring** - File integrity monitoring (FIM), examines operating system files.<br>Windows registries, Linux system files, in real time, for changes that might indicate an attack.<br>Available for VirtualMachines plan (P2 sub plan). <br><br>**ContainerSensor** - The sensor is based on IG and provides a rich threat detection suite for Kubernetes clusters, nodes, and workloads, powered by Microsoft leading threat intelligence, provides mapping to MITRE ATT&CK framework.<br>Available for Containers plan. <br><br>**AIPromptEvidence** - Exposes the prompts passed between the user and the AI model as alert evidence. This helps classify and triage the alerts with relevant user context. The prompt snippets will include only segments of the user prompt or model response that were deemed suspicious and relevant for security classifications. The prompt evidence will be available through Defender portal as part of each alert.<br>Available for AI plan. <br><br> */
  name: string;
  /** Indicates whether the extension is enabled. */
  isEnabled: IsEnabled;
  /** Property values associated with the extension. */
  additionalExtensionProperties?: Record<string, any>;
  /** Optional. A status describing the success/failure of the extension's enablement/disablement operation. */
  readonly operationStatus?: OperationStatus;
}

export function extensionSerializer(item: Extension): any {
  return {
    name: item["name"],
    isEnabled: item["isEnabled"],
    additionalExtensionProperties: item["additionalExtensionProperties"],
  };
}

export function extensionDeserializer(item: any): Extension {
  return {
    name: item["name"],
    isEnabled: item["isEnabled"],
    additionalExtensionProperties: !item["additionalExtensionProperties"]
      ? item["additionalExtensionProperties"]
      : Object.fromEntries(
          Object.entries(item["additionalExtensionProperties"]).map(([k, p]: [string, any]) => [
            k,
            p,
          ]),
        ),
    operationStatus: !item["operationStatus"]
      ? item["operationStatus"]
      : operationStatusDeserializer(item["operationStatus"]),
  };
}

/** Indicates whether the extension is enabled. */
export enum KnownIsEnabled {
  /** Indicates the extension is enabled */
  True = "True",
  /** Indicates the extension is disabled */
  False = "False",
}

/**
 * Indicates whether the extension is enabled. \
 * {@link KnownIsEnabled} can be used interchangeably with IsEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Indicates the extension is enabled \
 * **False**: Indicates the extension is disabled
 */
export type IsEnabled = string;

/** List of pricing configurations response. */
export interface _PricingList {
  /** List of pricing configurations */
  value: Pricing[];
}

export function _pricingListDeserializer(item: any): _PricingList {
  return {
    value: pricingArrayDeserializer(item["value"]),
  };
}

export function pricingArraySerializer(result: Array<Pricing>): any[] {
  return result.map((item) => {
    return pricingSerializer(item);
  });
}

export function pricingArrayDeserializer(result: Array<Pricing>): any[] {
  return result.map((item) => {
    return pricingDeserializer(item);
  });
}

export function _pricingPropertiesSerializer(item: Pricing): any {
  return {
    pricingTier: item["pricingTier"],
    subPlan: item["subPlan"],
    enforce: item["enforce"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : extensionArraySerializer(item["extensions"]),
  };
}

export function _pricingPropertiesDeserializer(item: any) {
  return {
    pricingTier: item["pricingTier"],
    subPlan: item["subPlan"],
    freeTrialRemainingTime: item["freeTrialRemainingTime"],
    enablementTime: !item["enablementTime"]
      ? item["enablementTime"]
      : new Date(item["enablementTime"]),
    enforce: item["enforce"],
    inherited: item["inherited"],
    inheritedFrom: item["inheritedFrom"],
    resourcesCoverageStatus: item["resourcesCoverageStatus"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : extensionArrayDeserializer(item["extensions"]),
    deprecated: item["deprecated"],
    replacedBy: !item["replacedBy"]
      ? item["replacedBy"]
      : item["replacedBy"].map((p: any) => {
          return p;
        }),
  };
}

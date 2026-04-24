// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ProxyResource, ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Auto provisioning setting */
export interface LegacySettingsAPIAutoProvisioningSetting extends ProxyResource {
  /** Describes what kind of security agent provisioning action to take */
  autoProvision?: LegacySettingsAPIAutoProvision;
}

export function legacySettingsAPIAutoProvisioningSettingSerializer(
  item: LegacySettingsAPIAutoProvisioningSetting,
): any {
  return {
    properties: areAllPropsUndefined(item, ["autoProvision"])
      ? undefined
      : _autoProvisioningSettingPropertiesSerializer(item),
  };
}

export function legacySettingsAPIAutoProvisioningSettingDeserializer(
  item: any,
): LegacySettingsAPIAutoProvisioningSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _autoProvisioningSettingPropertiesDeserializer(item["properties"])),
  };
}

/** describes properties of an auto provisioning setting */
export interface LegacySettingsAPIAutoProvisioningSettingProperties {
  /** Describes what kind of security agent provisioning action to take */
  autoProvision: LegacySettingsAPIAutoProvision;
}

export function legacySettingsAPIAutoProvisioningSettingPropertiesSerializer(
  item: LegacySettingsAPIAutoProvisioningSettingProperties,
): any {
  return { autoProvision: item["autoProvision"] };
}

export function legacySettingsAPIAutoProvisioningSettingPropertiesDeserializer(
  item: any,
): LegacySettingsAPIAutoProvisioningSettingProperties {
  return {
    autoProvision: item["autoProvision"],
  };
}

/** Describes what kind of security agent provisioning action to take */
export enum KnownLegacySettingsAPIAutoProvision {
  /** Install missing security agent on VMs automatically */
  On = "On",
  /** Do not install security agent on the VMs automatically */
  Off = "Off",
}

/**
 * Describes what kind of security agent provisioning action to take \
 * {@link KnownLegacySettingsAPIAutoProvision} can be used interchangeably with LegacySettingsAPIAutoProvision,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **On**: Install missing security agent on VMs automatically \
 * **Off**: Do not install security agent on the VMs automatically
 */
export type LegacySettingsAPIAutoProvision = string;

/** List of all the auto provisioning settings response */
export interface _LegacySettingsAPIAutoProvisioningSettingList {
  /** List of all the auto provisioning settings */
  value?: LegacySettingsAPIAutoProvisioningSetting[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _legacySettingsAPIAutoProvisioningSettingListDeserializer(
  item: any,
): _LegacySettingsAPIAutoProvisioningSettingList {
  return {
    value: !item["value"]
      ? item["value"]
      : legacySettingsAPIAutoProvisioningSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function legacySettingsAPIAutoProvisioningSettingArraySerializer(
  result: Array<LegacySettingsAPIAutoProvisioningSetting>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIAutoProvisioningSettingSerializer(item);
  });
}

export function legacySettingsAPIAutoProvisioningSettingArrayDeserializer(
  result: Array<LegacySettingsAPIAutoProvisioningSetting>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIAutoProvisioningSettingDeserializer(item);
  });
}

/** Compliance of a scope */
export interface LegacySettingsAPICompliance extends ExtensionResource {
  /** The timestamp when the Compliance calculation was conducted. */
  readonly assessmentTimestampUtcDate?: Date;
  /** The resource count of the given subscription for which the Compliance calculation was conducted (needed for Management Group Compliance calculation). */
  readonly resourceCount?: number;
  /** An array of segment, which is the actually the compliance assessment. */
  readonly assessmentResult?: LegacySettingsAPIComplianceSegment[];
}

export function legacySettingsAPIComplianceDeserializer(item: any): LegacySettingsAPICompliance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _compliancePropertiesDeserializer(item["properties"])),
  };
}

/** The Compliance score (percentage) of a Subscription is a sum of all Resources' Compliances under the given Subscription. A Resource Compliance is defined as the compliant ('healthy') Policy Definitions out of all Policy Definitions applicable to a given resource. */
export interface LegacySettingsAPIComplianceProperties {
  /** The timestamp when the Compliance calculation was conducted. */
  readonly assessmentTimestampUtcDate?: Date;
  /** The resource count of the given subscription for which the Compliance calculation was conducted (needed for Management Group Compliance calculation). */
  readonly resourceCount?: number;
  /** An array of segment, which is the actually the compliance assessment. */
  readonly assessmentResult?: LegacySettingsAPIComplianceSegment[];
}

export function legacySettingsAPICompliancePropertiesDeserializer(
  item: any,
): LegacySettingsAPIComplianceProperties {
  return {
    assessmentTimestampUtcDate: !item["assessmentTimestampUtcDate"]
      ? item["assessmentTimestampUtcDate"]
      : new Date(item["assessmentTimestampUtcDate"]),
    resourceCount: item["resourceCount"],
    assessmentResult: !item["assessmentResult"]
      ? item["assessmentResult"]
      : legacySettingsAPIComplianceSegmentArrayDeserializer(item["assessmentResult"]),
  };
}

export function legacySettingsAPIComplianceSegmentArrayDeserializer(
  result: Array<LegacySettingsAPIComplianceSegment>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIComplianceSegmentDeserializer(item);
  });
}

/** A segment of a compliance assessment. */
export interface LegacySettingsAPIComplianceSegment {
  /** The segment type, e.g. compliant, non-compliance, insufficient coverage, N/A, etc. */
  readonly segmentType?: string;
  /** The size (%) of the segment. */
  readonly percentage?: number;
}

export function legacySettingsAPIComplianceSegmentDeserializer(
  item: any,
): LegacySettingsAPIComplianceSegment {
  return {
    segmentType: item["segmentType"],
    percentage: item["percentage"],
  };
}

/** List of Compliance objects response */
export interface _LegacySettingsAPIComplianceList {
  /** List of Compliance objects */
  readonly value?: LegacySettingsAPICompliance[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _legacySettingsAPIComplianceListDeserializer(
  item: any,
): _LegacySettingsAPIComplianceList {
  return {
    value: !item["value"]
      ? item["value"]
      : legacySettingsAPIComplianceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function legacySettingsAPIComplianceArrayDeserializer(
  result: Array<LegacySettingsAPICompliance>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIComplianceDeserializer(item);
  });
}

/** Information protection policy. */
export interface LegacySettingsAPIInformationProtectionPolicy extends ExtensionResource {
  /** Describes the last UTC time the policy was modified. */
  readonly lastModifiedUtc?: Date;
  /** Describes the version of the policy. */
  readonly version?: string;
  /** Dictionary of sensitivity labels. */
  labels?: Record<string, LegacySettingsAPISensitivityLabel>;
  /** The sensitivity information types. */
  informationTypes?: Record<string, LegacySettingsAPIInformationType>;
}

export function legacySettingsAPIInformationProtectionPolicySerializer(
  item: LegacySettingsAPIInformationProtectionPolicy,
): any {
  return {
    properties: areAllPropsUndefined(item, ["labels", "informationTypes"])
      ? undefined
      : _informationProtectionPolicyPropertiesSerializer(item),
  };
}

export function legacySettingsAPIInformationProtectionPolicyDeserializer(
  item: any,
): LegacySettingsAPIInformationProtectionPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _informationProtectionPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** describes properties of an information protection policy. */
export interface LegacySettingsAPIInformationProtectionPolicyProperties {
  /** Describes the last UTC time the policy was modified. */
  readonly lastModifiedUtc?: Date;
  /** Describes the version of the policy. */
  readonly version?: string;
  /** Dictionary of sensitivity labels. */
  labels?: Record<string, LegacySettingsAPISensitivityLabel>;
  /** The sensitivity information types. */
  informationTypes?: Record<string, LegacySettingsAPIInformationType>;
}

export function legacySettingsAPIInformationProtectionPolicyPropertiesSerializer(
  item: LegacySettingsAPIInformationProtectionPolicyProperties,
): any {
  return {
    labels: !item["labels"]
      ? item["labels"]
      : legacySettingsAPISensitivityLabelRecordSerializer(item["labels"]),
    informationTypes: !item["informationTypes"]
      ? item["informationTypes"]
      : legacySettingsAPIInformationTypeRecordSerializer(item["informationTypes"]),
  };
}

export function legacySettingsAPIInformationProtectionPolicyPropertiesDeserializer(
  item: any,
): LegacySettingsAPIInformationProtectionPolicyProperties {
  return {
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    version: item["version"],
    labels: !item["labels"]
      ? item["labels"]
      : legacySettingsAPISensitivityLabelRecordDeserializer(item["labels"]),
    informationTypes: !item["informationTypes"]
      ? item["informationTypes"]
      : legacySettingsAPIInformationTypeRecordDeserializer(item["informationTypes"]),
  };
}

export function legacySettingsAPISensitivityLabelRecordSerializer(
  item: Record<string, LegacySettingsAPISensitivityLabel>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : legacySettingsAPISensitivityLabelSerializer(item[key]);
  });
  return result;
}

export function legacySettingsAPISensitivityLabelRecordDeserializer(
  item: Record<string, any>,
): Record<string, LegacySettingsAPISensitivityLabel> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : legacySettingsAPISensitivityLabelDeserializer(item[key]);
  });
  return result;
}

/** The sensitivity label. */
export interface LegacySettingsAPISensitivityLabel {
  /** The name of the sensitivity label. */
  displayName?: string;
  /** The description of the sensitivity label. */
  description?: string;
  /** The rank of the sensitivity label. */
  rank?: LegacySettingsAPIRank;
  /** The order of the sensitivity label. */
  order?: number;
  /** Indicates whether the label is enabled or not. */
  enabled?: boolean;
}

export function legacySettingsAPISensitivityLabelSerializer(
  item: LegacySettingsAPISensitivityLabel,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    rank: item["rank"],
    order: item["order"],
    enabled: item["enabled"],
  };
}

export function legacySettingsAPISensitivityLabelDeserializer(
  item: any,
): LegacySettingsAPISensitivityLabel {
  return {
    displayName: item["displayName"],
    description: item["description"],
    rank: item["rank"],
    order: item["order"],
    enabled: item["enabled"],
  };
}

/** The rank of the sensitivity label. */
export type LegacySettingsAPIRank = "None" | "Low" | "Medium" | "High" | "Critical";

export function legacySettingsAPIInformationTypeRecordSerializer(
  item: Record<string, LegacySettingsAPIInformationType>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : legacySettingsAPIInformationTypeSerializer(item[key]);
  });
  return result;
}

export function legacySettingsAPIInformationTypeRecordDeserializer(
  item: Record<string, any>,
): Record<string, LegacySettingsAPIInformationType> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : legacySettingsAPIInformationTypeDeserializer(item[key]);
  });
  return result;
}

/** The information type. */
export interface LegacySettingsAPIInformationType {
  /** The name of the information type. */
  displayName?: string;
  /** The description of the information type. */
  description?: string;
  /** The order of the information type. */
  order?: number;
  /** The recommended label id to be associated with this information type. */
  recommendedLabelId?: string;
  /** Indicates whether the information type is enabled or not. */
  enabled?: boolean;
  /** Indicates whether the information type is custom or not. */
  custom?: boolean;
  /** The information type keywords. */
  keywords?: LegacySettingsAPIInformationProtectionKeyword[];
}

export function legacySettingsAPIInformationTypeSerializer(
  item: LegacySettingsAPIInformationType,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    order: item["order"],
    recommendedLabelId: item["recommendedLabelId"],
    enabled: item["enabled"],
    custom: item["custom"],
    keywords: !item["keywords"]
      ? item["keywords"]
      : legacySettingsAPIInformationProtectionKeywordArraySerializer(item["keywords"]),
  };
}

export function legacySettingsAPIInformationTypeDeserializer(
  item: any,
): LegacySettingsAPIInformationType {
  return {
    displayName: item["displayName"],
    description: item["description"],
    order: item["order"],
    recommendedLabelId: item["recommendedLabelId"],
    enabled: item["enabled"],
    custom: item["custom"],
    keywords: !item["keywords"]
      ? item["keywords"]
      : legacySettingsAPIInformationProtectionKeywordArrayDeserializer(item["keywords"]),
  };
}

export function legacySettingsAPIInformationProtectionKeywordArraySerializer(
  result: Array<LegacySettingsAPIInformationProtectionKeyword>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIInformationProtectionKeywordSerializer(item);
  });
}

export function legacySettingsAPIInformationProtectionKeywordArrayDeserializer(
  result: Array<LegacySettingsAPIInformationProtectionKeyword>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIInformationProtectionKeywordDeserializer(item);
  });
}

/** The information type keyword. */
export interface LegacySettingsAPIInformationProtectionKeyword {
  /** The keyword pattern. */
  pattern?: string;
  /** Indicates whether the keyword is custom or not. */
  custom?: boolean;
  /** Indicates whether the keyword can be applied on numeric types or not. */
  canBeNumeric?: boolean;
  /** Indicates whether the keyword is excluded or not. */
  excluded?: boolean;
}

export function legacySettingsAPIInformationProtectionKeywordSerializer(
  item: LegacySettingsAPIInformationProtectionKeyword,
): any {
  return {
    pattern: item["pattern"],
    custom: item["custom"],
    canBeNumeric: item["canBeNumeric"],
    excluded: item["excluded"],
  };
}

export function legacySettingsAPIInformationProtectionKeywordDeserializer(
  item: any,
): LegacySettingsAPIInformationProtectionKeyword {
  return {
    pattern: item["pattern"],
    custom: item["custom"],
    canBeNumeric: item["canBeNumeric"],
    excluded: item["excluded"],
  };
}

/** Known values of {@link InformationProtectionPolicyName} that the service accepts. */
export enum KnownLegacySettingsAPIInformationProtectionPolicyName {
  /** effective */
  Effective = "effective",
  /** custom */
  Custom = "custom",
}

/** Type of LegacySettingsAPIInformationProtectionPolicyName */
export type LegacySettingsAPIInformationProtectionPolicyName = string;

/** Information protection policies response. */
export interface _LegacySettingsAPIInformationProtectionPolicyList {
  /** List of information protection policies */
  value?: LegacySettingsAPIInformationProtectionPolicy[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _legacySettingsAPIInformationProtectionPolicyListDeserializer(
  item: any,
): _LegacySettingsAPIInformationProtectionPolicyList {
  return {
    value: !item["value"]
      ? item["value"]
      : legacySettingsAPIInformationProtectionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function legacySettingsAPIInformationProtectionPolicyArraySerializer(
  result: Array<LegacySettingsAPIInformationProtectionPolicy>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIInformationProtectionPolicySerializer(item);
  });
}

export function legacySettingsAPIInformationProtectionPolicyArrayDeserializer(
  result: Array<LegacySettingsAPIInformationProtectionPolicy>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIInformationProtectionPolicyDeserializer(item);
  });
}

/** Configures where to store the OMS agent data for workspaces under a scope */
export interface LegacySettingsAPIWorkspaceSetting extends ProxyResource {
  /** The full Azure ID of the workspace to save the data in */
  workspaceId?: string;
  /** All the VMs in this scope will send their security data to the mentioned workspace unless overridden by a setting with more specific scope */
  scope?: string;
}

export function legacySettingsAPIWorkspaceSettingSerializer(
  item: LegacySettingsAPIWorkspaceSetting,
): any {
  return {
    properties: areAllPropsUndefined(item, ["workspaceId", "scope"])
      ? undefined
      : _workspaceSettingPropertiesSerializer(item),
  };
}

export function legacySettingsAPIWorkspaceSettingDeserializer(
  item: any,
): LegacySettingsAPIWorkspaceSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workspaceSettingPropertiesDeserializer(item["properties"])),
  };
}

/** Workspace setting data */
export interface LegacySettingsAPIWorkspaceSettingProperties {
  /** The full Azure ID of the workspace to save the data in */
  workspaceId: string;
  /** All the VMs in this scope will send their security data to the mentioned workspace unless overridden by a setting with more specific scope */
  scope: string;
}

export function legacySettingsAPIWorkspaceSettingPropertiesSerializer(
  item: LegacySettingsAPIWorkspaceSettingProperties,
): any {
  return { workspaceId: item["workspaceId"], scope: item["scope"] };
}

export function legacySettingsAPIWorkspaceSettingPropertiesDeserializer(
  item: any,
): LegacySettingsAPIWorkspaceSettingProperties {
  return {
    workspaceId: item["workspaceId"],
    scope: item["scope"],
  };
}

/** List of workspace settings response */
export interface _LegacySettingsAPIWorkspaceSettingList {
  /** The WorkspaceSetting items on this page */
  value: LegacySettingsAPIWorkspaceSetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _legacySettingsAPIWorkspaceSettingListDeserializer(
  item: any,
): _LegacySettingsAPIWorkspaceSettingList {
  return {
    value: legacySettingsAPIWorkspaceSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function legacySettingsAPIWorkspaceSettingArraySerializer(
  result: Array<LegacySettingsAPIWorkspaceSetting>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIWorkspaceSettingSerializer(item);
  });
}

export function legacySettingsAPIWorkspaceSettingArrayDeserializer(
  result: Array<LegacySettingsAPIWorkspaceSetting>,
): any[] {
  return result.map((item) => {
    return legacySettingsAPIWorkspaceSettingDeserializer(item);
  });
}

export function _autoProvisioningSettingPropertiesSerializer(
  item: LegacySettingsAPIAutoProvisioningSetting,
): any {
  return { autoProvision: item["autoProvision"] };
}

export function _autoProvisioningSettingPropertiesDeserializer(item: any) {
  return {
    autoProvision: item["autoProvision"],
  };
}

export function _compliancePropertiesDeserializer(item: any) {
  return {
    assessmentTimestampUtcDate: !item["assessmentTimestampUtcDate"]
      ? item["assessmentTimestampUtcDate"]
      : new Date(item["assessmentTimestampUtcDate"]),
    resourceCount: item["resourceCount"],
    assessmentResult: !item["assessmentResult"]
      ? item["assessmentResult"]
      : legacySettingsAPIComplianceSegmentArrayDeserializer(item["assessmentResult"]),
  };
}

export function _informationProtectionPolicyPropertiesSerializer(
  item: LegacySettingsAPIInformationProtectionPolicy,
): any {
  return {
    labels: !item["labels"]
      ? item["labels"]
      : legacySettingsAPISensitivityLabelRecordSerializer(item["labels"]),
    informationTypes: !item["informationTypes"]
      ? item["informationTypes"]
      : legacySettingsAPIInformationTypeRecordSerializer(item["informationTypes"]),
  };
}

export function _informationProtectionPolicyPropertiesDeserializer(item: any) {
  return {
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    version: item["version"],
    labels: !item["labels"]
      ? item["labels"]
      : legacySettingsAPISensitivityLabelRecordDeserializer(item["labels"]),
    informationTypes: !item["informationTypes"]
      ? item["informationTypes"]
      : legacySettingsAPIInformationTypeRecordDeserializer(item["informationTypes"]),
  };
}

export function _workspaceSettingPropertiesSerializer(
  item: LegacySettingsAPIWorkspaceSetting,
): any {
  return { workspaceId: item["workspaceId"], scope: item["scope"] };
}

export function _workspaceSettingPropertiesDeserializer(item: any) {
  return {
    workspaceId: item["workspaceId"],
    scope: item["scope"],
  };
}

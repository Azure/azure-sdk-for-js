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
export interface AutoProvisioningSetting extends ProxyResource {
  /** Describes what kind of security agent provisioning action to take */
  autoProvision?: AutoProvision;
}

export function autoProvisioningSettingSerializer(item: AutoProvisioningSetting): any {
  return {
    properties: areAllPropsUndefined(item, ["autoProvision"])
      ? undefined
      : _autoProvisioningSettingPropertiesSerializer(item),
  };
}

export function autoProvisioningSettingDeserializer(item: any): AutoProvisioningSetting {
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
export interface AutoProvisioningSettingProperties {
  /** Describes what kind of security agent provisioning action to take */
  autoProvision: AutoProvision;
}

export function autoProvisioningSettingPropertiesSerializer(
  item: AutoProvisioningSettingProperties,
): any {
  return { autoProvision: item["autoProvision"] };
}

export function autoProvisioningSettingPropertiesDeserializer(
  item: any,
): AutoProvisioningSettingProperties {
  return {
    autoProvision: item["autoProvision"],
  };
}

/** Describes what kind of security agent provisioning action to take */
export enum KnownAutoProvision {
  /** Install missing security agent on VMs automatically */
  On = "On",
  /** Do not install security agent on the VMs automatically */
  Off = "Off",
}

/**
 * Describes what kind of security agent provisioning action to take \
 * {@link KnownAutoProvision} can be used interchangeably with AutoProvision,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **On**: Install missing security agent on VMs automatically \
 * **Off**: Do not install security agent on the VMs automatically
 */
export type AutoProvision = string;

/** List of all the auto provisioning settings response */
export interface _AutoProvisioningSettingList {
  /** List of all the auto provisioning settings */
  value?: AutoProvisioningSetting[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _autoProvisioningSettingListDeserializer(item: any): _AutoProvisioningSettingList {
  return {
    value: !item["value"] ? item["value"] : autoProvisioningSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autoProvisioningSettingArraySerializer(
  result: Array<AutoProvisioningSetting>,
): any[] {
  return result.map((item) => {
    return autoProvisioningSettingSerializer(item);
  });
}

export function autoProvisioningSettingArrayDeserializer(
  result: Array<AutoProvisioningSetting>,
): any[] {
  return result.map((item) => {
    return autoProvisioningSettingDeserializer(item);
  });
}

/** Compliance of a scope */
export interface Compliance extends ExtensionResource {
  /** The timestamp when the Compliance calculation was conducted. */
  readonly assessmentTimestampUtcDate?: Date;
  /** The resource count of the given subscription for which the Compliance calculation was conducted (needed for Management Group Compliance calculation). */
  readonly resourceCount?: number;
  /** An array of segment, which is the actually the compliance assessment. */
  readonly assessmentResult?: ComplianceSegment[];
}

export function complianceDeserializer(item: any): Compliance {
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
export interface ComplianceProperties {
  /** The timestamp when the Compliance calculation was conducted. */
  readonly assessmentTimestampUtcDate?: Date;
  /** The resource count of the given subscription for which the Compliance calculation was conducted (needed for Management Group Compliance calculation). */
  readonly resourceCount?: number;
  /** An array of segment, which is the actually the compliance assessment. */
  readonly assessmentResult?: ComplianceSegment[];
}

export function compliancePropertiesDeserializer(item: any): ComplianceProperties {
  return {
    assessmentTimestampUtcDate: !item["assessmentTimestampUtcDate"]
      ? item["assessmentTimestampUtcDate"]
      : new Date(item["assessmentTimestampUtcDate"]),
    resourceCount: item["resourceCount"],
    assessmentResult: !item["assessmentResult"]
      ? item["assessmentResult"]
      : complianceSegmentArrayDeserializer(item["assessmentResult"]),
  };
}

export function complianceSegmentArrayDeserializer(result: Array<ComplianceSegment>): any[] {
  return result.map((item) => {
    return complianceSegmentDeserializer(item);
  });
}

/** A segment of a compliance assessment. */
export interface ComplianceSegment {
  /** The segment type, e.g. compliant, non-compliance, insufficient coverage, N/A, etc. */
  readonly segmentType?: string;
  /** The size (%) of the segment. */
  readonly percentage?: number;
}

export function complianceSegmentDeserializer(item: any): ComplianceSegment {
  return {
    segmentType: item["segmentType"],
    percentage: item["percentage"],
  };
}

/** List of Compliance objects response */
export interface _ComplianceList {
  /** List of Compliance objects */
  readonly value?: Compliance[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _complianceListDeserializer(item: any): _ComplianceList {
  return {
    value: !item["value"] ? item["value"] : complianceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function complianceArrayDeserializer(result: Array<Compliance>): any[] {
  return result.map((item) => {
    return complianceDeserializer(item);
  });
}

/** Information protection policy. */
export interface InformationProtectionPolicy extends ExtensionResource {
  /** Describes the last UTC time the policy was modified. */
  readonly lastModifiedUtc?: Date;
  /** Describes the version of the policy. */
  readonly version?: string;
  /** Dictionary of sensitivity labels. */
  labels?: Record<string, SensitivityLabel>;
  /** The sensitivity information types. */
  informationTypes?: Record<string, InformationType>;
}

export function informationProtectionPolicySerializer(item: InformationProtectionPolicy): any {
  return {
    properties: areAllPropsUndefined(item, ["labels", "informationTypes"])
      ? undefined
      : _informationProtectionPolicyPropertiesSerializer(item),
  };
}

export function informationProtectionPolicyDeserializer(item: any): InformationProtectionPolicy {
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
export interface InformationProtectionPolicyProperties {
  /** Describes the last UTC time the policy was modified. */
  readonly lastModifiedUtc?: Date;
  /** Describes the version of the policy. */
  readonly version?: string;
  /** Dictionary of sensitivity labels. */
  labels?: Record<string, SensitivityLabel>;
  /** The sensitivity information types. */
  informationTypes?: Record<string, InformationType>;
}

export function informationProtectionPolicyPropertiesSerializer(
  item: InformationProtectionPolicyProperties,
): any {
  return {
    labels: !item["labels"] ? item["labels"] : sensitivityLabelRecordSerializer(item["labels"]),
    informationTypes: !item["informationTypes"]
      ? item["informationTypes"]
      : informationTypeRecordSerializer(item["informationTypes"]),
  };
}

export function informationProtectionPolicyPropertiesDeserializer(
  item: any,
): InformationProtectionPolicyProperties {
  return {
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    version: item["version"],
    labels: !item["labels"] ? item["labels"] : sensitivityLabelRecordDeserializer(item["labels"]),
    informationTypes: !item["informationTypes"]
      ? item["informationTypes"]
      : informationTypeRecordDeserializer(item["informationTypes"]),
  };
}

export function sensitivityLabelRecordSerializer(
  item: Record<string, SensitivityLabel>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : sensitivityLabelSerializer(item[key]);
  });
  return result;
}

export function sensitivityLabelRecordDeserializer(
  item: Record<string, any>,
): Record<string, SensitivityLabel> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : sensitivityLabelDeserializer(item[key]);
  });
  return result;
}

/** The sensitivity label. */
export interface SensitivityLabel {
  /** The name of the sensitivity label. */
  displayName?: string;
  /** The description of the sensitivity label. */
  description?: string;
  /** The rank of the sensitivity label. */
  rank?: Rank;
  /** The order of the sensitivity label. */
  order?: number;
  /** Indicates whether the label is enabled or not. */
  enabled?: boolean;
}

export function sensitivityLabelSerializer(item: SensitivityLabel): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    rank: item["rank"],
    order: item["order"],
    enabled: item["enabled"],
  };
}

export function sensitivityLabelDeserializer(item: any): SensitivityLabel {
  return {
    displayName: item["displayName"],
    description: item["description"],
    rank: item["rank"],
    order: item["order"],
    enabled: item["enabled"],
  };
}

/** The rank of the sensitivity label. */
export type Rank = "None" | "Low" | "Medium" | "High" | "Critical";

export function informationTypeRecordSerializer(
  item: Record<string, InformationType>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : informationTypeSerializer(item[key]);
  });
  return result;
}

export function informationTypeRecordDeserializer(
  item: Record<string, any>,
): Record<string, InformationType> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : informationTypeDeserializer(item[key]);
  });
  return result;
}

/** The information type. */
export interface InformationType {
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
  keywords?: InformationProtectionKeyword[];
}

export function informationTypeSerializer(item: InformationType): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    order: item["order"],
    recommendedLabelId: item["recommendedLabelId"],
    enabled: item["enabled"],
    custom: item["custom"],
    keywords: !item["keywords"]
      ? item["keywords"]
      : informationProtectionKeywordArraySerializer(item["keywords"]),
  };
}

export function informationTypeDeserializer(item: any): InformationType {
  return {
    displayName: item["displayName"],
    description: item["description"],
    order: item["order"],
    recommendedLabelId: item["recommendedLabelId"],
    enabled: item["enabled"],
    custom: item["custom"],
    keywords: !item["keywords"]
      ? item["keywords"]
      : informationProtectionKeywordArrayDeserializer(item["keywords"]),
  };
}

export function informationProtectionKeywordArraySerializer(
  result: Array<InformationProtectionKeyword>,
): any[] {
  return result.map((item) => {
    return informationProtectionKeywordSerializer(item);
  });
}

export function informationProtectionKeywordArrayDeserializer(
  result: Array<InformationProtectionKeyword>,
): any[] {
  return result.map((item) => {
    return informationProtectionKeywordDeserializer(item);
  });
}

/** The information type keyword. */
export interface InformationProtectionKeyword {
  /** The keyword pattern. */
  pattern?: string;
  /** Indicates whether the keyword is custom or not. */
  custom?: boolean;
  /** Indicates whether the keyword can be applied on numeric types or not. */
  canBeNumeric?: boolean;
  /** Indicates whether the keyword is excluded or not. */
  excluded?: boolean;
}

export function informationProtectionKeywordSerializer(item: InformationProtectionKeyword): any {
  return {
    pattern: item["pattern"],
    custom: item["custom"],
    canBeNumeric: item["canBeNumeric"],
    excluded: item["excluded"],
  };
}

export function informationProtectionKeywordDeserializer(item: any): InformationProtectionKeyword {
  return {
    pattern: item["pattern"],
    custom: item["custom"],
    canBeNumeric: item["canBeNumeric"],
    excluded: item["excluded"],
  };
}

/** Known values of {@link InformationProtectionPolicyName} that the service accepts. */
export enum KnownInformationProtectionPolicyName {
  /** effective */
  Effective = "effective",
  /** custom */
  Custom = "custom",
}

/** Type of InformationProtectionPolicyName */
export type InformationProtectionPolicyName = string;

/** Information protection policies response. */
export interface _InformationProtectionPolicyList {
  /** List of information protection policies */
  value?: InformationProtectionPolicy[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _informationProtectionPolicyListDeserializer(
  item: any,
): _InformationProtectionPolicyList {
  return {
    value: !item["value"]
      ? item["value"]
      : informationProtectionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function informationProtectionPolicyArraySerializer(
  result: Array<InformationProtectionPolicy>,
): any[] {
  return result.map((item) => {
    return informationProtectionPolicySerializer(item);
  });
}

export function informationProtectionPolicyArrayDeserializer(
  result: Array<InformationProtectionPolicy>,
): any[] {
  return result.map((item) => {
    return informationProtectionPolicyDeserializer(item);
  });
}

/** Configures where to store the OMS agent data for workspaces under a scope */
export interface WorkspaceSetting extends ProxyResource {
  /** The full Azure ID of the workspace to save the data in */
  workspaceId?: string;
  /** All the VMs in this scope will send their security data to the mentioned workspace unless overridden by a setting with more specific scope */
  scope?: string;
}

export function workspaceSettingSerializer(item: WorkspaceSetting): any {
  return {
    properties: areAllPropsUndefined(item, ["workspaceId", "scope"])
      ? undefined
      : _workspaceSettingPropertiesSerializer(item),
  };
}

export function workspaceSettingDeserializer(item: any): WorkspaceSetting {
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
export interface WorkspaceSettingProperties {
  /** The full Azure ID of the workspace to save the data in */
  workspaceId: string;
  /** All the VMs in this scope will send their security data to the mentioned workspace unless overridden by a setting with more specific scope */
  scope: string;
}

export function workspaceSettingPropertiesSerializer(item: WorkspaceSettingProperties): any {
  return { workspaceId: item["workspaceId"], scope: item["scope"] };
}

export function workspaceSettingPropertiesDeserializer(item: any): WorkspaceSettingProperties {
  return {
    workspaceId: item["workspaceId"],
    scope: item["scope"],
  };
}

/** List of workspace settings response */
export interface _WorkspaceSettingList {
  /** The WorkspaceSetting items on this page */
  value: WorkspaceSetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceSettingListDeserializer(item: any): _WorkspaceSettingList {
  return {
    value: workspaceSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceSettingArraySerializer(result: Array<WorkspaceSetting>): any[] {
  return result.map((item) => {
    return workspaceSettingSerializer(item);
  });
}

export function workspaceSettingArrayDeserializer(result: Array<WorkspaceSetting>): any[] {
  return result.map((item) => {
    return workspaceSettingDeserializer(item);
  });
}

export function _autoProvisioningSettingPropertiesSerializer(item: AutoProvisioningSetting): any {
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
      : complianceSegmentArrayDeserializer(item["assessmentResult"]),
  };
}

export function _informationProtectionPolicyPropertiesSerializer(
  item: InformationProtectionPolicy,
): any {
  return {
    labels: !item["labels"] ? item["labels"] : sensitivityLabelRecordSerializer(item["labels"]),
    informationTypes: !item["informationTypes"]
      ? item["informationTypes"]
      : informationTypeRecordSerializer(item["informationTypes"]),
  };
}

export function _informationProtectionPolicyPropertiesDeserializer(item: any) {
  return {
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    version: item["version"],
    labels: !item["labels"] ? item["labels"] : sensitivityLabelRecordDeserializer(item["labels"]),
    informationTypes: !item["informationTypes"]
      ? item["informationTypes"]
      : informationTypeRecordDeserializer(item["informationTypes"]),
  };
}

export function _workspaceSettingPropertiesSerializer(item: WorkspaceSetting): any {
  return { workspaceId: item["workspaceId"], scope: item["scope"] };
}

export function _workspaceSettingPropertiesDeserializer(item: any) {
  return {
    workspaceId: item["workspaceId"],
    scope: item["scope"],
  };
}

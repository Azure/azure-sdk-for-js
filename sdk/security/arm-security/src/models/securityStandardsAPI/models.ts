// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { AssignedStandardItem } from "../common/models.js";
import {
  assignedStandardItemSerializer,
  assignedStandardItemDeserializer,
} from "../common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Security Standard on a resource */
export interface SecurityStandard extends ExtensionResource {
  /** Display name of the standard, equivalent to the standardId */
  displayName?: string;
  /** Standard type (Custom or Default or Compliance only currently) */
  readonly standardType?: StandardType;
  /** Description of the standard */
  description?: string;
  /** List of assessment keys to apply to standard scope. */
  assessments?: PartialAssessmentProperties[];
  /** List of all standard supported clouds. */
  cloudProviders?: StandardSupportedCloud[];
  /** The policy set definition id associated with the standard. */
  policySetDefinitionId?: string;
  /** The security standard metadata. */
  metadata?: StandardMetadata;
}

export function securityStandardSerializer(item: SecurityStandard): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "assessments",
      "cloudProviders",
      "policySetDefinitionId",
      "metadata",
    ])
      ? undefined
      : _securityStandardPropertiesSerializer(item),
  };
}

export function securityStandardDeserializer(item: any): SecurityStandard {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securityStandardPropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of a standard. */
export interface SecurityStandardProperties {
  /** Display name of the standard, equivalent to the standardId */
  displayName?: string;
  /** Standard type (Custom or Default or Compliance only currently) */
  readonly standardType?: StandardType;
  /** Description of the standard */
  description?: string;
  /** List of assessment keys to apply to standard scope. */
  assessments?: PartialAssessmentProperties[];
  /** List of all standard supported clouds. */
  cloudProviders?: StandardSupportedCloud[];
  /** The policy set definition id associated with the standard. */
  policySetDefinitionId?: string;
  /** The security standard metadata. */
  metadata?: StandardMetadata;
}

export function securityStandardPropertiesSerializer(item: SecurityStandardProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assessments: !item["assessments"]
      ? item["assessments"]
      : partialAssessmentPropertiesArraySerializer(item["assessments"]),
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    policySetDefinitionId: item["policySetDefinitionId"],
    metadata: !item["metadata"] ? item["metadata"] : standardMetadataSerializer(item["metadata"]),
  };
}

export function securityStandardPropertiesDeserializer(item: any): SecurityStandardProperties {
  return {
    displayName: item["displayName"],
    standardType: item["standardType"],
    description: item["description"],
    assessments: !item["assessments"]
      ? item["assessments"]
      : partialAssessmentPropertiesArrayDeserializer(item["assessments"]),
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    policySetDefinitionId: item["policySetDefinitionId"],
    metadata: !item["metadata"] ? item["metadata"] : standardMetadataDeserializer(item["metadata"]),
  };
}

/** Standard type (Custom or Default or Compliance only currently) */
export enum KnownStandardType {
  /** Custom */
  Custom = "Custom",
  /** Default */
  Default = "Default",
  /** Compliance */
  Compliance = "Compliance",
}

/**
 * Standard type (Custom or Default or Compliance only currently) \
 * {@link KnownStandardType} can be used interchangeably with StandardType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Custom**: Custom \
 * **Default**: Default \
 * **Compliance**: Compliance
 */
export type StandardType = string;

export function partialAssessmentPropertiesArraySerializer(
  result: Array<PartialAssessmentProperties>,
): any[] {
  return result.map((item) => {
    return partialAssessmentPropertiesSerializer(item);
  });
}

export function partialAssessmentPropertiesArrayDeserializer(
  result: Array<PartialAssessmentProperties>,
): any[] {
  return result.map((item) => {
    return partialAssessmentPropertiesDeserializer(item);
  });
}

/** Describes properties of an assessment as related to the standard */
export interface PartialAssessmentProperties {
  /** The assessment key */
  assessmentKey?: string;
}

export function partialAssessmentPropertiesSerializer(item: PartialAssessmentProperties): any {
  return { assessmentKey: item["assessmentKey"] };
}

export function partialAssessmentPropertiesDeserializer(item: any): PartialAssessmentProperties {
  return {
    assessmentKey: item["assessmentKey"],
  };
}

/** The cloud that the standard is supported on. */
export enum KnownStandardSupportedCloud {
  /** Azure */
  Azure = "Azure",
  /** AWS */
  AWS = "AWS",
  /** GCP */
  GCP = "GCP",
}

/**
 * The cloud that the standard is supported on. \
 * {@link KnownStandardSupportedCloud} can be used interchangeably with StandardSupportedCloud,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure**: Azure \
 * **AWS**: AWS \
 * **GCP**: GCP
 */
export type StandardSupportedCloud = string;

/** The standard metadata */
export interface StandardMetadata {
  /** Standard Created by object id (GUID) */
  readonly createdBy?: string;
  /** Standard creation date */
  readonly createdOn?: Date;
  /** Standard last updated by object id (GUID) */
  readonly lastUpdatedBy?: string;
  /** Standard last update date */
  readonly lastUpdatedOn?: Date;
}

export function standardMetadataSerializer(_item: StandardMetadata): any {
  return {};
}

export function standardMetadataDeserializer(item: any): StandardMetadata {
  return {
    createdBy: item["createdBy"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    lastUpdatedBy: item["lastUpdatedBy"],
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

/** Page of a Standard list */
export interface _SecurityStandardList {
  /** Collection of standards in this page */
  readonly value: SecurityStandard[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _securityStandardListDeserializer(item: any): _SecurityStandardList {
  return {
    value: securityStandardArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityStandardArraySerializer(result: Array<SecurityStandard>): any[] {
  return result.map((item) => {
    return securityStandardSerializer(item);
  });
}

export function securityStandardArrayDeserializer(result: Array<SecurityStandard>): any[] {
  return result.map((item) => {
    return securityStandardDeserializer(item);
  });
}

/** Security Assignment on a resource group over a given scope */
export interface StandardAssignment extends ExtensionResource {
  /** Display name of the standardAssignment */
  displayName?: string;
  /** Description of the standardAssignment */
  description?: string;
  /** Standard item with key as applied to this standard assignment over the given scope */
  assignedStandard?: AssignedStandardItem;
  /** Expected effect of this assignment (Audit/Exempt/Attest) */
  effect?: Effect;
  /** Excluded scopes, filter out the descendants of the scope (on management scopes) */
  excludedScopes?: string[];
  /** Expiration date of this assignment as a full ISO date */
  expiresOn?: Date;
  /** Additional data about assignment that has Exempt effect */
  exemptionData?: StandardAssignmentPropertiesExemptionData;
  /** Additional data about assignment that has Attest effect */
  attestationData?: StandardAssignmentPropertiesAttestationData;
  /** The standard assignment metadata. */
  metadata?: StandardAssignmentMetadata;
}

export function standardAssignmentSerializer(item: StandardAssignment): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "assignedStandard",
      "effect",
      "excludedScopes",
      "expiresOn",
      "exemptionData",
      "attestationData",
      "metadata",
    ])
      ? undefined
      : _standardAssignmentPropertiesSerializer(item),
  };
}

export function standardAssignmentDeserializer(item: any): StandardAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _standardAssignmentPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a standardAssignment */
export interface StandardAssignmentProperties {
  /** Display name of the standardAssignment */
  displayName?: string;
  /** Description of the standardAssignment */
  description?: string;
  /** Standard item with key as applied to this standard assignment over the given scope */
  assignedStandard?: AssignedStandardItem;
  /** Expected effect of this assignment (Audit/Exempt/Attest) */
  effect?: Effect;
  /** Excluded scopes, filter out the descendants of the scope (on management scopes) */
  excludedScopes?: string[];
  /** Expiration date of this assignment as a full ISO date */
  expiresOn?: Date;
  /** Additional data about assignment that has Exempt effect */
  exemptionData?: StandardAssignmentPropertiesExemptionData;
  /** Additional data about assignment that has Attest effect */
  attestationData?: StandardAssignmentPropertiesAttestationData;
  /** The standard assignment metadata. */
  metadata?: StandardAssignmentMetadata;
}

export function standardAssignmentPropertiesSerializer(item: StandardAssignmentProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : assignedStandardItemSerializer(item["assignedStandard"]),
    effect: item["effect"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    exemptionData: !item["exemptionData"]
      ? item["exemptionData"]
      : standardAssignmentPropertiesExemptionDataSerializer(item["exemptionData"]),
    attestationData: !item["attestationData"]
      ? item["attestationData"]
      : standardAssignmentPropertiesAttestationDataSerializer(item["attestationData"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : standardAssignmentMetadataSerializer(item["metadata"]),
  };
}

export function standardAssignmentPropertiesDeserializer(item: any): StandardAssignmentProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : assignedStandardItemDeserializer(item["assignedStandard"]),
    effect: item["effect"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    exemptionData: !item["exemptionData"]
      ? item["exemptionData"]
      : standardAssignmentPropertiesExemptionDataDeserializer(item["exemptionData"]),
    attestationData: !item["attestationData"]
      ? item["attestationData"]
      : standardAssignmentPropertiesAttestationDataDeserializer(item["attestationData"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : standardAssignmentMetadataDeserializer(item["metadata"]),
  };
}

/** Expected effect of this assignment (Audit/Exempt/Attest) */
export enum KnownEffect {
  /** Audit */
  Audit = "Audit",
  /** Exempt */
  Exempt = "Exempt",
  /** Attest */
  Attest = "Attest",
}

/**
 * Expected effect of this assignment (Audit/Exempt/Attest) \
 * {@link KnownEffect} can be used interchangeably with Effect,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit**: Audit \
 * **Exempt**: Exempt \
 * **Attest**: Attest
 */
export type Effect = string;

/** Additional data about assignment that has Exempt effect */
export interface StandardAssignmentPropertiesExemptionData {
  /** Exemption category of this assignment */
  exemptionCategory?: ExemptionCategory;
  /** Component item with key as applied to this standard assignment over the given scope */
  assignedAssessment?: AssignedAssessmentItem;
}

export function standardAssignmentPropertiesExemptionDataSerializer(
  item: StandardAssignmentPropertiesExemptionData,
): any {
  return {
    exemptionCategory: item["exemptionCategory"],
    assignedAssessment: !item["assignedAssessment"]
      ? item["assignedAssessment"]
      : assignedAssessmentItemSerializer(item["assignedAssessment"]),
  };
}

export function standardAssignmentPropertiesExemptionDataDeserializer(
  item: any,
): StandardAssignmentPropertiesExemptionData {
  return {
    exemptionCategory: item["exemptionCategory"],
    assignedAssessment: !item["assignedAssessment"]
      ? item["assignedAssessment"]
      : assignedAssessmentItemDeserializer(item["assignedAssessment"]),
  };
}

/** Exemption category of this assignment */
export enum KnownExemptionCategory {
  /** waiver */
  Waiver = "waiver",
  /** mitigated */
  Mitigated = "mitigated",
}

/**
 * Exemption category of this assignment \
 * {@link KnownExemptionCategory} can be used interchangeably with ExemptionCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **waiver**: waiver \
 * **mitigated**: mitigated
 */
export type ExemptionCategory = string;

/** Describe the properties of a security assessment object reference (by key) */
export interface AssignedAssessmentItem {
  /** Unique key to a security assessment object */
  assessmentKey?: string;
}

export function assignedAssessmentItemSerializer(item: AssignedAssessmentItem): any {
  return { assessmentKey: item["assessmentKey"] };
}

export function assignedAssessmentItemDeserializer(item: any): AssignedAssessmentItem {
  return {
    assessmentKey: item["assessmentKey"],
  };
}

/** Additional data about assignment that has Attest effect */
export interface StandardAssignmentPropertiesAttestationData {
  /** Attest category of this assignment */
  complianceState?: AttestationComplianceState;
  /** Component item with key as applied to this standard assignment over the given scope */
  assignedAssessment?: AssignedAssessmentItem;
  /** Attestation compliance date */
  readonly complianceDate?: Date;
  /** Array of links to attestation evidence */
  evidence?: AttestationEvidence[];
}

export function standardAssignmentPropertiesAttestationDataSerializer(
  item: StandardAssignmentPropertiesAttestationData,
): any {
  return {
    complianceState: item["complianceState"],
    assignedAssessment: !item["assignedAssessment"]
      ? item["assignedAssessment"]
      : assignedAssessmentItemSerializer(item["assignedAssessment"]),
    evidence: !item["evidence"]
      ? item["evidence"]
      : attestationEvidenceArraySerializer(item["evidence"]),
  };
}

export function standardAssignmentPropertiesAttestationDataDeserializer(
  item: any,
): StandardAssignmentPropertiesAttestationData {
  return {
    complianceState: item["complianceState"],
    assignedAssessment: !item["assignedAssessment"]
      ? item["assignedAssessment"]
      : assignedAssessmentItemDeserializer(item["assignedAssessment"]),
    complianceDate: !item["complianceDate"]
      ? item["complianceDate"]
      : new Date(item["complianceDate"]),
    evidence: !item["evidence"]
      ? item["evidence"]
      : attestationEvidenceArrayDeserializer(item["evidence"]),
  };
}

/** Attest category of this assignment */
export enum KnownAttestationComplianceState {
  /** unknown */
  Unknown = "unknown",
  /** compliant */
  Compliant = "compliant",
  /** nonCompliant */
  NonCompliant = "nonCompliant",
}

/**
 * Attest category of this assignment \
 * {@link KnownAttestationComplianceState} can be used interchangeably with AttestationComplianceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **unknown**: unknown \
 * **compliant**: compliant \
 * **nonCompliant**: nonCompliant
 */
export type AttestationComplianceState = string;

export function attestationEvidenceArraySerializer(result: Array<AttestationEvidence>): any[] {
  return result.map((item) => {
    return attestationEvidenceSerializer(item);
  });
}

export function attestationEvidenceArrayDeserializer(result: Array<AttestationEvidence>): any[] {
  return result.map((item) => {
    return attestationEvidenceDeserializer(item);
  });
}

/** Describe the properties of a assignment attestation */
export interface AttestationEvidence {
  /** The description of the evidence */
  description?: string;
  /** The source url of the evidence */
  sourceUrl?: string;
}

export function attestationEvidenceSerializer(item: AttestationEvidence): any {
  return { description: item["description"], sourceUrl: item["sourceUrl"] };
}

export function attestationEvidenceDeserializer(item: any): AttestationEvidence {
  return {
    description: item["description"],
    sourceUrl: item["sourceUrl"],
  };
}

/** The standard assignment metadata */
export interface StandardAssignmentMetadata {
  /** Standard assignment Created by object id (GUID) */
  readonly createdBy?: string;
  /** Standard assignment creation date */
  readonly createdOn?: Date;
  /** Standard assignment last updated by object id (GUID) */
  readonly lastUpdatedBy?: string;
  /** Standard assignment last update date */
  readonly lastUpdatedOn?: Date;
}

export function standardAssignmentMetadataSerializer(_item: StandardAssignmentMetadata): any {
  return {};
}

export function standardAssignmentMetadataDeserializer(item: any): StandardAssignmentMetadata {
  return {
    createdBy: item["createdBy"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    lastUpdatedBy: item["lastUpdatedBy"],
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

/** Page of a standard assignment list */
export interface _StandardAssignmentsList {
  /** Collection of standardAssignments in this page */
  readonly value: StandardAssignment[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _standardAssignmentsListDeserializer(item: any): _StandardAssignmentsList {
  return {
    value: standardAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function standardAssignmentArraySerializer(result: Array<StandardAssignment>): any[] {
  return result.map((item) => {
    return standardAssignmentSerializer(item);
  });
}

export function standardAssignmentArrayDeserializer(result: Array<StandardAssignment>): any[] {
  return result.map((item) => {
    return standardAssignmentDeserializer(item);
  });
}

/** Custom Recommendation */
export interface CustomRecommendation extends ExtensionResource {
  /** KQL query representing the Recommendation results required. */
  query?: string;
  /** List of all standard supported clouds. */
  cloudProviders?: RecommendationSupportedClouds[];
  /** The severity to relate to the assessments generated by this Recommendation. */
  severity?: SeverityEnum;
  /** The severity to relate to the assessments generated by this Recommendation. */
  securityIssue?: SecurityIssue;
  /** The display name of the assessments generated by this Recommendation. */
  displayName?: string;
  /** The description to relate to the assessments generated by this Recommendation. */
  description?: string;
  /** The remediation description to relate to the assessments generated by this Recommendation. */
  remediationDescription?: string;
  /** The assessment metadata key used when an assessment is generated for this Recommendation. */
  readonly assessmentKey?: string;
}

export function customRecommendationSerializer(item: CustomRecommendation): any {
  return {
    properties: areAllPropsUndefined(item, [
      "query",
      "cloudProviders",
      "severity",
      "securityIssue",
      "displayName",
      "description",
      "remediationDescription",
    ])
      ? undefined
      : _customRecommendationPropertiesSerializer(item),
  };
}

export function customRecommendationDeserializer(item: any): CustomRecommendation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _customRecommendationPropertiesDeserializer(item["properties"])),
  };
}

/** describes the Custom Recommendation properties */
export interface CustomRecommendationProperties {
  /** KQL query representing the Recommendation results required. */
  query?: string;
  /** List of all standard supported clouds. */
  cloudProviders?: RecommendationSupportedClouds[];
  /** The severity to relate to the assessments generated by this Recommendation. */
  severity?: SeverityEnum;
  /** The severity to relate to the assessments generated by this Recommendation. */
  securityIssue?: SecurityIssue;
  /** The display name of the assessments generated by this Recommendation. */
  displayName?: string;
  /** The description to relate to the assessments generated by this Recommendation. */
  description?: string;
  /** The remediation description to relate to the assessments generated by this Recommendation. */
  remediationDescription?: string;
  /** The assessment metadata key used when an assessment is generated for this Recommendation. */
  readonly assessmentKey?: string;
}

export function customRecommendationPropertiesSerializer(
  item: CustomRecommendationProperties,
): any {
  return {
    query: item["query"],
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    securityIssue: item["securityIssue"],
    displayName: item["displayName"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
  };
}

export function customRecommendationPropertiesDeserializer(
  item: any,
): CustomRecommendationProperties {
  return {
    query: item["query"],
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    securityIssue: item["securityIssue"],
    displayName: item["displayName"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
    assessmentKey: item["assessmentKey"],
  };
}

/** The cloud that the recommendation is supported on. */
export enum KnownRecommendationSupportedClouds {
  /** Azure */
  Azure = "Azure",
  /** AWS */
  AWS = "AWS",
  /** GCP */
  GCP = "GCP",
}

/**
 * The cloud that the recommendation is supported on. \
 * {@link KnownRecommendationSupportedClouds} can be used interchangeably with RecommendationSupportedClouds,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure**: Azure \
 * **AWS**: AWS \
 * **GCP**: GCP
 */
export type RecommendationSupportedClouds = string;

/** The severity to relate to the assessments generated by this Recommendation. */
export enum KnownSeverityEnum {
  /** High */
  High = "High",
  /** Medium */
  Medium = "Medium",
  /** Low */
  Low = "Low",
}

/**
 * The severity to relate to the assessments generated by this Recommendation. \
 * {@link KnownSeverityEnum} can be used interchangeably with SeverityEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: High \
 * **Medium**: Medium \
 * **Low**: Low
 */
export type SeverityEnum = string;

/** The severity to relate to the assessments generated by this Recommendation. */
export enum KnownSecurityIssue {
  /** Vulnerability */
  Vulnerability = "Vulnerability",
  /** ExcessivePermissions */
  ExcessivePermissions = "ExcessivePermissions",
  /** AnonymousAccess */
  AnonymousAccess = "AnonymousAccess",
  /** NetworkExposure */
  NetworkExposure = "NetworkExposure",
  /** TrafficEncryption */
  TrafficEncryption = "TrafficEncryption",
  /** BestPractices */
  BestPractices = "BestPractices",
}

/**
 * The severity to relate to the assessments generated by this Recommendation. \
 * {@link KnownSecurityIssue} can be used interchangeably with SecurityIssue,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Vulnerability**: Vulnerability \
 * **ExcessivePermissions**: ExcessivePermissions \
 * **AnonymousAccess**: AnonymousAccess \
 * **NetworkExposure**: NetworkExposure \
 * **TrafficEncryption**: TrafficEncryption \
 * **BestPractices**: BestPractices
 */
export type SecurityIssue = string;

/** A list of Custom Recommendations */
export interface _CustomRecommendationsList {
  /** Collection of Custom Recommendations */
  readonly value: CustomRecommendation[];
  /** The link used to get the next page of operations. */
  nextLink?: string;
}

export function _customRecommendationsListDeserializer(item: any): _CustomRecommendationsList {
  return {
    value: customRecommendationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function customRecommendationArraySerializer(result: Array<CustomRecommendation>): any[] {
  return result.map((item) => {
    return customRecommendationSerializer(item);
  });
}

export function customRecommendationArrayDeserializer(result: Array<CustomRecommendation>): any[] {
  return result.map((item) => {
    return customRecommendationDeserializer(item);
  });
}

export function _securityStandardPropertiesSerializer(item: SecurityStandard): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assessments: !item["assessments"]
      ? item["assessments"]
      : partialAssessmentPropertiesArraySerializer(item["assessments"]),
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    policySetDefinitionId: item["policySetDefinitionId"],
    metadata: !item["metadata"] ? item["metadata"] : standardMetadataSerializer(item["metadata"]),
  };
}

export function _securityStandardPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    standardType: item["standardType"],
    description: item["description"],
    assessments: !item["assessments"]
      ? item["assessments"]
      : partialAssessmentPropertiesArrayDeserializer(item["assessments"]),
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    policySetDefinitionId: item["policySetDefinitionId"],
    metadata: !item["metadata"] ? item["metadata"] : standardMetadataDeserializer(item["metadata"]),
  };
}

export function _standardAssignmentPropertiesSerializer(item: StandardAssignment): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : assignedStandardItemSerializer(item["assignedStandard"]),
    effect: item["effect"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    exemptionData: !item["exemptionData"]
      ? item["exemptionData"]
      : standardAssignmentPropertiesExemptionDataSerializer(item["exemptionData"]),
    attestationData: !item["attestationData"]
      ? item["attestationData"]
      : standardAssignmentPropertiesAttestationDataSerializer(item["attestationData"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : standardAssignmentMetadataSerializer(item["metadata"]),
  };
}

export function _standardAssignmentPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : assignedStandardItemDeserializer(item["assignedStandard"]),
    effect: item["effect"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    exemptionData: !item["exemptionData"]
      ? item["exemptionData"]
      : standardAssignmentPropertiesExemptionDataDeserializer(item["exemptionData"]),
    attestationData: !item["attestationData"]
      ? item["attestationData"]
      : standardAssignmentPropertiesAttestationDataDeserializer(item["attestationData"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : standardAssignmentMetadataDeserializer(item["metadata"]),
  };
}

export function _customRecommendationPropertiesSerializer(item: CustomRecommendation): any {
  return {
    query: item["query"],
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    securityIssue: item["securityIssue"],
    displayName: item["displayName"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
  };
}

export function _customRecommendationPropertiesDeserializer(item: any) {
  return {
    query: item["query"],
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    securityIssue: item["securityIssue"],
    displayName: item["displayName"],
    description: item["description"],
    remediationDescription: item["remediationDescription"],
    assessmentKey: item["assessmentKey"],
  };
}

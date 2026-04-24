// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { CommonAssignedStandardItem } from "../common/models.js";
import {
  commonAssignedStandardItemSerializer,
  commonAssignedStandardItemDeserializer,
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
export interface SecurityStandardsAPISecurityStandard extends ExtensionResource {
  /** Display name of the standard, equivalent to the standardId */
  displayName?: string;
  /** Standard type (Custom or Default or Compliance only currently) */
  readonly standardType?: SecurityStandardsAPIStandardType;
  /** Description of the standard */
  description?: string;
  /** List of assessment keys to apply to standard scope. */
  assessments?: SecurityStandardsAPIPartialAssessmentProperties[];
  /** List of all standard supported clouds. */
  cloudProviders?: SecurityStandardsAPIStandardSupportedCloud[];
  /** The policy set definition id associated with the standard. */
  policySetDefinitionId?: string;
  /** The security standard metadata. */
  metadata?: SecurityStandardsAPIStandardMetadata;
}

export function securityStandardsAPISecurityStandardSerializer(
  item: SecurityStandardsAPISecurityStandard,
): any {
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

export function securityStandardsAPISecurityStandardDeserializer(
  item: any,
): SecurityStandardsAPISecurityStandard {
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
export interface SecurityStandardsAPISecurityStandardProperties {
  /** Display name of the standard, equivalent to the standardId */
  displayName?: string;
  /** Standard type (Custom or Default or Compliance only currently) */
  readonly standardType?: SecurityStandardsAPIStandardType;
  /** Description of the standard */
  description?: string;
  /** List of assessment keys to apply to standard scope. */
  assessments?: SecurityStandardsAPIPartialAssessmentProperties[];
  /** List of all standard supported clouds. */
  cloudProviders?: SecurityStandardsAPIStandardSupportedCloud[];
  /** The policy set definition id associated with the standard. */
  policySetDefinitionId?: string;
  /** The security standard metadata. */
  metadata?: SecurityStandardsAPIStandardMetadata;
}

export function securityStandardsAPISecurityStandardPropertiesSerializer(
  item: SecurityStandardsAPISecurityStandardProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assessments: !item["assessments"]
      ? item["assessments"]
      : securityStandardsAPIPartialAssessmentPropertiesArraySerializer(item["assessments"]),
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    policySetDefinitionId: item["policySetDefinitionId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityStandardsAPIStandardMetadataSerializer(item["metadata"]),
  };
}

export function securityStandardsAPISecurityStandardPropertiesDeserializer(
  item: any,
): SecurityStandardsAPISecurityStandardProperties {
  return {
    displayName: item["displayName"],
    standardType: item["standardType"],
    description: item["description"],
    assessments: !item["assessments"]
      ? item["assessments"]
      : securityStandardsAPIPartialAssessmentPropertiesArrayDeserializer(item["assessments"]),
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    policySetDefinitionId: item["policySetDefinitionId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityStandardsAPIStandardMetadataDeserializer(item["metadata"]),
  };
}

/** Standard type (Custom or Default or Compliance only currently) */
export enum KnownSecurityStandardsAPIStandardType {
  /** Custom */
  Custom = "Custom",
  /** Default */
  Default = "Default",
  /** Compliance */
  Compliance = "Compliance",
}

/**
 * Standard type (Custom or Default or Compliance only currently) \
 * {@link KnownSecurityStandardsAPIStandardType} can be used interchangeably with SecurityStandardsAPIStandardType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Custom**: Custom \
 * **Default**: Default \
 * **Compliance**: Compliance
 */
export type SecurityStandardsAPIStandardType = string;

export function securityStandardsAPIPartialAssessmentPropertiesArraySerializer(
  result: Array<SecurityStandardsAPIPartialAssessmentProperties>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPIPartialAssessmentPropertiesSerializer(item);
  });
}

export function securityStandardsAPIPartialAssessmentPropertiesArrayDeserializer(
  result: Array<SecurityStandardsAPIPartialAssessmentProperties>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPIPartialAssessmentPropertiesDeserializer(item);
  });
}

/** Describes properties of an assessment as related to the standard */
export interface SecurityStandardsAPIPartialAssessmentProperties {
  /** The assessment key */
  assessmentKey?: string;
}

export function securityStandardsAPIPartialAssessmentPropertiesSerializer(
  item: SecurityStandardsAPIPartialAssessmentProperties,
): any {
  return { assessmentKey: item["assessmentKey"] };
}

export function securityStandardsAPIPartialAssessmentPropertiesDeserializer(
  item: any,
): SecurityStandardsAPIPartialAssessmentProperties {
  return {
    assessmentKey: item["assessmentKey"],
  };
}

/** The cloud that the standard is supported on. */
export enum KnownSecurityStandardsAPIStandardSupportedCloud {
  /** Azure */
  Azure = "Azure",
  /** AWS */
  AWS = "AWS",
  /** GCP */
  GCP = "GCP",
}

/**
 * The cloud that the standard is supported on. \
 * {@link KnownSecurityStandardsAPIStandardSupportedCloud} can be used interchangeably with SecurityStandardsAPIStandardSupportedCloud,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure**: Azure \
 * **AWS**: AWS \
 * **GCP**: GCP
 */
export type SecurityStandardsAPIStandardSupportedCloud = string;

/** The standard metadata */
export interface SecurityStandardsAPIStandardMetadata {
  /** Standard Created by object id (GUID) */
  readonly createdBy?: string;
  /** Standard creation date */
  readonly createdOn?: Date;
  /** Standard last updated by object id (GUID) */
  readonly lastUpdatedBy?: string;
  /** Standard last update date */
  readonly lastUpdatedOn?: Date;
}

export function securityStandardsAPIStandardMetadataSerializer(
  _item: SecurityStandardsAPIStandardMetadata,
): any {
  return {};
}

export function securityStandardsAPIStandardMetadataDeserializer(
  item: any,
): SecurityStandardsAPIStandardMetadata {
  return {
    createdBy: item["createdBy"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    lastUpdatedBy: item["lastUpdatedBy"],
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

/** Page of a Standard list */
export interface _SecurityStandardsAPISecurityStandardList {
  /** Collection of standards in this page */
  readonly value: SecurityStandardsAPISecurityStandard[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _securityStandardsAPISecurityStandardListDeserializer(
  item: any,
): _SecurityStandardsAPISecurityStandardList {
  return {
    value: securityStandardsAPISecurityStandardArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityStandardsAPISecurityStandardArraySerializer(
  result: Array<SecurityStandardsAPISecurityStandard>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPISecurityStandardSerializer(item);
  });
}

export function securityStandardsAPISecurityStandardArrayDeserializer(
  result: Array<SecurityStandardsAPISecurityStandard>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPISecurityStandardDeserializer(item);
  });
}

/** Security Assignment on a resource group over a given scope */
export interface SecurityStandardsAPIStandardAssignment extends ExtensionResource {
  /** Display name of the standardAssignment */
  displayName?: string;
  /** Description of the standardAssignment */
  description?: string;
  /** Standard item with key as applied to this standard assignment over the given scope */
  assignedStandard?: CommonAssignedStandardItem;
  /** Expected effect of this assignment (Audit/Exempt/Attest) */
  effect?: SecurityStandardsAPIEffect;
  /** Excluded scopes, filter out the descendants of the scope (on management scopes) */
  excludedScopes?: string[];
  /** Expiration date of this assignment as a full ISO date */
  expiresOn?: Date;
  /** Additional data about assignment that has Exempt effect */
  exemptionData?: SecurityStandardsAPIStandardAssignmentPropertiesExemptionData;
  /** Additional data about assignment that has Attest effect */
  attestationData?: SecurityStandardsAPIStandardAssignmentPropertiesAttestationData;
  /** The standard assignment metadata. */
  metadata?: SecurityStandardsAPIStandardAssignmentMetadata;
}

export function securityStandardsAPIStandardAssignmentSerializer(
  item: SecurityStandardsAPIStandardAssignment,
): any {
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

export function securityStandardsAPIStandardAssignmentDeserializer(
  item: any,
): SecurityStandardsAPIStandardAssignment {
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
export interface SecurityStandardsAPIStandardAssignmentProperties {
  /** Display name of the standardAssignment */
  displayName?: string;
  /** Description of the standardAssignment */
  description?: string;
  /** Standard item with key as applied to this standard assignment over the given scope */
  assignedStandard?: CommonAssignedStandardItem;
  /** Expected effect of this assignment (Audit/Exempt/Attest) */
  effect?: SecurityStandardsAPIEffect;
  /** Excluded scopes, filter out the descendants of the scope (on management scopes) */
  excludedScopes?: string[];
  /** Expiration date of this assignment as a full ISO date */
  expiresOn?: Date;
  /** Additional data about assignment that has Exempt effect */
  exemptionData?: SecurityStandardsAPIStandardAssignmentPropertiesExemptionData;
  /** Additional data about assignment that has Attest effect */
  attestationData?: SecurityStandardsAPIStandardAssignmentPropertiesAttestationData;
  /** The standard assignment metadata. */
  metadata?: SecurityStandardsAPIStandardAssignmentMetadata;
}

export function securityStandardsAPIStandardAssignmentPropertiesSerializer(
  item: SecurityStandardsAPIStandardAssignmentProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : commonAssignedStandardItemSerializer(item["assignedStandard"]),
    effect: item["effect"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    exemptionData: !item["exemptionData"]
      ? item["exemptionData"]
      : securityStandardsAPIStandardAssignmentPropertiesExemptionDataSerializer(
          item["exemptionData"],
        ),
    attestationData: !item["attestationData"]
      ? item["attestationData"]
      : securityStandardsAPIStandardAssignmentPropertiesAttestationDataSerializer(
          item["attestationData"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityStandardsAPIStandardAssignmentMetadataSerializer(item["metadata"]),
  };
}

export function securityStandardsAPIStandardAssignmentPropertiesDeserializer(
  item: any,
): SecurityStandardsAPIStandardAssignmentProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : commonAssignedStandardItemDeserializer(item["assignedStandard"]),
    effect: item["effect"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    exemptionData: !item["exemptionData"]
      ? item["exemptionData"]
      : securityStandardsAPIStandardAssignmentPropertiesExemptionDataDeserializer(
          item["exemptionData"],
        ),
    attestationData: !item["attestationData"]
      ? item["attestationData"]
      : securityStandardsAPIStandardAssignmentPropertiesAttestationDataDeserializer(
          item["attestationData"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityStandardsAPIStandardAssignmentMetadataDeserializer(item["metadata"]),
  };
}

/** Expected effect of this assignment (Audit/Exempt/Attest) */
export enum KnownSecurityStandardsAPIEffect {
  /** Audit */
  Audit = "Audit",
  /** Exempt */
  Exempt = "Exempt",
  /** Attest */
  Attest = "Attest",
}

/**
 * Expected effect of this assignment (Audit/Exempt/Attest) \
 * {@link KnownSecurityStandardsAPIEffect} can be used interchangeably with SecurityStandardsAPIEffect,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit**: Audit \
 * **Exempt**: Exempt \
 * **Attest**: Attest
 */
export type SecurityStandardsAPIEffect = string;

/** Additional data about assignment that has Exempt effect */
export interface SecurityStandardsAPIStandardAssignmentPropertiesExemptionData {
  /** Exemption category of this assignment */
  exemptionCategory?: SecurityStandardsAPIExemptionCategory;
  /** Component item with key as applied to this standard assignment over the given scope */
  assignedAssessment?: SecurityStandardsAPIAssignedAssessmentItem;
}

export function securityStandardsAPIStandardAssignmentPropertiesExemptionDataSerializer(
  item: SecurityStandardsAPIStandardAssignmentPropertiesExemptionData,
): any {
  return {
    exemptionCategory: item["exemptionCategory"],
    assignedAssessment: !item["assignedAssessment"]
      ? item["assignedAssessment"]
      : securityStandardsAPIAssignedAssessmentItemSerializer(item["assignedAssessment"]),
  };
}

export function securityStandardsAPIStandardAssignmentPropertiesExemptionDataDeserializer(
  item: any,
): SecurityStandardsAPIStandardAssignmentPropertiesExemptionData {
  return {
    exemptionCategory: item["exemptionCategory"],
    assignedAssessment: !item["assignedAssessment"]
      ? item["assignedAssessment"]
      : securityStandardsAPIAssignedAssessmentItemDeserializer(item["assignedAssessment"]),
  };
}

/** Exemption category of this assignment */
export enum KnownSecurityStandardsAPIExemptionCategory {
  /** waiver */
  Waiver = "waiver",
  /** mitigated */
  Mitigated = "mitigated",
}

/**
 * Exemption category of this assignment \
 * {@link KnownSecurityStandardsAPIExemptionCategory} can be used interchangeably with SecurityStandardsAPIExemptionCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **waiver**: waiver \
 * **mitigated**: mitigated
 */
export type SecurityStandardsAPIExemptionCategory = string;

/** Describe the properties of a security assessment object reference (by key) */
export interface SecurityStandardsAPIAssignedAssessmentItem {
  /** Unique key to a security assessment object */
  assessmentKey?: string;
}

export function securityStandardsAPIAssignedAssessmentItemSerializer(
  item: SecurityStandardsAPIAssignedAssessmentItem,
): any {
  return { assessmentKey: item["assessmentKey"] };
}

export function securityStandardsAPIAssignedAssessmentItemDeserializer(
  item: any,
): SecurityStandardsAPIAssignedAssessmentItem {
  return {
    assessmentKey: item["assessmentKey"],
  };
}

/** Additional data about assignment that has Attest effect */
export interface SecurityStandardsAPIStandardAssignmentPropertiesAttestationData {
  /** Attest category of this assignment */
  complianceState?: SecurityStandardsAPIattestationComplianceState;
  /** Component item with key as applied to this standard assignment over the given scope */
  assignedAssessment?: SecurityStandardsAPIAssignedAssessmentItem;
  /** Attestation compliance date */
  readonly complianceDate?: Date;
  /** Array of links to attestation evidence */
  evidence?: SecurityStandardsAPIAttestationEvidence[];
}

export function securityStandardsAPIStandardAssignmentPropertiesAttestationDataSerializer(
  item: SecurityStandardsAPIStandardAssignmentPropertiesAttestationData,
): any {
  return {
    complianceState: item["complianceState"],
    assignedAssessment: !item["assignedAssessment"]
      ? item["assignedAssessment"]
      : securityStandardsAPIAssignedAssessmentItemSerializer(item["assignedAssessment"]),
    evidence: !item["evidence"]
      ? item["evidence"]
      : securityStandardsAPIAttestationEvidenceArraySerializer(item["evidence"]),
  };
}

export function securityStandardsAPIStandardAssignmentPropertiesAttestationDataDeserializer(
  item: any,
): SecurityStandardsAPIStandardAssignmentPropertiesAttestationData {
  return {
    complianceState: item["complianceState"],
    assignedAssessment: !item["assignedAssessment"]
      ? item["assignedAssessment"]
      : securityStandardsAPIAssignedAssessmentItemDeserializer(item["assignedAssessment"]),
    complianceDate: !item["complianceDate"]
      ? item["complianceDate"]
      : new Date(item["complianceDate"]),
    evidence: !item["evidence"]
      ? item["evidence"]
      : securityStandardsAPIAttestationEvidenceArrayDeserializer(item["evidence"]),
  };
}

/** Attest category of this assignment */
export enum KnownSecurityStandardsAPIattestationComplianceState {
  /** unknown */
  Unknown = "unknown",
  /** compliant */
  Compliant = "compliant",
  /** nonCompliant */
  NonCompliant = "nonCompliant",
}

/**
 * Attest category of this assignment \
 * {@link KnownSecurityStandardsAPIattestationComplianceState} can be used interchangeably with SecurityStandardsAPIattestationComplianceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **unknown**: unknown \
 * **compliant**: compliant \
 * **nonCompliant**: nonCompliant
 */
export type SecurityStandardsAPIattestationComplianceState = string;

export function securityStandardsAPIAttestationEvidenceArraySerializer(
  result: Array<SecurityStandardsAPIAttestationEvidence>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPIAttestationEvidenceSerializer(item);
  });
}

export function securityStandardsAPIAttestationEvidenceArrayDeserializer(
  result: Array<SecurityStandardsAPIAttestationEvidence>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPIAttestationEvidenceDeserializer(item);
  });
}

/** Describe the properties of a assignment attestation */
export interface SecurityStandardsAPIAttestationEvidence {
  /** The description of the evidence */
  description?: string;
  /** The source url of the evidence */
  sourceUrl?: string;
}

export function securityStandardsAPIAttestationEvidenceSerializer(
  item: SecurityStandardsAPIAttestationEvidence,
): any {
  return { description: item["description"], sourceUrl: item["sourceUrl"] };
}

export function securityStandardsAPIAttestationEvidenceDeserializer(
  item: any,
): SecurityStandardsAPIAttestationEvidence {
  return {
    description: item["description"],
    sourceUrl: item["sourceUrl"],
  };
}

/** The standard assignment metadata */
export interface SecurityStandardsAPIStandardAssignmentMetadata {
  /** Standard assignment Created by object id (GUID) */
  readonly createdBy?: string;
  /** Standard assignment creation date */
  readonly createdOn?: Date;
  /** Standard assignment last updated by object id (GUID) */
  readonly lastUpdatedBy?: string;
  /** Standard assignment last update date */
  readonly lastUpdatedOn?: Date;
}

export function securityStandardsAPIStandardAssignmentMetadataSerializer(
  _item: SecurityStandardsAPIStandardAssignmentMetadata,
): any {
  return {};
}

export function securityStandardsAPIStandardAssignmentMetadataDeserializer(
  item: any,
): SecurityStandardsAPIStandardAssignmentMetadata {
  return {
    createdBy: item["createdBy"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    lastUpdatedBy: item["lastUpdatedBy"],
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

/** Page of a standard assignment list */
export interface _SecurityStandardsAPIStandardAssignmentsList {
  /** Collection of standardAssignments in this page */
  readonly value: SecurityStandardsAPIStandardAssignment[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _securityStandardsAPIStandardAssignmentsListDeserializer(
  item: any,
): _SecurityStandardsAPIStandardAssignmentsList {
  return {
    value: securityStandardsAPIStandardAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityStandardsAPIStandardAssignmentArraySerializer(
  result: Array<SecurityStandardsAPIStandardAssignment>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPIStandardAssignmentSerializer(item);
  });
}

export function securityStandardsAPIStandardAssignmentArrayDeserializer(
  result: Array<SecurityStandardsAPIStandardAssignment>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPIStandardAssignmentDeserializer(item);
  });
}

/** Custom Recommendation */
export interface SecurityStandardsAPICustomRecommendation extends ExtensionResource {
  /** KQL query representing the Recommendation results required. */
  query?: string;
  /** List of all standard supported clouds. */
  cloudProviders?: SecurityStandardsAPIRecommendationSupportedClouds[];
  /** The severity to relate to the assessments generated by this Recommendation. */
  severity?: SecurityStandardsAPISeverityEnum;
  /** The severity to relate to the assessments generated by this Recommendation. */
  securityIssue?: SecurityStandardsAPISecurityIssue;
  /** The display name of the assessments generated by this Recommendation. */
  displayName?: string;
  /** The description to relate to the assessments generated by this Recommendation. */
  description?: string;
  /** The remediation description to relate to the assessments generated by this Recommendation. */
  remediationDescription?: string;
  /** The assessment metadata key used when an assessment is generated for this Recommendation. */
  readonly assessmentKey?: string;
}

export function securityStandardsAPICustomRecommendationSerializer(
  item: SecurityStandardsAPICustomRecommendation,
): any {
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

export function securityStandardsAPICustomRecommendationDeserializer(
  item: any,
): SecurityStandardsAPICustomRecommendation {
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
export interface SecurityStandardsAPICustomRecommendationProperties {
  /** KQL query representing the Recommendation results required. */
  query?: string;
  /** List of all standard supported clouds. */
  cloudProviders?: SecurityStandardsAPIRecommendationSupportedClouds[];
  /** The severity to relate to the assessments generated by this Recommendation. */
  severity?: SecurityStandardsAPISeverityEnum;
  /** The severity to relate to the assessments generated by this Recommendation. */
  securityIssue?: SecurityStandardsAPISecurityIssue;
  /** The display name of the assessments generated by this Recommendation. */
  displayName?: string;
  /** The description to relate to the assessments generated by this Recommendation. */
  description?: string;
  /** The remediation description to relate to the assessments generated by this Recommendation. */
  remediationDescription?: string;
  /** The assessment metadata key used when an assessment is generated for this Recommendation. */
  readonly assessmentKey?: string;
}

export function securityStandardsAPICustomRecommendationPropertiesSerializer(
  item: SecurityStandardsAPICustomRecommendationProperties,
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

export function securityStandardsAPICustomRecommendationPropertiesDeserializer(
  item: any,
): SecurityStandardsAPICustomRecommendationProperties {
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
export enum KnownSecurityStandardsAPIRecommendationSupportedClouds {
  /** Azure */
  Azure = "Azure",
  /** AWS */
  AWS = "AWS",
  /** GCP */
  GCP = "GCP",
}

/**
 * The cloud that the recommendation is supported on. \
 * {@link KnownSecurityStandardsAPIRecommendationSupportedClouds} can be used interchangeably with SecurityStandardsAPIRecommendationSupportedClouds,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure**: Azure \
 * **AWS**: AWS \
 * **GCP**: GCP
 */
export type SecurityStandardsAPIRecommendationSupportedClouds = string;

/** The severity to relate to the assessments generated by this Recommendation. */
export enum KnownSecurityStandardsAPISeverityEnum {
  /** High */
  High = "High",
  /** Medium */
  Medium = "Medium",
  /** Low */
  Low = "Low",
}

/**
 * The severity to relate to the assessments generated by this Recommendation. \
 * {@link KnownSecurityStandardsAPISeverityEnum} can be used interchangeably with SecurityStandardsAPISeverityEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: High \
 * **Medium**: Medium \
 * **Low**: Low
 */
export type SecurityStandardsAPISeverityEnum = string;

/** The severity to relate to the assessments generated by this Recommendation. */
export enum KnownSecurityStandardsAPISecurityIssue {
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
 * {@link KnownSecurityStandardsAPISecurityIssue} can be used interchangeably with SecurityStandardsAPISecurityIssue,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Vulnerability**: Vulnerability \
 * **ExcessivePermissions**: ExcessivePermissions \
 * **AnonymousAccess**: AnonymousAccess \
 * **NetworkExposure**: NetworkExposure \
 * **TrafficEncryption**: TrafficEncryption \
 * **BestPractices**: BestPractices
 */
export type SecurityStandardsAPISecurityIssue = string;

/** A list of Custom Recommendations */
export interface _SecurityStandardsAPICustomRecommendationsList {
  /** Collection of Custom Recommendations */
  readonly value: SecurityStandardsAPICustomRecommendation[];
  /** The link used to get the next page of operations. */
  nextLink?: string;
}

export function _securityStandardsAPICustomRecommendationsListDeserializer(
  item: any,
): _SecurityStandardsAPICustomRecommendationsList {
  return {
    value: securityStandardsAPICustomRecommendationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityStandardsAPICustomRecommendationArraySerializer(
  result: Array<SecurityStandardsAPICustomRecommendation>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPICustomRecommendationSerializer(item);
  });
}

export function securityStandardsAPICustomRecommendationArrayDeserializer(
  result: Array<SecurityStandardsAPICustomRecommendation>,
): any[] {
  return result.map((item) => {
    return securityStandardsAPICustomRecommendationDeserializer(item);
  });
}

export function _securityStandardPropertiesSerializer(
  item: SecurityStandardsAPISecurityStandard,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assessments: !item["assessments"]
      ? item["assessments"]
      : securityStandardsAPIPartialAssessmentPropertiesArraySerializer(item["assessments"]),
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    policySetDefinitionId: item["policySetDefinitionId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityStandardsAPIStandardMetadataSerializer(item["metadata"]),
  };
}

export function _securityStandardPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    standardType: item["standardType"],
    description: item["description"],
    assessments: !item["assessments"]
      ? item["assessments"]
      : securityStandardsAPIPartialAssessmentPropertiesArrayDeserializer(item["assessments"]),
    cloudProviders: !item["cloudProviders"]
      ? item["cloudProviders"]
      : item["cloudProviders"].map((p: any) => {
          return p;
        }),
    policySetDefinitionId: item["policySetDefinitionId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityStandardsAPIStandardMetadataDeserializer(item["metadata"]),
  };
}

export function _standardAssignmentPropertiesSerializer(
  item: SecurityStandardsAPIStandardAssignment,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : commonAssignedStandardItemSerializer(item["assignedStandard"]),
    effect: item["effect"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    exemptionData: !item["exemptionData"]
      ? item["exemptionData"]
      : securityStandardsAPIStandardAssignmentPropertiesExemptionDataSerializer(
          item["exemptionData"],
        ),
    attestationData: !item["attestationData"]
      ? item["attestationData"]
      : securityStandardsAPIStandardAssignmentPropertiesAttestationDataSerializer(
          item["attestationData"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityStandardsAPIStandardAssignmentMetadataSerializer(item["metadata"]),
  };
}

export function _standardAssignmentPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : commonAssignedStandardItemDeserializer(item["assignedStandard"]),
    effect: item["effect"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    exemptionData: !item["exemptionData"]
      ? item["exemptionData"]
      : securityStandardsAPIStandardAssignmentPropertiesExemptionDataDeserializer(
          item["exemptionData"],
        ),
    attestationData: !item["attestationData"]
      ? item["attestationData"]
      : securityStandardsAPIStandardAssignmentPropertiesAttestationDataDeserializer(
          item["attestationData"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : securityStandardsAPIStandardAssignmentMetadataDeserializer(item["metadata"]),
  };
}

export function _customRecommendationPropertiesSerializer(
  item: SecurityStandardsAPICustomRecommendation,
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

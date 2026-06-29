// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../../static-helpers/serialization/serialize-record.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** List of available operations. */
export interface OperationsListResults {
  /** OData entity count; represents the number of operations returned. */
  odataCount?: number;
  /** List of available operations. */
  value?: Operation[];
}

export function operationsListResultsDeserializer(item: any): OperationsListResults {
  return {
    odataCount: item["@odata.count"],
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Operation definition. */
export interface Operation {
  /** Operation name. */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** Display metadata associated with the operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** Display metadata associated with the operation. */
export interface OperationDisplay {
  /** Resource provider name. */
  provider?: string;
  /** Resource name on which the operation is performed. */
  resource?: string;
  /** Operation name. */
  operation?: string;
  /** Operation description. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The remediation definition. */
export interface Remediation extends ProxyResource {
  /** The resource ID of the policy assignment that should be remediated. */
  policyAssignmentId?: string;
  /** The policy definition reference ID of the individual definition that should be remediated. Required when the policy assignment being remediated assigns a policy set definition. */
  policyDefinitionReferenceId?: string;
  /** The way resources to remediate are discovered. Defaults to ExistingNonCompliant if not specified. */
  resourceDiscoveryMode?: ResourceDiscoveryMode;
  /** The status of the remediation. This refers to the entire remediation task, not individual deployments. Allowed values are Evaluating, Canceled, Cancelling, Failed, Complete, or Succeeded. */
  readonly provisioningState?: string;
  /** The time at which the remediation was created. */
  readonly createdOn?: Date;
  /** The time at which the remediation was last updated. */
  readonly lastUpdatedOn?: Date;
  /** The filters that will be applied to determine which resources to remediate. */
  filters?: RemediationFilters;
  /** The deployment status summary for all deployments created by the remediation. */
  readonly deploymentStatus?: RemediationDeploymentSummary;
  /** The remediation status message. Provides additional details regarding the state of the remediation. */
  readonly statusMessage?: string;
  /** The remediation correlation Id. Can be used to find events related to the remediation in the activity log. */
  readonly correlationId?: string;
  /** Determines the max number of resources that can be remediated by the remediation job. If not provided, the default resource count is used. */
  resourceCount?: number;
  /** Determines how many resources to remediate at any given time. Can be used to increase or reduce the pace of the remediation. If not provided, the default parallel deployments value is used. */
  parallelDeployments?: number;
  /** The remediation failure threshold settings */
  failureThreshold?: RemediationPropertiesFailureThreshold;
}

export function remediationSerializer(item: Remediation): any {
  return {
    properties: areAllPropsUndefined(item, [
      "policyAssignmentId",
      "policyDefinitionReferenceId",
      "resourceDiscoveryMode",
      "filters",
      "resourceCount",
      "parallelDeployments",
      "failureThreshold",
    ])
      ? undefined
      : _remediationPropertiesSerializer(item),
  };
}

export function remediationDeserializer(item: any): Remediation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _remediationPropertiesDeserializer(item["properties"])),
  };
}

/** The remediation properties. */
export interface RemediationProperties {
  /** The resource ID of the policy assignment that should be remediated. */
  policyAssignmentId?: string;
  /** The policy definition reference ID of the individual definition that should be remediated. Required when the policy assignment being remediated assigns a policy set definition. */
  policyDefinitionReferenceId?: string;
  /** The way resources to remediate are discovered. Defaults to ExistingNonCompliant if not specified. */
  resourceDiscoveryMode?: ResourceDiscoveryMode;
  /** The status of the remediation. This refers to the entire remediation task, not individual deployments. Allowed values are Evaluating, Canceled, Cancelling, Failed, Complete, or Succeeded. */
  readonly provisioningState?: string;
  /** The time at which the remediation was created. */
  readonly createdOn?: Date;
  /** The time at which the remediation was last updated. */
  readonly lastUpdatedOn?: Date;
  /** The filters that will be applied to determine which resources to remediate. */
  filters?: RemediationFilters;
  /** The deployment status summary for all deployments created by the remediation. */
  readonly deploymentStatus?: RemediationDeploymentSummary;
  /** The remediation status message. Provides additional details regarding the state of the remediation. */
  readonly statusMessage?: string;
  /** The remediation correlation Id. Can be used to find events related to the remediation in the activity log. */
  readonly correlationId?: string;
  /** Determines the max number of resources that can be remediated by the remediation job. If not provided, the default resource count is used. */
  resourceCount?: number;
  /** Determines how many resources to remediate at any given time. Can be used to increase or reduce the pace of the remediation. If not provided, the default parallel deployments value is used. */
  parallelDeployments?: number;
  /** The remediation failure threshold settings */
  failureThreshold?: RemediationPropertiesFailureThreshold;
}

export function remediationPropertiesSerializer(item: RemediationProperties): any {
  return {
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    resourceDiscoveryMode: item["resourceDiscoveryMode"],
    filters: !item["filters"] ? item["filters"] : remediationFiltersSerializer(item["filters"]),
    resourceCount: item["resourceCount"],
    parallelDeployments: item["parallelDeployments"],
    failureThreshold: !item["failureThreshold"]
      ? item["failureThreshold"]
      : remediationPropertiesFailureThresholdSerializer(item["failureThreshold"]),
  };
}

export function remediationPropertiesDeserializer(item: any): RemediationProperties {
  return {
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    resourceDiscoveryMode: item["resourceDiscoveryMode"],
    provisioningState: item["provisioningState"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
    filters: !item["filters"] ? item["filters"] : remediationFiltersDeserializer(item["filters"]),
    deploymentStatus: !item["deploymentStatus"]
      ? item["deploymentStatus"]
      : remediationDeploymentSummaryDeserializer(item["deploymentStatus"]),
    statusMessage: item["statusMessage"],
    correlationId: item["correlationId"],
    resourceCount: item["resourceCount"],
    parallelDeployments: item["parallelDeployments"],
    failureThreshold: !item["failureThreshold"]
      ? item["failureThreshold"]
      : remediationPropertiesFailureThresholdDeserializer(item["failureThreshold"]),
  };
}

/** The way resources to remediate are discovered. Defaults to ExistingNonCompliant if not specified. */
export enum KnownResourceDiscoveryMode {
  /** Remediate resources that are already known to be non-compliant. */
  ExistingNonCompliant = "ExistingNonCompliant",
  /** Re-evaluate the compliance state of resources and then remediate the resources found to be non-compliant. The resourceIds filter cannot be used in this mode. */
  ReEvaluateCompliance = "ReEvaluateCompliance",
}

/**
 * The way resources to remediate are discovered. Defaults to ExistingNonCompliant if not specified. \
 * {@link KnownResourceDiscoveryMode} can be used interchangeably with ResourceDiscoveryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ExistingNonCompliant**: Remediate resources that are already known to be non-compliant. \
 * **ReEvaluateCompliance**: Re-evaluate the compliance state of resources and then remediate the resources found to be non-compliant. The resourceIds filter cannot be used in this mode.
 */
export type ResourceDiscoveryMode = string;

/** The filters that will be applied to determine which resources to remediate. */
export interface RemediationFilters {
  /** The resource locations that will be remediated. */
  locations?: string[];
  /** The IDs of the resources that will be remediated. Can specify at most 100 IDs. This filter cannot be used when ReEvaluateCompliance is set to ReEvaluateCompliance, and cannot be empty if provided. */
  resourceIds?: string[];
}

export function remediationFiltersSerializer(item: RemediationFilters): any {
  return {
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    resourceIds: !item["resourceIds"]
      ? item["resourceIds"]
      : item["resourceIds"].map((p: any) => {
          return p;
        }),
  };
}

export function remediationFiltersDeserializer(item: any): RemediationFilters {
  return {
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    resourceIds: !item["resourceIds"]
      ? item["resourceIds"]
      : item["resourceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The deployment status summary for all deployments created by the remediation. */
export interface RemediationDeploymentSummary {
  /** The number of deployments required by the remediation. */
  readonly totalDeployments?: number;
  /** The number of deployments required by the remediation that have succeeded. */
  readonly successfulDeployments?: number;
  /** The number of deployments required by the remediation that have failed. */
  readonly failedDeployments?: number;
}

export function remediationDeploymentSummaryDeserializer(item: any): RemediationDeploymentSummary {
  return {
    totalDeployments: item["totalDeployments"],
    successfulDeployments: item["successfulDeployments"],
    failedDeployments: item["failedDeployments"],
  };
}

/** The remediation failure threshold settings */
export interface RemediationPropertiesFailureThreshold {
  /** A number between 0.0 to 1.0 representing the percentage failure threshold. The remediation will fail if the percentage of failed remediation operations (i.e. failed deployments) exceeds this threshold. */
  percentage?: number;
}

export function remediationPropertiesFailureThresholdSerializer(
  item: RemediationPropertiesFailureThreshold,
): any {
  return { percentage: item["percentage"] };
}

export function remediationPropertiesFailureThresholdDeserializer(
  item: any,
): RemediationPropertiesFailureThreshold {
  return {
    percentage: item["percentage"],
  };
}

/** Error response. */
export interface ErrorResponse {
  /** The error details. */
  error?: ErrorDefinition;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDefinitionDeserializer(item["error"]),
  };
}

/** Error definition. */
export interface ErrorDefinition {
  /** Service specific error code which serves as the substatus for the HTTP error code. */
  readonly code?: string;
  /** Description of the error. */
  readonly message?: string;
  /** The target of the error. */
  readonly target?: string;
  /** Internal error details. */
  readonly details?: ErrorDefinition[];
  /** Additional scenario specific error details. */
  readonly additionalInfo?: TypedErrorInfo[];
}

export function errorDefinitionDeserializer(item: any): ErrorDefinition {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDefinitionArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : typedErrorInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDefinitionArrayDeserializer(result: Array<ErrorDefinition>): any[] {
  return result.map((item) => {
    return errorDefinitionDeserializer(item);
  });
}

export function typedErrorInfoArrayDeserializer(result: Array<TypedErrorInfo>): any[] {
  return result.map((item) => {
    return typedErrorInfoDeserializer(item);
  });
}

/** Scenario specific error details. */
export interface TypedErrorInfo {
  /** The type of included error details. */
  readonly type?: string;
  /** The scenario specific error details. */
  readonly info?: Record<string, unknown>;
}

export function typedErrorInfoDeserializer(item: any): TypedErrorInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** List of remediations. */
export interface _RemediationListResult {
  /** The Remediation items on this page */
  readonly value: Remediation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _remediationListResultDeserializer(item: any): _RemediationListResult {
  return {
    value: remediationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function remediationArraySerializer(result: Array<Remediation>): any[] {
  return result.map((item) => {
    return remediationSerializer(item);
  });
}

export function remediationArrayDeserializer(result: Array<Remediation>): any[] {
  return result.map((item) => {
    return remediationDeserializer(item);
  });
}

/** List of deployments for a remediation. */
export interface _RemediationDeploymentsListResult {
  /** The RemediationDeployment items on this page */
  readonly value: RemediationDeployment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _remediationDeploymentsListResultDeserializer(
  item: any,
): _RemediationDeploymentsListResult {
  return {
    value: remediationDeploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function remediationDeploymentArrayDeserializer(
  result: Array<RemediationDeployment>,
): any[] {
  return result.map((item) => {
    return remediationDeploymentDeserializer(item);
  });
}

/** Details of a single deployment created by the remediation. */
export interface RemediationDeployment {
  /** Resource ID of the resource that is being remediated by the deployment. */
  readonly remediatedResourceId?: string;
  /** Resource ID of the template deployment that will remediate the resource. */
  readonly deploymentId?: string;
  /** Status of the remediation deployment. */
  readonly status?: string;
  /** Location of the resource that is being remediated. */
  readonly resourceLocation?: string;
  /** Error encountered while remediated the resource. */
  readonly error?: ErrorDefinition;
  /** The time at which the remediation was created. */
  readonly createdOn?: Date;
  /** The time at which the remediation deployment was last updated. */
  readonly lastUpdatedOn?: Date;
}

export function remediationDeploymentDeserializer(item: any): RemediationDeployment {
  return {
    remediatedResourceId: item["remediatedResourceId"],
    deploymentId: item["deploymentId"],
    status: item["status"],
    resourceLocation: item["resourceLocation"],
    error: !item["error"] ? item["error"] : errorDefinitionDeserializer(item["error"]),
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

/** An attestation resource. */
export interface Attestation extends ProxyResource {
  /** The resource ID of the policy assignment that the attestation is setting the state for. */
  policyAssignmentId: string;
  /** The policy definition reference ID from a policy set definition that the attestation is setting the state for. If the policy assignment assigns a policy set definition the attestation can choose a definition within the set definition with this property or omit this and set the state for the entire set definition. */
  policyDefinitionReferenceId?: string;
  /** The compliance state that should be set on the resource. */
  complianceState?: ComplianceState;
  /** The time the compliance state should expire. */
  expiresOn?: Date;
  /** The person responsible for setting the state of the resource. This value is typically an Azure Active Directory object ID. */
  owner?: string;
  /** Comments describing why this attestation was created. */
  comments?: string;
  /** The evidence supporting the compliance state set in this attestation. */
  evidence?: AttestationEvidence[];
  /** The status of the attestation. */
  readonly provisioningState?: string;
  /** The time the compliance state was last changed in this attestation. */
  readonly lastComplianceStateChangeAt?: Date;
  /** The time the evidence was assessed */
  assessmentDate?: Date;
  /** Additional metadata for this attestation */
  metadata?: Record<string, unknown>;
}

export function attestationSerializer(item: Attestation): any {
  return { properties: _attestationPropertiesSerializer(item) };
}

export function attestationDeserializer(item: any): Attestation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._attestationPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an attestation resource. */
export interface AttestationProperties {
  /** The resource ID of the policy assignment that the attestation is setting the state for. */
  policyAssignmentId: string;
  /** The policy definition reference ID from a policy set definition that the attestation is setting the state for. If the policy assignment assigns a policy set definition the attestation can choose a definition within the set definition with this property or omit this and set the state for the entire set definition. */
  policyDefinitionReferenceId?: string;
  /** The compliance state that should be set on the resource. */
  complianceState?: ComplianceState;
  /** The time the compliance state should expire. */
  expiresOn?: Date;
  /** The person responsible for setting the state of the resource. This value is typically an Azure Active Directory object ID. */
  owner?: string;
  /** Comments describing why this attestation was created. */
  comments?: string;
  /** The evidence supporting the compliance state set in this attestation. */
  evidence?: AttestationEvidence[];
  /** The status of the attestation. */
  readonly provisioningState?: string;
  /** The time the compliance state was last changed in this attestation. */
  readonly lastComplianceStateChangeAt?: Date;
  /** The time the evidence was assessed */
  assessmentDate?: Date;
  /** Additional metadata for this attestation */
  metadata?: Record<string, unknown>;
}

export function attestationPropertiesSerializer(item: AttestationProperties): any {
  return {
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    owner: item["owner"],
    comments: item["comments"],
    evidence: !item["evidence"]
      ? item["evidence"]
      : attestationEvidenceArraySerializer(item["evidence"]),
    assessmentDate: !item["assessmentDate"]
      ? item["assessmentDate"]
      : item["assessmentDate"].toISOString(),
    metadata: item["metadata"],
  };
}

export function attestationPropertiesDeserializer(item: any): AttestationProperties {
  return {
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    owner: item["owner"],
    comments: item["comments"],
    evidence: !item["evidence"]
      ? item["evidence"]
      : attestationEvidenceArrayDeserializer(item["evidence"]),
    provisioningState: item["provisioningState"],
    lastComplianceStateChangeAt: !item["lastComplianceStateChangeAt"]
      ? item["lastComplianceStateChangeAt"]
      : new Date(item["lastComplianceStateChangeAt"]),
    assessmentDate: !item["assessmentDate"]
      ? item["assessmentDate"]
      : new Date(item["assessmentDate"]),
    metadata: item["metadata"],
  };
}

/** The compliance state that should be set on the resource. */
export enum KnownComplianceState {
  /** The resource is in compliance with the policy. */
  Compliant = "Compliant",
  /** The resource is not in compliance with the policy. */
  NonCompliant = "NonCompliant",
  /** The compliance state of the resource is not known. */
  Unknown = "Unknown",
}

/**
 * The compliance state that should be set on the resource. \
 * {@link KnownComplianceState} can be used interchangeably with ComplianceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Compliant**: The resource is in compliance with the policy. \
 * **NonCompliant**: The resource is not in compliance with the policy. \
 * **Unknown**: The compliance state of the resource is not known.
 */
export type ComplianceState = string;

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

/** A piece of evidence supporting the compliance state set in the attestation. */
export interface AttestationEvidence {
  /** The description for this piece of evidence. */
  description?: string;
  /** The URI location of the evidence. */
  sourceUri?: string;
}

export function attestationEvidenceSerializer(item: AttestationEvidence): any {
  return { description: item["description"], sourceUri: item["sourceUri"] };
}

export function attestationEvidenceDeserializer(item: any): AttestationEvidence {
  return {
    description: item["description"],
    sourceUri: item["sourceUri"],
  };
}

/** List of attestations. */
export interface _AttestationListResult {
  /** The Attestation items on this page */
  readonly value: Attestation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _attestationListResultDeserializer(item: any): _AttestationListResult {
  return {
    value: attestationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function attestationArraySerializer(result: Array<Attestation>): any[] {
  return result.map((item) => {
    return attestationSerializer(item);
  });
}

export function attestationArrayDeserializer(result: Array<Attestation>): any[] {
  return result.map((item) => {
    return attestationDeserializer(item);
  });
}

/** Policy metadata resource definition. */
export interface PolicyMetadata extends ProxyResource {
  /** The policy metadata identifier. */
  readonly metadataId?: string;
  /** The category of the policy metadata. */
  readonly category?: string;
  /** The title of the policy metadata. */
  readonly title?: string;
  /** The owner of the policy metadata. */
  readonly owner?: string;
  /** Url for getting additional content about the resource metadata. */
  readonly additionalContentUrl?: string;
  /** Additional metadata. */
  readonly metadata?: Record<string, unknown>;
  /** The description of the policy metadata. */
  readonly description?: string;
  /** The requirements of the policy metadata. */
  readonly requirements?: string;
}

export function policyMetadataDeserializer(item: any): PolicyMetadata {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policyMetadataPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of the policy metadata. */
export interface PolicyMetadataProperties extends PolicyMetadataSlimProperties {
  /** The description of the policy metadata. */
  readonly description?: string;
  /** The requirements of the policy metadata. */
  readonly requirements?: string;
}

export function policyMetadataPropertiesDeserializer(item: any): PolicyMetadataProperties {
  return {
    metadataId: item["metadataId"],
    category: item["category"],
    title: item["title"],
    owner: item["owner"],
    additionalContentUrl: item["additionalContentUrl"],
    metadata: item["metadata"],
    description: item["description"],
    requirements: item["requirements"],
  };
}

/** The properties of the policy metadata, excluding properties containing large strings */
export interface PolicyMetadataSlimProperties {
  /** The policy metadata identifier. */
  readonly metadataId?: string;
  /** The category of the policy metadata. */
  readonly category?: string;
  /** The title of the policy metadata. */
  readonly title?: string;
  /** The owner of the policy metadata. */
  readonly owner?: string;
  /** Url for getting additional content about the resource metadata. */
  readonly additionalContentUrl?: string;
  /** Additional metadata. */
  readonly metadata?: Record<string, unknown>;
}

export function policyMetadataSlimPropertiesDeserializer(item: any): PolicyMetadataSlimProperties {
  return {
    metadataId: item["metadataId"],
    category: item["category"],
    title: item["title"],
    owner: item["owner"],
    additionalContentUrl: item["additionalContentUrl"],
    metadata: item["metadata"],
  };
}

/** Collection of policy metadata resources. */
export interface _PolicyMetadataCollection {
  /** The SlimPolicyMetadata items on this page */
  readonly value: SlimPolicyMetadata[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policyMetadataCollectionDeserializer(item: any): _PolicyMetadataCollection {
  return {
    value: slimPolicyMetadataArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function slimPolicyMetadataArrayDeserializer(result: Array<SlimPolicyMetadata>): any[] {
  return result.map((item) => {
    return slimPolicyMetadataDeserializer(item);
  });
}

/** Slim version of policy metadata resource definition, excluding properties with large strings */
export interface SlimPolicyMetadata {
  /** The ID of the policy metadata. */
  readonly id?: string;
  /** The type of the policy metadata. */
  readonly type?: string;
  /** The name of the policy metadata. */
  readonly name?: string;
  /** The policy metadata identifier. */
  readonly metadataId?: string;
  /** The category of the policy metadata. */
  readonly category?: string;
  /** The title of the policy metadata. */
  readonly title?: string;
  /** The owner of the policy metadata. */
  readonly owner?: string;
  /** Url for getting additional content about the resource metadata. */
  readonly additionalContentUrl?: string;
  /** Additional metadata. */
  readonly metadata?: Record<string, unknown>;
}

export function slimPolicyMetadataDeserializer(item: any): SlimPolicyMetadata {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _slimPolicyMetadataPropertiesDeserializer(item["properties"])),
    id: item["id"],
    type: item["type"],
    name: item["name"],
  };
}

/** Query results. */
export interface _PolicyEventsQueryResults {
  /** OData context string; used by OData clients to resolve type information based on metadata. */
  odataContext?: string;
  /** OData entity count; represents the number of policy event records returned. */
  odataCount?: number;
  /** Odata next link; URL to get the next set of results. */
  odataNextLink?: string;
  /** Query results. */
  value?: PolicyEvent[];
}

export function _policyEventsQueryResultsDeserializer(item: any): _PolicyEventsQueryResults {
  return {
    odataContext: item["@odata.context"],
    odataCount: item["@odata.count"],
    odataNextLink: item["@odata.nextLink"],
    value: !item["value"] ? item["value"] : policyEventArrayDeserializer(item["value"]),
  };
}

export function policyEventArrayDeserializer(result: Array<PolicyEvent>): any[] {
  return result.map((item) => {
    return policyEventDeserializer(item);
  });
}

/** Policy event record. */
export interface PolicyEvent {
  /** OData entity ID; always set to null since policy event records do not have an entity ID. */
  odataId?: string;
  /** OData context string; used by OData clients to resolve type information based on metadata. */
  odataContext?: string;
  /** Timestamp for the policy event record. */
  timestamp?: Date;
  /** Resource ID. */
  resourceId?: string;
  /** Policy assignment ID. */
  policyAssignmentId?: string;
  /** Policy definition ID. */
  policyDefinitionId?: string;
  /** Effective parameters for the policy assignment. */
  effectiveParameters?: string;
  /** Flag which states whether the resource is compliant against the policy assignment it was evaluated against. */
  isCompliant?: boolean;
  /** Subscription ID. */
  subscriptionId?: string;
  /** Resource type. */
  resourceType?: string;
  /** Resource location. */
  resourceLocation?: string;
  /** Resource group name. */
  resourceGroup?: string;
  /** List of resource tags. */
  resourceTags?: string;
  /** Policy assignment name. */
  policyAssignmentName?: string;
  /** Policy assignment owner. */
  policyAssignmentOwner?: string;
  /** Policy assignment parameters. */
  policyAssignmentParameters?: string;
  /** Policy assignment scope. */
  policyAssignmentScope?: string;
  /** Policy definition name. */
  policyDefinitionName?: string;
  /** Policy definition action, i.e. effect. */
  policyDefinitionAction?: string;
  /** Policy definition category. */
  policyDefinitionCategory?: string;
  /** Policy set definition ID, if the policy assignment is for a policy set. */
  policySetDefinitionId?: string;
  /** Policy set definition name, if the policy assignment is for a policy set. */
  policySetDefinitionName?: string;
  /** Policy set definition owner, if the policy assignment is for a policy set. */
  policySetDefinitionOwner?: string;
  /** Policy set definition category, if the policy assignment is for a policy set. */
  policySetDefinitionCategory?: string;
  /** Policy set definition parameters, if the policy assignment is for a policy set. */
  policySetDefinitionParameters?: string;
  /** Comma separated list of management group IDs, which represent the hierarchy of the management groups the resource is under. */
  managementGroupIds?: string;
  /** Reference ID for the policy definition inside the policy set, if the policy assignment is for a policy set. */
  policyDefinitionReferenceId?: string;
  /** Compliance state of the resource. */
  complianceState?: string;
  /** Tenant ID for the policy event record. */
  tenantId?: string;
  /** Principal object ID for the user who initiated the resource operation that triggered the policy event. */
  principalOid?: string;
  /** Components events records populated only when URL contains $expand=components clause. */
  components?: ComponentEventDetails[];
  /** Additional properties */
  additionalProperties?: Record<string, Record<string, unknown>>;
}

export function policyEventDeserializer(item: any): PolicyEvent {
  return {
    additionalProperties: serializeRecord(item, [
      "@odata.id",
      "@odata.context",
      "timestamp",
      "resourceId",
      "policyAssignmentId",
      "policyDefinitionId",
      "effectiveParameters",
      "isCompliant",
      "subscriptionId",
      "resourceType",
      "resourceLocation",
      "resourceGroup",
      "resourceTags",
      "policyAssignmentName",
      "policyAssignmentOwner",
      "policyAssignmentParameters",
      "policyAssignmentScope",
      "policyDefinitionName",
      "policyDefinitionAction",
      "policyDefinitionCategory",
      "policySetDefinitionId",
      "policySetDefinitionName",
      "policySetDefinitionOwner",
      "policySetDefinitionCategory",
      "policySetDefinitionParameters",
      "managementGroupIds",
      "policyDefinitionReferenceId",
      "complianceState",
      "tenantId",
      "principalOid",
      "components",
    ]),
    odataId: item["@odata.id"],
    odataContext: item["@odata.context"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    resourceId: item["resourceId"],
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionId: item["policyDefinitionId"],
    effectiveParameters: item["effectiveParameters"],
    isCompliant: item["isCompliant"],
    subscriptionId: item["subscriptionId"],
    resourceType: item["resourceType"],
    resourceLocation: item["resourceLocation"],
    resourceGroup: item["resourceGroup"],
    resourceTags: item["resourceTags"],
    policyAssignmentName: item["policyAssignmentName"],
    policyAssignmentOwner: item["policyAssignmentOwner"],
    policyAssignmentParameters: item["policyAssignmentParameters"],
    policyAssignmentScope: item["policyAssignmentScope"],
    policyDefinitionName: item["policyDefinitionName"],
    policyDefinitionAction: item["policyDefinitionAction"],
    policyDefinitionCategory: item["policyDefinitionCategory"],
    policySetDefinitionId: item["policySetDefinitionId"],
    policySetDefinitionName: item["policySetDefinitionName"],
    policySetDefinitionOwner: item["policySetDefinitionOwner"],
    policySetDefinitionCategory: item["policySetDefinitionCategory"],
    policySetDefinitionParameters: item["policySetDefinitionParameters"],
    managementGroupIds: item["managementGroupIds"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    tenantId: item["tenantId"],
    principalOid: item["principalOid"],
    components: !item["components"]
      ? item["components"]
      : componentEventDetailsArrayDeserializer(item["components"]),
  };
}

export function componentEventDetailsArrayDeserializer(
  result: Array<ComponentEventDetails>,
): any[] {
  return result.map((item) => {
    return componentEventDetailsDeserializer(item);
  });
}

/** Component event details. */
export interface ComponentEventDetails {
  /** Component Id. */
  id?: string;
  /** Component type. */
  type?: string;
  /** Component name. */
  name?: string;
  /** Timestamp for component policy event record. */
  timestamp?: Date;
  /** Tenant ID for the policy event record. */
  tenantId?: string;
  /** Principal object ID for the user who initiated the resource component operation that triggered the policy event. */
  principalOid?: string;
  /** Policy definition action, i.e. effect. */
  policyDefinitionAction?: string;
  /** Additional properties */
  additionalProperties?: Record<string, Record<string, unknown>>;
}

export function componentEventDetailsDeserializer(item: any): ComponentEventDetails {
  return {
    additionalProperties: serializeRecord(item, [
      "id",
      "type",
      "name",
      "timestamp",
      "tenantId",
      "principalOid",
      "policyDefinitionAction",
    ]),
    id: item["id"],
    type: item["type"],
    name: item["name"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    tenantId: item["tenantId"],
    principalOid: item["principalOid"],
    policyDefinitionAction: item["policyDefinitionAction"],
  };
}

/** Query results. */
export interface _PolicyStatesQueryResults {
  /** OData context string; used by OData clients to resolve type information based on metadata. */
  odataContext?: string;
  /** OData entity count; represents the number of policy state records returned. */
  odataCount?: number;
  /** Odata next link; URL to get the next set of results. */
  odataNextLink?: string;
  /** Query results. */
  value?: PolicyState[];
}

export function _policyStatesQueryResultsDeserializer(item: any): _PolicyStatesQueryResults {
  return {
    odataContext: item["@odata.context"],
    odataCount: item["@odata.count"],
    odataNextLink: item["@odata.nextLink"],
    value: !item["value"] ? item["value"] : policyStateArrayDeserializer(item["value"]),
  };
}

export function policyStateArrayDeserializer(result: Array<PolicyState>): any[] {
  return result.map((item) => {
    return policyStateDeserializer(item);
  });
}

/** Policy state record. */
export interface PolicyState {
  /** OData entity ID; always set to null since policy state records do not have an entity ID. */
  odataId?: string;
  /** OData context string; used by OData clients to resolve type information based on metadata. */
  odataContext?: string;
  /** Timestamp for the policy state record. */
  timestamp?: Date;
  /** Resource ID. */
  resourceId?: string;
  /** Policy assignment ID. */
  policyAssignmentId?: string;
  /** Policy definition ID. */
  policyDefinitionId?: string;
  /** Effective parameters for the policy assignment. */
  effectiveParameters?: string;
  /** Flag which states whether the resource is compliant against the policy assignment it was evaluated against. This property is deprecated; please use ComplianceState instead. */
  isCompliant?: boolean;
  /** Subscription ID. */
  subscriptionId?: string;
  /** Resource type. */
  resourceType?: string;
  /** Resource location. */
  resourceLocation?: string;
  /** Resource group name. */
  resourceGroup?: string;
  /** List of resource tags. */
  resourceTags?: string;
  /** Policy assignment name. */
  policyAssignmentName?: string;
  /** Policy assignment owner. */
  policyAssignmentOwner?: string;
  /** Policy assignment parameters. */
  policyAssignmentParameters?: string;
  /** Policy assignment scope. */
  policyAssignmentScope?: string;
  /** Policy definition name. */
  policyDefinitionName?: string;
  /** Policy definition action, i.e. effect. */
  policyDefinitionAction?: string;
  /** Policy definition category. */
  policyDefinitionCategory?: string;
  /** Policy set definition ID, if the policy assignment is for a policy set. */
  policySetDefinitionId?: string;
  /** Policy set definition name, if the policy assignment is for a policy set. */
  policySetDefinitionName?: string;
  /** Policy set definition owner, if the policy assignment is for a policy set. */
  policySetDefinitionOwner?: string;
  /** Policy set definition category, if the policy assignment is for a policy set. */
  policySetDefinitionCategory?: string;
  /** Policy set definition parameters, if the policy assignment is for a policy set. */
  policySetDefinitionParameters?: string;
  /** Comma separated list of management group IDs, which represent the hierarchy of the management groups the resource is under. */
  managementGroupIds?: string;
  /** Reference ID for the policy definition inside the policy set, if the policy assignment is for a policy set. */
  policyDefinitionReferenceId?: string;
  /** Compliance state of the resource. */
  complianceState?: string;
  /** Policy evaluation details. */
  policyEvaluationDetails?: PolicyEvaluationDetails;
  /** Policy definition group names. */
  policyDefinitionGroupNames?: string[];
  /** Components state compliance records populated only when URL contains $expand=components clause. */
  components?: ComponentStateDetails[];
  /** Evaluated policy definition version. */
  readonly policyDefinitionVersion?: string;
  /** Evaluated policy set definition version. */
  readonly policySetDefinitionVersion?: string;
  /** Evaluated policy assignment version. */
  readonly policyAssignmentVersion?: string;
  /** Additional properties */
  additionalProperties?: Record<string, Record<string, unknown>>;
}

export function policyStateDeserializer(item: any): PolicyState {
  return {
    additionalProperties: serializeRecord(item, [
      "@odata.id",
      "@odata.context",
      "timestamp",
      "resourceId",
      "policyAssignmentId",
      "policyDefinitionId",
      "effectiveParameters",
      "isCompliant",
      "subscriptionId",
      "resourceType",
      "resourceLocation",
      "resourceGroup",
      "resourceTags",
      "policyAssignmentName",
      "policyAssignmentOwner",
      "policyAssignmentParameters",
      "policyAssignmentScope",
      "policyDefinitionName",
      "policyDefinitionAction",
      "policyDefinitionCategory",
      "policySetDefinitionId",
      "policySetDefinitionName",
      "policySetDefinitionOwner",
      "policySetDefinitionCategory",
      "policySetDefinitionParameters",
      "managementGroupIds",
      "policyDefinitionReferenceId",
      "complianceState",
      "policyEvaluationDetails",
      "policyDefinitionGroupNames",
      "components",
      "policyDefinitionVersion",
      "policySetDefinitionVersion",
      "policyAssignmentVersion",
    ]),
    odataId: item["@odata.id"],
    odataContext: item["@odata.context"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    resourceId: item["resourceId"],
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionId: item["policyDefinitionId"],
    effectiveParameters: item["effectiveParameters"],
    isCompliant: item["isCompliant"],
    subscriptionId: item["subscriptionId"],
    resourceType: item["resourceType"],
    resourceLocation: item["resourceLocation"],
    resourceGroup: item["resourceGroup"],
    resourceTags: item["resourceTags"],
    policyAssignmentName: item["policyAssignmentName"],
    policyAssignmentOwner: item["policyAssignmentOwner"],
    policyAssignmentParameters: item["policyAssignmentParameters"],
    policyAssignmentScope: item["policyAssignmentScope"],
    policyDefinitionName: item["policyDefinitionName"],
    policyDefinitionAction: item["policyDefinitionAction"],
    policyDefinitionCategory: item["policyDefinitionCategory"],
    policySetDefinitionId: item["policySetDefinitionId"],
    policySetDefinitionName: item["policySetDefinitionName"],
    policySetDefinitionOwner: item["policySetDefinitionOwner"],
    policySetDefinitionCategory: item["policySetDefinitionCategory"],
    policySetDefinitionParameters: item["policySetDefinitionParameters"],
    managementGroupIds: item["managementGroupIds"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    policyEvaluationDetails: !item["policyEvaluationDetails"]
      ? item["policyEvaluationDetails"]
      : policyEvaluationDetailsDeserializer(item["policyEvaluationDetails"]),
    policyDefinitionGroupNames: !item["policyDefinitionGroupNames"]
      ? item["policyDefinitionGroupNames"]
      : item["policyDefinitionGroupNames"].map((p: any) => {
          return p;
        }),
    components: !item["components"]
      ? item["components"]
      : componentStateDetailsArrayDeserializer(item["components"]),
    policyDefinitionVersion: item["policyDefinitionVersion"],
    policySetDefinitionVersion: item["policySetDefinitionVersion"],
    policyAssignmentVersion: item["policyAssignmentVersion"],
  };
}

/** Policy evaluation details. */
export interface PolicyEvaluationDetails {
  /** Details of the evaluated expressions. */
  evaluatedExpressions?: ExpressionEvaluationDetails[];
  /** Evaluation details of IfNotExists effect. */
  ifNotExistsDetails?: IfNotExistsEvaluationDetails;
}

export function policyEvaluationDetailsDeserializer(item: any): PolicyEvaluationDetails {
  return {
    evaluatedExpressions: !item["evaluatedExpressions"]
      ? item["evaluatedExpressions"]
      : expressionEvaluationDetailsArrayDeserializer(item["evaluatedExpressions"]),
    ifNotExistsDetails: !item["ifNotExistsDetails"]
      ? item["ifNotExistsDetails"]
      : ifNotExistsEvaluationDetailsDeserializer(item["ifNotExistsDetails"]),
  };
}

export function expressionEvaluationDetailsArrayDeserializer(
  result: Array<ExpressionEvaluationDetails>,
): any[] {
  return result.map((item) => {
    return expressionEvaluationDetailsDeserializer(item);
  });
}

/** Evaluation details of policy language expressions. */
export interface ExpressionEvaluationDetails {
  /** Evaluation result. */
  result?: string;
  /** Expression evaluated. */
  expression?: string;
  /** The kind of expression that was evaluated. */
  readonly expressionKind?: string;
  /** Property path if the expression is a field or an alias. */
  path?: string;
  /** Value of the expression. */
  expressionValue?: Record<string, unknown>;
  /** Target value to be compared with the expression value. */
  targetValue?: Record<string, unknown>;
  /** Operator to compare the expression value and the target value. */
  operator?: string;
}

export function expressionEvaluationDetailsDeserializer(item: any): ExpressionEvaluationDetails {
  return {
    result: item["result"],
    expression: item["expression"],
    expressionKind: item["expressionKind"],
    path: item["path"],
    expressionValue: item["expressionValue"],
    targetValue: item["targetValue"],
    operator: item["operator"],
  };
}

/** Evaluation details of IfNotExists effect. */
export interface IfNotExistsEvaluationDetails {
  /** ID of the last evaluated resource for IfNotExists effect. */
  resourceId?: string;
  /** Total number of resources to which the existence condition is applicable. */
  totalResources?: number;
}

export function ifNotExistsEvaluationDetailsDeserializer(item: any): IfNotExistsEvaluationDetails {
  return {
    resourceId: item["resourceId"],
    totalResources: item["totalResources"],
  };
}

export function componentStateDetailsArrayDeserializer(
  result: Array<ComponentStateDetails>,
): any[] {
  return result.map((item) => {
    return componentStateDetailsDeserializer(item);
  });
}

/** Component state details. */
export interface ComponentStateDetails {
  /** Component Id. */
  id?: string;
  /** Component type. */
  type?: string;
  /** Component name. */
  name?: string;
  /** Component compliance evaluation timestamp. */
  timestamp?: Date;
  /** Component compliance state. */
  complianceState?: string;
  /** Additional properties */
  additionalProperties?: Record<string, Record<string, unknown>>;
}

export function componentStateDetailsDeserializer(item: any): ComponentStateDetails {
  return {
    additionalProperties: serializeRecord(item, [
      "id",
      "type",
      "name",
      "timestamp",
      "complianceState",
    ]),
    id: item["id"],
    type: item["type"],
    name: item["name"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    complianceState: item["complianceState"],
  };
}

/** Summarize action results. */
export interface SummarizeResults {
  /** OData context string; used by OData clients to resolve type information based on metadata. */
  odataContext?: string;
  /** OData entity count; represents the number of summaries returned; always set to 1. */
  odataCount?: number;
  /** Summarize action results. */
  value?: Summary[];
}

export function summarizeResultsDeserializer(item: any): SummarizeResults {
  return {
    odataContext: item["@odata.context"],
    odataCount: item["@odata.count"],
    value: !item["value"] ? item["value"] : summaryArrayDeserializer(item["value"]),
  };
}

export function summaryArrayDeserializer(result: Array<Summary>): any[] {
  return result.map((item) => {
    return summaryDeserializer(item);
  });
}

/** Summary results. */
export interface Summary {
  /** OData entity ID; always set to null since summaries do not have an entity ID. */
  odataId?: string;
  /** OData context string; used by OData clients to resolve type information based on metadata. */
  odataContext?: string;
  /** Compliance summary for all policy assignments. */
  results?: SummaryResults;
  /** Policy assignments summary. */
  policyAssignments?: PolicyAssignmentSummary[];
}

export function summaryDeserializer(item: any): Summary {
  return {
    odataId: item["@odata.id"],
    odataContext: item["@odata.context"],
    results: !item["results"] ? item["results"] : summaryResultsDeserializer(item["results"]),
    policyAssignments: !item["policyAssignments"]
      ? item["policyAssignments"]
      : policyAssignmentSummaryArrayDeserializer(item["policyAssignments"]),
  };
}

/** Compliance summary on a particular summary level. */
export interface SummaryResults {
  /** HTTP POST URI for queryResults action on Microsoft.PolicyInsights to retrieve raw results for the compliance summary. This property will not be available by default in future API versions, but could be queried explicitly. */
  queryResultsUri?: string;
  /** Number of non-compliant resources. */
  nonCompliantResources?: number;
  /** Number of non-compliant policies. */
  nonCompliantPolicies?: number;
  /** The resources summary at this level. */
  resourceDetails?: ComplianceDetail[];
  /** The policy artifact summary at this level. For query scope level, it represents policy assignment summary. For policy assignment level, it represents policy definitions summary. */
  policyDetails?: ComplianceDetail[];
  /** The policy definition group summary at this level. */
  policyGroupDetails?: ComplianceDetail[];
}

export function summaryResultsDeserializer(item: any): SummaryResults {
  return {
    queryResultsUri: item["queryResultsUri"],
    nonCompliantResources: item["nonCompliantResources"],
    nonCompliantPolicies: item["nonCompliantPolicies"],
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : complianceDetailArrayDeserializer(item["resourceDetails"]),
    policyDetails: !item["policyDetails"]
      ? item["policyDetails"]
      : complianceDetailArrayDeserializer(item["policyDetails"]),
    policyGroupDetails: !item["policyGroupDetails"]
      ? item["policyGroupDetails"]
      : complianceDetailArrayDeserializer(item["policyGroupDetails"]),
  };
}

export function complianceDetailArrayDeserializer(result: Array<ComplianceDetail>): any[] {
  return result.map((item) => {
    return complianceDetailDeserializer(item);
  });
}

/** The compliance state rollup. */
export interface ComplianceDetail {
  /** The compliance state. */
  complianceState?: string;
  /** Summarized count value for this compliance state. */
  count?: number;
}

export function complianceDetailDeserializer(item: any): ComplianceDetail {
  return {
    complianceState: item["complianceState"],
    count: item["count"],
  };
}

export function policyAssignmentSummaryArrayDeserializer(
  result: Array<PolicyAssignmentSummary>,
): any[] {
  return result.map((item) => {
    return policyAssignmentSummaryDeserializer(item);
  });
}

/** Policy assignment summary. */
export interface PolicyAssignmentSummary {
  /** Policy assignment ID. */
  policyAssignmentId?: string;
  /** Policy set definition ID, if the policy assignment is for a policy set. */
  policySetDefinitionId?: string;
  /** Compliance summary for the policy assignment. */
  results?: SummaryResults;
  /** Policy definitions summary. */
  policyDefinitions?: PolicyDefinitionSummary[];
  /** Policy definition group summary. */
  policyGroups?: PolicyGroupSummary[];
}

export function policyAssignmentSummaryDeserializer(item: any): PolicyAssignmentSummary {
  return {
    policyAssignmentId: item["policyAssignmentId"],
    policySetDefinitionId: item["policySetDefinitionId"],
    results: !item["results"] ? item["results"] : summaryResultsDeserializer(item["results"]),
    policyDefinitions: !item["policyDefinitions"]
      ? item["policyDefinitions"]
      : policyDefinitionSummaryArrayDeserializer(item["policyDefinitions"]),
    policyGroups: !item["policyGroups"]
      ? item["policyGroups"]
      : policyGroupSummaryArrayDeserializer(item["policyGroups"]),
  };
}

export function policyDefinitionSummaryArrayDeserializer(
  result: Array<PolicyDefinitionSummary>,
): any[] {
  return result.map((item) => {
    return policyDefinitionSummaryDeserializer(item);
  });
}

/** Policy definition summary. */
export interface PolicyDefinitionSummary {
  /** Policy definition ID. */
  policyDefinitionId?: string;
  /** Policy definition reference ID. */
  policyDefinitionReferenceId?: string;
  /** Policy definition group names. */
  policyDefinitionGroupNames?: string[];
  /** Policy effect, i.e. policy definition action. */
  effect?: string;
  /** Compliance summary for the policy definition. */
  results?: SummaryResults;
}

export function policyDefinitionSummaryDeserializer(item: any): PolicyDefinitionSummary {
  return {
    policyDefinitionId: item["policyDefinitionId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    policyDefinitionGroupNames: !item["policyDefinitionGroupNames"]
      ? item["policyDefinitionGroupNames"]
      : item["policyDefinitionGroupNames"].map((p: any) => {
          return p;
        }),
    effect: item["effect"],
    results: !item["results"] ? item["results"] : summaryResultsDeserializer(item["results"]),
  };
}

export function policyGroupSummaryArrayDeserializer(result: Array<PolicyGroupSummary>): any[] {
  return result.map((item) => {
    return policyGroupSummaryDeserializer(item);
  });
}

/** Policy definition group summary. */
export interface PolicyGroupSummary {
  /** Policy group name. */
  policyGroupName?: string;
  /** Compliance summary for the policy definition group. */
  results?: SummaryResults;
}

export function policyGroupSummaryDeserializer(item: any): PolicyGroupSummary {
  return {
    policyGroupName: item["policyGroupName"],
    results: !item["results"] ? item["results"] : summaryResultsDeserializer(item["results"]),
  };
}

/** The check policy restrictions parameters describing the resource that is being evaluated. */
export interface CheckRestrictionsRequest {
  /** The information about the resource that will be evaluated. */
  resourceDetails: CheckRestrictionsResourceDetails;
  /** The list of fields and values that should be evaluated for potential restrictions. */
  pendingFields?: PendingField[];
  /** Whether to include policies with the 'audit' effect in the results. Defaults to false. */
  includeAuditEffect?: boolean;
}

export function checkRestrictionsRequestSerializer(item: CheckRestrictionsRequest): any {
  return {
    resourceDetails: checkRestrictionsResourceDetailsSerializer(item["resourceDetails"]),
    pendingFields: !item["pendingFields"]
      ? item["pendingFields"]
      : pendingFieldArraySerializer(item["pendingFields"]),
    includeAuditEffect: item["includeAuditEffect"],
  };
}

/** The information about the resource that will be evaluated. */
export interface CheckRestrictionsResourceDetails {
  /** The resource content. This should include whatever properties are already known and can be a partial set of all resource properties. */
  resourceContent: Record<string, unknown>;
  /** The api-version of the resource content. */
  apiVersion?: string;
  /** The scope where the resource is being created. For example, if the resource is a child resource this would be the parent resource's resource ID. */
  scope?: string;
}

export function checkRestrictionsResourceDetailsSerializer(
  item: CheckRestrictionsResourceDetails,
): any {
  return {
    resourceContent: item["resourceContent"],
    apiVersion: item["apiVersion"],
    scope: item["scope"],
  };
}

export function pendingFieldArraySerializer(result: Array<PendingField>): any[] {
  return result.map((item) => {
    return pendingFieldSerializer(item);
  });
}

/** A field that should be evaluated against Azure Policy to determine restrictions. */
export interface PendingField {
  /** The name of the field. This can be a top-level property like 'name' or 'type' or an Azure Policy field alias. */
  field: string;
  /** The list of potential values for the field that should be evaluated against Azure Policy. */
  values?: string[];
}

export function pendingFieldSerializer(item: PendingField): any {
  return {
    field: item["field"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** The result of a check policy restrictions evaluation on a resource. */
export interface CheckRestrictionsResult {
  /** The restrictions that will be placed on various fields in the resource by policy. */
  readonly fieldRestrictions?: FieldRestrictions[];
  /** Evaluation results for the provided partial resource content. */
  readonly contentEvaluationResult?: CheckRestrictionsResultContentEvaluationResult;
}

export function checkRestrictionsResultDeserializer(item: any): CheckRestrictionsResult {
  return {
    fieldRestrictions: !item["fieldRestrictions"]
      ? item["fieldRestrictions"]
      : fieldRestrictionsArrayDeserializer(item["fieldRestrictions"]),
    contentEvaluationResult: !item["contentEvaluationResult"]
      ? item["contentEvaluationResult"]
      : checkRestrictionsResultContentEvaluationResultDeserializer(item["contentEvaluationResult"]),
  };
}

export function fieldRestrictionsArrayDeserializer(result: Array<FieldRestrictions>): any[] {
  return result.map((item) => {
    return fieldRestrictionsDeserializer(item);
  });
}

/** The restrictions that will be placed on a field in the resource by policy. */
export interface FieldRestrictions {
  /** The name of the field. This can be a top-level property like 'name' or 'type' or an Azure Policy field alias. */
  readonly field?: string;
  /** The restrictions placed on that field by policy. */
  restrictions?: FieldRestriction[];
}

export function fieldRestrictionsDeserializer(item: any): FieldRestrictions {
  return {
    field: item["field"],
    restrictions: !item["restrictions"]
      ? item["restrictions"]
      : fieldRestrictionArrayDeserializer(item["restrictions"]),
  };
}

export function fieldRestrictionArrayDeserializer(result: Array<FieldRestriction>): any[] {
  return result.map((item) => {
    return fieldRestrictionDeserializer(item);
  });
}

/** The restrictions on a field imposed by a specific policy. */
export interface FieldRestriction {
  /** The type of restriction that is imposed on the field. */
  readonly result?: FieldRestrictionResult;
  /** The value that policy will set for the field if the user does not provide a value. */
  readonly defaultValue?: string;
  /** The values that policy either requires or denies for the field. */
  readonly values?: string[];
  /** The details of the policy that is causing the field restriction. */
  readonly policy?: PolicyReference;
  /** The effect of the policy that is causing the field restriction. http://aka.ms/policyeffects */
  readonly policyEffect?: string;
  /** The reason for the restriction. */
  readonly reason?: string;
}

export function fieldRestrictionDeserializer(item: any): FieldRestriction {
  return {
    result: item["result"],
    defaultValue: item["defaultValue"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    policy: !item["policy"] ? item["policy"] : policyReferenceDeserializer(item["policy"]),
    policyEffect: item["policyEffect"],
    reason: item["reason"],
  };
}

/** The type of restriction that is imposed on the field. */
export enum KnownFieldRestrictionResult {
  /** The field and/or values are required by policy. */
  Required = "Required",
  /** The field will be removed by policy. */
  Removed = "Removed",
  /** The field and/or values will be denied by policy. */
  Deny = "Deny",
  /** The field and/or values will be audited by policy. */
  Audit = "Audit",
}

/**
 * The type of restriction that is imposed on the field. \
 * {@link KnownFieldRestrictionResult} can be used interchangeably with FieldRestrictionResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Required**: The field and\/or values are required by policy. \
 * **Removed**: The field will be removed by policy. \
 * **Deny**: The field and\/or values will be denied by policy. \
 * **Audit**: The field and\/or values will be audited by policy.
 */
export type FieldRestrictionResult = string;

/** Resource identifiers for a policy. */
export interface PolicyReference {
  /** The resource identifier of the policy definition. */
  readonly policyDefinitionId?: string;
  /** The resource identifier of the policy set definition. */
  readonly policySetDefinitionId?: string;
  /** The reference identifier of a specific policy definition within a policy set definition. */
  readonly policyDefinitionReferenceId?: string;
  /** The resource identifier of the policy assignment. */
  readonly policyAssignmentId?: string;
}

export function policyReferenceDeserializer(item: any): PolicyReference {
  return {
    policyDefinitionId: item["policyDefinitionId"],
    policySetDefinitionId: item["policySetDefinitionId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    policyAssignmentId: item["policyAssignmentId"],
  };
}

/** Evaluation results for the provided partial resource content. */
export interface CheckRestrictionsResultContentEvaluationResult {
  /** Policy evaluation results against the given resource content. This will indicate if the partial content that was provided will be denied as-is. */
  policyEvaluations?: PolicyEvaluationResult[];
}

export function checkRestrictionsResultContentEvaluationResultDeserializer(
  item: any,
): CheckRestrictionsResultContentEvaluationResult {
  return {
    policyEvaluations: !item["policyEvaluations"]
      ? item["policyEvaluations"]
      : policyEvaluationResultArrayDeserializer(item["policyEvaluations"]),
  };
}

export function policyEvaluationResultArrayDeserializer(
  result: Array<PolicyEvaluationResult>,
): any[] {
  return result.map((item) => {
    return policyEvaluationResultDeserializer(item);
  });
}

/** The result of a non-compliant policy evaluation against the given resource content. */
export interface PolicyEvaluationResult {
  /** The details of the policy that was evaluated. */
  readonly policyInfo?: PolicyReference;
  /** The result of the policy evaluation against the resource. This will typically be 'NonCompliant' but may contain other values if errors were encountered. */
  readonly evaluationResult?: string;
  /** The detailed results of the policy expressions and values that were evaluated. */
  readonly evaluationDetails?: CheckRestrictionEvaluationDetails;
  /** The details of the effect that was applied to the resource. */
  readonly effectDetails?: PolicyEffectDetails;
}

export function policyEvaluationResultDeserializer(item: any): PolicyEvaluationResult {
  return {
    policyInfo: !item["policyInfo"]
      ? item["policyInfo"]
      : policyReferenceDeserializer(item["policyInfo"]),
    evaluationResult: item["evaluationResult"],
    evaluationDetails: !item["evaluationDetails"]
      ? item["evaluationDetails"]
      : checkRestrictionEvaluationDetailsDeserializer(item["evaluationDetails"]),
    effectDetails: !item["effectDetails"]
      ? item["effectDetails"]
      : policyEffectDetailsDeserializer(item["effectDetails"]),
  };
}

/** Policy evaluation details. */
export interface CheckRestrictionEvaluationDetails {
  /** Details of the evaluated expressions. */
  evaluatedExpressions?: ExpressionEvaluationDetails[];
  /** Evaluation details of IfNotExists effect. */
  ifNotExistsDetails?: IfNotExistsEvaluationDetails;
  /** The reason for the evaluation result. */
  readonly reason?: string;
}

export function checkRestrictionEvaluationDetailsDeserializer(
  item: any,
): CheckRestrictionEvaluationDetails {
  return {
    evaluatedExpressions: !item["evaluatedExpressions"]
      ? item["evaluatedExpressions"]
      : expressionEvaluationDetailsArrayDeserializer(item["evaluatedExpressions"]),
    ifNotExistsDetails: !item["ifNotExistsDetails"]
      ? item["ifNotExistsDetails"]
      : ifNotExistsEvaluationDetailsDeserializer(item["ifNotExistsDetails"]),
    reason: item["reason"],
  };
}

/** The details of the effect that was applied to the resource. */
export interface PolicyEffectDetails {
  /** The effect that was applied to the resource. http://aka.ms/policyeffects */
  readonly policyEffect?: string;
}

export function policyEffectDetailsDeserializer(item: any): PolicyEffectDetails {
  return {
    policyEffect: item["policyEffect"],
  };
}

/** The check policy restrictions parameters describing the resource that is being evaluated. */
export interface CheckManagementGroupRestrictionsRequest {
  /** The information about the resource that will be evaluated. */
  resourceDetails?: CheckRestrictionsResourceDetails;
  /** The list of fields and values that should be evaluated for potential restrictions. */
  pendingFields?: PendingField[];
}

export function checkManagementGroupRestrictionsRequestSerializer(
  item: CheckManagementGroupRestrictionsRequest,
): any {
  return {
    resourceDetails: !item["resourceDetails"]
      ? item["resourceDetails"]
      : checkRestrictionsResourceDetailsSerializer(item["resourceDetails"]),
    pendingFields: !item["pendingFields"]
      ? item["pendingFields"]
      : pendingFieldArraySerializer(item["pendingFields"]),
  };
}

/** Query results. */
export interface ComponentPolicyStatesQueryResults {
  /** OData context string; used by OData clients to resolve type information based on metadata. */
  odataContext?: string;
  /** OData entity count; represents the number of policy state records returned. */
  odataCount?: number;
  /** Query results. */
  value?: ComponentPolicyState[];
}

export function componentPolicyStatesQueryResultsDeserializer(
  item: any,
): ComponentPolicyStatesQueryResults {
  return {
    odataContext: item["@odata.context"],
    odataCount: item["@odata.count"],
    value: !item["value"] ? item["value"] : componentPolicyStateArrayDeserializer(item["value"]),
  };
}

export function componentPolicyStateArrayDeserializer(result: Array<ComponentPolicyState>): any[] {
  return result.map((item) => {
    return componentPolicyStateDeserializer(item);
  });
}

/** Component Policy State record. */
export interface ComponentPolicyState {
  /** OData entity ID; always set to null since component policy state records do not have an entity ID. */
  readonly odataId?: string;
  /** OData context string; used by OData clients to resolve type information based on metadata. */
  readonly odataContext?: string;
  /** Timestamp for the component policy state record. */
  readonly timestamp?: Date;
  /** Component Id. */
  readonly componentId?: string;
  /** Component type. */
  readonly componentType?: string;
  /** Component name. */
  readonly componentName?: string;
  /** Resource ID. */
  readonly resourceId?: string;
  /** Policy assignment ID. */
  readonly policyAssignmentId?: string;
  /** Policy definition ID. */
  readonly policyDefinitionId?: string;
  /** Subscription ID. */
  readonly subscriptionId?: string;
  /** Resource type. */
  readonly resourceType?: string;
  /** Resource location. */
  readonly resourceLocation?: string;
  /** Resource group name. */
  readonly resourceGroup?: string;
  /** Policy assignment name. */
  readonly policyAssignmentName?: string;
  /** Policy assignment owner. */
  readonly policyAssignmentOwner?: string;
  /** Policy assignment parameters. */
  readonly policyAssignmentParameters?: string;
  /** Policy assignment scope. */
  readonly policyAssignmentScope?: string;
  /** Policy definition name. */
  readonly policyDefinitionName?: string;
  /** Policy definition action, i.e. effect. */
  readonly policyDefinitionAction?: string;
  /** Policy definition category. */
  readonly policyDefinitionCategory?: string;
  /** Policy set definition ID, if the policy assignment is for a policy set. */
  readonly policySetDefinitionId?: string;
  /** Policy set definition name, if the policy assignment is for a policy set. */
  readonly policySetDefinitionName?: string;
  /** Policy set definition owner, if the policy assignment is for a policy set. */
  readonly policySetDefinitionOwner?: string;
  /** Policy set definition category, if the policy assignment is for a policy set. */
  readonly policySetDefinitionCategory?: string;
  /** Policy set definition parameters, if the policy assignment is for a policy set. */
  readonly policySetDefinitionParameters?: string;
  /** Reference ID for the policy definition inside the policy set, if the policy assignment is for a policy set. */
  readonly policyDefinitionReferenceId?: string;
  /** Compliance state of the resource. */
  readonly complianceState?: string;
  /** Policy evaluation details. This is only included in the response if the request contains $expand=PolicyEvaluationDetails. */
  policyEvaluationDetails?: ComponentPolicyEvaluationDetails;
  /** Policy definition group names. */
  readonly policyDefinitionGroupNames?: string[];
  /** Evaluated policy definition version. */
  readonly policyDefinitionVersion?: string;
  /** Evaluated policy set definition version. */
  readonly policySetDefinitionVersion?: string;
  /** Evaluated policy assignment version. */
  readonly policyAssignmentVersion?: string;
  /** Additional properties */
  additionalProperties?: Record<string, Record<string, unknown>>;
}

export function componentPolicyStateDeserializer(item: any): ComponentPolicyState {
  return {
    additionalProperties: serializeRecord(item, [
      "@odata.id",
      "@odata.context",
      "timestamp",
      "componentId",
      "componentType",
      "componentName",
      "resourceId",
      "policyAssignmentId",
      "policyDefinitionId",
      "subscriptionId",
      "resourceType",
      "resourceLocation",
      "resourceGroup",
      "policyAssignmentName",
      "policyAssignmentOwner",
      "policyAssignmentParameters",
      "policyAssignmentScope",
      "policyDefinitionName",
      "policyDefinitionAction",
      "policyDefinitionCategory",
      "policySetDefinitionId",
      "policySetDefinitionName",
      "policySetDefinitionOwner",
      "policySetDefinitionCategory",
      "policySetDefinitionParameters",
      "policyDefinitionReferenceId",
      "complianceState",
      "policyEvaluationDetails",
      "policyDefinitionGroupNames",
      "policyDefinitionVersion",
      "policySetDefinitionVersion",
      "policyAssignmentVersion",
    ]),
    odataId: item["@odata.id"],
    odataContext: item["@odata.context"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    componentId: item["componentId"],
    componentType: item["componentType"],
    componentName: item["componentName"],
    resourceId: item["resourceId"],
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionId: item["policyDefinitionId"],
    subscriptionId: item["subscriptionId"],
    resourceType: item["resourceType"],
    resourceLocation: item["resourceLocation"],
    resourceGroup: item["resourceGroup"],
    policyAssignmentName: item["policyAssignmentName"],
    policyAssignmentOwner: item["policyAssignmentOwner"],
    policyAssignmentParameters: item["policyAssignmentParameters"],
    policyAssignmentScope: item["policyAssignmentScope"],
    policyDefinitionName: item["policyDefinitionName"],
    policyDefinitionAction: item["policyDefinitionAction"],
    policyDefinitionCategory: item["policyDefinitionCategory"],
    policySetDefinitionId: item["policySetDefinitionId"],
    policySetDefinitionName: item["policySetDefinitionName"],
    policySetDefinitionOwner: item["policySetDefinitionOwner"],
    policySetDefinitionCategory: item["policySetDefinitionCategory"],
    policySetDefinitionParameters: item["policySetDefinitionParameters"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    policyEvaluationDetails: !item["policyEvaluationDetails"]
      ? item["policyEvaluationDetails"]
      : componentPolicyEvaluationDetailsDeserializer(item["policyEvaluationDetails"]),
    policyDefinitionGroupNames: !item["policyDefinitionGroupNames"]
      ? item["policyDefinitionGroupNames"]
      : item["policyDefinitionGroupNames"].map((p: any) => {
          return p;
        }),
    policyDefinitionVersion: item["policyDefinitionVersion"],
    policySetDefinitionVersion: item["policySetDefinitionVersion"],
    policyAssignmentVersion: item["policyAssignmentVersion"],
  };
}

/** Policy evaluation details. */
export interface ComponentPolicyEvaluationDetails {
  /** Details of the evaluated expressions. */
  readonly evaluatedExpressions?: ComponentExpressionEvaluationDetails[];
  /** Additional textual reason for the evaluation outcome. */
  reason?: string;
}

export function componentPolicyEvaluationDetailsDeserializer(
  item: any,
): ComponentPolicyEvaluationDetails {
  return {
    evaluatedExpressions: !item["evaluatedExpressions"]
      ? item["evaluatedExpressions"]
      : componentExpressionEvaluationDetailsArrayDeserializer(item["evaluatedExpressions"]),
    reason: item["reason"],
  };
}

export function componentExpressionEvaluationDetailsArrayDeserializer(
  result: Array<ComponentExpressionEvaluationDetails>,
): any[] {
  return result.map((item) => {
    return componentExpressionEvaluationDetailsDeserializer(item);
  });
}

/** Evaluation details of policy language expressions. */
export interface ComponentExpressionEvaluationDetails {
  /** Evaluation result. */
  result?: string;
  /** Expression evaluated. */
  readonly expression?: string;
  /** The kind of expression that was evaluated. */
  readonly expressionKind?: string;
  /** Property path if the expression is a field or an alias. */
  readonly path?: string;
  /** Value of the expression. */
  readonly expressionValue?: Record<string, unknown>;
  /** Target value to be compared with the expression value. */
  readonly targetValue?: Record<string, unknown>;
  /** Operator to compare the expression value and the target value. */
  readonly operator?: string;
}

export function componentExpressionEvaluationDetailsDeserializer(
  item: any,
): ComponentExpressionEvaluationDetails {
  return {
    result: item["result"],
    expression: item["expression"],
    expressionKind: item["expressionKind"],
    path: item["path"],
    expressionValue: item["expressionValue"],
    targetValue: item["targetValue"],
    operator: item["operator"],
  };
}

/** Known values of {@link PolicyEventsResourceType} that the service accepts. */
export enum KnownPolicyEventsResourceType {
  /** default */
  Default = "default",
}

/** Type of PolicyEventsResourceType */
export type PolicyEventsResourceType = string;

/** Known values of {@link PolicyStatesResource} that the service accepts. */
export enum KnownPolicyStatesResource {
  /** default */
  Default = "default",
  /** latest */
  Latest = "latest",
}

/** Type of PolicyStatesResource */
export type PolicyStatesResource = string;

/** Known values of {@link PolicyStatesSummaryResourceType} that the service accepts. */
export enum KnownPolicyStatesSummaryResourceType {
  /** latest */
  Latest = "latest",
}

/** Type of PolicyStatesSummaryResourceType */
export type PolicyStatesSummaryResourceType = string;

/** Known values of {@link ComponentPolicyStatesResource} that the service accepts. */
export enum KnownComponentPolicyStatesResource {
  /** latest */
  Latest = "latest",
}

/** Type of ComponentPolicyStatesResource */
export type ComponentPolicyStatesResource = string;

export function _remediationPropertiesSerializer(item: Remediation): any {
  return {
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    resourceDiscoveryMode: item["resourceDiscoveryMode"],
    filters: !item["filters"] ? item["filters"] : remediationFiltersSerializer(item["filters"]),
    resourceCount: item["resourceCount"],
    parallelDeployments: item["parallelDeployments"],
    failureThreshold: !item["failureThreshold"]
      ? item["failureThreshold"]
      : remediationPropertiesFailureThresholdSerializer(item["failureThreshold"]),
  };
}

export function _remediationPropertiesDeserializer(item: any) {
  return {
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    resourceDiscoveryMode: item["resourceDiscoveryMode"],
    provisioningState: item["provisioningState"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
    filters: !item["filters"] ? item["filters"] : remediationFiltersDeserializer(item["filters"]),
    deploymentStatus: !item["deploymentStatus"]
      ? item["deploymentStatus"]
      : remediationDeploymentSummaryDeserializer(item["deploymentStatus"]),
    statusMessage: item["statusMessage"],
    correlationId: item["correlationId"],
    resourceCount: item["resourceCount"],
    parallelDeployments: item["parallelDeployments"],
    failureThreshold: !item["failureThreshold"]
      ? item["failureThreshold"]
      : remediationPropertiesFailureThresholdDeserializer(item["failureThreshold"]),
  };
}

export function _attestationPropertiesSerializer(item: Attestation): any {
  return {
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    owner: item["owner"],
    comments: item["comments"],
    evidence: !item["evidence"]
      ? item["evidence"]
      : attestationEvidenceArraySerializer(item["evidence"]),
    assessmentDate: !item["assessmentDate"]
      ? item["assessmentDate"]
      : item["assessmentDate"].toISOString(),
    metadata: item["metadata"],
  };
}

export function _attestationPropertiesDeserializer(item: any) {
  return {
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    owner: item["owner"],
    comments: item["comments"],
    evidence: !item["evidence"]
      ? item["evidence"]
      : attestationEvidenceArrayDeserializer(item["evidence"]),
    provisioningState: item["provisioningState"],
    lastComplianceStateChangeAt: !item["lastComplianceStateChangeAt"]
      ? item["lastComplianceStateChangeAt"]
      : new Date(item["lastComplianceStateChangeAt"]),
    assessmentDate: !item["assessmentDate"]
      ? item["assessmentDate"]
      : new Date(item["assessmentDate"]),
    metadata: item["metadata"],
  };
}

export function _policyMetadataPropertiesDeserializer(item: any) {
  return {
    metadataId: item["metadataId"],
    category: item["category"],
    title: item["title"],
    owner: item["owner"],
    additionalContentUrl: item["additionalContentUrl"],
    metadata: item["metadata"],
    description: item["description"],
    requirements: item["requirements"],
  };
}

export function _slimPolicyMetadataPropertiesDeserializer(item: any) {
  return {
    metadataId: item["metadataId"],
    category: item["category"],
    title: item["title"],
    owner: item["owner"],
    additionalContentUrl: item["additionalContentUrl"],
    metadata: item["metadata"],
  };
}

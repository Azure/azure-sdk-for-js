// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AccessReviewHistoryDefinition,
  AccessReviewScheduleDefinition,
  AccessReviewInstance,
  AccessReviewDecision,
  AccessReviewContactedReviewer,
} from "./microsoft/attributeNamespaces/models.js";
import {
  accessReviewHistoryDefinitionArrayDeserializer,
  accessReviewInstanceArrayDeserializer,
  accessReviewScheduleDefinitionArrayDeserializer,
  accessReviewDecisionArrayDeserializer,
  accessReviewContactedReviewerArrayDeserializer,
} from "./microsoft/attributeNamespaces/models.js";
import type {
  RoleAssignmentSchedule,
  RoleAssignmentScheduleInstance,
  RoleAssignmentScheduleRequest,
  RoleEligibilitySchedule,
  RoleEligibilityScheduleInstance,
  RoleEligibilityScheduleRequest,
  RoleManagementPolicy,
  RoleManagementPolicyAssignment,
} from "./microsoft/authorization/models.js";
import {
  roleAssignmentScheduleArrayDeserializer,
  roleAssignmentScheduleInstanceArrayDeserializer,
  roleAssignmentScheduleRequestArrayDeserializer,
  roleEligibilityScheduleArrayDeserializer,
  roleEligibilityScheduleInstanceArrayDeserializer,
  roleEligibilityScheduleRequestArrayDeserializer,
  roleManagementPolicyArrayDeserializer,
  roleManagementPolicyAssignmentArrayDeserializer,
} from "./microsoft/authorization/models.js";
import type { ClassicAdministrator } from "./microsoft/classicAdmin/models.js";
import { classicAdministratorArrayDeserializer } from "./microsoft/classicAdmin/models.js";
import type { DenyAssignment } from "./microsoft/denyAssignment/models.js";
import { denyAssignmentArrayDeserializer } from "./microsoft/denyAssignment/models.js";
import type { ProviderOperationsMetadata } from "./microsoft/providerOperations/models.js";
import { providerOperationsMetadataArrayDeserializer } from "./microsoft/providerOperations/models.js";
import type { RoleDefinition } from "./microsoft/roleDefinitions/models.js";
import { roleDefinitionArrayDeserializer } from "./microsoft/roleDefinitions/models.js";
import type {
  Alert,
  AlertDefinition,
  AlertIncident,
  AlertConfiguration,
} from "./microsoft/roleManagementAlerts/models.js";
import {
  alertIncidentArrayDeserializer,
  alertArrayDeserializer,
  alertConfigurationArrayDeserializer,
  alertDefinitionArrayDeserializer,
} from "./microsoft/roleManagementAlerts/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(_item: Resource): any {
  return {};
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The response of a AccessReviewHistoryDefinition list operation. */
export interface _AccessReviewHistoryDefinitionListResult {
  /** The AccessReviewHistoryDefinition items on this page */
  value: AccessReviewHistoryDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessReviewHistoryDefinitionListResultDeserializer(
  item: any,
): _AccessReviewHistoryDefinitionListResult {
  return {
    value: accessReviewHistoryDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AccessReviewScheduleDefinition list operation. */
export interface _AccessReviewScheduleDefinitionListResult {
  /** The AccessReviewScheduleDefinition items on this page */
  value: AccessReviewScheduleDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessReviewScheduleDefinitionListResultDeserializer(
  item: any,
): _AccessReviewScheduleDefinitionListResult {
  return {
    value: accessReviewScheduleDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AccessReviewInstance list operation. */
export interface _AccessReviewInstanceListResult {
  /** The AccessReviewInstance items on this page */
  value: AccessReviewInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessReviewInstanceListResultDeserializer(
  item: any,
): _AccessReviewInstanceListResult {
  return {
    value: accessReviewInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(_item: ExtensionResource): any {
  return {};
}

export function extensionResourceDeserializer(item: any): ExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The response of a RoleAssignmentSchedule list operation. */
export interface _RoleAssignmentScheduleListResult {
  /** The RoleAssignmentSchedule items on this page */
  value: RoleAssignmentSchedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleAssignmentScheduleListResultDeserializer(
  item: any,
): _RoleAssignmentScheduleListResult {
  return {
    value: roleAssignmentScheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoleAssignmentScheduleInstance list operation. */
export interface _RoleAssignmentScheduleInstanceListResult {
  /** The RoleAssignmentScheduleInstance items on this page */
  value: RoleAssignmentScheduleInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleAssignmentScheduleInstanceListResultDeserializer(
  item: any,
): _RoleAssignmentScheduleInstanceListResult {
  return {
    value: roleAssignmentScheduleInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoleAssignmentScheduleRequest list operation. */
export interface _RoleAssignmentScheduleRequestListResult {
  /** The RoleAssignmentScheduleRequest items on this page */
  value: RoleAssignmentScheduleRequest[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleAssignmentScheduleRequestListResultDeserializer(
  item: any,
): _RoleAssignmentScheduleRequestListResult {
  return {
    value: roleAssignmentScheduleRequestArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoleEligibilitySchedule list operation. */
export interface _RoleEligibilityScheduleListResult {
  /** The RoleEligibilitySchedule items on this page */
  value: RoleEligibilitySchedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleEligibilityScheduleListResultDeserializer(
  item: any,
): _RoleEligibilityScheduleListResult {
  return {
    value: roleEligibilityScheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoleEligibilityScheduleInstance list operation. */
export interface _RoleEligibilityScheduleInstanceListResult {
  /** The RoleEligibilityScheduleInstance items on this page */
  value: RoleEligibilityScheduleInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleEligibilityScheduleInstanceListResultDeserializer(
  item: any,
): _RoleEligibilityScheduleInstanceListResult {
  return {
    value: roleEligibilityScheduleInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoleEligibilityScheduleRequest list operation. */
export interface _RoleEligibilityScheduleRequestListResult {
  /** The RoleEligibilityScheduleRequest items on this page */
  value: RoleEligibilityScheduleRequest[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleEligibilityScheduleRequestListResultDeserializer(
  item: any,
): _RoleEligibilityScheduleRequestListResult {
  return {
    value: roleEligibilityScheduleRequestArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoleManagementPolicy list operation. */
export interface _RoleManagementPolicyListResult {
  /** The RoleManagementPolicy items on this page */
  value: RoleManagementPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleManagementPolicyListResultDeserializer(
  item: any,
): _RoleManagementPolicyListResult {
  return {
    value: roleManagementPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoleManagementPolicyAssignment list operation. */
export interface _RoleManagementPolicyAssignmentListResult {
  /** The RoleManagementPolicyAssignment items on this page */
  value: RoleManagementPolicyAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleManagementPolicyAssignmentListResultDeserializer(
  item: any,
): _RoleManagementPolicyAssignmentListResult {
  return {
    value: roleManagementPolicyAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** The response of a DenyAssignment list operation. */
export interface _DenyAssignmentListResult {
  /** The DenyAssignment items on this page */
  value: DenyAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _denyAssignmentListResultDeserializer(item: any): _DenyAssignmentListResult {
  return {
    value: denyAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoleDefinition list operation. */
export interface _RoleDefinitionListResult {
  /** The RoleDefinition items on this page */
  value: RoleDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleDefinitionListResultDeserializer(item: any): _RoleDefinitionListResult {
  return {
    value: roleDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a Alert list operation. */
export interface _AlertListResult {
  /** The Alert items on this page */
  value: Alert[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertListResultDeserializer(item: any): _AlertListResult {
  return {
    value: alertArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AlertConfiguration list operation. */
export interface _AlertConfigurationListResult {
  /** The AlertConfiguration items on this page */
  value: AlertConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertConfigurationListResultDeserializer(
  item: any,
): _AlertConfigurationListResult {
  return {
    value: alertConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AlertDefinition list operation. */
export interface _AlertDefinitionListResult {
  /** The AlertDefinition items on this page */
  value: AlertDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertDefinitionListResultDeserializer(item: any): _AlertDefinitionListResult {
  return {
    value: alertDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AlertIncident list operation. */
export interface _AlertIncidentListResult {
  /** The AlertIncident items on this page */
  value: AlertIncident[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertIncidentListResultDeserializer(item: any): _AlertIncidentListResult {
  return {
    value: alertIncidentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AccessReviewDecision list operation. */
export interface _AccessReviewDecisionListResult {
  /** The AccessReviewDecision items on this page */
  value: AccessReviewDecision[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessReviewDecisionListResultDeserializer(
  item: any,
): _AccessReviewDecisionListResult {
  return {
    value: accessReviewDecisionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AccessReviewContactedReviewer list operation. */
export interface _AccessReviewContactedReviewerListResult {
  /** The AccessReviewContactedReviewer items on this page */
  value: AccessReviewContactedReviewer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessReviewContactedReviewerListResultDeserializer(
  item: any,
): _AccessReviewContactedReviewerListResult {
  return {
    value: accessReviewContactedReviewerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ClassicAdministrator list operation. */
export interface _ClassicAdministratorListResult {
  /** The ClassicAdministrator items on this page */
  value: ClassicAdministrator[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _classicAdministratorListResultDeserializer(
  item: any,
): _ClassicAdministratorListResult {
  return {
    value: classicAdministratorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ProviderOperationsMetadata list operation. */
export interface _ProviderOperationsMetadataListResult {
  /** The ProviderOperationsMetadata items on this page */
  value: ProviderOperationsMetadata[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _providerOperationsMetadataListResultDeserializer(
  item: any,
): _ProviderOperationsMetadataListResult {
  return {
    value: providerOperationsMetadataArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

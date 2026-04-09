// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExtensionResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";
import type { PrincipalType } from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Role Assignments */
export interface RoleAssignment extends ExtensionResource {
  /** The role assignment scope. */
  readonly scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** Description of role assignment */
  description?: string;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently the only accepted value is '2.0' */
  conditionVersion?: string;
  /** Time it was created */
  readonly createdOn?: Date;
  /** Time it was updated */
  readonly updatedOn?: Date;
  /** Id of the user who created the assignment */
  readonly createdBy?: string;
  /** Id of the user who updated the assignment */
  readonly updatedBy?: string;
  /** Id of the delegated managed identity resource */
  delegatedManagedIdentityResourceId?: string;
}

export function roleAssignmentDeserializer(item: any): RoleAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleAssignmentPropertiesDeserializer(item["properties"])),
  };
}

/** Role assignment properties. */
export interface RoleAssignmentProperties {
  /** The role assignment scope. */
  readonly scope?: string;
  /** The role definition ID. */
  roleDefinitionId: string;
  /** The principal ID. */
  principalId: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** Description of role assignment */
  description?: string;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently the only accepted value is '2.0' */
  conditionVersion?: string;
  /** Time it was created */
  readonly createdOn?: Date;
  /** Time it was updated */
  readonly updatedOn?: Date;
  /** Id of the user who created the assignment */
  readonly createdBy?: string;
  /** Id of the user who updated the assignment */
  readonly updatedBy?: string;
  /** Id of the delegated managed identity resource */
  delegatedManagedIdentityResourceId?: string;
}

export function roleAssignmentPropertiesSerializer(item: RoleAssignmentProperties): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    description: item["description"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    delegatedManagedIdentityResourceId: item["delegatedManagedIdentityResourceId"],
  };
}

export function roleAssignmentPropertiesDeserializer(item: any): RoleAssignmentProperties {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    description: item["description"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    createdBy: item["createdBy"],
    updatedBy: item["updatedBy"],
    delegatedManagedIdentityResourceId: item["delegatedManagedIdentityResourceId"],
  };
}

/** Role assignment create parameters. */
export interface RoleAssignmentCreateParameters {
  /** The role assignment scope. */
  readonly scope?: string;
  /** The role definition ID. */
  roleDefinitionId: string;
  /** The principal ID. */
  principalId: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** Description of role assignment */
  description?: string;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently the only accepted value is '2.0' */
  conditionVersion?: string;
  /** Time it was created */
  readonly createdOn?: Date;
  /** Time it was updated */
  readonly updatedOn?: Date;
  /** Id of the user who created the assignment */
  readonly createdBy?: string;
  /** Id of the user who updated the assignment */
  readonly updatedBy?: string;
  /** Id of the delegated managed identity resource */
  delegatedManagedIdentityResourceId?: string;
}

export function roleAssignmentCreateParametersSerializer(
  item: RoleAssignmentCreateParameters,
): any {
  return { properties: _roleAssignmentCreateParametersPropertiesSerializer(item) };
}

/** Role assignment list operation result. */
export interface _RoleAssignmentListResult {
  /** The RoleAssignment items on this page */
  value: RoleAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleAssignmentListResultDeserializer(item: any): _RoleAssignmentListResult {
  return {
    value: roleAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function roleAssignmentArrayDeserializer(result: Array<RoleAssignment>): any[] {
  return result.map((item) => {
    return roleAssignmentDeserializer(item);
  });
}

export function _roleAssignmentPropertiesSerializer(item: RoleAssignment): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    description: item["description"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    delegatedManagedIdentityResourceId: item["delegatedManagedIdentityResourceId"],
  };
}

export function _roleAssignmentPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    description: item["description"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    createdBy: item["createdBy"],
    updatedBy: item["updatedBy"],
    delegatedManagedIdentityResourceId: item["delegatedManagedIdentityResourceId"],
  };
}

export function _roleAssignmentCreateParametersPropertiesSerializer(
  item: RoleAssignmentCreateParameters,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    description: item["description"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    delegatedManagedIdentityResourceId: item["delegatedManagedIdentityResourceId"],
  };
}

export function _roleAssignmentCreateParametersPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    description: item["description"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    createdBy: item["createdBy"],
    updatedBy: item["updatedBy"],
    delegatedManagedIdentityResourceId: item["delegatedManagedIdentityResourceId"],
  };
}

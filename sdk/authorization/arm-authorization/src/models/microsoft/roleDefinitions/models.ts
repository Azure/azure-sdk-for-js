// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ProxyResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Role definition. */
export interface RoleDefinition extends ProxyResource {
  /** The role name. */
  roleName?: string;
  /** The role definition description. */
  description?: string;
  /** The role type. */
  roleType?: string;
  /** Role definition permissions. */
  permissions?: Permission[];
  /** Role definition assignable scopes. */
  assignableScopes?: string[];
  /** Time it was created */
  readonly createdOn?: Date;
  /** Time it was updated */
  readonly updatedOn?: Date;
  /** Id of the user who created the assignment */
  readonly createdBy?: string;
  /** Id of the user who updated the assignment */
  readonly updatedBy?: string;
}

export function roleDefinitionSerializer(item: RoleDefinition): any {
  return {
    properties: areAllPropsUndefined(item, [
      "roleName",
      "description",
      "roleType",
      "permissions",
      "assignableScopes",
    ])
      ? undefined
      : _roleDefinitionPropertiesSerializer(item),
  };
}

export function roleDefinitionDeserializer(item: any): RoleDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleDefinitionPropertiesDeserializer(item["properties"])),
  };
}

/** Role definition properties. */
export interface RoleDefinitionProperties {
  /** The role name. */
  roleName?: string;
  /** The role definition description. */
  description?: string;
  /** The role type. */
  roleType?: string;
  /** Role definition permissions. */
  permissions?: Permission[];
  /** Role definition assignable scopes. */
  assignableScopes?: string[];
  /** Time it was created */
  readonly createdOn?: Date;
  /** Time it was updated */
  readonly updatedOn?: Date;
  /** Id of the user who created the assignment */
  readonly createdBy?: string;
  /** Id of the user who updated the assignment */
  readonly updatedBy?: string;
}

export function roleDefinitionPropertiesSerializer(item: RoleDefinitionProperties): any {
  return {
    roleName: item["roleName"],
    description: item["description"],
    type: item["roleType"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
  };
}

export function roleDefinitionPropertiesDeserializer(item: any): RoleDefinitionProperties {
  return {
    roleName: item["roleName"],
    description: item["description"],
    roleType: item["type"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    createdBy: item["createdBy"],
    updatedBy: item["updatedBy"],
  };
}

export function permissionArraySerializer(result: Array<Permission>): any[] {
  return result.map((item) => {
    return permissionSerializer(item);
  });
}

export function permissionArrayDeserializer(result: Array<Permission>): any[] {
  return result.map((item) => {
    return permissionDeserializer(item);
  });
}

/** Role definition permissions. */
export interface Permission {
  /** Allowed actions. */
  actions?: string[];
  /** Denied actions. */
  notActions?: string[];
  /** Allowed Data actions. */
  dataActions?: string[];
  /** Denied Data actions. */
  notDataActions?: string[];
  /** The conditions on the role definition. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  readonly condition?: string;
  /** Version of the condition. Currently the only accepted value is '2.0' */
  readonly conditionVersion?: string;
}

export function permissionSerializer(item: Permission): any {
  return {
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    notActions: !item["notActions"]
      ? item["notActions"]
      : item["notActions"].map((p: any) => {
          return p;
        }),
    dataActions: !item["dataActions"]
      ? item["dataActions"]
      : item["dataActions"].map((p: any) => {
          return p;
        }),
    notDataActions: !item["notDataActions"]
      ? item["notDataActions"]
      : item["notDataActions"].map((p: any) => {
          return p;
        }),
  };
}

export function permissionDeserializer(item: any): Permission {
  return {
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    notActions: !item["notActions"]
      ? item["notActions"]
      : item["notActions"].map((p: any) => {
          return p;
        }),
    dataActions: !item["dataActions"]
      ? item["dataActions"]
      : item["dataActions"].map((p: any) => {
          return p;
        }),
    notDataActions: !item["notDataActions"]
      ? item["notDataActions"]
      : item["notDataActions"].map((p: any) => {
          return p;
        }),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
  };
}

export function roleDefinitionArraySerializer(result: Array<RoleDefinition>): any[] {
  return result.map((item) => {
    return roleDefinitionSerializer(item);
  });
}

export function roleDefinitionArrayDeserializer(result: Array<RoleDefinition>): any[] {
  return result.map((item) => {
    return roleDefinitionDeserializer(item);
  });
}

/** Permissions information. */
export interface _PermissionGetResult {
  /** The Permission items on this page */
  value: Permission[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _permissionGetResultDeserializer(item: any): _PermissionGetResult {
  return {
    value: permissionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function _roleDefinitionPropertiesSerializer(item: RoleDefinition): any {
  return {
    roleName: item["roleName"],
    description: item["description"],
    type: item["roleType"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
  };
}

export function _roleDefinitionPropertiesDeserializer(item: any) {
  return {
    roleName: item["roleName"],
    description: item["description"],
    roleType: item["type"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    createdBy: item["createdBy"],
    updatedBy: item["updatedBy"],
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ExtensionResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Deny Assignment */
export interface DenyAssignment extends ExtensionResource {
  /** The display name of the deny assignment. */
  denyAssignmentName?: string;
  /** The description of the deny assignment. */
  description?: string;
  /** An array of permissions that are denied by the deny assignment. */
  permissions?: DenyAssignmentPermission[];
  /** The deny assignment scope. */
  readonly scope?: string;
  /** Determines if the deny assignment applies to child scopes. Default value is false. */
  doNotApplyToChildScopes?: boolean;
  /** Array of principals to which the deny assignment applies. */
  principals?: DenyAssignmentPrincipal[];
  /** Array of principals to which the deny assignment does not apply. */
  excludePrincipals?: DenyAssignmentPrincipal[];
  /** Specifies whether this deny assignment was created by Azure and cannot be edited or deleted. */
  isSystemProtected?: boolean;
  /** The effect of the deny assignment. 'enforced' blocks access, 'audit' logs without blocking. */
  denyAssignmentEffect?: DenyAssignmentEffect;
  /** The conditions on the deny assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. */
  conditionVersion?: string;
  /** Time it was created */
  readonly createdOn?: Date;
  /** Time it was updated */
  readonly updatedOn?: Date;
  /** Id of the user who created the assignment */
  readonly createdBy?: string;
  /** Id of the user who updated the assignment */
  readonly updatedBy?: string;
}

export function denyAssignmentSerializer(item: DenyAssignment): any {
  return {
    properties: areAllPropsUndefined(item, [
      "denyAssignmentName",
      "description",
      "permissions",
      "doNotApplyToChildScopes",
      "principals",
      "excludePrincipals",
      "isSystemProtected",
      "denyAssignmentEffect",
      "condition",
      "conditionVersion",
    ])
      ? undefined
      : _denyAssignmentPropertiesSerializer(item),
  };
}

export function denyAssignmentDeserializer(item: any): DenyAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _denyAssignmentPropertiesDeserializer(item["properties"])),
  };
}

/** Deny assignment properties. */
export interface DenyAssignmentProperties {
  /** The display name of the deny assignment. */
  denyAssignmentName?: string;
  /** The description of the deny assignment. */
  description?: string;
  /** An array of permissions that are denied by the deny assignment. */
  permissions?: DenyAssignmentPermission[];
  /** The deny assignment scope. */
  readonly scope?: string;
  /** Determines if the deny assignment applies to child scopes. Default value is false. */
  doNotApplyToChildScopes?: boolean;
  /** Array of principals to which the deny assignment applies. */
  principals?: DenyAssignmentPrincipal[];
  /** Array of principals to which the deny assignment does not apply. */
  excludePrincipals?: DenyAssignmentPrincipal[];
  /** Specifies whether this deny assignment was created by Azure and cannot be edited or deleted. */
  isSystemProtected?: boolean;
  /** The effect of the deny assignment. 'enforced' blocks access, 'audit' logs without blocking. */
  denyAssignmentEffect?: DenyAssignmentEffect;
  /** The conditions on the deny assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. */
  conditionVersion?: string;
  /** Time it was created */
  readonly createdOn?: Date;
  /** Time it was updated */
  readonly updatedOn?: Date;
  /** Id of the user who created the assignment */
  readonly createdBy?: string;
  /** Id of the user who updated the assignment */
  readonly updatedBy?: string;
}

export function denyAssignmentPropertiesSerializer(item: DenyAssignmentProperties): any {
  return {
    denyAssignmentName: item["denyAssignmentName"],
    description: item["description"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : denyAssignmentPermissionArraySerializer(item["permissions"]),
    doNotApplyToChildScopes: item["doNotApplyToChildScopes"],
    principals: !item["principals"]
      ? item["principals"]
      : denyAssignmentPrincipalArraySerializer(item["principals"]),
    excludePrincipals: !item["excludePrincipals"]
      ? item["excludePrincipals"]
      : denyAssignmentPrincipalArraySerializer(item["excludePrincipals"]),
    isSystemProtected: item["isSystemProtected"],
    denyAssignmentEffect: item["denyAssignmentEffect"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
  };
}

export function denyAssignmentPropertiesDeserializer(item: any): DenyAssignmentProperties {
  return {
    denyAssignmentName: item["denyAssignmentName"],
    description: item["description"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : denyAssignmentPermissionArrayDeserializer(item["permissions"]),
    scope: item["scope"],
    doNotApplyToChildScopes: item["doNotApplyToChildScopes"],
    principals: !item["principals"]
      ? item["principals"]
      : denyAssignmentPrincipalArrayDeserializer(item["principals"]),
    excludePrincipals: !item["excludePrincipals"]
      ? item["excludePrincipals"]
      : denyAssignmentPrincipalArrayDeserializer(item["excludePrincipals"]),
    isSystemProtected: item["isSystemProtected"],
    denyAssignmentEffect: item["denyAssignmentEffect"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    createdBy: item["createdBy"],
    updatedBy: item["updatedBy"],
  };
}

export function denyAssignmentPermissionArraySerializer(
  result: Array<DenyAssignmentPermission>,
): any[] {
  return result.map((item) => {
    return denyAssignmentPermissionSerializer(item);
  });
}

export function denyAssignmentPermissionArrayDeserializer(
  result: Array<DenyAssignmentPermission>,
): any[] {
  return result.map((item) => {
    return denyAssignmentPermissionDeserializer(item);
  });
}

/** Deny assignment permissions. */
export interface DenyAssignmentPermission {
  /** Actions to which the deny assignment does not grant access. */
  actions?: string[];
  /** Actions to exclude from that the deny assignment does not grant access. */
  notActions?: string[];
  /** Data actions to which the deny assignment does not grant access. */
  dataActions?: string[];
  /** Data actions to exclude from that the deny assignment does not grant access. */
  notDataActions?: string[];
  /** The conditions on the Deny assignment permission. This limits the resources it applies to. */
  condition?: string;
  /** Version of the condition. */
  conditionVersion?: string;
}

export function denyAssignmentPermissionSerializer(item: DenyAssignmentPermission): any {
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

export function denyAssignmentPermissionDeserializer(item: any): DenyAssignmentPermission {
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

export function denyAssignmentPrincipalArraySerializer(
  result: Array<DenyAssignmentPrincipal>,
): any[] {
  return result.map((item) => {
    return denyAssignmentPrincipalSerializer(item);
  });
}

export function denyAssignmentPrincipalArrayDeserializer(
  result: Array<DenyAssignmentPrincipal>,
): any[] {
  return result.map((item) => {
    return denyAssignmentPrincipalDeserializer(item);
  });
}

/** Deny assignment principal. */
export interface DenyAssignmentPrincipal {
  /** The object ID of the principal. */
  id?: string;
  /** The type of the principal such as user, group, servicePrincipal, etc. */
  type?: DenyAssignmentPrincipalType;
}

export function denyAssignmentPrincipalSerializer(item: DenyAssignmentPrincipal): any {
  return {
    id: item["id"],
    type: !item["type"] ? item["type"] : denyAssignmentPrincipalTypeSerializer(item["type"]),
  };
}

export function denyAssignmentPrincipalDeserializer(item: any): DenyAssignmentPrincipal {
  return {
    id: item["id"],
    type: !item["type"] ? item["type"] : denyAssignmentPrincipalTypeDeserializer(item["type"]),
  };
}

/** The type of the principal such as user, group, servicePrincipal, etc. */
export type DenyAssignmentPrincipalType = string;

export function denyAssignmentPrincipalTypeSerializer(item: DenyAssignmentPrincipalType): any {
  return item;
}

export function denyAssignmentPrincipalTypeDeserializer(item: any): DenyAssignmentPrincipalType {
  return item;
}

/** The effect of the deny assignment. 'enforced' blocks access, 'audit' logs without blocking. */
export enum KnownDenyAssignmentEffect {
  /** enforced */
  Enforced = "enforced",
  /** audit */
  Audit = "audit",
}

/**
 * The effect of the deny assignment. 'enforced' blocks access, 'audit' logs without blocking. \
 * {@link KnownDenyAssignmentEffect} can be used interchangeably with DenyAssignmentEffect,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enforced**: enforced \
 * **audit**: audit
 */
export type DenyAssignmentEffect = string;

export function denyAssignmentArraySerializer(result: Array<DenyAssignment>): any[] {
  return result.map((item) => {
    return denyAssignmentSerializer(item);
  });
}

export function denyAssignmentArrayDeserializer(result: Array<DenyAssignment>): any[] {
  return result.map((item) => {
    return denyAssignmentDeserializer(item);
  });
}

export function _denyAssignmentPropertiesSerializer(item: DenyAssignment): any {
  return {
    denyAssignmentName: item["denyAssignmentName"],
    description: item["description"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : denyAssignmentPermissionArraySerializer(item["permissions"]),
    doNotApplyToChildScopes: item["doNotApplyToChildScopes"],
    principals: !item["principals"]
      ? item["principals"]
      : denyAssignmentPrincipalArraySerializer(item["principals"]),
    excludePrincipals: !item["excludePrincipals"]
      ? item["excludePrincipals"]
      : denyAssignmentPrincipalArraySerializer(item["excludePrincipals"]),
    isSystemProtected: item["isSystemProtected"],
    denyAssignmentEffect: item["denyAssignmentEffect"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
  };
}

export function _denyAssignmentPropertiesDeserializer(item: any) {
  return {
    denyAssignmentName: item["denyAssignmentName"],
    description: item["description"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : denyAssignmentPermissionArrayDeserializer(item["permissions"]),
    scope: item["scope"],
    doNotApplyToChildScopes: item["doNotApplyToChildScopes"],
    principals: !item["principals"]
      ? item["principals"]
      : denyAssignmentPrincipalArrayDeserializer(item["principals"]),
    excludePrincipals: !item["excludePrincipals"]
      ? item["excludePrincipals"]
      : denyAssignmentPrincipalArrayDeserializer(item["excludePrincipals"]),
    isSystemProtected: item["isSystemProtected"],
    denyAssignmentEffect: item["denyAssignmentEffect"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    createdBy: item["createdBy"],
    updatedBy: item["updatedBy"],
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import { SUPPORTED_API_VERSIONS } from "./constants";
import { DataAction } from "./generated/models";

/**
 * The optional parameters accepted by the Key Vault's AccessControlClient
 */
export interface AccessControlClientOptions extends coreHttp.PipelineOptions {
  /**
   * The accepted versions of the Key Vault's service API.
   */
  serviceVersion?: SUPPORTED_API_VERSIONS;
}

/**
 * A Key Vault role assignment.
 */
export interface KeyVaultRoleAssignment {
  /**
   * The role assignment ID.
   */
  readonly id: string;
  /**
   * The role assignment name.
   */
  readonly name: string;
  /**
   * The role assignment type.
   */
  readonly kind: string;
  /**
   * Role assignment properties.
   */
  properties: KeyVaultRoleAssignmentPropertiesWithScope;
}

/**
 * A list of Key Vault permissions.
 */
export interface KeyVaultPermission {
  /**
   * Allowed actions.
   */
  actions?: string[];
  /**
   * Denied actions.
   */
  notActions?: string[];
  /**
   * Allowed Data actions.
   */
  dataActions?: DataAction[];
  /**
   * Denied Data actions.
   */
  notDataActions?: DataAction[];
}

/**
 * A Key Vault role definition.
 */
export interface KeyVaultRoleDefinition {
  /**
   * The role definition ID.
   */
  readonly id: string;
  /**
   * The role definition name.
   */
  readonly name: string;
  /**
   * The role definition type.
   */
  readonly kind: string;
  /**
   * The role name.
   */
  roleName: string;
  /**
   * The role definition description.
   */
  description: string;
  /**
   * The role type.
   */
  roleType: string;
  /**
   * A list of Key Vault permissions.
   */
  permissions: KeyVaultPermission[];
  /**
   * Role definition assignable scopes.
   */
  assignableScopes: string[];
}

/**
 * Role assignment properties.
 */
export interface KeyVaultRoleAssignmentProperties {
  /**
   * The role definition ID.
   */
  roleDefinitionId: string;
  /**
   * The principal ID.
   */
  principalId: string;
}

/**
 * A scope of the role assignment.
 * The valid scopes are: "/", "/keys" and any a specific resource Id followed by a slash, as in "ID/".
 */
export type RoleAssignmentScope = "/" | "/keys" | string;

/**
 * A scope of the role definition.
 * The valid scopes are: "/" or "/keys"
 */
export type RoleScope = "/" | "/keys";

/**
 * Role assignment properties with the scope property.
 */
export interface KeyVaultRoleAssignmentPropertiesWithScope {
  /**
   * The role assignment scope.
   */
  scope?: RoleAssignmentScope;
  /**
   * The role definition ID.
   */
  roleDefinitionId: string;
  /**
   * The principal ID.
   */
  principalId: string;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link createRoleAssignment}
 */
export interface CreateRoleAssignmentOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link deleteRoleAssignment}
 */
export interface DeleteRoleAssignmentOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link getRoleAssignment}
 */
export interface GetRoleAssignmentOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing optional parameters passed to {@link listRoleAssignments}.
 */
export interface ListRoleAssignmentsOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing optional parameters passed to {@link listRoleDefinitions}.
 */
export interface ListRoleDefinitionsOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing optional parameters passed to {@link getRoleDefinition}.
 */
export interface GetRoleDefinitionOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing optional parameters passed to {@link upsertRoleDefinition}.
 */
export interface UpsertRoleDefinitionOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing optional parameters passed to {@link deleteRoleDefinition}.
 */
export interface DeleteRoleDefinitionOptions extends coreHttp.OperationOptions {}

/**
 * Arguments for retrieving the next page of search results.
 */
export interface ListRoleDefinitionsPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

/**
 * Arguments for retrieving the next page of search results.
 */
export interface ListRoleAssignmentsPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

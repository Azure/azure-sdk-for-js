// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import {
  DataAction as KeyVaultDataAction,
  RoleScope as KeyVaultRoleScope,
  KnownDataAction as KnownKeyVaultDataAction,
  KnownRoleScope as KnownKeyVaultRoleScope,
} from "./generated/index";
import { SUPPORTED_API_VERSIONS } from "./constants";

export { KeyVaultDataAction, KeyVaultRoleScope, KnownKeyVaultDataAction, KnownKeyVaultRoleScope };

/**
 * The optional parameters accepted by the Key Vault's AccessControlClient
 */
export interface AccessControlClientOptions extends CommonClientOptions {
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
  properties: KeyVaultRoleAssignmentProperties;
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
   * Actions that are excluded but not denied. They may be granted by other role definitions assigned to a principal.
   */
  notActions?: string[];
  /**
   * Allowed Data actions.
   */
  dataActions?: KeyVaultDataAction[];
  /**
   * Data actions that are excluded but not denied. They may be granted by other role definitions assigned to a principal.
   */
  notDataActions?: KeyVaultDataAction[];
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
  /**
   * The role assignment scope.
   */
  scope?: KeyVaultRoleScope;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link createRoleAssignment}
 */
export interface CreateRoleAssignmentOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link deleteRoleAssignment}
 */
export interface DeleteRoleAssignmentOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link getRoleAssignment}
 */
export interface GetRoleAssignmentOptions extends OperationOptions {}

/**
 * An interface representing optional parameters passed to {@link listRoleAssignments}.
 */
export interface ListRoleAssignmentsOptions extends OperationOptions {}

/**
 * An interface representing optional parameters passed to {@link listRoleDefinitions}.
 */
export interface ListRoleDefinitionsOptions extends OperationOptions {}

/**
 * An interface representing optional parameters passed to {@link getRoleDefinition}.
 */
export interface GetRoleDefinitionOptions extends OperationOptions {}

/**
 * An interface representing optional parameters passed to {@link setRoleDefinition}.
 */
export interface SetRoleDefinitionOptions extends OperationOptions {
  /**
   * UUID used as the name of the role definition to create. If it's not provided, a new UUID will be generated.
   */
  roleDefinitionName?: string;
  /**
   * Friendly display name for the role definition.
   */
  roleName?: string;
  /**
   * Long-form description of the role definition.
   */
  description?: string;
  /**
   * List of Key Vault permissions
   */
  permissions?: KeyVaultPermission[];
  /**
   * List of assignable Key Vault role scopes
   */
  assignableScopes?: KeyVaultRoleScope[];
}

/**
 * An interface representing optional parameters passed to {@link deleteRoleDefinition}.
 */
export interface DeleteRoleDefinitionOptions extends OperationOptions {}

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

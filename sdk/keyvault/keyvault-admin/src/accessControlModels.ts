// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import { SUPPORTED_API_VERSIONS } from './constants';

/**
 * The optional parameters accepted by the Key Vault's AccessControlClient
 */
export interface AccessControlClientOptions extends coreHttp.PipelineOptions {
  /**
   * The accepted versions of the Key Vault's service API.
   */
  serviceVersion?: SUPPORTED_API_VERSIONS;
}

export interface KeyVaultRoleAssignment {
  /**
   * The role assignment ID.
   */
  readonly id?: string;
  /**
   * The role assignment name.
   */
  readonly name?: string;
  /**
   * The role assignment type.
   */
  readonly type?: string;
  /**
   * Role assignment properties.
   */
  properties?: RoleAssignmentPropertiesWithScope;
}

/**
 * Role assignment properties.
 */
export interface RoleAssignmentProperties {
  /**
   * The role definition ID used in the role assignment.
   */
  roleDefinitionId?: string;
  /**
   * The principal ID assigned to the role. This maps to the ID inside the Active Directory. It can point to a user, service principal, or security group.
   */
  principalId?: string;
}

/**
 * A scope of the role assignment. We currently only support "/" and "/keys".
 */
export type RoleAssignmentScope = "/" | "/keys";

/**
 * Role assignment properties with the scope property.
 */
export interface RoleAssignmentPropertiesWithScope extends RoleAssignmentProperties {
  /**
   * The role assignment scope.
   */
  scope?: RoleAssignmentScope;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link createRoleAssignment}
 */
export interface CreateRoleAssignmentOptions extends coreHttp.OperationOptions {
  /**
   * The properties of the role assignment
   */
  properties?: RoleAssignmentProperties
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link deleteRoleAssignment}
 */
export interface DeleteRoleAssignmentOptions extends coreHttp.OperationOptions {}
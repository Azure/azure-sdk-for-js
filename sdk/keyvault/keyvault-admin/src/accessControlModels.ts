// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { SUPPORTED_API_VERSIONS } from "./constants";
import {
  DataAction as KeyVaultDataAction,
  RoleScope as KeyVaultRoleScope
} from "./generated/index";

export { KeyVaultDataAction, KeyVaultRoleScope };

/**
 * The optional parameters accepted by the Key Vault's AccessControlClient
 */
export interface AccessControlClientOptions extends CommonClientOptions {
  /**
   * The accepted versions of the Key Vault's service API.
   */
  serviceVersion?: SUPPORTED_API_VERSIONS;
}

/** Known values of {@link DataAction} that the service accepts. */
export enum KnownKeyVaultDataAction {
  /** Read HSM key metadata. */
  ReadHsmKey = "Microsoft.KeyVault/managedHsm/keys/read/action",
  /** Update an HSM key. */
  WriteHsmKey = "Microsoft.KeyVault/managedHsm/keys/write/action",
  /** Read deleted HSM key. */
  ReadDeletedHsmKey = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action",
  /** Recover deleted HSM key. */
  RecoverDeletedHsmKey = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action",
  /** Backup HSM keys. */
  BackupHsmKeys = "Microsoft.KeyVault/managedHsm/keys/backup/action",
  /** Restore HSM keys. */
  RestoreHsmKeys = "Microsoft.KeyVault/managedHsm/keys/restore/action",
  /** Delete role assignment. */
  DeleteRoleAssignment = "Microsoft.KeyVault/managedHsm/roleAssignments/delete/action",
  /** Get role assignment. */
  GetRoleAssignment = "Microsoft.KeyVault/managedHsm/roleAssignments/read/action",
  /** Create or update role assignment. */
  WriteRoleAssignment = "Microsoft.KeyVault/managedHsm/roleAssignments/write/action",
  /** Get role definition. */
  ReadRoleDefinition = "Microsoft.KeyVault/managedHsm/roleDefinitions/read/action",
  /** Encrypt using an HSM key. */
  EncryptHsmKey = "Microsoft.KeyVault/managedHsm/keys/encrypt/action",
  /** Decrypt using an HSM key. */
  DecryptHsmKey = "Microsoft.KeyVault/managedHsm/keys/decrypt/action",
  /** Wrap using an HSM key. */
  WrapHsmKey = "Microsoft.KeyVault/managedHsm/keys/wrap/action",
  /** Unwrap using an HSM key. */
  UnwrapHsmKey = "Microsoft.KeyVault/managedHsm/keys/unwrap/action",
  /** Sign using an HSM key. */
  SignHsmKey = "Microsoft.KeyVault/managedHsm/keys/sign/action",
  /** Verify using an HSM key. */
  VerifyHsmKey = "Microsoft.KeyVault/managedHsm/keys/verify/action",
  /** Create an HSM key. */
  CreateHsmKey = "Microsoft.KeyVault/managedHsm/keys/create",
  /** Delete an HSM key. */
  DeleteHsmKey = "Microsoft.KeyVault/managedHsm/keys/delete",
  /** Export an HSM key. */
  ExportHsmKey = "Microsoft.KeyVault/managedHsm/keys/export/action",
  /** Import an HSM key. */
  ImportHsmKey = "Microsoft.KeyVault/managedHsm/keys/import/action",
  /** Purge a deleted HSM key. */
  PurgeDeletedHsmKey = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete",
  /** Download an HSM security domain. */
  DownloadHsmSecurityDomain = "Microsoft.KeyVault/managedHsm/securitydomain/download/action",
  /** Upload an HSM security domain. */
  UploadHsmSecurityDomain = "Microsoft.KeyVault/managedHsm/securitydomain/upload/action",
  /** Check the status of the HSM security domain exchange file. */
  ReadHsmSecurityDomainStatus = "Microsoft.KeyVault/managedHsm/securitydomain/upload/read",
  /** Download an HSM security domain transfer key. */
  ReadHsmSecurityDomainTransferKey = "Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read",
  /** Start an HSM backup. */
  StartHsmBackup = "Microsoft.KeyVault/managedHsm/backup/start/action",
  /** Start an HSM restore. */
  StartHsmRestore = "Microsoft.KeyVault/managedHsm/restore/start/action",
  /** Read an HSM backup status. */
  ReadHsmBackupStatus = "Microsoft.KeyVault/managedHsm/backup/status/action",
  /** Read an HSM restore status. */
  ReadHsmRestoreStatus = "Microsoft.KeyVault/managedHsm/restore/status/action"
}

/** Known values of {@link RoleScope} that the service accepts. */
export enum KnownKeyVaultRoleScope {
  /** Global scope */
  Global = "/",
  /** Keys scope */
  Keys = "/keys"
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

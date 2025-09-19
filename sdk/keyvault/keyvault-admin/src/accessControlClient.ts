// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />

import type {
  AccessControlClientOptions,
  CreateRoleAssignmentOptions,
  DeleteRoleAssignmentOptions,
  DeleteRoleDefinitionOptions,
  GetRoleAssignmentOptions,
  GetRoleDefinitionOptions,
  KeyVaultRoleAssignment,
  KeyVaultRoleDefinition,
  KeyVaultRoleScope,
  ListRoleAssignmentsOptions,
  ListRoleDefinitionsOptions,
  SetRoleDefinitionOptions,
} from "./accessControlModels.js";
import type { KeyVaultClient } from "./keyVaultClient.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { TokenCredential } from "@azure/core-auth";
import { mapPagedAsyncIterable, mappings } from "./mappings.js";
import { tracingClient } from "./tracing.js";
import { randomUUID } from "@azure/core-util";
import { createKeyVaultClient } from "./createKeyVaultClient.js";

/**
 * The KeyVaultAccessControlClient provides methods to manage
 * access control and role assignments in any given Azure Key Vault instance.
 * The client supports creating, retrieving and deleting roles.
 */
export class KeyVaultAccessControlClient {
  /**
   * The base URL to the vault
   */
  public readonly vaultUrl: string;

  /**
   * A reference to the auto-generated Key Vault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of the KeyVaultAccessControlClient.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleCreateAccessControlClient
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   * ```
   * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`. You should validate that this URL references a valid Key Vault or Managed HSM resource. See https://aka.ms/azsdk/blog/vault-uri for details.
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param options - Options used to configure Key Vault API requests. Omit this parameter to use the default configuration.
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: AccessControlClientOptions = {},
  ) {
    this.vaultUrl = vaultUrl;

    this.client = createKeyVaultClient(vaultUrl, credential, options);
  }

  /**
   * Creates a role assignment in an Azure Key Vault.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleCreateRoleAssignment
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   *
   * const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
   *
   * const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
   * const result = await client.createRoleAssignment(
   *   "/",
   *   "295c179b-9ad3-4117-99cd-b1aa66cf4517",
   *   roleDefinition.id,
   *   principalId,
   * );
   * ```
   * Creates a new role assignment.
   * @param roleScope - The scope of the role assignment.
   * @param name - The name of the role assignment. Must be a UUID.
   * @param roleDefinitionId - The role definition ID used in the role assignment.
   * @param principalId - The principal ID assigned to the role. This maps to the ID inside the Active Directory. It can point to a user, service principal, or security group.
   * @param options - The optional parameters.
   */
  public createRoleAssignment(
    roleScope: KeyVaultRoleScope,
    name: string,
    roleDefinitionId: string,
    principalId: string,
    options: CreateRoleAssignmentOptions = {},
  ): Promise<KeyVaultRoleAssignment> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.createRoleAssignment",
      options,
      async (updatedOptions) => {
        const response = await this.client.roleAssignments.create(
          roleScope,
          name,
          {
            properties: {
              roleDefinitionId,
              principalId,
            },
          },
          updatedOptions,
        );
        return mappings.roleAssignment.generatedToPublic(response);
      },
    );
  }

  /**
   * Deletes role assignments previously created in an Azure Key Vault.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleDeleteRoleAssignment
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   *
   * const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
   * const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
   *
   * const roleAssignment = await client.createRoleAssignment(
   *   "/",
   *   "295c179b-9ad3-4117-99cd-b1aa66cf4517",
   *   roleDefinition.id,
   *   principalId,
   * );
   *
   * await client.deleteRoleAssignment(roleAssignment.properties.scope, roleAssignment.name);
   * ```
   * Deletes an existing role assignment.
   * @param roleScope - The scope of the role assignment.
   * @param name - The name of the role assignment.
   * @param options - The optional parameters.
   */
  public deleteRoleAssignment(
    roleScope: KeyVaultRoleScope,
    name: string,
    options: DeleteRoleAssignmentOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.deleteRoleAssignment",
      options,
      async (updatedOptions) => {
        try {
          await this.client.roleAssignments.delete(roleScope, name, updatedOptions);
        } catch (err: any) {
          // If the role assignment doesn't exist, we can consider it deleted.
          if (err.statusCode !== 404) {
            throw err;
          }
        }
      },
    );
  }

  /**
   * Gets a role assignments previously created in an Azure Key Vault.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleGetRoleAssignment
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   *
   * const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
   * const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
   *
   * let roleAssignment = await client.createRoleAssignment(
   *   "/",
   *   "295c179b-9ad3-4117-99cd-b1aa66cf4517",
   *   roleDefinition.id,
   *   principalId,
   * );
   *
   * roleAssignment = await client.getRoleAssignment(
   *   roleAssignment.properties.scope,
   *   roleAssignment.name,
   * );
   * console.log(roleAssignment);
   * ```
   * Gets an existing role assignment.
   * @param roleScope - The scope of the role assignment.
   * @param name - The name of the role assignment.
   * @param options - The optional parameters.
   */
  public getRoleAssignment(
    roleScope: KeyVaultRoleScope,
    name: string,
    options: GetRoleAssignmentOptions = {},
  ): Promise<KeyVaultRoleAssignment> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.getRoleAssignment",
      options,
      async (updatedOptions) => {
        const response = await this.client.roleAssignments.get(roleScope, name, updatedOptions);
        return mappings.roleAssignment.generatedToPublic(response);
      },
    );
  }

  /**
   * Iterates over all of the available role assignments in an Azure Key Vault.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleListRoleAssignments
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   *
   * for await (const roleAssignment of client.listRoleAssignments("/")) {
   *   console.log("Role assignment: ", roleAssignment);
   * }
   * ```
   * Lists all of the role assignments in a given scope.
   * @param roleScope - The scope of the role assignments.
   * @param options - The optional parameters.
   */
  public listRoleAssignments(
    roleScope: KeyVaultRoleScope,
    options: ListRoleAssignmentsOptions = {},
  ): PagedAsyncIterableIterator<KeyVaultRoleAssignment> {
    return mapPagedAsyncIterable(
      options,
      (mappedOptions) => this.client.roleAssignments.listForScope(roleScope, mappedOptions),
      mappings.roleAssignment.generatedToPublic,
    );
  }

  /**
   * Iterates over all of the available role definitions in an Azure Key Vault.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleListRoleDefinitions
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   *
   * for await (const roleDefinitions of client.listRoleDefinitions("/")) {
   *   console.log("Role definition: ", roleDefinitions);
   * }
   * ```
   * Lists all of the role definition in a given scope.
   * @param roleScope - The scope of the role definition.
   * @param options - The optional parameters.
   */
  public listRoleDefinitions(
    roleScope: KeyVaultRoleScope,
    options: ListRoleDefinitionsOptions = {},
  ): PagedAsyncIterableIterator<KeyVaultRoleDefinition> {
    return mapPagedAsyncIterable(
      options,
      (mappedOptions) => this.client.roleDefinitions.list(roleScope, mappedOptions),
      mappings.roleDefinition.generatedToPublic,
    );
  }

  /**
   * Gets a role definition from Azure Key Vault.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleGetRoleDefinition
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   *
   * const roleDefinition = await client.getRoleDefinition("/", "b86a8fe4-44ce-4948-aee5-eccb2c155cd7");
   * console.log(roleDefinition);
   * ```
   * @param roleScope - The scope of the role definition.
   * @param name - The name of the role definition.
   * @param options - The optional parameters.
   */
  public getRoleDefinition(
    roleScope: KeyVaultRoleScope,
    name: string,
    options: GetRoleDefinitionOptions = {},
  ): Promise<KeyVaultRoleDefinition> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.getRoleDefinition",
      options,
      async (updatedOptions) => {
        const response = await this.client.roleDefinitions.get(roleScope, name, updatedOptions);
        return mappings.roleDefinition.generatedToPublic(response);
      },
    );
  }

  /**
   * Creates or updates a role definition in an Azure Key Vault.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleSetRoleDefinition
   * import { DefaultAzureCredential } from "@azure/identity";
   * import {
   *   KeyVaultAccessControlClient,
   *   KnownKeyVaultDataAction,
   *   KnownKeyVaultRoleScope,
   * } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   *
   * const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
   * const roleDefinitionName = "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a";
   * const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
   *   permissions,
   *   roleDefinitionName,
   * });
   * console.log(roleDefinition);
   * ```
   * @param roleScope - The scope of the role definition.
   * @param options - The optional parameters.
   */
  public setRoleDefinition(
    roleScope: KeyVaultRoleScope,
    options: SetRoleDefinitionOptions = {},
  ): Promise<KeyVaultRoleDefinition> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.setRoleDefinition",
      options,
      async (updatedOptions) => {
        const response = await this.client.roleDefinitions.createOrUpdate(
          roleScope,
          options.roleDefinitionName || randomUUID(),
          {
            properties: {
              description: options.description,
              permissions: options.permissions,
              assignableScopes: [roleScope],
              roleName: options.roleName,
              roleType: "CustomRole",
            },
          },
          updatedOptions,
        );
        return mappings.roleDefinition.generatedToPublic(response);
      },
    );
  }

  /**
   * Deletes a custom role definition previously created in an Azure Key Vault.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleDeleteRoleDefinition
   * import { DefaultAzureCredential } from "@azure/identity";
   * import {
   *   KeyVaultAccessControlClient,
   *   KnownKeyVaultDataAction,
   *   KnownKeyVaultRoleScope,
   * } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   *
   * const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
   * const roleDefinitionName = "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a";
   * const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
   *   permissions,
   *   roleDefinitionName,
   * });
   *
   * await client.deleteRoleDefinition("/", roleDefinition.name);
   * ```
   * @param roleScope - The scope of the role definition.
   * @param name - The name of the role definition to delete.
   * @param options - The optional parameters.
   */
  public deleteRoleDefinition(
    roleScope: KeyVaultRoleScope,
    name: string,
    options: DeleteRoleDefinitionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.deleteRoleDefinition",
      options,
      async (updatedOptions) => {
        try {
          await this.client.roleDefinitions.delete(roleScope, name, updatedOptions);
        } catch (err: any) {
          // If the role definition doesn't exist, we can consider it deleted.
          if (err.statusCode !== 404) {
            throw err;
          }
        }
      },
    );
  }
}

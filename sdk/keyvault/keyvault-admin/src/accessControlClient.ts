// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
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
  ListRoleAssignmentsPageSettings,
  ListRoleDefinitionsOptions,
  ListRoleDefinitionsPageSettings,
  SetRoleDefinitionOptions,
} from "./accessControlModels";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { LATEST_API_VERSION } from "./constants";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RoleAssignmentsListForScopeOptionalParams } from "./generated/models";
import { TokenCredential } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { createChallengeCallbacks } from "./challengeAuthenticationCallbacks";
import { logger } from "./log";
import { mappings } from "./mappings";
import { tracingClient } from "./tracing";
import { v4 as v4uuid } from "uuid";

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
   * ```ts
   * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new KeyVaultAccessControlClient(vaultUrl, credentials);
   * ```
   * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param pipelineOptions - Pipeline options used to configure Key Vault API requests. Omit this parameter to use the default pipeline configuration.
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    options: AccessControlClientOptions = {}
  ) {
    this.vaultUrl = vaultUrl;

    const serviceVersion = options.serviceVersion || LATEST_API_VERSION;

    const clientOptions = {
      ...options,
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version",
        ],
      },
    };

    this.client = new KeyVaultClient(serviceVersion, clientOptions);

    this.client.pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential,
        // The scopes will be populated in the challenge callbacks based on the WWW-authenticate header
        // returned by the challenge, so pass an empty array as a placeholder.
        scopes: [],
        challengeCallbacks: createChallengeCallbacks(),
      })
    );
  }

  /**
   * Creates a role assignment in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultAccessControlClient(url, credentials);
   * const roleDefinition = await client.listRoleDefinitions("/").next();
   * const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
   * const result = await client.createRoleAssignment("/", "295c179b-9ad3-4117-99cd-b1aa66cf4517", roleDefinition, principalId);
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
    options: CreateRoleAssignmentOptions = {}
  ): Promise<KeyVaultRoleAssignment> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.createRoleAssignment",
      options,
      async (updatedOptions) => {
        const response = await this.client.roleAssignments.create(
          this.vaultUrl,
          roleScope,
          name,
          {
            properties: {
              roleDefinitionId,
              principalId,
            },
          },
          updatedOptions
        );
        return mappings.roleAssignment.generatedToPublic(response);
      }
    );
  }

  /**
   * Deletes role assignments previously created in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultAccessControlClient(url, credentials);
   * const roleAssignment = await client.createRoleAssignment("/", "295c179b-9ad3-4117-99cd-b1aa66cf4517");
   * await client.deleteRoleAssignment(roleAssignment.properties.roleScope, roleAssignment.name);
   * ```
   * Deletes an existing role assignment.
   * @param roleScope - The scope of the role assignment.
   * @param name - The name of the role assignment.
   * @param options - The optional parameters.
   */
  public deleteRoleAssignment(
    roleScope: KeyVaultRoleScope,
    name: string,
    options: DeleteRoleAssignmentOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.deleteRoleAssignment",
      options,
      async (updatedOptions) => {
        await this.client.roleAssignments.delete(this.vaultUrl, roleScope, name, updatedOptions);
      }
    );
  }

  /**
   * Gets a role assignments previously created in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultAccessControlClient(url, credentials);
   * let roleAssignment = await client.createRoleAssignment("/", "295c179b-9ad3-4117-99cd-b1aa66cf4517");
   * roleAssignment = const await client.getRoleAssignment(roleAssignment.properties.roleScope, roleAssignment.name);
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
    options: GetRoleAssignmentOptions = {}
  ): Promise<KeyVaultRoleAssignment> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.getRoleAssignment",
      options,
      async (updatedOptions) => {
        const response = await this.client.roleAssignments.get(
          this.vaultUrl,
          roleScope,
          name,
          updatedOptions
        );
        return mappings.roleAssignment.generatedToPublic(response);
      }
    );
  }

  /**
   * Deals with the pagination of {@link listRoleAssignments}.
   * @param roleScope - The scope of the role assignments.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listRoleAssignmentsPage(
    roleScope: KeyVaultRoleScope,
    continuationState: ListRoleAssignmentsPageSettings,
    options?: ListRoleAssignmentsOptions
  ): AsyncIterableIterator<KeyVaultRoleAssignment[]> {
    if (!continuationState.continuationToken) {
      const optionsComplete: RoleAssignmentsListForScopeOptionalParams = options || {};
      const currentSetResponse = await tracingClient.withSpan(
        "KeyVaultAccessControlClient.listRoleAssignmentsPage",
        optionsComplete,
        async (updatedOptions) => {
          return this.client.roleAssignments.listForScope(this.vaultUrl, roleScope, updatedOptions);
        }
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mappings.roleAssignment.generatedToPublic, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await tracingClient.withSpan(
        "KeyVaultAccessControlClient.listRoleAssignmentsPage",
        options || {},
        async (updatedOptions) => {
          return this.client.roleAssignments.listForScopeNext(
            this.vaultUrl,
            roleScope,
            continuationState.continuationToken!,
            updatedOptions
          );
        }
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mappings.roleAssignment.generatedToPublic, this);
      } else {
        break;
      }
    }
  }

  /**
   * Deals with the iteration of all the available results of {@link listRoleAssignments}.
   * @param roleScope - The scope of the role assignments.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listRoleAssignmentsAll(
    roleScope: KeyVaultRoleScope,
    options?: ListRoleAssignmentsOptions
  ): AsyncIterableIterator<KeyVaultRoleAssignment> {
    for await (const page of this.listRoleAssignmentsPage(roleScope, {}, options)) {
      yield* page;
    }
  }

  /**
   * Iterates over all of the available role assignments in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * let client = new KeyVaultAccessControlClient(url, credentials);
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
    options: ListRoleAssignmentsOptions = {}
  ): PagedAsyncIterableIterator<KeyVaultRoleAssignment> {
    const iter = this.listRoleAssignmentsAll(roleScope, options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: ListRoleAssignmentsPageSettings = {}) =>
        this.listRoleAssignmentsPage(roleScope, settings, options),
    };
  }

  /**
   * Deals with the pagination of {@link listRoleDefinitions}.
   * @param roleScope - The scope of the role definition.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listRoleDefinitionsPage(
    roleScope: KeyVaultRoleScope,
    continuationState: ListRoleDefinitionsPageSettings,
    options: ListRoleDefinitionsOptions = {}
  ): AsyncIterableIterator<KeyVaultRoleDefinition[]> {
    if (!continuationState.continuationToken) {
      const optionsComplete: RoleAssignmentsListForScopeOptionalParams = options || {};
      const currentSetResponse = await tracingClient.withSpan(
        "KeyVaultAccessControlClient.listRoleDefinitionsPage",
        optionsComplete,
        (updatedOptions) =>
          this.client.roleDefinitions.list(this.vaultUrl, roleScope, updatedOptions)
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mappings.roleDefinition.generatedToPublic, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await tracingClient.withSpan(
        "KeyVaultAccessControlClient.listRoleDefinitionsPage",
        options,
        (updatedOptions) =>
          this.client.roleDefinitions.listNext(
            this.vaultUrl,
            roleScope,
            continuationState.continuationToken!,
            updatedOptions
          )
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mappings.roleDefinition.generatedToPublic, this);
      } else {
        break;
      }
    }
  }

  /**
   * Deals with the iteration of all the available results of {@link listRoleDefinitions}.
   * @param roleScope - The scope of the role definition.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listRoleDefinitionsAll(
    roleScope: KeyVaultRoleScope,
    options?: ListRoleDefinitionsOptions
  ): AsyncIterableIterator<KeyVaultRoleDefinition> {
    for await (const page of this.listRoleDefinitionsPage(roleScope, {}, options)) {
      yield* page;
    }
  }

  /**
   * Iterates over all of the available role definitions in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * let client = new KeyVaultAccessControlClient(url, credentials);
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
    options: ListRoleDefinitionsOptions = {}
  ): PagedAsyncIterableIterator<KeyVaultRoleDefinition> {
    const iter = this.listRoleDefinitionsAll(roleScope, options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: ListRoleDefinitionsPageSettings = {}) =>
        this.listRoleDefinitionsPage(roleScope, settings, options),
    };
  }

  /**
   * Gets a role definition from Azure Key Vault.
   *
   * Example usage:
   * ```
   * const client = new KeyVaultAccessControlClient(url, credentials);
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
    options: GetRoleDefinitionOptions = {}
  ): Promise<KeyVaultRoleDefinition> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.getRoleDefinition",
      options,
      async (updatedOptions) => {
        const response = await this.client.roleDefinitions.get(
          this.vaultUrl,
          roleScope,
          name,
          updatedOptions
        );
        return mappings.roleDefinition.generatedToPublic(response);
      }
    );
  }

  /**
   * Creates or updates a role definition in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultAccessControlClient(url, credentials);
   * const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
   * const roleDefinitionName = "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a";
   * const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, { permissions, roleDefinitionName });
   * console.log(roleDefinition);
   * ```
   * @param roleScope - The scope of the role definition.
   * @param options - The optional parameters.
   */
  public setRoleDefinition(
    roleScope: KeyVaultRoleScope,
    options: SetRoleDefinitionOptions = {}
  ): Promise<KeyVaultRoleDefinition> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.setRoleDefinition",
      options,
      async (updatedOptions) => {
        const response = await this.client.roleDefinitions.createOrUpdate(
          this.vaultUrl,
          roleScope,
          options.roleDefinitionName || v4uuid(),
          {
            properties: {
              description: options.description,
              permissions: options.permissions,
              assignableScopes: [roleScope],
              roleName: options.roleName,
              roleType: "CustomRole",
            },
          },
          updatedOptions
        );
        return mappings.roleDefinition.generatedToPublic(response);
      }
    );
  }

  /**
   * Deletes a custom role definition previously created in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultAccessControlClient(url, credentials);
   * const roleDefinition = await client.setRoleDefinition("/", "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a", []);
   * await client.deleteRoleDefinition("/", roleDefinition.name);
   * ```
   * @param roleScope - The scope of the role definition.
   * @param name - The name of the role definition to delete.
   * @param options - The optional parameters.
   */
  public deleteRoleDefinition(
    roleScope: KeyVaultRoleScope,
    name: string,
    options: DeleteRoleDefinitionOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "KeyVaultAccessControlClient.deleteRoleDefinition",
      options,
      async (updatedOptions) => {
        await this.client.roleDefinitions.delete(this.vaultUrl, roleScope, name, updatedOptions);
      }
    );
  }
}

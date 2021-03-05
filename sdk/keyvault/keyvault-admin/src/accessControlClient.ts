// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  isTokenCredential,
  signingPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions
} from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";
import { KeyVaultClient } from "./generated/keyVaultClient";
import {
  KeyVaultClientOptionalParams,
  RoleAssignmentsCreateResponse,
  RoleAssignmentsDeleteResponse,
  RoleAssignmentsListForScopeOptionalParams,
  RoleDefinitionsCreateOrUpdateResponse,
  RoleDefinitionsDeleteResponse,
  RoleDefinitionsGetResponse
} from "./generated/models";

import {
  CreateRoleAssignmentOptions,
  KeyVaultRoleAssignment,
  AccessControlClientOptions,
  KeyVaultRoleScope,
  DeleteRoleAssignmentOptions,
  ListRoleAssignmentsOptions,
  ListRoleDefinitionsOptions,
  KeyVaultRoleDefinition,
  GetRoleAssignmentOptions,
  ListRoleDefinitionsPageSettings,
  ListRoleAssignmentsPageSettings,
  KeyVaultPermission,
  GetRoleDefinitionOptions,
  UpsertRoleDefinitionOptions,
  DeleteRoleDefinitionOptions
} from "./accessControlModels";

import { SDK_VERSION, LATEST_API_VERSION } from "./constants";
import { createSpan } from "./tracing";
import { mappings } from "./mappings";
import { logger } from "./log";

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
   * @internal
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

    const libInfo = `azsdk-js-keyvault-admin/${SDK_VERSION}`;

    const userAgentOptions = options.userAgentOptions;

    options.userAgentOptions = {
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = isTokenCredential(credential)
      ? challengeBasedAuthenticationPolicy(credential)
      : signingPolicy(credential);

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      loggingOptions: {
        logger: logger.info,
        allowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version"
        ]
      }
    };

    const params: KeyVaultClientOptionalParams = createPipelineFromOptions(
      internalPipelineOptions,
      authPolicy
    );
    params.apiVersion = options.serviceVersion || LATEST_API_VERSION;
    this.client = new KeyVaultClient(params);
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
  public async createRoleAssignment(
    roleScope: KeyVaultRoleScope,
    name: string,
    roleDefinitionId: string,
    principalId: string,
    options?: CreateRoleAssignmentOptions
  ): Promise<KeyVaultRoleAssignment> {
    const { span, updatedOptions } = createSpan("createRoleAssignment", options);

    if (!(roleScope && name && roleDefinitionId && principalId)) {
      throw new Error(
        "createRoleAssignment requires non-empty strings for the parameters: roleScope, name, roleDefinitionId and principalId."
      );
    }

    let response: RoleAssignmentsCreateResponse;
    try {
      response = await this.client.roleAssignments.create(
        this.vaultUrl,
        roleScope,
        name,
        {
          properties: {
            roleDefinitionId,
            principalId
          }
        },
        updatedOptions
      );
    } finally {
      span.end();
    }

    return mappings.roleAssignment.generatedToPublic(response);
  }

  /**
   * Deletes role assignments previously created in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultAccessControlClient(url, credentials);
   * const roleAssignment = await client.createRoleAssignment("/", "295c179b-9ad3-4117-99cd-b1aa66cf4517");
   * const deletedRoleAssignment = await client.deleteRoleAssignment(roleAssignment.properties.roleScope, roleAssignment.name);
   * console.log(deletedRoleAssignment);
   * ```
   * Deletes an existing role assignment.
   * @param roleScope - The scope of the role assignment.
   * @param name - The name of the role assignment.
   * @param options - The optional parameters.
   */
  public async deleteRoleAssignment(
    roleScope: KeyVaultRoleScope,
    name: string,
    options?: DeleteRoleAssignmentOptions
  ): Promise<KeyVaultRoleAssignment> {
    const { span, updatedOptions } = createSpan("deleteRoleAssignment", options);

    let response: RoleAssignmentsDeleteResponse;
    try {
      response = await this.client.roleAssignments.delete(
        this.vaultUrl,
        roleScope,
        name,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return mappings.roleAssignment.generatedToPublic(response);
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
  public async getRoleAssignment(
    roleScope: KeyVaultRoleScope,
    name: string,
    options?: GetRoleAssignmentOptions
  ): Promise<KeyVaultRoleAssignment> {
    const { span, updatedOptions } = createSpan("getRoleAssignment", options);

    let response: RoleAssignmentsDeleteResponse;
    try {
      response = await this.client.roleAssignments.get(
        this.vaultUrl,
        roleScope,
        name,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return mappings.roleAssignment.generatedToPublic(response);
  }

  /**
   * @internal
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
      const currentSetResponse = await this.client.roleAssignments.listForScope(
        this.vaultUrl,
        roleScope,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mappings.roleAssignment.generatedToPublic, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.roleAssignments.listForScopeNext(
        this.vaultUrl,
        roleScope,
        continuationState.continuationToken,
        options
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
   * @internal
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
    const { span, updatedOptions } = createSpan("listRoleAssignments", options);

    const iter = this.listRoleAssignmentsAll(roleScope, updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: ListRoleAssignmentsPageSettings = {}) =>
        this.listRoleAssignmentsPage(roleScope, settings, updatedOptions)
    };
  }

  /**
   * @internal
   * Deals with the pagination of {@link listRoleDefinitions}.
   * @param roleScope - The scope of the role definition.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listRoleDefinitionsPage(
    roleScope: KeyVaultRoleScope,
    continuationState: ListRoleDefinitionsPageSettings,
    options?: ListRoleDefinitionsOptions
  ): AsyncIterableIterator<KeyVaultRoleDefinition[]> {
    if (!continuationState.continuationToken) {
      const optionsComplete: RoleAssignmentsListForScopeOptionalParams = options || {};
      const currentSetResponse = await this.client.roleDefinitions.list(
        this.vaultUrl,
        roleScope,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mappings.roleDefinition.generatedToPublic, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.roleDefinitions.listNext(
        this.vaultUrl,
        roleScope,
        continuationState.continuationToken,
        options
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
   * @internal
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
    const { span, updatedOptions } = createSpan("listRoleDefinitions", options);

    const iter = this.listRoleDefinitionsAll(roleScope, updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: ListRoleDefinitionsPageSettings = {}) =>
        this.listRoleDefinitionsPage(roleScope, settings, updatedOptions)
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
  public async getRoleDefinition(
    roleScope: KeyVaultRoleScope,
    name: string,
    options: GetRoleDefinitionOptions = {}
  ): Promise<KeyVaultRoleDefinition> {
    const { span, updatedOptions } = createSpan("getRoleDefinition", options);

    let response: RoleDefinitionsGetResponse;
    try {
      response = await this.client.roleDefinitions.get(
        this.vaultUrl,
        roleScope,
        name,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return mappings.roleDefinition.generatedToPublic(response);
  }

  /**
   * Upserts a role definition in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultAccessControlClient(url, credentials);
   * const permissions = [{ dataActions: "Microsoft.KeyVault/managedHsm/backup/start/action" }];
   * const roleDefinition = await client.upsertRoleDefintion("/", "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a", permissions);
   * console.log(roleDefinition);
   * ```
   * @param roleScope - The scope of the role definition.
   * @param name - The name of the role definition. Must be a UUID.
   * @param permissions - The set of {@link KeyVaultPermission} for this role definition.
   * @param description - The role definition description.
   * @param options - The optional parameters.
   */
  public async upsertRoleDefinition(
    roleScope: KeyVaultRoleScope,
    name: string,
    permissions: KeyVaultPermission[],
    description?: string,
    options: UpsertRoleDefinitionOptions = {}
  ): Promise<KeyVaultRoleDefinition> {
    const { span, updatedOptions } = createSpan("upsertRoleDefinition", options);

    let response: RoleDefinitionsCreateOrUpdateResponse;
    try {
      response = await this.client.roleDefinitions.createOrUpdate(
        this.vaultUrl,
        roleScope,
        name,
        {
          properties: {
            description,
            permissions,
            assignableScopes: [roleScope],
            roleName: name,
            roleType: "CustomRole"
          }
        },
        updatedOptions
      );
    } finally {
      span.end();
    }

    return mappings.roleDefinition.generatedToPublic(response);
  }

  /**
   * Deletes a custom role definition previously created in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultAccessControlClient(url, credentials);
   * const roleDefinition = await client.upsertRoleDefintion("/", "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a", []);
   * const deletedRoleDefinition = await client.deleteRoleDefinition("/", roleDefinition.name);
   * console.log(deletedRoleDefinition);
   * ```
   * @param roleScope - The scope of the role definition.
   * @param name - The name of the role definition to delete.
   * @param options - The optional parameters.
   */
  public async deleteRoleDefinition(
    roleScope: KeyVaultRoleScope,
    name: string,
    options: DeleteRoleDefinitionOptions = {}
  ): Promise<KeyVaultRoleDefinition> {
    const { span, updatedOptions } = createSpan("deleteRoleDefinition", options);

    let response: RoleDefinitionsDeleteResponse;
    try {
      response = await this.client.roleDefinitions.delete(
        this.vaultUrl,
        roleScope,
        name,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return mappings.roleDefinition.generatedToPublic(response);
  }
}

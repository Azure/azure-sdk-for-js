// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  operationOptionsToRequestOptionsBase,
  TokenCredential,
  isTokenCredential,
  signingPolicy,
  createPipelineFromOptions
} from "@azure/core-http";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";
import {
  RoleAssignmentsCreateResponse,
  RoleAssignmentsDeleteResponse,
  RoleAssignmentsListForScopeOptionalParams
} from "./generated/models";

import {
  CreateRoleAssignmentOptions,
  KeyVaultRoleAssignment,
  AccessControlClientOptions,
  RoleAssignmentScope,
  DeleteRoleAssignmentOptions,
  ListRoleAssignmentsOptions,
  ListRoleDefinitionsOptions,
  KeyVaultRoleDefinition
} from "./accessControlModels";
import { SDK_VERSION, LATEST_API_VERSION } from "./constants";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { createSpan, setParentSpan } from "./tracing";
import { mappings } from "./mappings";
import { logger } from "./log";

export class AccessControlClient {
  /**
   * The base URL to the vault
   */
  public readonly vaultUrl: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated KeyVault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of KeyClient.
   *
   * Example usage:
   * ```ts
   * import { AccessControlClient } from "@azure/keyvault-admin";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let vaultUrl = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new AccessControlClient(vaultUrl, credentials);
   * ```
   * @param {string} vaultUrl the URL of the Key Vault. It should have this shape: https://${your-key-vault-name}.vault.azure.net
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {AccessControlClientOptions} [pipelineOptions] Pipeline options used to configure Key Vault API requests. Omit this parameter to use the default pipeline configuration.
   * @memberof AccessControlClient
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    pipelineOptions: AccessControlClientOptions = {}
  ) {
    this.vaultUrl = vaultUrl;

    const libInfo = `azsdk-js-keyvault-admin/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
      ...pipelineOptions.userAgentOptions,
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = isTokenCredential(credential)
      ? challengeBasedAuthenticationPolicy(credential)
      : signingPolicy(credential);

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          logPolicyOptions: {
            allowedHeaderNames: [
              "x-ms-keyvault-region",
              "x-ms-keyvault-network-info",
              "x-ms-keyvault-service-version"
            ]
          }
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new KeyVaultClient({
      apiVersion: pipelineOptions.serviceVersion || LATEST_API_VERSION,
      ...pipeline
    });
  }

  /**
   * Creates a role assignment in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * const client = new AccessControlClient(url, credentials);
   * const result = await client.createRoleAssignment("/", "295c179b-9ad3-4117-99cd-b1aa66cf4517");
   * ```
   * @summary Creates a new role assignment.
   * @param {RoleAssignmentScope} scope The scope of the role assignment.
   * @param {string} name The name of the role assignment. Must be a UUID.
   * @param {CreateRoleAssignmentOptions} [options] The optional parameters.
   */
  public async createRoleAssignment(
    scope: RoleAssignmentScope,
    name: string,
    options?: CreateRoleAssignmentOptions
  ): Promise<KeyVaultRoleAssignment> {
    const requestOptions = operationOptionsToRequestOptionsBase(options || {});
    const { roleDefinitionId, principalId, ...remainingOptions } = requestOptions;
    const span = createSpan("createRoleAssignment", remainingOptions);

    let response: RoleAssignmentsCreateResponse;
    try {
      response = await this.client.roleAssignments.create(
        this.vaultUrl,
        scope,
        name,
        {
          properties: {
            roleDefinitionId,
            principalId
          }
        },
        setParentSpan(span, remainingOptions)
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
   * const client = new AccessControlClient(url, credentials);
   * const roleAssignment = await client.createRoleAssignment("/", "295c179b-9ad3-4117-99cd-b1aa66cf4517");
   * const deletedRoleAssignment = const await client.deleteRoleAssignment(roleAssignment.properties.scope, roleAssignment.name);
   * console.log(deletedRoleAssignment);
   * ```
   * @summary Deletes an existing role assignment.
   * @param {string} scope The scope of the role assignment.
   * @param {string} name The name of the role assignment.
   * @param {DeleteRoleAssignmentOptions} [options] The optional parameters.
   */
  public async deleteRoleAssignment(
    scope: RoleAssignmentScope,
    name: string,
    options?: DeleteRoleAssignmentOptions
  ): Promise<KeyVaultRoleAssignment> {
    const requestOptions = operationOptionsToRequestOptionsBase(options || {});
    const span = createSpan("deleteRoleAssignment", requestOptions);

    let response: RoleAssignmentsDeleteResponse;
    try {
      response = await this.client.roleAssignments.delete(
        this.vaultUrl,
        scope,
        name,
        setParentSpan(span, requestOptions)
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
   * const client = new AccessControlClient(url, credentials);
   * let roleAssignment = await client.createRoleAssignment("/", "295c179b-9ad3-4117-99cd-b1aa66cf4517");
   * roleAssignment = const await client.getRoleAssignment(roleAssignment.properties.scope, roleAssignment.name);
   * console.log(roleAssignment);
   * ```
   * @summary Gets an existing role assignment.
   * @param {string} scope The scope of the role assignment.
   * @param {string} name The name of the role assignment.
   * @param {DeleteRoleAssignmentOptions} [options] The optional parameters.
   */
  public async getRoleAssignment(
    scope: RoleAssignmentScope,
    name: string,
    options?: DeleteRoleAssignmentOptions
  ): Promise<KeyVaultRoleAssignment> {
    const requestOptions = operationOptionsToRequestOptionsBase(options || {});
    const span = createSpan("deleteRoleAssignment", requestOptions);

    let response: RoleAssignmentsDeleteResponse;
    try {
      response = await this.client.roleAssignments.get(
        this.vaultUrl,
        scope,
        name,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return mappings.roleAssignment.generatedToPublic(response);
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listRoleAssignments}.
   * @param {string} scope The scope of the role assignments.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListRoleAssignmentsOptions} [options] Common options for the iterative endpoints.
   */
  private async *listRoleAssignmentsPage(
    scope: RoleAssignmentScope,
    continuationState: PageSettings,
    options?: ListRoleAssignmentsOptions
  ): AsyncIterableIterator<KeyVaultRoleAssignment[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: RoleAssignmentsListForScopeOptionalParams = {
        // Not supported!
        // maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.roleAssignments.listForScope(
        this.vaultUrl,
        scope,
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
        scope,
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
   * @ignore
   * Deals with the iteration of all the available results of {@link listRoleAssignments}.
   * @param {string} scope The scope of the role assignments.
   * @param {ListRoleAssignmentsOptions} [options] Common options for the iterative endpoints.
   */
  private async *listRoleAssignmentsAll(
    scope: RoleAssignmentScope,
    options?: ListRoleAssignmentsOptions
  ): AsyncIterableIterator<KeyVaultRoleAssignment> {
    const f = {};

    for await (const page of this.listRoleAssignmentsPage(scope, f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates over all of the available role assignments in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * let client = new AccessControlClient(url, credentials);
   * for await (const roleAssignment of client.listRoleAssignments("/")) {
   *   console.log("Role assignment: ", roleAssignment);
   * }
   * ```
   * @summary Lists all of the role assignments in a given scope.
   * @param {string} scope The scope of the role assignments.
   * @param {ListPropertiesOfKeysOptions} [options] The optional parameters.
   */
  public listRoleAssignments(
    scope: RoleAssignmentScope,
    options: ListRoleAssignmentsOptions = {}
  ): PagedAsyncIterableIterator<KeyVaultRoleAssignment> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("listRoleAssignments", requestOptions);
    const updatedOptions: ListRoleAssignmentsOptions = {
      ...requestOptions,
      ...setParentSpan(span, requestOptions)
    };

    const iter = this.listRoleAssignmentsAll(scope, updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listRoleAssignmentsPage(scope, settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listRoleDefinitions}.
   * @param {string} scope The scope of the role definition.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListRoleAssignmentsOptions} [options] Common options for the iterative endpoints.
   */
  private async *listRoleDefinitionsPage(
    scope: RoleAssignmentScope,
    continuationState: PageSettings,
    options?: ListRoleDefinitionsOptions
  ): AsyncIterableIterator<KeyVaultRoleDefinition[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: RoleAssignmentsListForScopeOptionalParams = {
        // Not supported!
        // maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.roleDefinitions.list(
        this.vaultUrl,
        scope,
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
        scope,
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
   * @ignore
   * Deals with the iteration of all the available results of {@link listRoleDefinitions}.
   * @param {string} scope The scope of the role definition.
   * @param {ListRoleDefinitionsOptions} [options] Common options for the iterative endpoints.
   */
  private async *listRoleDefinitionsAll(
    scope: RoleAssignmentScope,
    options?: ListRoleDefinitionsOptions
  ): AsyncIterableIterator<KeyVaultRoleDefinition> {
    const f = {};

    for await (const page of this.listRoleDefinitionsPage(scope, f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates over all of the available role definitions in an Azure Key Vault.
   *
   * Example usage:
   * ```ts
   * let client = new AccessControlClient(url, credentials);
   * for await (const roleDefinitions of client.listRoleDefinitions("/")) {
   *   console.log("Role definition: ", roleDefinitions);
   * }
   * ```
   * @summary Lists all of the role definition in a given scope.
   * @param {string} scope The scope of the role definition.
   * @param {ListRoleDefinitionsOptions} [options] The optional parameters.
   */
  public listRoleDefinitions(
    scope: RoleAssignmentScope,
    options: ListRoleDefinitionsOptions = {}
  ): PagedAsyncIterableIterator<KeyVaultRoleDefinition> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("listRoleDefinitions", requestOptions);
    const updatedOptions: ListRoleDefinitionsOptions = {
      ...requestOptions,
      ...setParentSpan(span, requestOptions)
    };

    const iter = this.listRoleDefinitionsAll(scope, updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listRoleDefinitionsPage(scope, settings, updatedOptions)
    };
  }
}

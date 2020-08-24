// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CreateRoleAssignmentOptions, KeyVaultRoleAssignment, AccessControlClientOptions, RoleAssignmentScope, DeleteRoleAssignmentOptions } from "./accessControlModels";
import { operationOptionsToRequestOptionsBase, TokenCredential, isTokenCredential, signingPolicy, createPipelineFromOptions } from '@azure/core-http';
import { SDK_VERSION, LATEST_API_VERSION } from './constants';
import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";
import { logger } from "./log";
import { KeyVaultClient } from './generated/keyVaultClient';
import { createSpan, setParentSpan } from './tracing';
import { RoleAssignmentsCreateResponse, RoleAssignmentsDeleteResponse } from './generated/models';
import { mappings } from './mappings';

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

  public async listRoleAssignments(): PagedAsyncIterableIterator<KeyVaultRoleAssignment> {}
  public async listRoleDefinitions(): PagedAsyncIterableIterator<KeyVaultRoleAssignment> {}
}

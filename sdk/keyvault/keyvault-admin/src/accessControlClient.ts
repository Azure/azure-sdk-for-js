// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CreateRoleAssignmentOptions, KeyVaultRoleAssignment, AccessControlClientOptions } from "./accessControlModels";
import { operationOptionsToRequestOptionsBase, TokenCredential, isTokenCredential, signingPolicy, createPipelineFromOptions } from '@azure/core-http';
import { SDK_VERSION, LATEST_API_VERSION } from './constants';
import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";
import { logger } from "./log";
import { KeyVaultClient } from './generated/keyVaultClient';
import { createSpan, setParentSpan } from './tracing';
import { RoleAssignmentsCreateResponse } from './generated/models';
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

  public async createRoleAssignment(
    scope: string,
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

  public async deleteRoleAssignment(): Promise<KeyVaultRoleAssignment> {}
  public async getRoleAssignment(): Promise<KeyVaultRoleAssignment> {}
  public async listRoleAssignments(): PagedAsyncIterableIterator<KeyVaultRoleAssignment> {}
  public async listRoleDefinitions(): PagedAsyncIterableIterator<KeyVaultRoleAssignment> {}
}

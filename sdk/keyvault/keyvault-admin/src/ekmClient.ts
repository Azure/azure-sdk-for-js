// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { KeyVaultClient } from "./keyVaultClient.js";
import type {
  EkmConnection,
  EkmProxyClientCertificateInfo,
  EkmProxyInfo,
} from "./models/models.js";
import type {
  CheckEkmConnectionOptions,
  CreateEkmConnectionOptions,
  CreateEkmPrivateEndpointOptions,
  DeleteEkmConnectionOptions,
  DeleteEkmPrivateEndpointOptions,
  EkmClientOptions,
  GetEkmCertificateOptions,
  GetEkmConnectionOptions,
  GetEkmPrivateEndpointOptions,
  GetEkmPrivateEndpointOperationStatusOptions,
  ListEkmPrivateEndpointsOptions,
  UpdateEkmConnectionOptions,
} from "./ekmClientModels.js";
import type {
  EkmPrivateEndpoint,
  EkmPrivateEndpointCreateParameters,
  EkmPrivateEndpointListResult,
  EkmPrivateEndpointOperation,
} from "./ekmClientModels.js";
import type { PollerLike, OperationState } from "@azure/core-lro";
import { createKeyVaultClient } from "./createKeyVaultClient.js";
import { restorePoller } from "./restorePollerHelpers.js";

/**
 * The KeyVaultEkmClient provides asynchronous methods to manage EKM connections and private endpoints
 * for an Azure Key Vault Managed HSM.
 */
export class KeyVaultEkmClient {
  /**
   * The base URL to the vault.
   */
  public readonly vaultUrl: string;

  /**
   * A reference to the auto-generated Key Vault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of the KeyVaultEkmClient.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleCreateEkmClient
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { KeyVaultEkmClient } from "@azure/keyvault-admin";
   *
   * const vaultUrl = `https://<MY KEY VAULT HERE>.managedhsm.azure.net`;
   * const credentials = new DefaultAzureCredential();
   * const client = new KeyVaultEkmClient(vaultUrl, credentials);
   * ```
   * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.managedhsm.azure.net`. You should validate that this URL references a valid Key Vault or Managed HSM resource. See https://aka.ms/azsdk/blog/vault-uri for details.
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param options - options used to configure Key Vault API requests.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(vaultUrl: string, credential: TokenCredential, options: EkmClientOptions = {}) {
    this.vaultUrl = vaultUrl;

    this.client = createKeyVaultClient(vaultUrl, credential, options);
  }

  /**
   * Sets up the EKM connection. If the EKM connection already exists, this operation fails.
   * This operation requires the ekm/write permission.
   *
   * @param ekmConnection - the EKM connection to create.
   * @param options - the optional parameters.
   */
  createEkmConnection(
    ekmConnection: EkmConnection,
    options: CreateEkmConnectionOptions = {},
  ): Promise<EkmConnection> {
    return this.client.createEkmConnection(ekmConnection, options);
  }

  /**
   * Returns the EKM connection. This operation requires the ekm/read permission.
   *
   * @param options - the optional parameters.
   */
  getEkmConnection(options: GetEkmConnectionOptions = {}): Promise<EkmConnection> {
    return this.client.getEkmConnection(options);
  }

  /**
   * Updates the existing EKM connection. If the EKM connection does not exist, this operation fails.
   * This operation requires the ekm/write permission.
   *
   * @param ekmConnection - the updated EKM connection.
   * @param options - the optional parameters.
   */
  updateEkmConnection(
    ekmConnection: EkmConnection,
    options: UpdateEkmConnectionOptions = {},
  ): Promise<EkmConnection> {
    return this.client.updateEkmConnection(ekmConnection, options);
  }

  /**
   * Deletes the existing EKM connection. If the EKM connection does not already exist, this operation fails.
   * This operation requires the ekm/delete permission.
   *
   * @param options - the optional parameters.
   */
  deleteEkmConnection(options: DeleteEkmConnectionOptions = {}): Promise<EkmConnection> {
    return this.client.deleteEkmConnection(options);
  }

  /**
   * Checks the connectivity and authentication with the EKM proxy.
   * This operation requires the ekm/read permission.
   *
   * @param options - the optional parameters.
   */
  checkEkmConnection(options: CheckEkmConnectionOptions = {}): Promise<EkmProxyInfo> {
    return this.client.checkEkmConnection(options);
  }

  /**
   * Returns the client certificate that Managed HSM uses to authenticate to the EKM proxy.
   * This operation requires the ekm/read permission.
   *
   * @param options - the optional parameters.
   */
  getEkmCertificate(
    options: GetEkmCertificateOptions = {},
  ): Promise<EkmProxyClientCertificateInfo> {
    return this.client.getEkmCertificate(options);
  }

  /**
   * Lists the EKM proxy private endpoints on the Managed HSM.
   * This operation requires the ekm/read permission.
   *
   * @param options - the optional parameters.
   */
  listEkmPrivateEndpoints(
    options: ListEkmPrivateEndpointsOptions = {},
  ): Promise<EkmPrivateEndpointListResult> {
    return this.client.listEkmPrivateEndpoints(options);
  }

  /**
   * Gets an EKM proxy private endpoint. This operation requires the ekm/read permission.
   *
   * @param peName - the name of the private endpoint.
   * @param options - the optional parameters.
   */
  getEkmPrivateEndpoint(
    peName: string,
    options: GetEkmPrivateEndpointOptions = {},
  ): Promise<EkmPrivateEndpoint> {
    return this.client.getEkmPrivateEndpoint(peName, options);
  }

  /**
   * Creates a private endpoint to the EKM proxy Private Link Service.
   * This operation requires the ekm/write permission.
   *
   * @param peName - the name of the private endpoint.
   * @param parameters - the parameters used to create the private endpoint.
   * @param options - the optional parameters.
   */
  createEkmPrivateEndpoint(
    peName: string,
    parameters: EkmPrivateEndpointCreateParameters,
    options: CreateEkmPrivateEndpointOptions = {},
  ): PollerLike<OperationState<EkmPrivateEndpointOperation>, EkmPrivateEndpointOperation> {
    if (options.resumeFrom) {
      return restorePoller(
        this.client,
        options.resumeFrom,
        this.client.createEkmPrivateEndpoint,
        options,
      );
    }
    return this.client.createEkmPrivateEndpoint(peName, parameters, options);
  }

  /**
   * Deletes an EKM proxy private endpoint. This operation requires the ekm/write permission.
   *
   * @param peName - the name of the private endpoint.
   * @param options - the optional parameters.
   */
  deleteEkmPrivateEndpoint(
    peName: string,
    options: DeleteEkmPrivateEndpointOptions = {},
  ): PollerLike<OperationState<EkmPrivateEndpointOperation>, EkmPrivateEndpointOperation> {
    if (options.resumeFrom) {
      return restorePoller(
        this.client,
        options.resumeFrom,
        this.client.deleteEkmPrivateEndpoint,
        options,
      );
    }
    return this.client.deleteEkmPrivateEndpoint(peName, options);
  }

  /**
   * Gets the status of a private endpoint create or delete operation.
   * This operation requires the ekm/read permission.
   *
   * @param operationId - the ID of the private endpoint operation.
   * @param options - the optional parameters.
   */
  getEkmPrivateEndpointOperationStatus(
    operationId: string,
    options: GetEkmPrivateEndpointOperationStatusOptions = {},
  ): Promise<EkmPrivateEndpointOperation> {
    return this.client.getEkmPrivateEndpointOperationStatus(operationId, options);
  }
}

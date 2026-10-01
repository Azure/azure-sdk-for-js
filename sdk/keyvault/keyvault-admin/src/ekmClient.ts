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
  DeleteEkmConnectionOptions,
  EkmClientOptions,
  GetEkmCertificateOptions,
  GetEkmConnectionOptions,
  UpdateEkmConnectionOptions,
} from "./ekmClientModels.js";
import { createKeyVaultClient } from "./createKeyVaultClient.js";

/**
 * The KeyVaultEkmClient provides asynchronous methods to create, get, update, delete and check
 * the External Key Manager (EKM) connection for an Azure Key Vault Managed HSM.
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
}

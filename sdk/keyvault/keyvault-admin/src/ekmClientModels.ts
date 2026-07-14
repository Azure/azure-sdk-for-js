// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions, OperationOptions } from "@azure-rest/core-client";
import type { SUPPORTED_API_VERSIONS } from "./constants.js";

export type {
  EkmConnection,
  EkmProxyInfo,
  EkmProxyClientCertificateInfo,
} from "./models/models.js";

/**
 * The optional parameters accepted by the KeyVaultEkmClient.
 */
export interface EkmClientOptions extends ClientOptions {
  /**
   * The accepted versions of the Key Vault's service API.
   */
  serviceVersion?: SUPPORTED_API_VERSIONS;

  /**
   * Whether to disable verification that the authentication challenge resource matches the Key Vault or Managed HSM domain.
   * Defaults to false.
   */
  disableChallengeResourceVerification?: boolean;
}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultEkmClient.createEkmConnection}
 */
export interface CreateEkmConnectionOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultEkmClient.getEkmConnection}
 */
export interface GetEkmConnectionOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultEkmClient.updateEkmConnection}
 */
export interface UpdateEkmConnectionOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultEkmClient.deleteEkmConnection}
 */
export interface DeleteEkmConnectionOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultEkmClient.checkEkmConnection}
 */
export interface CheckEkmConnectionOptions extends OperationOptions {}

/**
 * An interface representing the optional parameters that can be passed to {@link KeyVaultEkmClient.getEkmCertificate}
 */
export interface GetEkmCertificateOptions extends OperationOptions {}

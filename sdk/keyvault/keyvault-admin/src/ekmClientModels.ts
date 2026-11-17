// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions, OperationOptions } from "@azure-rest/core-client";
import type { SUPPORTED_API_VERSIONS } from "./constants.js";

export type {
  EkmConnection,
  EkmConnectivityMode,
  EkmProxyInfo,
  EkmProxyClientCertificateInfo,
  EkmPrivateEndpointOperation,
  EkmPrivateEndpointOperationType,
  OperationState,
  EkmPrivateEndpointCreateParameters,
  EkmPrivateEndpoint,
  EkmPrivateEndpointProvisioningState,
  EkmPrivateEndpointProperties,
  EkmPrivateEndpointConnectionState,
  EkmPrivateEndpointConnectionStatus,
  EkmPrivateEndpointListResult,
  ErrorModel,
} from "./models/models.js";
export {
  KnownEkmConnectivityMode,
  KnownEkmPrivateEndpointConnectionStatus,
  KnownEkmPrivateEndpointOperationType,
  KnownEkmPrivateEndpointProvisioningState,
  KnownOperationState,
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

/** Optional parameters for listing EKM private endpoints. */
export interface ListEkmPrivateEndpointsOptions extends OperationOptions {}

/** Optional parameters for getting an EKM private endpoint. */
export interface GetEkmPrivateEndpointOptions extends OperationOptions {}

/** Optional parameters for deleting an EKM private endpoint. */
export interface DeleteEkmPrivateEndpointOptions extends OperationOptions {
  /** Delay to wait until the next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Serialized poller state to resume a previously started operation. */
  resumeFrom?: string;
}

/** Optional parameters for creating an EKM private endpoint. */
export interface CreateEkmPrivateEndpointOptions extends OperationOptions {
  /** Delay to wait until the next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Serialized poller state to resume a previously started operation. */
  resumeFrom?: string;
}

/** Optional parameters for getting an EKM private endpoint operation status. */
export interface GetEkmPrivateEndpointOperationStatusOptions extends OperationOptions {}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext } from "../../api/batchManagementContext.js";
import {
  listDetectors,
  getDetector,
  listOutboundNetworkDependenciesEndpoints,
  getKeys,
  regenerateKey,
  synchronizeAutoStorageKeys,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/batchAccount/operations.js";
import type {
  BatchAccountListDetectorsOptionalParams,
  BatchAccountGetDetectorOptionalParams,
  BatchAccountListOutboundNetworkDependenciesEndpointsOptionalParams,
  BatchAccountGetKeysOptionalParams,
  BatchAccountRegenerateKeyOptionalParams,
  BatchAccountSynchronizeAutoStorageKeysOptionalParams,
  BatchAccountListOptionalParams,
  BatchAccountListByResourceGroupOptionalParams,
  BatchAccountDeleteOptionalParams,
  BatchAccountUpdateOptionalParams,
  BatchAccountCreateOptionalParams,
  BatchAccountGetOptionalParams,
} from "../../api/batchAccount/options.js";
import type {
  BatchAccount,
  BatchAccountCreateParameters,
  BatchAccountUpdateParameters,
  BatchAccountRegenerateKeyParameters,
  BatchAccountKeys,
  OutboundEnvironmentEndpoint,
  DetectorResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BatchAccount operations. */
export interface BatchAccountOperations {
  /** Gets information about the detectors available for a given Batch account. */
  listDetectors: (
    resourceGroupName: string,
    accountName: string,
    options?: BatchAccountListDetectorsOptionalParams,
  ) => PagedAsyncIterableIterator<DetectorResponse>;
  /** Gets information about the given detector for a given Batch account. */
  getDetector: (
    resourceGroupName: string,
    accountName: string,
    detectorId: string,
    options?: BatchAccountGetDetectorOptionalParams,
  ) => Promise<DetectorResponse>;
  /** Lists the endpoints that a Batch Compute Node under this Batch Account may call as part of Batch service administration. If you are deploying a Pool inside of a virtual network that you specify, you must make sure your network allows outbound access to these endpoints. Failure to allow access to these endpoints may cause Batch to mark the affected nodes as unusable. For more information about creating a pool inside of a virtual network, see https://learn.microsoft.com/azure/batch/batch-virtual-network. */
  listOutboundNetworkDependenciesEndpoints: (
    resourceGroupName: string,
    accountName: string,
    options?: BatchAccountListOutboundNetworkDependenciesEndpointsOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundEnvironmentEndpoint>;
  /** This operation applies only to Batch accounts with allowedAuthenticationModes containing 'SharedKey'. If the Batch account doesn't contain 'SharedKey' in its allowedAuthenticationMode, clients cannot use shared keys to authenticate, and must use another allowedAuthenticationModes instead. In this case, getting the keys will fail. */
  getKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: BatchAccountGetKeysOptionalParams,
  ) => Promise<BatchAccountKeys>;
  /** This operation applies only to Batch accounts with allowedAuthenticationModes containing 'SharedKey'. If the Batch account doesn't contain 'SharedKey' in its allowedAuthenticationMode, clients cannot use shared keys to authenticate, and must use another allowedAuthenticationModes instead. In this case, regenerating the keys will fail. */
  regenerateKey: (
    resourceGroupName: string,
    accountName: string,
    parameters: BatchAccountRegenerateKeyParameters,
    options?: BatchAccountRegenerateKeyOptionalParams,
  ) => Promise<BatchAccountKeys>;
  /** Synchronizes access keys for the auto-storage account configured for the specified Batch account, only if storage key authentication is being used. */
  synchronizeAutoStorageKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: BatchAccountSynchronizeAutoStorageKeysOptionalParams,
  ) => Promise<void>;
  /** Gets information about the Batch accounts associated with the subscription. */
  list: (options?: BatchAccountListOptionalParams) => PagedAsyncIterableIterator<BatchAccount>;
  /** Gets information about the Batch accounts associated with the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: BatchAccountListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BatchAccount>;
  /** Deletes the specified Batch account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    options?: BatchAccountDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the properties of an existing Batch account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    parameters: BatchAccountUpdateParameters,
    options?: BatchAccountUpdateOptionalParams,
  ) => Promise<BatchAccount>;
  /** Creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API. */
  create: (
    resourceGroupName: string,
    accountName: string,
    parameters: BatchAccountCreateParameters,
    options?: BatchAccountCreateOptionalParams,
  ) => PollerLike<OperationState<BatchAccount>, BatchAccount>;
  /** Gets information about the specified Batch account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: BatchAccountGetOptionalParams,
  ) => Promise<BatchAccount>;
}

function _getBatchAccount(context: BatchManagementContext) {
  return {
    listDetectors: (
      resourceGroupName: string,
      accountName: string,
      options?: BatchAccountListDetectorsOptionalParams,
    ) => listDetectors(context, resourceGroupName, accountName, options),
    getDetector: (
      resourceGroupName: string,
      accountName: string,
      detectorId: string,
      options?: BatchAccountGetDetectorOptionalParams,
    ) => getDetector(context, resourceGroupName, accountName, detectorId, options),
    listOutboundNetworkDependenciesEndpoints: (
      resourceGroupName: string,
      accountName: string,
      options?: BatchAccountListOutboundNetworkDependenciesEndpointsOptionalParams,
    ) => listOutboundNetworkDependenciesEndpoints(context, resourceGroupName, accountName, options),
    getKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: BatchAccountGetKeysOptionalParams,
    ) => getKeys(context, resourceGroupName, accountName, options),
    regenerateKey: (
      resourceGroupName: string,
      accountName: string,
      parameters: BatchAccountRegenerateKeyParameters,
      options?: BatchAccountRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, accountName, parameters, options),
    synchronizeAutoStorageKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: BatchAccountSynchronizeAutoStorageKeysOptionalParams,
    ) => synchronizeAutoStorageKeys(context, resourceGroupName, accountName, options),
    list: (options?: BatchAccountListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: BatchAccountListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      options?: BatchAccountDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      parameters: BatchAccountUpdateParameters,
      options?: BatchAccountUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, parameters, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      parameters: BatchAccountCreateParameters,
      options?: BatchAccountCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, parameters, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      options?: BatchAccountGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, options),
  };
}

export function _getBatchAccountOperations(
  context: BatchManagementContext,
): BatchAccountOperations {
  return {
    ..._getBatchAccount(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { VaultModel, VaultModelUpdate } from "../../models/models.js";
import {
  VaultListBySubscriptionOptionalParams,
  VaultListOptionalParams,
  VaultDeleteOptionalParams,
  VaultUpdateOptionalParams,
  VaultCreateOptionalParams,
  VaultGetOptionalParams,
} from "../../api/vault/options.js";
import {
  listBySubscription,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/vault/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Vault operations. */
export interface VaultOperations {
  /** Gets the list of vaults in the given subscription. */
  listBySubscription: (
    options?: VaultListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<VaultModel>;
  /** Gets the list of vaults in the given subscription and resource group. */
  list: (
    resourceGroupName: string,
    options?: VaultListOptionalParams,
  ) => PagedAsyncIterableIterator<VaultModel>;
  /** Removes the vault. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    options?: VaultDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Performs update on the vault. */
  update: (
    resourceGroupName: string,
    vaultName: string,
    properties: VaultModelUpdate,
    options?: VaultUpdateOptionalParams,
  ) => PollerLike<OperationState<VaultModel>, VaultModel>;
  /** Creates the vault. */
  create: (
    resourceGroupName: string,
    vaultName: string,
    resource: VaultModel,
    options?: VaultCreateOptionalParams,
  ) => PollerLike<OperationState<VaultModel>, VaultModel>;
  /** Gets the details of the vault. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    options?: VaultGetOptionalParams,
  ) => Promise<VaultModel>;
}

function _getVault(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: VaultListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: VaultListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (resourceGroupName: string, vaultName: string, options?: VaultDeleteOptionalParams) =>
      $delete(context, resourceGroupName, vaultName, options),
    update: (
      resourceGroupName: string,
      vaultName: string,
      properties: VaultModelUpdate,
      options?: VaultUpdateOptionalParams,
    ) => update(context, resourceGroupName, vaultName, properties, options),
    create: (
      resourceGroupName: string,
      vaultName: string,
      resource: VaultModel,
      options?: VaultCreateOptionalParams,
    ) => create(context, resourceGroupName, vaultName, resource, options),
    get: (resourceGroupName: string, vaultName: string, options?: VaultGetOptionalParams) =>
      get(context, resourceGroupName, vaultName, options),
  };
}

export function _getVaultOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): VaultOperations {
  return {
    ..._getVault(context),
  };
}

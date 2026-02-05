// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext } from "../../api/recoveryServicesContext.js";
import {
  listByResourceGroup,
  listBySubscriptionId,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/vaults/operations.js";
import type {
  VaultsListByResourceGroupOptionalParams,
  VaultsListBySubscriptionIdOptionalParams,
  VaultsDeleteOptionalParams,
  VaultsUpdateOptionalParams,
  VaultsCreateOrUpdateOptionalParams,
  VaultsGetOptionalParams,
} from "../../api/vaults/options.js";
import type { Vault, PatchVault } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Vaults operations. */
export interface VaultsOperations {
  /** Retrieve a list of Vaults. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VaultsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Vault>;
  /** Fetches all the resources of the specified type in the subscription. */
  listBySubscriptionId: (
    options?: VaultsListBySubscriptionIdOptionalParams,
  ) => PagedAsyncIterableIterator<Vault>;
  /** Deletes a vault. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    options?: VaultsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the vault. */
  update: (
    resourceGroupName: string,
    vaultName: string,
    vault: PatchVault,
    options?: VaultsUpdateOptionalParams,
  ) => PollerLike<OperationState<Vault>, Vault>;
  /** Creates or updates a Recovery Services vault. */
  createOrUpdate: (
    resourceGroupName: string,
    vaultName: string,
    vault: Vault,
    options?: VaultsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Vault>, Vault>;
  /** Get the Vault details. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    options?: VaultsGetOptionalParams,
  ) => Promise<Vault>;
}

function _getVaults(context: RecoveryServicesContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VaultsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscriptionId: (options?: VaultsListBySubscriptionIdOptionalParams) =>
      listBySubscriptionId(context, options),
    delete: (resourceGroupName: string, vaultName: string, options?: VaultsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, vaultName, options),
    update: (
      resourceGroupName: string,
      vaultName: string,
      vault: PatchVault,
      options?: VaultsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vaultName, vault, options),
    createOrUpdate: (
      resourceGroupName: string,
      vaultName: string,
      vault: Vault,
      options?: VaultsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vaultName, vault, options),
    get: (resourceGroupName: string, vaultName: string, options?: VaultsGetOptionalParams) =>
      get(context, resourceGroupName, vaultName, options),
  };
}

export function _getVaultsOperations(context: RecoveryServicesContext): VaultsOperations {
  return {
    ..._getVaults(context),
  };
}

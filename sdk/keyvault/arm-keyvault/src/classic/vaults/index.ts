// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import {
  checkNameAvailability,
  list,
  listDeleted,
  purgeDeleted,
  getDeleted,
  updateAccessPolicy,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/vaults/operations.js";
import type {
  VaultsCheckNameAvailabilityOptionalParams,
  VaultsListOptionalParams,
  VaultsListDeletedOptionalParams,
  VaultsPurgeDeletedOptionalParams,
  VaultsGetDeletedOptionalParams,
  VaultsUpdateAccessPolicyOptionalParams,
  VaultsListBySubscriptionOptionalParams,
  VaultsListByResourceGroupOptionalParams,
  VaultsDeleteOptionalParams,
  VaultsUpdateOptionalParams,
  VaultsCreateOrUpdateOptionalParams,
  VaultsGetOptionalParams,
} from "../../api/vaults/options.js";
import type {
  Vault,
  VaultCreateOrUpdateParameters,
  VaultPatchParameters,
  VaultAccessPolicyParameters,
  DeletedVault,
  TrackedResource,
  VaultCheckNameAvailabilityParameters,
  CheckNameAvailabilityResult,
  AccessPolicyUpdateKind,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Vaults operations. */
export interface VaultsOperations {
  /** Checks that the vault name is valid and is not already in use. */
  checkNameAvailability: (
    vaultName: VaultCheckNameAvailabilityParameters,
    options?: VaultsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** The List operation gets information about the vaults associated with the subscription. */
  list: (options?: VaultsListOptionalParams) => PagedAsyncIterableIterator<TrackedResource>;
  /** Gets information about the deleted vaults in a subscription. */
  listDeleted: (
    options?: VaultsListDeletedOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedVault>;
  /** Permanently deletes the specified vault. aka Purges the deleted Azure key vault. */
  purgeDeleted: (
    location: string,
    vaultName: string,
    options?: VaultsPurgeDeletedOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets the deleted Azure key vault. */
  getDeleted: (
    location: string,
    vaultName: string,
    options?: VaultsGetDeletedOptionalParams,
  ) => Promise<DeletedVault>;
  /** Update access policies in a key vault in the specified subscription. */
  updateAccessPolicy: (
    resourceGroupName: string,
    vaultName: string,
    operationKind: AccessPolicyUpdateKind,
    parameters: VaultAccessPolicyParameters,
    options?: VaultsUpdateAccessPolicyOptionalParams,
  ) => Promise<VaultAccessPolicyParameters>;
  /** The List operation gets information about the vaults associated with the subscription. */
  listBySubscription: (
    options?: VaultsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Vault>;
  /** The List operation gets information about the vaults associated with the subscription and within the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VaultsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Vault>;
  /** Deletes the specified Azure key vault. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    options?: VaultsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a key vault in the specified subscription. */
  update: (
    resourceGroupName: string,
    vaultName: string,
    parameters: VaultPatchParameters,
    options?: VaultsUpdateOptionalParams,
  ) => Promise<Vault>;
  /** Create or update a key vault in the specified subscription. */
  createOrUpdate: (
    resourceGroupName: string,
    vaultName: string,
    parameters: VaultCreateOrUpdateParameters,
    options?: VaultsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Vault>, Vault>;
  /** Gets the specified Azure key vault. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    options?: VaultsGetOptionalParams,
  ) => Promise<Vault>;
}

function _getVaults(context: KeyVaultManagementContext) {
  return {
    checkNameAvailability: (
      vaultName: VaultCheckNameAvailabilityParameters,
      options?: VaultsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, vaultName, options),
    list: (options?: VaultsListOptionalParams) => list(context, options),
    listDeleted: (options?: VaultsListDeletedOptionalParams) => listDeleted(context, options),
    purgeDeleted: (
      location: string,
      vaultName: string,
      options?: VaultsPurgeDeletedOptionalParams,
    ) => purgeDeleted(context, location, vaultName, options),
    getDeleted: (location: string, vaultName: string, options?: VaultsGetDeletedOptionalParams) =>
      getDeleted(context, location, vaultName, options),
    updateAccessPolicy: (
      resourceGroupName: string,
      vaultName: string,
      operationKind: AccessPolicyUpdateKind,
      parameters: VaultAccessPolicyParameters,
      options?: VaultsUpdateAccessPolicyOptionalParams,
    ) =>
      updateAccessPolicy(context, resourceGroupName, vaultName, operationKind, parameters, options),
    listBySubscription: (options?: VaultsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VaultsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, vaultName: string, options?: VaultsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, vaultName, options),
    update: (
      resourceGroupName: string,
      vaultName: string,
      parameters: VaultPatchParameters,
      options?: VaultsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vaultName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      vaultName: string,
      parameters: VaultCreateOrUpdateParameters,
      options?: VaultsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vaultName, parameters, options),
    get: (resourceGroupName: string, vaultName: string, options?: VaultsGetOptionalParams) =>
      get(context, resourceGroupName, vaultName, options),
  };
}

export function _getVaultsOperations(context: KeyVaultManagementContext): VaultsOperations {
  return {
    ..._getVaults(context),
  };
}

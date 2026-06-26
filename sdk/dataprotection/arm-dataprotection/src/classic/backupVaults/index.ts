// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext } from "../../api/dataProtectionContext.js";
import {
  checkNameAvailability,
  listInResourceGroup,
  listInSubscription,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/backupVaults/operations.js";
import {
  BackupVaultsCheckNameAvailabilityOptionalParams,
  BackupVaultsListInResourceGroupOptionalParams,
  BackupVaultsListInSubscriptionOptionalParams,
  BackupVaultsDeleteOptionalParams,
  BackupVaultsUpdateOptionalParams,
  BackupVaultsCreateOrUpdateOptionalParams,
  BackupVaultsGetOptionalParams,
} from "../../api/backupVaults/options.js";
import {
  BackupVaultResource,
  PatchResourceRequestInput,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupVaults operations. */
export interface BackupVaultsOperations {
  /** API to check for resource name availability */
  checkNameAvailability: (
    resourceGroupName: string,
    location: string,
    parameters: CheckNameAvailabilityRequest,
    options?: BackupVaultsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** Returns resource collection belonging to a resource group. */
  listInResourceGroup: (
    resourceGroupName: string,
    options?: BackupVaultsListInResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BackupVaultResource>;
  /** Returns resource collection belonging to a subscription. */
  listInSubscription: (
    options?: BackupVaultsListInSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<BackupVaultResource>;
  /** Deletes a BackupVault resource from the resource group. */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    options?: BackupVaultsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource. */
  update: (
    resourceGroupName: string,
    vaultName: string,
    parameters: PatchResourceRequestInput,
    options?: BackupVaultsUpdateOptionalParams,
  ) => PollerLike<OperationState<BackupVaultResource>, BackupVaultResource>;
  /** Creates or updates a BackupVault resource belonging to a resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    vaultName: string,
    parameters: BackupVaultResource,
    options?: BackupVaultsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BackupVaultResource>, BackupVaultResource>;
  /** Returns a resource belonging to a resource group. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    options?: BackupVaultsGetOptionalParams,
  ) => Promise<BackupVaultResource>;
}

function _getBackupVaults(context: DataProtectionContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      location: string,
      parameters: CheckNameAvailabilityRequest,
      options?: BackupVaultsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, resourceGroupName, location, parameters, options),
    listInResourceGroup: (
      resourceGroupName: string,
      options?: BackupVaultsListInResourceGroupOptionalParams,
    ) => listInResourceGroup(context, resourceGroupName, options),
    listInSubscription: (options?: BackupVaultsListInSubscriptionOptionalParams) =>
      listInSubscription(context, options),
    delete: (
      resourceGroupName: string,
      vaultName: string,
      options?: BackupVaultsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vaultName, options),
    update: (
      resourceGroupName: string,
      vaultName: string,
      parameters: PatchResourceRequestInput,
      options?: BackupVaultsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vaultName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      vaultName: string,
      parameters: BackupVaultResource,
      options?: BackupVaultsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vaultName, parameters, options),
    get: (resourceGroupName: string, vaultName: string, options?: BackupVaultsGetOptionalParams) =>
      get(context, resourceGroupName, vaultName, options),
  };
}

export function _getBackupVaultsOperations(context: DataProtectionContext): BackupVaultsOperations {
  return {
    ..._getBackupVaults(context),
  };
}

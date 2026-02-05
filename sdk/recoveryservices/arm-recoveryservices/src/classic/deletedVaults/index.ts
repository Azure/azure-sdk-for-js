// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext } from "../../api/recoveryServicesContext.js";
import {
  getOperationStatus,
  undelete,
  get,
  listBySubscriptionId,
} from "../../api/deletedVaults/operations.js";
import type {
  DeletedVaultsGetOperationStatusOptionalParams,
  DeletedVaultsUndeleteOptionalParams,
  DeletedVaultsGetOptionalParams,
  DeletedVaultsListBySubscriptionIdOptionalParams,
} from "../../api/deletedVaults/options.js";
import type {
  OperationResource,
  DeletedVault,
  DeletedVaultUndeleteInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeletedVaults operations. */
export interface DeletedVaultsOperations {
  /** Get the operation status of a deleted vault. */
  getOperationStatus: (
    location: string,
    deletedVaultName: string,
    operationId: string,
    options?: DeletedVaultsGetOperationStatusOptionalParams,
  ) => Promise<OperationResource>;
  /** Start undelete of a deleted vault. */
  undelete: (
    location: string,
    deletedVaultName: string,
    body: DeletedVaultUndeleteInput,
    options?: DeletedVaultsUndeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a specific deleted vault. */
  get: (
    location: string,
    deletedVaultName: string,
    options?: DeletedVaultsGetOptionalParams,
  ) => Promise<DeletedVault>;
  /** List deleted vaults in a subscription. */
  listBySubscriptionId: (
    location: string,
    options?: DeletedVaultsListBySubscriptionIdOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedVault>;
}

function _getDeletedVaults(context: RecoveryServicesContext) {
  return {
    getOperationStatus: (
      location: string,
      deletedVaultName: string,
      operationId: string,
      options?: DeletedVaultsGetOperationStatusOptionalParams,
    ) => getOperationStatus(context, location, deletedVaultName, operationId, options),
    undelete: (
      location: string,
      deletedVaultName: string,
      body: DeletedVaultUndeleteInput,
      options?: DeletedVaultsUndeleteOptionalParams,
    ) => undelete(context, location, deletedVaultName, body, options),
    get: (location: string, deletedVaultName: string, options?: DeletedVaultsGetOptionalParams) =>
      get(context, location, deletedVaultName, options),
    listBySubscriptionId: (
      location: string,
      options?: DeletedVaultsListBySubscriptionIdOptionalParams,
    ) => listBySubscriptionId(context, location, options),
  };
}

export function _getDeletedVaultsOperations(
  context: RecoveryServicesContext,
): DeletedVaultsOperations {
  return {
    ..._getDeletedVaults(context),
  };
}

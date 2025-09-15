// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { RecoveryPointModel } from "../../models/models.js";
import {
  RecoveryPointListOptionalParams,
  RecoveryPointGetOptionalParams,
} from "../../api/recoveryPoint/options.js";
import { list, get } from "../../api/recoveryPoint/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoveryPoint operations. */
export interface RecoveryPointOperations {
  /** Gets the list of recovery points of the given protected item. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    protectedItemName: string,
    options?: RecoveryPointListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryPointModel>;
  /** Gets the details of the recovery point of a protected item. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    protectedItemName: string,
    recoveryPointName: string,
    options?: RecoveryPointGetOptionalParams,
  ) => Promise<RecoveryPointModel>;
}

function _getRecoveryPoint(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      protectedItemName: string,
      options?: RecoveryPointListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, protectedItemName, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      protectedItemName: string,
      recoveryPointName: string,
      options?: RecoveryPointGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, protectedItemName, recoveryPointName, options),
  };
}

export function _getRecoveryPointOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): RecoveryPointOperations {
  return {
    ..._getRecoveryPoint(context),
  };
}

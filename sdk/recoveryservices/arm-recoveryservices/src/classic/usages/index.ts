// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext } from "../../api/recoveryServicesContext.js";
import { listByVaults } from "../../api/usages/operations.js";
import type { UsagesListByVaultsOptionalParams } from "../../api/usages/options.js";
import type { VaultUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Fetches the usages of the vault. */
  listByVaults: (
    resourceGroupName: string,
    vaultName: string,
    options?: UsagesListByVaultsOptionalParams,
  ) => PagedAsyncIterableIterator<VaultUsage>;
}

function _getUsages(context: RecoveryServicesContext) {
  return {
    listByVaults: (
      resourceGroupName: string,
      vaultName: string,
      options?: UsagesListByVaultsOptionalParams,
    ) => listByVaults(context, resourceGroupName, vaultName, options),
  };
}

export function _getUsagesOperations(context: RecoveryServicesContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}

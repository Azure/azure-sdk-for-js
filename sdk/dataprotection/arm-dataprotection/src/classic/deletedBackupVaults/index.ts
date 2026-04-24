// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { listByLocation, get } from "../../api/deletedBackupVaults/operations.js";
import type {
  DeletedBackupVaultsListByLocationOptionalParams,
  DeletedBackupVaultsGetOptionalParams,
} from "../../api/deletedBackupVaults/options.js";
import type { DeletedBackupVaultResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeletedBackupVaults operations. */
export interface DeletedBackupVaultsOperations {
  /** Lists deleted backup vaults by location */
  listByLocation: (
    location: string,
    options?: DeletedBackupVaultsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedBackupVaultResource>;
  /** Gets a deleted backup vault */
  get: (
    location: string,
    deletedVaultName: string,
    options?: DeletedBackupVaultsGetOptionalParams,
  ) => Promise<DeletedBackupVaultResource>;
}

function _getDeletedBackupVaults(context: DataProtectionContext) {
  return {
    listByLocation: (location: string, options?: DeletedBackupVaultsListByLocationOptionalParams) =>
      listByLocation(context, location, options),
    get: (
      location: string,
      deletedVaultName: string,
      options?: DeletedBackupVaultsGetOptionalParams,
    ) => get(context, location, deletedVaultName, options),
  };
}

export function _getDeletedBackupVaultsOperations(
  context: DataProtectionContext,
): DeletedBackupVaultsOperations {
  return {
    ..._getDeletedBackupVaults(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesContext } from "../../api/recoveryServicesContext.js";
import { list } from "../../api/replicationUsages/operations.js";
import { ReplicationUsagesListOptionalParams } from "../../api/replicationUsages/options.js";
import { ReplicationUsage } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReplicationUsages operations. */
export interface ReplicationUsagesOperations {
  /** Fetches the replication usages of the vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: ReplicationUsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationUsage>;
}

function _getReplicationUsages(context: RecoveryServicesContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: ReplicationUsagesListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
  };
}

export function _getReplicationUsagesOperations(
  context: RecoveryServicesContext,
): ReplicationUsagesOperations {
  return {
    ..._getReplicationUsages(context),
  };
}

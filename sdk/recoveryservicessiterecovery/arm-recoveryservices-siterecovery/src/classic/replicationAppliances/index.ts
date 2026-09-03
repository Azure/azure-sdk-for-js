// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { list } from "../../api/replicationAppliances/operations.js";
import { ReplicationAppliancesListOptionalParams } from "../../api/replicationAppliances/options.js";
import { ReplicationAppliance } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReplicationAppliances operations. */
export interface ReplicationAppliancesOperations {
  /** Gets the list of Azure Site Recovery appliances for the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationAppliancesListOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationAppliance>;
}

function _getReplicationAppliances(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationAppliancesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
  };
}

export function _getReplicationAppliancesOperations(
  context: SiteRecoveryManagementContext,
): ReplicationAppliancesOperations {
  return {
    ..._getReplicationAppliances(context),
  };
}

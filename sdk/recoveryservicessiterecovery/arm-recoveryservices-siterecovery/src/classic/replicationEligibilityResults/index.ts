// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { list, get } from "../../api/replicationEligibilityResults/operations.js";
import type {
  ReplicationEligibilityResultsListOptionalParams,
  ReplicationEligibilityResultsGetOptionalParams,
} from "../../api/replicationEligibilityResults/options.js";
import type {
  ReplicationEligibilityResults,
  ReplicationEligibilityResultsCollection,
} from "../../models/models.js";

/** Interface representing a ReplicationEligibilityResults operations. */
export interface ReplicationEligibilityResultsOperations {
  /** Validates whether a given VM can be protected or not in which case returns list of errors. */
  list: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: ReplicationEligibilityResultsListOptionalParams,
  ) => Promise<ReplicationEligibilityResultsCollection>;
  /** Validates whether a given VM can be protected or not in which case returns list of errors. */
  get: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: ReplicationEligibilityResultsGetOptionalParams,
  ) => Promise<ReplicationEligibilityResults>;
}

function _getReplicationEligibilityResults(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: ReplicationEligibilityResultsListOptionalParams,
    ) => list(context, resourceGroupName, virtualMachineName, options),
    get: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: ReplicationEligibilityResultsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualMachineName, options),
  };
}

export function _getReplicationEligibilityResultsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationEligibilityResultsOperations {
  return {
    ..._getReplicationEligibilityResults(context),
  };
}

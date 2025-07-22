// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import { ConfigurationAssignment } from "../../models/models.js";
import { ConfigurationAssignmentsWithinSubscriptionListOptionalParams } from "../../api/configurationAssignmentsWithinSubscription/options.js";
import { list } from "../../api/configurationAssignmentsWithinSubscription/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConfigurationAssignmentsWithinSubscription operations. */
export interface ConfigurationAssignmentsWithinSubscriptionOperations {
  /** [UNSUPPORTED] Get configuration assignment within a subscription. This API is not implemented yet. */
  list: (
    options?: ConfigurationAssignmentsWithinSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigurationAssignment>;
}

function _getConfigurationAssignmentsWithinSubscription(context: MaintenanceManagementContext) {
  return {
    list: (options?: ConfigurationAssignmentsWithinSubscriptionListOptionalParams) =>
      list(context, options),
  };
}

export function _getConfigurationAssignmentsWithinSubscriptionOperations(
  context: MaintenanceManagementContext,
): ConfigurationAssignmentsWithinSubscriptionOperations {
  return {
    ..._getConfigurationAssignmentsWithinSubscription(context),
  };
}

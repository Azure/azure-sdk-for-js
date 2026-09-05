// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import {
  upgradeNow,
  createOrUpdate,
  get,
} from "../../api/upgradePreferencesOperations/operations.js";
import type {
  UpgradePreferencesOperationsUpgradeNowOptionalParams,
  UpgradePreferencesOperationsCreateOrUpdateOptionalParams,
  UpgradePreferencesOperationsGetOptionalParams,
} from "../../api/upgradePreferencesOperations/options.js";
import type { UpgradePreferences } from "../../models/models.js";

/** Interface representing a UpgradePreferencesOperations operations. */
export interface UpgradePreferencesOperationsOperations {
  /** Starts an immediate eight-hour upgrade override when an upgrade is pending. */
  upgradeNow: (
    resourceGroupName: string,
    clusterName: string,
    options?: UpgradePreferencesOperationsUpgradeNowOptionalParams,
  ) => Promise<UpgradePreferences | void>;
  /** Creates or updates the upgrade preferences for an Event Hubs Dedicated cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    resource: UpgradePreferences,
    options?: UpgradePreferencesOperationsCreateOrUpdateOptionalParams,
  ) => Promise<UpgradePreferences>;
  /** Gets the upgrade preferences for an Event Hubs Dedicated cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: UpgradePreferencesOperationsGetOptionalParams,
  ) => Promise<UpgradePreferences>;
}
function _getUpgradePreferencesOperations(context: EventHubManagementContext) {
  return {
    upgradeNow: (
      resourceGroupName: string,
      clusterName: string,
      options?: UpgradePreferencesOperationsUpgradeNowOptionalParams,
    ) => upgradeNow(context, resourceGroupName, clusterName, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      resource: UpgradePreferences,
      options?: UpgradePreferencesOperationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, resource, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: UpgradePreferencesOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}
export function _getUpgradePreferencesOperationsOperations(
  context: EventHubManagementContext,
): UpgradePreferencesOperationsOperations {
  return {
    ..._getUpgradePreferencesOperations(context),
  };
}

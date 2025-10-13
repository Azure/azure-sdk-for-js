// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { list, update, read } from "../../api/maintenances/operations.js";
import type {
  MaintenancesListOptionalParams,
  MaintenancesUpdateOptionalParams,
  MaintenancesReadOptionalParams,
} from "../../api/maintenances/options.js";
import type { Maintenance } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Maintenances operations. */
export interface MaintenancesOperations {
  /** List maintenances. */
  list: (
    resourceGroupName: string,
    serverName: string,
    options?: MaintenancesListOptionalParams,
  ) => PagedAsyncIterableIterator<Maintenance>;
  /** Update maintenances. */
  update: (
    resourceGroupName: string,
    serverName: string,
    maintenanceName: string,
    options?: MaintenancesUpdateOptionalParams,
  ) => PollerLike<OperationState<Maintenance>, Maintenance>;
  /** Read maintenance. */
  read: (
    resourceGroupName: string,
    serverName: string,
    maintenanceName: string,
    options?: MaintenancesReadOptionalParams,
  ) => Promise<Maintenance>;
}

function _getMaintenances(context: MySQLManagementFlexibleServerContext) {
  return {
    list: (
      resourceGroupName: string,
      serverName: string,
      options?: MaintenancesListOptionalParams,
    ) => list(context, resourceGroupName, serverName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      maintenanceName: string,
      options?: MaintenancesUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, maintenanceName, options),
    read: (
      resourceGroupName: string,
      serverName: string,
      maintenanceName: string,
      options?: MaintenancesReadOptionalParams,
    ) => read(context, resourceGroupName, serverName, maintenanceName, options),
  };
}

export function _getMaintenancesOperations(
  context: MySQLManagementFlexibleServerContext,
): MaintenancesOperations {
  return {
    ..._getMaintenances(context),
  };
}

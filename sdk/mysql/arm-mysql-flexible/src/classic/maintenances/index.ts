// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { list, update, read } from "../../api/maintenances/operations.js";
import {
  MaintenancesListOptionalParams,
  MaintenancesUpdateOptionalParams,
  MaintenancesReadOptionalParams,
} from "../../api/maintenances/options.js";
import { Maintenance } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    maintenanceName: string,
    options?: MaintenancesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Maintenance>, Maintenance>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    maintenanceName: string,
    options?: MaintenancesUpdateOptionalParams,
  ) => Promise<Maintenance>;
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
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      maintenanceName: string,
      options?: MaintenancesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, serverName, maintenanceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      maintenanceName: string,
      options?: MaintenancesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, serverName, maintenanceName, options);
    },
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

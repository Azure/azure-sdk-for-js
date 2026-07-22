// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { listByDataBoxEdgeDevice, get } from "../../api/alerts/operations.js";
import type {
  AlertsListByDataBoxEdgeDeviceOptionalParams,
  AlertsGetOptionalParams,
} from "../../api/alerts/options.js";
import type { Alert } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Alerts operations. */
export interface AlertsOperations {
  /** Gets all the alerts for a Data Box Edge/Data Box Gateway device. */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: AlertsListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<Alert>;
  /** Gets an alert by name. */
  get: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: AlertsGetOptionalParams,
  ) => Promise<Alert>;
}

function _getAlerts(context: DataBoxEdgeManagementContext) {
  return {
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: AlertsListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
    get: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: AlertsGetOptionalParams,
    ) => get(context, deviceName, name, resourceGroupName, options),
  };
}

export function _getAlertsOperations(context: DataBoxEdgeManagementContext): AlertsOperations {
  return {
    ..._getAlerts(context),
  };
}

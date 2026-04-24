// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/healthReports/operations.js";
import type {
  HealthReportsListOptionalParams,
  HealthReportsGetOptionalParams,
} from "../../api/healthReports/options.js";
import type { HealthReport } from "../../models/healthReportsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HealthReports operations. */
export interface HealthReportsOperations {
  /** Get a list of all health reports inside a scope. Valid scopes are: subscription (format: 'subscriptions/{subscriptionId}'), or security connector (format: 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})' */
  list: (
    scope: string,
    options?: HealthReportsListOptionalParams,
  ) => PagedAsyncIterableIterator<HealthReport>;
  /** Get health report of resource */
  get: (
    resourceId: string,
    healthReportName: string,
    options?: HealthReportsGetOptionalParams,
  ) => Promise<HealthReport>;
}

function _getHealthReports(context: SecurityCenterContext) {
  return {
    list: (scope: string, options?: HealthReportsListOptionalParams) =>
      list(context, scope, options),
    get: (resourceId: string, healthReportName: string, options?: HealthReportsGetOptionalParams) =>
      get(context, resourceId, healthReportName, options),
  };
}

export function _getHealthReportsOperations(
  context: SecurityCenterContext,
): HealthReportsOperations {
  return {
    ..._getHealthReports(context),
  };
}

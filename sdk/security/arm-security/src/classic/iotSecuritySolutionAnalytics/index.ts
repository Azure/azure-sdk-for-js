// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/iotSecuritySolutionAnalytics/operations.js";
import type {
  IotSecuritySolutionAnalyticsListOptionalParams,
  IotSecuritySolutionAnalyticsGetOptionalParams,
} from "../../api/iotSecuritySolutionAnalytics/options.js";
import type {
  IoTSecuritySolutionAnalyticsModel,
  IoTSecuritySolutionAnalyticsModelList,
} from "../../models/ioTSecurityAPI/models.js";

/** Interface representing a IotSecuritySolutionAnalytics operations. */
export interface IotSecuritySolutionAnalyticsOperations {
  /** Use this method to get IoT security Analytics metrics in an array. */
  list: (
    resourceGroupName: string,
    solutionName: string,
    options?: IotSecuritySolutionAnalyticsListOptionalParams,
  ) => Promise<IoTSecuritySolutionAnalyticsModelList>;
  /** Use this method to get IoT Security Analytics metrics. */
  get: (
    resourceGroupName: string,
    solutionName: string,
    options?: IotSecuritySolutionAnalyticsGetOptionalParams,
  ) => Promise<IoTSecuritySolutionAnalyticsModel>;
}

function _getIotSecuritySolutionAnalytics(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      solutionName: string,
      options?: IotSecuritySolutionAnalyticsListOptionalParams,
    ) => list(context, resourceGroupName, solutionName, options),
    get: (
      resourceGroupName: string,
      solutionName: string,
      options?: IotSecuritySolutionAnalyticsGetOptionalParams,
    ) => get(context, resourceGroupName, solutionName, options),
  };
}

export function _getIotSecuritySolutionAnalyticsOperations(
  context: SecurityCenterContext,
): IotSecuritySolutionAnalyticsOperations {
  return {
    ..._getIotSecuritySolutionAnalytics(context),
  };
}

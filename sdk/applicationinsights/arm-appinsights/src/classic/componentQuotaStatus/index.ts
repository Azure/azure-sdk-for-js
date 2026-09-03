// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { get } from "../../api/componentQuotaStatus/operations.js";
import { ComponentQuotaStatusGetOptionalParams } from "../../api/componentQuotaStatus/options.js";
import { ApplicationInsightsComponentQuotaStatus } from "../../models/componentAPIs/models.js";

/** Interface representing a ComponentQuotaStatus operations. */
export interface ComponentQuotaStatusOperations {
  /** Returns daily data volume cap (quota) status for an Application Insights component. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ComponentQuotaStatusGetOptionalParams,
  ) => Promise<ApplicationInsightsComponentQuotaStatus>;
}

function _getComponentQuotaStatus(context: ApplicationInsightsManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: ComponentQuotaStatusGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getComponentQuotaStatusOperations(
  context: ApplicationInsightsManagementContext,
): ComponentQuotaStatusOperations {
  return {
    ..._getComponentQuotaStatus(context),
  };
}

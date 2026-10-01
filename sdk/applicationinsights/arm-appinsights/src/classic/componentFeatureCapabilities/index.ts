// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { get } from "../../api/componentFeatureCapabilities/operations.js";
import { ComponentFeatureCapabilitiesGetOptionalParams } from "../../api/componentFeatureCapabilities/options.js";
import { ApplicationInsightsComponentFeatureCapabilities } from "../../models/componentAPIs/models.js";

/** Interface representing a ComponentFeatureCapabilities operations. */
export interface ComponentFeatureCapabilitiesOperations {
  /** Returns feature capabilities of the application insights component. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ComponentFeatureCapabilitiesGetOptionalParams,
  ) => Promise<ApplicationInsightsComponentFeatureCapabilities>;
}

function _getComponentFeatureCapabilities(context: ApplicationInsightsManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: ComponentFeatureCapabilitiesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getComponentFeatureCapabilitiesOperations(
  context: ApplicationInsightsManagementContext,
): ComponentFeatureCapabilitiesOperations {
  return {
    ..._getComponentFeatureCapabilities(context),
  };
}

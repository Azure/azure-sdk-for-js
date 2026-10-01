// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { get } from "../../api/componentAvailableFeatures/operations.js";
import { ComponentAvailableFeaturesGetOptionalParams } from "../../api/componentAvailableFeatures/options.js";
import { ApplicationInsightsComponentAvailableFeatures } from "../../models/componentAPIs/models.js";

/** Interface representing a ComponentAvailableFeatures operations. */
export interface ComponentAvailableFeaturesOperations {
  /** Returns all available features of the application insights component. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ComponentAvailableFeaturesGetOptionalParams,
  ) => Promise<ApplicationInsightsComponentAvailableFeatures>;
}

function _getComponentAvailableFeatures(context: ApplicationInsightsManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: ComponentAvailableFeaturesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getComponentAvailableFeaturesOperations(
  context: ApplicationInsightsManagementContext,
): ComponentAvailableFeaturesOperations {
  return {
    ..._getComponentAvailableFeatures(context),
  };
}

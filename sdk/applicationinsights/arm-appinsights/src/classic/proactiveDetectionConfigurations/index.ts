// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { update, get, list } from "../../api/proactiveDetectionConfigurations/operations.js";
import {
  ProactiveDetectionConfigurationsUpdateOptionalParams,
  ProactiveDetectionConfigurationsGetOptionalParams,
  ProactiveDetectionConfigurationsListOptionalParams,
} from "../../api/proactiveDetectionConfigurations/options.js";
import { ApplicationInsightsComponentProactiveDetectionConfiguration } from "../../models/componentAPIs/models.js";

/** Interface representing a ProactiveDetectionConfigurations operations. */
export interface ProactiveDetectionConfigurationsOperations {
  /** Update the ProactiveDetection configuration for this configuration id. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    configurationId: string,
    proactiveDetectionProperties: ApplicationInsightsComponentProactiveDetectionConfiguration,
    options?: ProactiveDetectionConfigurationsUpdateOptionalParams,
  ) => Promise<ApplicationInsightsComponentProactiveDetectionConfiguration>;
  /** Get the ProactiveDetection configuration for this configuration id. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    configurationId: string,
    options?: ProactiveDetectionConfigurationsGetOptionalParams,
  ) => Promise<ApplicationInsightsComponentProactiveDetectionConfiguration>;
  /** Gets a list of ProactiveDetection configurations of an Application Insights component. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ProactiveDetectionConfigurationsListOptionalParams,
  ) => Promise<ApplicationInsightsComponentProactiveDetectionConfiguration[]>;
}

function _getProactiveDetectionConfigurations(context: ApplicationInsightsManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      resourceName: string,
      configurationId: string,
      proactiveDetectionProperties: ApplicationInsightsComponentProactiveDetectionConfiguration,
      options?: ProactiveDetectionConfigurationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        resourceName,
        configurationId,
        proactiveDetectionProperties,
        options,
      ),
    get: (
      resourceGroupName: string,
      resourceName: string,
      configurationId: string,
      options?: ProactiveDetectionConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, configurationId, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ProactiveDetectionConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
  };
}

export function _getProactiveDetectionConfigurationsOperations(
  context: ApplicationInsightsManagementContext,
): ProactiveDetectionConfigurationsOperations {
  return {
    ..._getProactiveDetectionConfigurations(context),
  };
}

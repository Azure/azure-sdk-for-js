// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { update, get } from "../../api/componentCurrentBillingFeatures/operations.js";
import {
  ComponentCurrentBillingFeaturesUpdateOptionalParams,
  ComponentCurrentBillingFeaturesGetOptionalParams,
} from "../../api/componentCurrentBillingFeatures/options.js";
import { ApplicationInsightsComponentBillingFeatures } from "../../models/componentAPIs/models.js";

/** Interface representing a ComponentCurrentBillingFeatures operations. */
export interface ComponentCurrentBillingFeaturesOperations {
  /** Update current billing features for an Application Insights component. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    billingFeaturesProperties: ApplicationInsightsComponentBillingFeatures,
    options?: ComponentCurrentBillingFeaturesUpdateOptionalParams,
  ) => Promise<ApplicationInsightsComponentBillingFeatures>;
  /** Returns current billing features for an Application Insights component. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ComponentCurrentBillingFeaturesGetOptionalParams,
  ) => Promise<ApplicationInsightsComponentBillingFeatures>;
}

function _getComponentCurrentBillingFeatures(context: ApplicationInsightsManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      resourceName: string,
      billingFeaturesProperties: ApplicationInsightsComponentBillingFeatures,
      options?: ComponentCurrentBillingFeaturesUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, billingFeaturesProperties, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: ComponentCurrentBillingFeaturesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getComponentCurrentBillingFeaturesOperations(
  context: ApplicationInsightsManagementContext,
): ComponentCurrentBillingFeaturesOperations {
  return {
    ..._getComponentCurrentBillingFeatures(context),
  };
}

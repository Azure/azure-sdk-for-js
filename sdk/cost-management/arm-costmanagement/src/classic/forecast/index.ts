// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import { externalCloudProviderUsage, usage } from "../../api/forecast/operations.js";
import {
  ForecastExternalCloudProviderUsageOptionalParams,
  ForecastUsageOptionalParams,
} from "../../api/forecast/options.js";
import {
  ForecastDefinition,
  ForecastResult,
  ExternalCloudProviderType,
} from "../../models/models.js";

/** Interface representing a Forecast operations. */
export interface ForecastOperations {
  /** Lists the forecast charges for external cloud provider type defined. */
  externalCloudProviderUsage: (
    externalCloudProviderType: ExternalCloudProviderType,
    externalCloudProviderId: string,
    parameters: ForecastDefinition,
    options?: ForecastExternalCloudProviderUsageOptionalParams,
  ) => Promise<ForecastResult>;
  /** Lists the forecast charges for scope defined. */
  usage: (
    scope: string,
    parameters: ForecastDefinition,
    options?: ForecastUsageOptionalParams,
  ) => Promise<ForecastResult | undefined>;
}

function _getForecast(context: CostManagementContext) {
  return {
    externalCloudProviderUsage: (
      externalCloudProviderType: ExternalCloudProviderType,
      externalCloudProviderId: string,
      parameters: ForecastDefinition,
      options?: ForecastExternalCloudProviderUsageOptionalParams,
    ) =>
      externalCloudProviderUsage(
        context,
        externalCloudProviderType,
        externalCloudProviderId,
        parameters,
        options,
      ),
    usage: (scope: string, parameters: ForecastDefinition, options?: ForecastUsageOptionalParams) =>
      usage(context, scope, parameters, options),
  };
}

export function _getForecastOperations(context: CostManagementContext): ForecastOperations {
  return {
    ..._getForecast(context),
  };
}

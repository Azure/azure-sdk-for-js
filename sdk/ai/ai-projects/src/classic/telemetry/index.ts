// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { getAppInsights, updateTelemetryOptions, getConnectionString, getTelemetryOptions } from "../../api/telemetry/index.js";
import type { TelemetryOptions } from "../../api/telemetry/index.js";
import type { GetAppInsightsResponse } from "../../models/models.js";
import type { TelemetryGetAppInsightsOptionalParams } from "../../api/options.js";

/** Interface representing a Telemetry operations. */
export interface TelemetryOperations {
  /** Gets the properties of the specified Application Insights resource */
  getAppInsights: (
    appInsightsResourceUrl: string,
    options?: TelemetryGetAppInsightsOptionalParams,
  ) => Promise<GetAppInsightsResponse>;
  /**
   * Get the appinsights connection string confired in the workspace
   * @returns The telemetry connection string
   **/
  getConnectionString(
    appInsightsResourceUrl: string,
    options?: TelemetryGetAppInsightsOptionalParams,
  ): Promise<string | undefined>;

  /**
   * Update the telemetry settings
   * @param options - The telemetry options
   * @returns void
   * */
  updateSettings(options: TelemetryOptions): void;

  /**
   * get the telemetry settings
   * @returns The telemetry options
   * */
  getSettings(): TelemetryOptions;
}

function _getTelemetry(context: AIProjectContext) {
  return {
    getAppInsights: async (
      appInsightsResourceUrl: string,
      options?: TelemetryGetAppInsightsOptionalParams,
    ) => getAppInsights(context, appInsightsResourceUrl, options),
    getConnectionString: async (
      appInsightsResourceUrl: string,
      options?: TelemetryGetAppInsightsOptionalParams,
    ) => getConnectionString(context, appInsightsResourceUrl, options),
    updateSettings: (options: TelemetryOptions) => updateTelemetryOptions(options),
    getSettings: () => getTelemetryOptions(),
  };
}

export function _getTelemetryOperations(
  context: AIProjectContext,
): TelemetryOperations {
  return {
    ..._getTelemetry(context),
  };
}

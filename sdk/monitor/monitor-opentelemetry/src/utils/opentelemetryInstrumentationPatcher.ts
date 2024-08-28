// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Instrumentation } from "@opentelemetry/instrumentation/build/src/types";
import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatEnvironmentConfig,
  StatsbeatInstrumentationMap,
} from "../types";
import { Logger } from "../shared/logging";

/**
 * Patch OpenTelemetry Instrumentation enablement to update the statsbeat environment variable with the enabled instrumentations
 * @internal
 */
export function patchOpenTelemetryInstrumentationEnable(): void {
  const emptyStatsbeatConfig: string = JSON.stringify({ instrumentation: 0, feature: 0 });
  try {
    require.resolve("../../../@opentelemetry/instrumentation");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const autoLoaderUtils = require("../../../@opentelemetry/instrumentation/build/src/autoLoaderUtils");

    const originalModuleDefinition = autoLoaderUtils.enableInstrumentations;

    // Parses the enabled instrumentations and then ammends the statsbeat instrumentation environment variable
    autoLoaderUtils.enableInstrumentations = function (instrumentations: Instrumentation[]) {
      try {
        const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
          process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
        );
        let updatedStatsbeat = {};
        for (let i = 0; i < instrumentations.length; i++) {
          updatedStatsbeat = {
            instrumentation: (statsbeatOptions.instrumentation |=
              StatsbeatInstrumentationMap.get(instrumentations[i].instrumentationName) || 0),
            feature: statsbeatOptions.feature,
          };
        }
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify(updatedStatsbeat);
      } catch (e) {
        Logger.getInstance().warn("Failed to parse the statsbeat environment variable");
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, prefer-rest-params
      return originalModuleDefinition.apply(this, arguments);
    };
  } catch (e) {
    // Fail silently if the module is not found
  }
}

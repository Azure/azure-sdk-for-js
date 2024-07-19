// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import type { Instrumentation } from "@opentelemetry/instrumentation/build/src/types";
import { AZURE_MONITOR_STATSBEAT_FEATURES, StatsbeatEnvironmentConfig, StatsbeatInstrumentationMap } from "../types";

/**
 * Patch OpenTelemetry instrumentations for statsbeat colleciton.
 * @internal
 */
export function patchOpenTelemetryInstrumentations(): void {
  const emptyStatsbeatConfig: string = JSON.stringify({ instrumentation: 0, feature: 0 });
  try {
    require.resolve("../../../@opentelemetry/instrumentation");
    const autoLoaderUtils = require("../../../@opentelemetry/instrumentation/build/src/autoLoaderUtils");

    const originalModuleDefinition = autoLoaderUtils.enableInstrumentations;

    // Parses the enabled instrumentations and then ammends the statsbeat instrumentation environment variable
    autoLoaderUtils.enableInstrumentations = function (instrumentations: Instrumentation[]) {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig
      );
      let updatedStatsbeat = {};
      for (let i = 0; i < instrumentations.length; i++) {
          updatedStatsbeat = {
            instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentationMap.get(instrumentations[i].instrumentationName) || 0),
            feature: statsbeatOptions.feature,
          };
      }
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify(updatedStatsbeat);
      return originalModuleDefinition.apply(this, arguments);
    }
  }
  catch (e) {
    // Fail silently if the module is not found
  }
}

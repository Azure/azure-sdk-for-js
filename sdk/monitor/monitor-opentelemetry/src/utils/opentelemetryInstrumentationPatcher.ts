// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StatsbeatEnvironmentConfig } from "../types.js";
import { AZURE_MONITOR_STATSBEAT_FEATURES, StatsbeatInstrumentationMap } from "../types.js";
import { Logger } from "../shared/logging/index.js";
import { addNumberFlag } from "./common.js";
import { loadOpenTelemetryInstrumentation } from "../shared/module.js";

let patched = false;

/**
 * Patch OpenTelemetry Instrumentation enablement to update the statsbeat environment variable with the enabled instrumentations
 * @internal
 */
export function patchOpenTelemetryInstrumentationEnable(): void {
  if (patched) {
    return;
  }
  try {
    const instrumentationModule = loadOpenTelemetryInstrumentation();
    const originalRegisterInstrumentations = instrumentationModule.registerInstrumentations;

    // SDK 3.x no longer exports the private autoLoaderUtils subpath.
    instrumentationModule.registerInstrumentations = (options) => {
      try {
        const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
          process.env[AZURE_MONITOR_STATSBEAT_FEATURES] ||
            JSON.stringify({ instrumentation: 0, feature: 0 }),
        );
        for (const instrumentation of options.instrumentations?.flat() ?? []) {
          statsbeatOptions.instrumentation = addNumberFlag(
            statsbeatOptions.instrumentation,
            StatsbeatInstrumentationMap.get(instrumentation.instrumentationName) || 0,
          );
        }
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify(statsbeatOptions);
      } catch (e) {
        Logger.getInstance().warn("Failed to parse the statsbeat environment variable", e);
      }
      return originalRegisterInstrumentations(options);
    };
    patched = true;
  } catch (e) {
    Logger.getInstance().warn("Failed to register the instrumentation Statsbeat hook", e);
  }
}

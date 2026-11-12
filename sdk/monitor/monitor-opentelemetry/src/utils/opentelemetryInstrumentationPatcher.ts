// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InstrumentationBase } from "../shared/instrumentation.mjs";
import type { Instrumentation } from "@opentelemetry/instrumentation";
import type { StatsbeatEnvironmentConfig } from "../types.js";
import { AZURE_MONITOR_STATSBEAT_FEATURES, StatsbeatInstrumentationMap } from "../types.js";
import { Logger } from "../shared/logging/index.js";
import { addNumberFlag } from "./common.js";
import { loadOpenTelemetryInstrumentation } from "../shared/module.js";

const patchedPrototypes = new WeakSet<Instrumentation>();

/**
 * Track instrumentation provider registration in both ESM and CommonJS Statsbeat hooks.
 * @internal
 */
export function patchOpenTelemetryInstrumentationEnable(): void {
  try {
    const prototypes: Instrumentation[] = [
      InstrumentationBase.prototype,
      loadOpenTelemetryInstrumentation().InstrumentationBase.prototype,
    ];
    for (const prototype of prototypes) {
      if (patchedPrototypes.has(prototype)) {
        continue;
      }
      // eslint-disable-next-line @typescript-eslint/unbound-method -- Preserve the receiver with .call below.
      const originalSetTracerProvider = prototype.setTracerProvider;

      // Registration binds providers even when the instrumentation is already enabled.
      // Hook the instance lifecycle so previously captured registration functions still work.
      prototype.setTracerProvider = function (tracerProvider) {
        originalSetTracerProvider.call(this, tracerProvider);
        const flag = StatsbeatInstrumentationMap.get(this.instrumentationName);
        if (flag === undefined) {
          return;
        }
        try {
          const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
            process.env[AZURE_MONITOR_STATSBEAT_FEATURES] ||
              JSON.stringify({ instrumentation: 0, feature: 0 }),
          );
          statsbeatOptions.instrumentation = addNumberFlag(statsbeatOptions.instrumentation, flag);
          process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify(statsbeatOptions);
        } catch (e) {
          Logger.getInstance().warn("Failed to parse the statsbeat environment variable", e);
        }
      };
      patchedPrototypes.add(prototype);
    }
  } catch (e) {
    Logger.getInstance().warn("Failed to register the instrumentation Statsbeat hook", e);
  }
}

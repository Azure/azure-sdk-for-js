// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatEnvironmentConfig,
  StatsbeatInstrumentation,
} from "../types";

/**
 * Patch OpenTelemetry instrumentations for statsbeat colleciton.
 * @internal
 */
export function patchOpenTelemetryInstrumentations(): void {
  const emptyStatsbeatConfig: string = JSON.stringify({ instrumentation: 0, feature: 0 });
  /** AMQPLIB */
  try {
    require.resolve("@opentelemetry/instrumentation-amqplib");
    const { AmqplibInstrumentation } = require("@opentelemetry/instrumentation-amqplib");
    const originalInit = AmqplibInstrumentation.prototype.init;
    AmqplibInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.AMQPLIB),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // amqplib instrumentation not found
  }
  try {
    require.resolve("@opentelemetry/instrumentation");
    const { InstrumentationNodeModuleDefinition } = require("@opentelemetry/instrumentation").InstrumentationNodeModuleDefinition;
    const originalInit = InstrumentationNodeModuleDefinition.prototype.init;
    InstrumentationNodeModuleDefinition.prototype.init = function () {
      console.log(this.name);
      return originalInit.apply(this, arguments);
    }
  } catch (e) {
    console.log(e);
  }
}

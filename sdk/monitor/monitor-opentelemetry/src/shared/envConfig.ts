// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMonitorOpenTelemetryOptions } from "../types.js";
import { Logger } from "./logging/index.js";
const TRACES_SAMPLER = "OTEL_TRACES_SAMPLER";
const TRACES_SAMPLER_ARG = "OTEL_TRACES_SAMPLER_ARG";
const RATE_LIMITED_SAMPLER = "microsoft.rate_limited";
const FIXED_PERCENTAGE_SAMPLER = "microsoft.fixed_percentage";

/**
 * Azure Monitor OpenTelemetry Client Configuration through Env variables
 * @internal
 */
export class EnvConfig implements AzureMonitorOpenTelemetryOptions {
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  public samplingRatio?: number;
  /** The maximum number of spans to sample per second. (Default undefined)*/
  public tracesPerSecond?: number;

  private static instance: EnvConfig;

  /** Get Singleton instance */
  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }
    return EnvConfig.instance;
  }

  /**
   * Initializes a new instance of the EnvConfig class.
   */
  constructor() {
    const envSampler = process.env[TRACES_SAMPLER];
    const envSamplerArg = process.env[TRACES_SAMPLER_ARG];
    if (envSampler && envSamplerArg) {
      if (envSampler === RATE_LIMITED_SAMPLER || envSampler === FIXED_PERCENTAGE_SAMPLER) {
        const argValue = Number(envSamplerArg);
        if (isNaN(argValue) || argValue < 0) {
          Logger.getInstance().warn(
            "Invalid value for OTEL_TRACES_SAMPLER_ARG. It should be a non-negative number.",
          );
        } else {
          if (envSampler === RATE_LIMITED_SAMPLER) {
            this.tracesPerSecond = argValue;
          } else if (envSampler === FIXED_PERCENTAGE_SAMPLER) {
            this.samplingRatio = argValue;
          }
        }
      }
      // Not supported sampler
      else {
        Logger.getInstance().warn(
          `Unsupported value for OTEL_TRACES_SAMPLER: ${envSampler}. Supported values are: ${RATE_LIMITED_SAMPLER}, ${FIXED_PERCENTAGE_SAMPLER}.`,
        );
      }
    }
  }
}

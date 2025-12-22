// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMonitorOpenTelemetryOptions } from "../types.js";
import {
  AlwaysOffSampler,
  AlwaysOnSampler,
  ParentBasedSampler,
  Sampler,
  TraceIdRatioBasedSampler,
} from "@opentelemetry/sdk-trace-base";
import { Logger } from "./logging/index.js";
const TRACES_SAMPLER = "OTEL_TRACES_SAMPLER";
const TRACES_SAMPLER_ARG = "OTEL_TRACES_SAMPLER_ARG";
const RATE_LIMITED_SAMPLER = "microsoft.rate_limited";
const FIXED_PERCENTAGE_SAMPLER = "microsoft.fixed_percentage";
const ALWAYS_ON_SAMPLER = "always_on";
const ALWAYS_OFF_SAMPLER = "always_off";
const TRACE_ID_RATIO_SAMPLER = "traceidratio";
const PARENT_BASED_ALWAYS_ON_SAMPLER = "parentbased_always_on";
const PARENT_BASED_ALWAYS_OFF_SAMPLER = "parentbased_always_off";
const PARENT_BASED_TRACE_ID_RATIO_SAMPLER = "parentbased_traceidratio";
const SUPPORTED_OTEL_SAMPLERS = [
  RATE_LIMITED_SAMPLER,
  FIXED_PERCENTAGE_SAMPLER,
  ALWAYS_ON_SAMPLER,
  ALWAYS_OFF_SAMPLER,
  TRACE_ID_RATIO_SAMPLER,
  PARENT_BASED_ALWAYS_ON_SAMPLER,
  PARENT_BASED_ALWAYS_OFF_SAMPLER,
  PARENT_BASED_TRACE_ID_RATIO_SAMPLER,
];

/**
 * Azure Monitor OpenTelemetry Client Configuration through Env variables
 * @internal
 */
export class EnvConfig implements AzureMonitorOpenTelemetryOptions {
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  public samplingRatio?: number;
  /** The maximum number of spans to sample per second. (Default undefined)*/
  public tracesPerSecond?: number;
  /** Custom OpenTelemetry sampler derived from env configuration */
  public sampler?: Sampler;

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
    const envSampler = process.env[TRACES_SAMPLER]?.trim().toLowerCase();
    const envSamplerArg = process.env[TRACES_SAMPLER_ARG];

    if (!envSampler) {
      return;
    }

    if (envSampler === RATE_LIMITED_SAMPLER || envSampler === FIXED_PERCENTAGE_SAMPLER) {
      this._applyMicrosoftSampler(envSampler, envSamplerArg);
      return;
    }

    this._applyOtelSampler(envSampler, envSamplerArg);
  }

  private _applyMicrosoftSampler(envSampler: string, envSamplerArg?: string): void {
    if (envSamplerArg === undefined) {
      Logger.getInstance().warn(
        `OTEL_TRACES_SAMPLER_ARG must be set when OTEL_TRACES_SAMPLER is ${envSampler}.`,
      );
      return;
    }

    const argValue = Number(envSamplerArg);
    if (isNaN(argValue) || argValue < 0) {
      Logger.getInstance().warn(
        "Invalid value for OTEL_TRACES_SAMPLER_ARG. It should be a non-negative number.",
      );
      return;
    }

    if (envSampler === RATE_LIMITED_SAMPLER) {
      this.tracesPerSecond = argValue;
    } else {
      this.samplingRatio = argValue;
    }
  }

  private _applyOtelSampler(envSampler: string, envSamplerArg?: string): void {
    switch (envSampler) {
      case ALWAYS_ON_SAMPLER:
        this.sampler = new AlwaysOnSampler();
        this.samplingRatio = 1;
        return;
      case ALWAYS_OFF_SAMPLER:
        this.sampler = new AlwaysOffSampler();
        this.samplingRatio = 0;
        return;
      case TRACE_ID_RATIO_SAMPLER: {
        const ratio = this._parseProbability(envSamplerArg);
        this.sampler = new TraceIdRatioBasedSampler(ratio);
        this.samplingRatio = ratio;
        return;
      }
      case PARENT_BASED_ALWAYS_ON_SAMPLER:
        this.sampler = new ParentBasedSampler({ root: new AlwaysOnSampler() });
        this.samplingRatio = 1;
        return;
      case PARENT_BASED_ALWAYS_OFF_SAMPLER:
        this.sampler = new ParentBasedSampler({ root: new AlwaysOffSampler() });
        this.samplingRatio = 0;
        return;
      case PARENT_BASED_TRACE_ID_RATIO_SAMPLER: {
        const ratio = this._parseProbability(envSamplerArg);
        this.sampler = new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(ratio) });
        this.samplingRatio = ratio;
        return;
      }
      default:
        Logger.getInstance().warn(
          `Unsupported value for OTEL_TRACES_SAMPLER: ${envSampler}. Supported values are: ${SUPPORTED_OTEL_SAMPLERS.join(", ")}.`,
        );
    }
  }

  private _parseProbability(arg?: string): number {
    if (arg === undefined || arg === "") {
      return 1;
    }

    const parsed = Number(arg);
    if (isNaN(parsed) || parsed < 0 || parsed > 1) {
      Logger.getInstance().warn(
        "Invalid value for OTEL_TRACES_SAMPLER_ARG. It should be a number in the range [0,1].",
      );
      return 1;
    }

    return parsed;
  }
}

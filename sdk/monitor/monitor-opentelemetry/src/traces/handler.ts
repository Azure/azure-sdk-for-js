// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestOptions } from "node:http";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import {
  AzureMonitorTraceExporter,
  RateLimitedSampler,
} from "@azure/monitor-opentelemetry-exporter";
import type { BufferConfig, Sampler } from "@opentelemetry/sdk-trace-base";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import type {
  HttpInstrumentationConfig,
  IgnoreOutgoingRequestFunction,
} from "@opentelemetry/instrumentation-http";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { MongoDBInstrumentation } from "@opentelemetry/instrumentation-mongodb";
import { MySQLInstrumentation } from "@opentelemetry/instrumentation-mysql";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { RedisInstrumentation } from "@opentelemetry/instrumentation-redis";

import type { InternalConfig } from "../shared/config.js";
import type { MetricHandler } from "../metrics/handler.js";
import { ignoreOutgoingRequestHook } from "../utils/common.js";
import { AzureMonitorSpanProcessor } from "./spanProcessor.js";
import { AzureFunctionsHook } from "./azureFnHook.js";
import type { Instrumentation } from "@opentelemetry/instrumentation";
import { ApplicationInsightsSampler } from "./sampler.js";

/**
 * Azure Monitor OpenTelemetry Trace Handler
 */
export class TraceHandler {
  private _batchSpanProcessor: BatchSpanProcessor;
  private _azureSpanProcessor: AzureMonitorSpanProcessor;
  private _azureExporter: AzureMonitorTraceExporter;
  private _instrumentations: Instrumentation[];
  private _config: InternalConfig;
  private _metricHandler: MetricHandler;
  private _azureFunctionsHook: AzureFunctionsHook;
  private _sampler: Sampler;

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(config: InternalConfig, metricHandler: MetricHandler) {
    this._config = config;
    this._metricHandler = metricHandler;
    this._instrumentations = [];
    // Check sampler precedence
    if (this._config.sampler) {
      this._sampler = this._config.sampler;
    } else if (this._config.tracesPerSecond && this._config.tracesPerSecond >= 0) {
      // If tracesPerSecond is set, use RateLimitedSampler
      this._sampler = new RateLimitedSampler(this._config.tracesPerSecond);
    } else {
      // Otherwise, use PercentageSampler with samplingRatio
      this._sampler = new ApplicationInsightsSampler(this._config.samplingRatio);
    }
    this._azureExporter = new AzureMonitorTraceExporter(this._config.azureMonitorExporterOptions);
    const bufferConfig: BufferConfig = {
      maxExportBatchSize: 512,
      scheduledDelayMillis: 5000,
      exportTimeoutMillis: 30000,
      maxQueueSize: 2048,
    };
    this._batchSpanProcessor = new BatchSpanProcessor(this._azureExporter, bufferConfig);
    this._azureSpanProcessor = new AzureMonitorSpanProcessor(this._metricHandler);
    this._azureFunctionsHook = new AzureFunctionsHook();
    this._initializeInstrumentations();
  }

  public getSampler(): Sampler {
    return this._sampler;
  }

  public getBatchSpanProcessor(): BatchSpanProcessor {
    return this._batchSpanProcessor;
  }

  public getAzureMonitorSpanProcessor(): AzureMonitorSpanProcessor {
    return this._azureSpanProcessor;
  }

  public getInstrumentations(): Instrumentation[] {
    return this._instrumentations;
  }

  /**
   * Shutdown handler
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  public async shutdown(): Promise<void> {
    this._azureFunctionsHook.shutdown();
  }

  /**
   * Start auto collection of telemetry
   */
  private _initializeInstrumentations(): void {
    if (this._config.instrumentationOptions.http?.enabled) {
      const httpinstrumentationOptions = this._config.instrumentationOptions
        .http as HttpInstrumentationConfig;
      const providedIgnoreOutgoingRequestHook =
        httpinstrumentationOptions.ignoreOutgoingRequestHook;
      const mergedIgnoreOutgoingRequestHook: IgnoreOutgoingRequestFunction = (
        request: RequestOptions,
      ) => {
        const result = ignoreOutgoingRequestHook(request);
        if (!result) {
          // Not internal call
          if (providedIgnoreOutgoingRequestHook) {
            // Provided hook in config
            return providedIgnoreOutgoingRequestHook(request);
          }
        }
        return result;
      };
      httpinstrumentationOptions.ignoreOutgoingRequestHook = mergedIgnoreOutgoingRequestHook;
      this._instrumentations.push(
        new HttpInstrumentation(this._config.instrumentationOptions.http),
      );
    }
    if (this._config.instrumentationOptions.azureSdk?.enabled) {
      this._instrumentations.push(
        createAzureSdkInstrumentation(this._config.instrumentationOptions.azureSdk),
      );
    }
    if (this._config.instrumentationOptions.mongoDb?.enabled) {
      this._instrumentations.push(
        new MongoDBInstrumentation(this._config.instrumentationOptions.mongoDb),
      );
    }
    if (this._config.instrumentationOptions.mySql?.enabled) {
      this._instrumentations.push(
        new MySQLInstrumentation(this._config.instrumentationOptions.mySql),
      );
    }
    if (this._config.instrumentationOptions.postgreSql?.enabled) {
      this._instrumentations.push(
        new PgInstrumentation(this._config.instrumentationOptions.postgreSql),
      );
    }
    if (
      this._config.instrumentationOptions.redis?.enabled ||
      this._config.instrumentationOptions.redis4?.enabled
    ) {
      this._instrumentations.push(
        new RedisInstrumentation(this._config.instrumentationOptions.redis),
      );
    }
  }
}

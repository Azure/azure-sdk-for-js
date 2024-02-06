// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestOptions } from "http";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { BatchSpanProcessor, BufferConfig } from "@opentelemetry/sdk-trace-base";
import {
  HttpInstrumentation,
  HttpInstrumentationConfig,
  IgnoreOutgoingRequestFunction,
} from "@opentelemetry/instrumentation-http";
import { MongoDBInstrumentation } from "@opentelemetry/instrumentation-mongodb";
import { MySQLInstrumentation } from "@opentelemetry/instrumentation-mysql";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { RedisInstrumentation } from "@opentelemetry/instrumentation-redis";
import { RedisInstrumentation as Redis4Instrumentation } from "@opentelemetry/instrumentation-redis-4";

import { InternalConfig } from "../shared/config";
import { MetricHandler } from "../metrics/handler";
import { ignoreOutgoingRequestHook } from "../utils/common";
import { AzureMonitorSpanProcessor } from "./spanProcessor";
import { AzureFunctionsHook } from "./azureFnHook";
import { Instrumentation } from "@opentelemetry/instrumentation";
import { ApplicationInsightsSampler } from "./sampler";
import { ProxyTracerProvider, trace } from "@opentelemetry/api";

/**
 * Azure Monitor OpenTelemetry Trace Handler
 */
export class TraceHandler {
  private _spanProcessor: BatchSpanProcessor;
  private _azureExporter: AzureMonitorTraceExporter;
  private _instrumentations: Instrumentation[];
  private _config: InternalConfig;
  private _metricHandler: MetricHandler;
  private _azureFunctionsHook: AzureFunctionsHook;
  private _aiSampler: ApplicationInsightsSampler;

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(config: InternalConfig, metricHandler: MetricHandler) {
    this._config = config;
    this._metricHandler = metricHandler;
    this._instrumentations = [];
    this._aiSampler = new ApplicationInsightsSampler(this._config.samplingRatio);
    this._azureExporter = new AzureMonitorTraceExporter(this._config.azureMonitorExporterOptions);
    const bufferConfig: BufferConfig = {
      maxExportBatchSize: 512,
      scheduledDelayMillis: 5000,
      exportTimeoutMillis: 30000,
      maxQueueSize: 2048,
    };
    this._spanProcessor = new BatchSpanProcessor(this._azureExporter, bufferConfig);
    this._azureFunctionsHook = new AzureFunctionsHook();
    this._initializeInstrumentations();
  }

  public start(): void {
    try {
      const azureSpanProcessor = new AzureMonitorSpanProcessor(this._metricHandler);
      (
        (trace.getTracerProvider() as ProxyTracerProvider).getDelegate() as NodeTracerProvider
      ).addSpanProcessor(azureSpanProcessor);
    } catch (error) {}
  }

  public getSampler(): ApplicationInsightsSampler {
    return this._aiSampler;
  }

  public getSpanProcessor(): BatchSpanProcessor {
    return this._spanProcessor;
  }

  public getInstrumentations(): Instrumentation[] {
    return this._instrumentations;
  }

  /**
   * Shutdown handler
   */
  public async shutdown(): Promise<void> {
    this._azureFunctionsHook.shutdown();
  }

  /**
   * Start auto collection of telemetry
   */
  private _initializeInstrumentations() {
    if (this._config.instrumentationOptions.http?.enabled) {
      const httpinstrumentationOptions = this._config.instrumentationOptions
        .http as HttpInstrumentationConfig;
      const providedIgnoreOutgoingRequestHook =
        httpinstrumentationOptions.ignoreOutgoingRequestHook;
      const mergedIgnoreOutgoingRequestHook: IgnoreOutgoingRequestFunction = (
        request: RequestOptions
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
        new HttpInstrumentation(this._config.instrumentationOptions.http)
      );
    }
    if (this._config.instrumentationOptions.azureSdk?.enabled) {
      this._instrumentations.push(
        createAzureSdkInstrumentation(this._config.instrumentationOptions.azureSdk)
      );
    }
    if (this._config.instrumentationOptions.mongoDb?.enabled) {
      this._instrumentations.push(
        new MongoDBInstrumentation(this._config.instrumentationOptions.mongoDb)
      );
    }
    if (this._config.instrumentationOptions.mySql?.enabled) {
      this._instrumentations.push(
        new MySQLInstrumentation(this._config.instrumentationOptions.mySql)
      );
    }
    if (this._config.instrumentationOptions.postgreSql?.enabled) {
      this._instrumentations.push(
        new PgInstrumentation(this._config.instrumentationOptions.postgreSql)
      );
    }
    if (this._config.instrumentationOptions.redis?.enabled) {
      this._instrumentations.push(
        new RedisInstrumentation(this._config.instrumentationOptions.redis)
      );
    }
    if (this._config.instrumentationOptions.redis4?.enabled) {
      this._instrumentations.push(
        new Redis4Instrumentation(this._config.instrumentationOptions.redis4)
      );
    }
  }
}

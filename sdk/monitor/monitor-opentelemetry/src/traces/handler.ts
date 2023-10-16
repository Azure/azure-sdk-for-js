// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestOptions } from "http";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { NodeTracerProvider, NodeTracerConfig } from "@opentelemetry/sdk-trace-node";
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
import { metrics } from "@opentelemetry/api";
import { Instrumentation } from "@opentelemetry/instrumentation";
import { ApplicationInsightsSampler } from "./sampler";

/**
 * Azure Monitor OpenTelemetry Trace Handler
 */
export class TraceHandler {
  private _spanProcessor: BatchSpanProcessor;
  private _tracerProvider: NodeTracerProvider;
  private _azureExporter: AzureMonitorTraceExporter;
  private _instrumentations: Instrumentation[];
  private _config: InternalConfig;
  private _metricHandler: MetricHandler;
  private _azureFunctionsHook: AzureFunctionsHook;

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(config: InternalConfig, metricHandler: MetricHandler) {
    this._config = config;
    this._metricHandler = metricHandler;
    this._instrumentations = [];
    const aiSampler = new ApplicationInsightsSampler(this._config.samplingRatio);
    const tracerConfig: NodeTracerConfig = {
      sampler: aiSampler,
      resource: this._config.resource,
      forceFlushTimeoutMillis: 30000,
    };
    this._tracerProvider = new NodeTracerProvider(tracerConfig);
    this._azureExporter = new AzureMonitorTraceExporter(this._config.azureMonitorExporterOptions);
    const bufferConfig: BufferConfig = {
      maxExportBatchSize: 512,
      scheduledDelayMillis: 5000,
      exportTimeoutMillis: 30000,
      maxQueueSize: 2048,
    };
    this._spanProcessor = new BatchSpanProcessor(this._azureExporter, bufferConfig);
    this._tracerProvider.addSpanProcessor(this._spanProcessor);
    this._tracerProvider.register();
    const azureSpanProcessor = new AzureMonitorSpanProcessor(this._metricHandler);
    this._tracerProvider.addSpanProcessor(azureSpanProcessor);
    this._azureFunctionsHook = new AzureFunctionsHook();
    this._initializeInstrumentations();
  }

  /**
   * Shutdown handler, all Tracer providers will return no-op Tracers
   */
  public async shutdown(): Promise<void> {
    await this._tracerProvider.shutdown();
    this._azureFunctionsHook.shutdown();
  }

  /**
   * Force flush Tracer Provider
   */
  public async flush(): Promise<void> {
    return this._tracerProvider.forceFlush();
  }

  /**
   * Disable all OpenTelemetry Instrumentations
   */
  public disableInstrumentations() {
    this._instrumentations.forEach((instrumentation) => {
      instrumentation.disable();
    });
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
    this._instrumentations.forEach((instrumentation) => {
      instrumentation.setTracerProvider(this._tracerProvider);
      instrumentation.setMeterProvider(metrics.getMeterProvider());
      if (instrumentation.getConfig().enabled) {
        instrumentation.enable();
      }
    });
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestOptions } from "http";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import {
  ApplicationInsightsSampler,
  AzureMonitorTraceExporter,
} from "@azure/monitor-opentelemetry-exporter";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { NodeTracerProvider, NodeTracerConfig } from "@opentelemetry/sdk-trace-node";
import {
  BatchSpanProcessor,
  BufferConfig,
  SpanProcessor,
  Tracer,
} from "@opentelemetry/sdk-trace-base";
import { Instrumentation } from "@opentelemetry/instrumentation";
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

import { AzureMonitorOpenTelemetryConfig } from "../shared/config";
import { MetricHandler } from "../metrics/handler";
import { ignoreOutgoingRequestHook } from "../utils/common";
import { AzureMonitorSpanProcessor } from "./spanProcessor";
import { AzureFunctionsHook } from "./azureFnHook";

/**
 * Azure Monitor OpenTelemetry Trace Handler
 */
export class TraceHandler {
  private _spanProcessor: BatchSpanProcessor;
  private _tracerProvider: NodeTracerProvider;
  private _tracer: Tracer;
  private _azureExporter: AzureMonitorTraceExporter;
  private _otlpExporter?: OTLPTraceExporter;
  private _instrumentations: Instrumentation[];
  private _httpInstrumentation?: Instrumentation;
  private _azureSdkInstrumentation?: Instrumentation;
  private _mongoDbInstrumentation?: Instrumentation;
  private _mySqlInstrumentation?: Instrumentation;
  private _postgressInstrumentation?: Instrumentation;
  private _redisInstrumentation?: Instrumentation;
  private _redis4Instrumentation?: Instrumentation;
  private _config: AzureMonitorOpenTelemetryConfig;
  private _metricHandler: MetricHandler;
  private _azureFunctionsHook: AzureFunctionsHook;

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(config: AzureMonitorOpenTelemetryConfig, metricHandler: MetricHandler) {
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
    this._azureExporter = new AzureMonitorTraceExporter(this._config.azureMonitorExporterConfig);
    const bufferConfig: BufferConfig = {
      maxExportBatchSize: 512,
      scheduledDelayMillis: 5000,
      exportTimeoutMillis: 30000,
      maxQueueSize: 2048,
    };
    this._spanProcessor = new BatchSpanProcessor(this._azureExporter, bufferConfig);
    this._tracerProvider.addSpanProcessor(this._spanProcessor);

    if (this._config.otlpTraceExporterConfig?.enabled) {
      this._otlpExporter = new OTLPTraceExporter(config.otlpTraceExporterConfig);
      let otlpSpanProcessor = new BatchSpanProcessor(this._otlpExporter, bufferConfig);
      this._tracerProvider.addSpanProcessor(otlpSpanProcessor);
    }

    this._tracerProvider.register();
    this._tracer = this._tracerProvider.getTracer("AzureMonitorTracer");
    const azureSpanProcessor = new AzureMonitorSpanProcessor(this._metricHandler);
    this._tracerProvider.addSpanProcessor(azureSpanProcessor);
    this._azureFunctionsHook = new AzureFunctionsHook();
    this._initializeInstrumentations();
  }

  /**
   *Get OpenTelemetry TracerProvider
   */
  public getTracerProvider(): NodeTracerProvider {
    return this._tracerProvider;
  }

  /**
   *Get OpenTelemetry Tracer
   */
  public getTracer(): Tracer {
    return this._tracer;
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
   * Add OpenTelemetry Span Processor
   */
  public addSpanProcessor(spanProcessor: SpanProcessor) {
    this._tracerProvider.addSpanProcessor(spanProcessor);
  }

  /**
   * Add OpenTelemetry Instrumentation, should be called before calling start
   */
  public addInstrumentation(instrumentation?: Instrumentation) {
    if (instrumentation) {
      this._instrumentations.push(instrumentation);
    }
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
    if (!this._httpInstrumentation) {
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
      this._httpInstrumentation = new HttpInstrumentation(this._config.instrumentationOptions.http);
      this.addInstrumentation(this._httpInstrumentation);
    }
    if (!this._azureSdkInstrumentation) {
      this._azureSdkInstrumentation = createAzureSdkInstrumentation(
        this._config.instrumentationOptions.azureSdk
      ) as any;
      this.addInstrumentation(this._azureSdkInstrumentation);
    }
    if (!this._mongoDbInstrumentation) {
      this._mongoDbInstrumentation = new MongoDBInstrumentation(
        this._config.instrumentationOptions.mongoDb
      );
      this.addInstrumentation(this._mongoDbInstrumentation);
    }
    if (!this._mySqlInstrumentation) {
      this._mySqlInstrumentation = new MySQLInstrumentation(
        this._config.instrumentationOptions.mySql
      );
      this.addInstrumentation(this._mySqlInstrumentation);
    }
    if (!this._postgressInstrumentation) {
      this._postgressInstrumentation = new PgInstrumentation(
        this._config.instrumentationOptions.postgreSql
      );
      this.addInstrumentation(this._postgressInstrumentation);
    }
    if (!this._redisInstrumentation) {
      this._redisInstrumentation = new RedisInstrumentation(
        this._config.instrumentationOptions.redis
      );
      this.addInstrumentation(this._redisInstrumentation);
    }
    if (!this._redis4Instrumentation) {
      this._redis4Instrumentation = new Redis4Instrumentation(
        this._config.instrumentationOptions.redis4
      );
      this.addInstrumentation(this._redis4Instrumentation);
    }
    this._instrumentations.forEach((instrumentation) => {
      instrumentation.setTracerProvider(this._tracerProvider);
      instrumentation.setMeterProvider(this._metricHandler.getMeterProvider());
      if (instrumentation.getConfig().enabled) {
        instrumentation.enable();
      }
    });
  }
}

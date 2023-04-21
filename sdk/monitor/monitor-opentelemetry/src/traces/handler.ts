// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AzureMonitorExporterOptions,
  AzureMonitorTraceExporter,
} from "@azure/monitor-opentelemetry-exporter";
import { NodeTracerProvider, NodeTracerConfig } from "@opentelemetry/sdk-trace-node";
import {
  BatchSpanProcessor,
  BufferConfig,
  SpanProcessor,
  Tracer,
} from "@opentelemetry/sdk-trace-base";
import { TracerProvider } from "@opentelemetry/api";
import { Instrumentation } from "@opentelemetry/instrumentation";
import { AzureMonitorOpenTelemetryConfig } from "../config";
import { MetricHandler } from "../metrics/handler";

/**
 * Azure Monitor OpenTelemetry Trace Handler
 */
export class TraceHandler {
  private _spanProcessor: BatchSpanProcessor;
  private _tracerProvider: NodeTracerProvider;
  private _tracer: Tracer;
  private _exporter: AzureMonitorTraceExporter;
  private _instrumentations: Instrumentation[];

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(
    private _config: AzureMonitorOpenTelemetryConfig,
    private _metricHandler?: MetricHandler
  ) {
    this._instrumentations = [];
    const tracerConfig: NodeTracerConfig = {
      resource: this._config.resource,
      forceFlushTimeoutMillis: 30000,
    };
    this._tracerProvider = new NodeTracerProvider(tracerConfig);
    const exporterConfig: AzureMonitorExporterOptions = {
      connectionString: this._config.connectionString,
      aadTokenCredential: this._config.aadTokenCredential,
      storageDirectory: this._config.storageDirectory,
      disableOfflineStorage: this._config.disableOfflineStorage,
    };
    this._exporter = new AzureMonitorTraceExporter(exporterConfig);
    const bufferConfig: BufferConfig = {
      maxExportBatchSize: 512,
      scheduledDelayMillis: 5000,
      exportTimeoutMillis: 30000,
      maxQueueSize: 2048,
    };
    this._spanProcessor = new BatchSpanProcessor(this._exporter, bufferConfig);
    this._tracerProvider.addSpanProcessor(this._spanProcessor);
    this._tracerProvider.register();
    this._tracer = this._tracerProvider.getTracer("AzureMonitorTracer");
    if (this._metricHandler) {
      // TODO
    }
  }

  /**
   *Get OpenTelemetry TracerProvider
   */
  public getTracerProvider(): TracerProvider {
    return this._tracerProvider;
  }

  /**
   *Get OpenTelemetry Tracer
   */
  public getTracer(): Tracer {
    return this._tracer;
  }

  /**
   * Start auto collection of telemetry
   */
  public start() {
    // TODO
  }

  /**
   * Shutdown handler, all Tracer providers will return no-op Tracers
   */
  public async shutdown(): Promise<void> {
    await this._tracerProvider.shutdown();
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
  public addInstrumentation(instrumentation: Instrumentation) {
    this._instrumentations.push(instrumentation);
  }

  /**
   * Disable all OpenTelemetry Instrumentations
   */
  public disableInstrumentations() {
    this._instrumentations.forEach((instrumentation) => {
      instrumentation.disable();
    });
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as os from "os";
import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { InternalConfig } from "../../shared/config";
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { Counter, Histogram, Meter, SpanKind, ValueType } from "@opentelemetry/api";
import { RandomIdGenerator, ReadableSpan, TimedEvent } from "@opentelemetry/sdk-trace-base";
import { LogRecord } from "@opentelemetry/sdk-logs";
import {
  getDependencyDimensions,
  getExceptionDimensions,
  getRequestDimensions,
  getTraceDimensions,
  isExceptionTelemetry,
  isTraceTelemetry,
} from "../utils";
import {
  DocumentIngress,
  ExceptionDocumentIngress,
  MonitoringDataPoint,
  PingOptionalParams,
  PingResponse,
  PostResponse,
  RemoteDependencyDocumentIngress,
  RequestDocumentIngress,
  TraceDocumentIngress,
} from "../../generated";
import {
  getCloudRole,
  getCloudRoleInstance,
  getLogDocument,
  getSdkVersion,
  getSpanDocument,
} from "./utils";
import { QuickpulseMetricExporter } from "./export/exporter";
import { QuickpulseSender } from "./export/sender";
import { ConnectionStringParser } from "../../utils/connectionStringParser";
import { DEFAULT_BREEZE_ENDPOINT, DEFAULT_LIVEMETRICS_ENDPOINT } from "../../types";
import { QuickpulseExporterOptions } from "./types";

const POST_INTERVAL = 1000;
const MAX_POST_WAIT_TIME = 20000;
const PING_INTERVAL = 5000;
const MAX_PING_WAIT_TIME = 60000;
const FALLBACK_INTERVAL = 60000;

/**
 * Azure Monitor Live Metrics
 * @internal
 */
export class LiveMetrics {
  private config: InternalConfig;
  private meterProvider: MeterProvider | undefined;
  private azureExporter: AzureMonitorMetricExporter | undefined;
  private metricReader: PeriodicExportingMetricReader | undefined;
  private meter: Meter | undefined;
  private incomingRequestDurationHistogram: Histogram | undefined;
  private outgoingRequestDurationHistogram: Histogram | undefined;
  private exceptionsCounter: Counter | undefined;
  private tracesCounter: Counter | undefined;

  private documents: DocumentIngress[] = [];
  private pingInterval: number;
  private postInterval: number;
  private quickpulseExporter: QuickpulseMetricExporter;
  private pingSender: QuickpulseSender;
  private isCollectingData: boolean;
  private lastSuccessTime: number = Date.now();
  private handle: NodeJS.Timer;
  // Monitoring data point with common properties
  private baseMonitoringDataPoint: MonitoringDataPoint;

  /**
   * Initializes a new instance of the StandardMetrics class.
   * @param config - Distro configuration.
   * @param options - Standard Metrics options.
   */
  constructor(config: InternalConfig) {
    this.config = config;
    let idGenerator = new RandomIdGenerator();
    const streamId = idGenerator.generateTraceId();
    const machineName = os.hostname();
    const instance = getCloudRoleInstance(this.config.resource);
    const roleName = getCloudRole(this.config.resource);
    const version = getSdkVersion();
    this.baseMonitoringDataPoint = {
      version: version,
      invariantVersion: 1,
      instance: instance,
      roleName: roleName,
      machineName: machineName,
      streamId: streamId,
    };
    const parsedConnectionString = ConnectionStringParser.parse(
      this.config.azureMonitorExporterOptions.connectionString
    );
    this.pingSender = new QuickpulseSender({
      endpointUrl: parsedConnectionString.liveendpoint || DEFAULT_LIVEMETRICS_ENDPOINT,
      instrumentationKey: parsedConnectionString.instrumentationkey || DEFAULT_BREEZE_ENDPOINT,
    });
    let exporterOptions: QuickpulseExporterOptions = {
      endpointUrl: parsedConnectionString.liveendpoint || DEFAULT_LIVEMETRICS_ENDPOINT,
      instrumentationKey: parsedConnectionString.instrumentationkey || DEFAULT_BREEZE_ENDPOINT,
      postCallback: this.quickPulseDone.bind(this),
      getDocumentsFn: this.getDocuments.bind(this),
      baseMonitoringDataPoint: this.baseMonitoringDataPoint,
    };
    this.quickpulseExporter = new QuickpulseMetricExporter(exporterOptions);
    this.isCollectingData = false;
    this.pingInterval = PING_INTERVAL; // Default
    this.postInterval = POST_INTERVAL;

    this.handle = <any>setTimeout(this.goQuickpulse.bind(this), this.pingInterval);
    this.handle.unref(); // Don't block apps from terminating
  }

  public shutdown() {
    this.meterProvider?.shutdown();
  }

  private async goQuickpulse() {
    if (!this.isCollectingData) {
      // If not collecting, Ping
      try {
        let params: PingOptionalParams = {
          xMsQpsTransmissionTime: Date.now(),
          monitoringDataPoint: this.baseMonitoringDataPoint,
        };
        let response = await this.pingSender.ping(params);
        this.quickPulseDone(response);
      } catch (error) {
        this.quickPulseDone(undefined);
      }
      this.handle = <any>setTimeout(this.goQuickpulse.bind(this), this.pingInterval);
      this.handle.unref();
    }
    if (this.isCollectingData) {
      this.activateMetrics({ collectionInterval: this.postInterval });
    }
  }

  private async quickPulseDone(response: PostResponse | PingResponse | undefined) {
    if (!response) {
      if (!this.isCollectingData) {
        if (Date.now() - this.lastSuccessTime >= MAX_PING_WAIT_TIME) {
          this.pingInterval = FALLBACK_INTERVAL;
        }
      } else {
        if (Date.now() - this.lastSuccessTime >= MAX_POST_WAIT_TIME) {
          this.postInterval = FALLBACK_INTERVAL;
          this.deactivateMetrics();
          this.activateMetrics({ collectionInterval: this.postInterval });
        }
      }
    } else {
      this.postInterval = POST_INTERVAL;
      //// Update using response if needed
      this.lastSuccessTime = Date.now();
      this.isCollectingData =
        response.xMsQpsSubscribed && response.xMsQpsSubscribed === "true" ? true : false;

      // If collecting was stoped
      if (!this.isCollectingData && this.meterProvider) {
        this.deactivateMetrics();
        this.handle = <any>setTimeout(this.goQuickpulse.bind(this), this.pingInterval);
        this.handle.unref();
      }

      this.pingSender.handlePermanentRedirect(response.xMsQpsServiceEndpointRedirectV2);
      this.quickpulseExporter
        .getSender()
        .handlePermanentRedirect(response.xMsQpsServiceEndpointRedirectV2);
      if (response.xMsQpsServicePollingIntervalHint) {
        this.pingInterval = Number(response.xMsQpsServicePollingIntervalHint);
      } else {
        this.pingInterval = PING_INTERVAL;
      }
    }
  }

  // Activate live metrics collection
  public activateMetrics(options?: { collectionInterval: number }) {
    const meterProviderConfig: MeterProviderOptions = {
      resource: this.config.resource,
    };
    this.meterProvider = new MeterProvider(meterProviderConfig);
    this.azureExporter = new AzureMonitorMetricExporter(this.config.azureMonitorExporterOptions);
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this.azureExporter as any,
      exportIntervalMillis: options?.collectionInterval,
    };
    this.metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this.meterProvider.addMetricReader(this.metricReader);
    this.meter = this.meterProvider.getMeter("AzureMonitorLiveMetricsMeter");
    this.incomingRequestDurationHistogram = this.meter.createHistogram(
      "azureMonitor.http.requestDuration",
      {
        valueType: ValueType.DOUBLE,
      }
    );
    this.outgoingRequestDurationHistogram = this.meter.createHistogram(
      "azureMonitor.http.dependencyDuration",
      {
        valueType: ValueType.DOUBLE,
      }
    );

    this.exceptionsCounter = this.meter.createCounter("azureMonitor.exceptionCount", {
      valueType: ValueType.INT,
    });
    this.tracesCounter = this.meter.createCounter("azureMonitor.traceCount", {
      valueType: ValueType.INT,
    });
  }

  /**
   * Deactivate metric collection
   */
  public deactivateMetrics() {
    this.documents = [];
    this.meterProvider?.shutdown();
    this.meterProvider = undefined;
  }

  /**
   * Force flush Meter Provider.
   */
  public async flush(): Promise<void> {
    await this.meterProvider?.forceFlush();
  }

  /**
   *Get OpenTelemetry MeterProvider
   */
  public getMeterProvider(): MeterProvider | undefined {
    return this.meterProvider;
  }

  public getDocuments(): DocumentIngress[] {
    return this.documents;
  }

  private addDocument(document: DocumentIngress) {
    if (document) {
      if (this.documents.length > 20) {
        this.documents.shift(); // Remove oldest document
      }
      this.documents.push(document);
    }
  }

  /**
   * Record Span metrics
   * @internal
   */
  public recordSpan(span: ReadableSpan): void {
    if (this.isCollectingData) {
      // Add document and calculate metrics
      let document: RequestDocumentIngress | RemoteDependencyDocumentIngress =
        getSpanDocument(span);
      this.addDocument(document);
      const durationMs = span.duration[0];
      if (span.kind === SpanKind.SERVER) {
        this.incomingRequestDurationHistogram?.record(durationMs, getRequestDimensions(span));
      } else {
        this.outgoingRequestDurationHistogram?.record(durationMs, getDependencyDimensions(span));
      }
      if (span.events) {
        span.events.forEach((event: TimedEvent) => {
          event.attributes = event.attributes || {};
          if (event.name === "exception") {
            this.exceptionsCounter?.add(1, getExceptionDimensions(span.resource));
          } else {
            this.tracesCounter?.add(1, getTraceDimensions(span.resource));
          }
        });
      }
    }
  }

  /**
   * Record LogRecord metrics, add attribute so data is not aggregated again in ingestion
   * @internal
   */
  public recordLog(logRecord: LogRecord): void {
    if (this.isCollectingData) {
      let document: TraceDocumentIngress | ExceptionDocumentIngress = getLogDocument(logRecord);
      this.addDocument(document);
      if (isExceptionTelemetry(logRecord)) {
        this.exceptionsCounter?.add(1, getExceptionDimensions(logRecord.resource));
      } else if (isTraceTelemetry(logRecord)) {
        this.tracesCounter?.add(1, getTraceDimensions(logRecord.resource));
      }
    }
  }
}

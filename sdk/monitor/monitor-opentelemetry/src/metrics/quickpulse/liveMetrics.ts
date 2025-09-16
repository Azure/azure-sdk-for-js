// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import os from "node:os";
import type {
  MeterProviderOptions,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import type { SdkLogRecord } from "@opentelemetry/sdk-logs";
import type { InternalConfig } from "../../shared/config.js";
import type { Meter, ObservableGauge, ObservableResult } from "@opentelemetry/api";
import { SpanKind, SpanStatusCode, ValueType, context } from "@opentelemetry/api";
import type { ReadableSpan, TimedEvent } from "@opentelemetry/sdk-trace-base";
import { RandomIdGenerator } from "@opentelemetry/sdk-trace-base";
import type {
  DocumentIngress,
  Exception,
  MonitoringDataPoint,
  IsSubscribedOptionalParams,
  IsSubscribedResponse,
  PublishResponse,
  RemoteDependency,
  Request,
  Trace,
  KeyValuePairString,
  DerivedMetricInfo,
  FilterConjunctionGroupInfo,
} from "../../generated/index.js";
import {
  KnownCollectionConfigurationErrorType,
  KnownTelemetryType,
} from "../../generated/index.js";
import {
  getLogDocument,
  getSdkVersion,
  getSpanData,
  getLogData,
  getSpanDocument,
  getTransmissionTime,
  isRequestData,
  getSpanExceptionColumns,
  isExceptionData,
  isDependencyData,
} from "./utils.js";
import { QuickpulseMetricExporter } from "./export/exporter.js";
import { QuickpulseSender } from "./export/sender.js";
import { ConnectionStringParser } from "../../utils/connectionStringParser.js";
import { DEFAULT_LIVEMETRICS_ENDPOINT } from "../../types.js";
import type {
  QuickpulseExporterOptions,
  RequestData,
  DependencyData,
  TraceData,
  ExceptionData,
  TelemetryData,
} from "./types.js";
import { QuickPulseOpenTelemetryMetricNames } from "./types.js";
import { hrTimeToMilliseconds, suppressTracing } from "@opentelemetry/core";
import { getInstance } from "../../utils/statsbeat.js";
import type { CollectionConfigurationError } from "../../generated/index.js";
import { Filter } from "./filtering/filter.js";
import { Validator } from "./filtering/validator.js";
import { CollectionConfigurationErrorTracker } from "./filtering/collectionConfigurationErrorTracker.js";
import { Projection } from "./filtering/projection.js";
import {
  TelemetryTypeError,
  UnexpectedFilterCreateError,
  DuplicateMetricIdError,
  MetricFailureToCreateError,
} from "./filtering/quickpulseErrors.js";
import { SEMATTRS_EXCEPTION_TYPE } from "@opentelemetry/semantic-conventions";
import { getPhysicalMemory, getProcessorTimeNormalized } from "../utils.js";
import { getCloudRole, getCloudRoleInstance } from "../utils.js";
import { Logger } from "../../shared/logging/logger.js";

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
  private metricReader: PeriodicExportingMetricReader | undefined;
  private meter: Meter | undefined;
  private requestDurationGauge: ObservableGauge | undefined;
  private dependencyDurationGauge: ObservableGauge | undefined;
  private requestRateGauge: ObservableGauge | undefined;
  private requestFailedRateGauge: ObservableGauge | undefined;
  private dependencyRateGauge: ObservableGauge | undefined;
  private dependencyFailedRateGauge: ObservableGauge | undefined;
  private processPhysicalBytesGauge: ObservableGauge | undefined;
  private percentProcessorTimeNormalizedGauge: ObservableGauge | undefined;
  private exceptionsRateGauge: ObservableGauge | undefined;

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
  private totalRequestCount = 0;
  private totalFailedRequestCount = 0;
  private totalDependencyCount = 0;
  private totalFailedDependencyCount = 0;
  private totalExceptionCount = 0;
  private requestDuration = 0;
  private dependencyDuration = 0;
  private lastRequestDuration: { count: number; duration: number; time: number } = {
    count: 0,
    duration: 0,
    time: 0,
  };
  private lastRequestRate: { count: number; time: number } = { count: 0, time: 0 };
  private lastFailedRequestRate: { count: number; time: number } = { count: 0, time: 0 };
  private lastDependencyDuration: { count: number; duration: number; time: number } = {
    count: 0,
    duration: 0,
    time: 0,
  };
  private lastDependencyRate: { count: number; time: number } = { count: 0, time: 0 };
  private lastFailedDependencyRate: { count: number; time: number } = { count: 0, time: 0 };
  private lastExceptionRate: { count: number; time: number } = { count: 0, time: 0 };
  private lastCpuUsage: NodeJS.CpuUsage;
  private lastHrTime: bigint;
  private statsbeatOptionsUpdated = false;
  private etag: string = "";
  private errorTracker: CollectionConfigurationErrorTracker =
    new CollectionConfigurationErrorTracker();
  // For tracking of duplicate metric ids in the same configuration.
  private seenMetricIds: Set<string> = new Set();
  private validDerivedMetrics: Map<string, DerivedMetricInfo[]> = new Map();
  private derivedMetricProjection: Projection = new Projection();
  private validator: Validator = new Validator();
  private filter: Filter = new Filter();
  // type: Map<telemetryType, Map<id, FilterConjunctionGroupInfo[]>>
  private validDocumentFilterConjuctionGroupInfos: Map<
    string,
    Map<string, FilterConjunctionGroupInfo[]>
  > = new Map();
  /**
   * Initializes a new instance of the StandardMetrics class.
   * @param config - Distro configuration.
   * @param options - Standard Metrics options.
   */
  constructor(config: InternalConfig) {
    this.config = config;
    const idGenerator = new RandomIdGenerator();
    const streamId = idGenerator.generateTraceId();
    const machineName = os.hostname();
    const instance = getCloudRoleInstance(this.config.resource);
    const roleName = getCloudRole(this.config.resource);
    const version = getSdkVersion();
    this.baseMonitoringDataPoint = {
      version: version,
      invariantVersion: 5, // 5 means we support live metrics filtering of metrics and documents
      instance: instance,
      roleName: roleName,
      machineName: machineName,
      streamId: streamId,
      performanceCollectionSupported: true,
      isWebApp: process.env["WEBSITE_SITE_NAME"] ? true : false,
    };
    const parsedConnectionString = ConnectionStringParser.parse(
      this.config.azureMonitorExporterOptions.connectionString ||
        process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"],
    );
    this.pingSender = new QuickpulseSender({
      endpointUrl: parsedConnectionString.liveendpoint || DEFAULT_LIVEMETRICS_ENDPOINT,
      instrumentationKey: parsedConnectionString.instrumentationkey || "",
      credential: this.config.azureMonitorExporterOptions.credential,
      credentialScopes:
        parsedConnectionString.aadaudience ||
        this.config.azureMonitorExporterOptions.credentialScopes,
    });
    const exporterOptions: QuickpulseExporterOptions = {
      endpointUrl: parsedConnectionString.liveendpoint || DEFAULT_LIVEMETRICS_ENDPOINT,
      instrumentationKey: parsedConnectionString.instrumentationkey || "",
      credential: this.config.azureMonitorExporterOptions.credential,
      credentialScopes:
        parsedConnectionString.aadaudience ||
        this.config.azureMonitorExporterOptions.credentialScopes,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      postCallback: this.quickPulseDone.bind(this),
      getDocumentsFn: this.getDocuments.bind(this),
      getErrorsFn: this.getErrors.bind(this),
      getDerivedMetricValuesFn: this.getDerivedMetricValues.bind(this),
      baseMonitoringDataPoint: this.baseMonitoringDataPoint,
    };
    this.quickpulseExporter = new QuickpulseMetricExporter(exporterOptions);
    this.isCollectingData = false;
    this.pingInterval = PING_INTERVAL; // Default
    this.postInterval = POST_INTERVAL;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.handle = <any>setTimeout(this.goQuickpulse.bind(this), this.pingInterval);
    this.handle.unref(); // Don't block apps from terminating
    this.lastCpuUsage = process.cpuUsage();
    this.lastHrTime = process.hrtime.bigint();
  }

  public shutdown(): void {
    this.meterProvider?.shutdown();
  }

  private async goQuickpulse(): Promise<void> {
    if (!this.isCollectingData) {
      // If not collecting, Ping
      try {
        const params: IsSubscribedOptionalParams = {
          transmissionTime: getTransmissionTime(),
          monitoringDataPoint: this.baseMonitoringDataPoint,
          configurationEtag: this.etag,
        };
        await context.with(suppressTracing(context.active()), async () => {
          const response = await this.pingSender.isSubscribed(params);
          this.quickPulseDone(response);
        });
      } catch (error) {
        this.quickPulseDone(undefined);
      }
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this.handle = <any>setTimeout(this.goQuickpulse.bind(this), this.pingInterval);
      this.handle.unref();
    }
    if (this.isCollectingData) {
      this.activateMetrics({ collectionInterval: this.postInterval });
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  private async quickPulseDone(
    response: PublishResponse | IsSubscribedResponse | undefined,
  ): Promise<void> {
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
      // Update using response if needed
      this.lastSuccessTime = Date.now();
      this.isCollectingData =
        response.xMsQpsSubscribed && response.xMsQpsSubscribed === "true" ? true : false;
      if (response.xMsQpsConfigurationEtag && this.etag !== response.xMsQpsConfigurationEtag) {
        this.updateConfiguration(response);
      }

      // If collecting was stoped
      if (!this.isCollectingData && this.meterProvider) {
        this.etag = "";
        this.deactivateMetrics();
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.handle = <any>setTimeout(this.goQuickpulse.bind(this), this.pingInterval);
        this.handle.unref();
      }

      const endpointRedirect = (response as IsSubscribedResponse).xMsQpsServiceEndpointRedirectV2;
      if (endpointRedirect) {
        this.pingSender.handlePermanentRedirect(endpointRedirect);
        this.quickpulseExporter.getSender().handlePermanentRedirect(endpointRedirect);
      }
      const pollingInterval = (response as IsSubscribedResponse).xMsQpsServicePollingIntervalHint;
      if (pollingInterval) {
        this.pingInterval = Number(pollingInterval);
      } else {
        this.pingInterval = PING_INTERVAL;
      }
    }
  }

  // Activate live metrics collection
  public activateMetrics(options?: { collectionInterval: number }): void {
    if (this.meterProvider) {
      return;
    }
    // Turn on live metrics active collection for statsbeat
    if (!this.statsbeatOptionsUpdated) {
      getInstance().setStatsbeatFeatures({}, { liveMetrics: true });
      this.statsbeatOptionsUpdated = true;
    }
    this.totalDependencyCount = 0;
    this.totalExceptionCount = 0;
    this.totalFailedDependencyCount = 0;
    this.totalFailedRequestCount = 0;
    this.totalRequestCount = 0;
    this.requestDuration = 0;
    this.dependencyDuration = 0;
    this.lastRequestDuration = { count: 0, duration: 0, time: 0 };
    this.lastRequestRate = { count: 0, time: 0 };
    this.lastFailedRequestRate = { count: 0, time: 0 };
    this.lastDependencyDuration = { count: 0, duration: 0, time: 0 };
    this.lastDependencyRate = { count: 0, time: 0 };
    this.lastFailedDependencyRate = { count: 0, time: 0 };
    this.lastExceptionRate = { count: 0, time: 0 };

    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this.quickpulseExporter,
      exportIntervalMillis: options?.collectionInterval,
    };
    this.metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    const meterProviderConfig: MeterProviderOptions = {
      resource: this.config.resource,
      readers: [this.metricReader],
    };
    this.meterProvider = new MeterProvider(meterProviderConfig);
    this.meter = this.meterProvider.getMeter("AzureMonitorLiveMetricsMeter");
    this.requestDurationGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.REQUEST_DURATION,
      {
        valueType: ValueType.DOUBLE,
      },
    );
    this.requestRateGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.REQUEST_RATE,
      {
        valueType: ValueType.DOUBLE,
      },
    );
    this.requestFailedRateGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.REQUEST_FAILURE_RATE,
      {
        valueType: ValueType.DOUBLE,
      },
    );
    this.dependencyDurationGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_DURATION,
      {
        valueType: ValueType.DOUBLE,
      },
    );
    this.dependencyRateGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_RATE,
      {
        valueType: ValueType.DOUBLE,
      },
    );
    this.dependencyFailedRateGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_FAILURE_RATE,
      {
        valueType: ValueType.DOUBLE,
      },
    );

    this.processPhysicalBytesGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.PHYSICAL_BYTES,
      {
        valueType: ValueType.INT,
      },
    );

    this.percentProcessorTimeNormalizedGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.PROCESSOR_TIME_NORMALIZED,
      {
        valueType: ValueType.DOUBLE,
      },
    );
    this.exceptionsRateGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.EXCEPTION_RATE,
      {
        valueType: ValueType.DOUBLE,
      },
    );

    this.requestDurationGauge.addCallback(this.getRequestDuration.bind(this));
    this.requestRateGauge.addCallback(this.getRequestRate.bind(this));
    this.requestFailedRateGauge.addCallback(this.getRequestFailedRate.bind(this));
    this.dependencyDurationGauge.addCallback(this.getDependencyDuration.bind(this));
    this.dependencyRateGauge.addCallback(this.getDependencyRate.bind(this));
    this.dependencyFailedRateGauge.addCallback(this.getDependencyFailedRate.bind(this));
    this.exceptionsRateGauge.addCallback(this.getExceptionRate.bind(this));
    this.processPhysicalBytesGauge.addCallback(this.getPhysicalMemory.bind(this));
    this.percentProcessorTimeNormalizedGauge.addCallback(
      this.getProcessorTimeNormalized.bind(this),
    );
  }

  /**
   * Deactivate metric collection
   */
  public deactivateMetrics(): void {
    this.documents = [];
    this.validDocumentFilterConjuctionGroupInfos.clear();
    this.errorTracker.clearRunTimeErrors();
    this.errorTracker.clearValidationTimeErrors();
    this.validDerivedMetrics.clear();
    this.derivedMetricProjection.clearProjectionMaps();
    this.seenMetricIds.clear();
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
    const result: DocumentIngress[] = this.documents;
    this.documents = [];
    return result;
  }

  public getErrors(): CollectionConfigurationError[] {
    const result = this.errorTracker.getErrors();
    this.errorTracker.clearRunTimeErrors();
    return result;
  }

  public getDerivedMetricValues(): Map<string, number> {
    return this.derivedMetricProjection.getMetricValues();
  }

  private addDocument(document: DocumentIngress): void {
    if (document) {
      // Limit risk of memory leak by limiting doc length to something manageable
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
      const columns: RequestData | DependencyData = getSpanData(span);
      let documentConfiguration: Map<string, FilterConjunctionGroupInfo[]>;
      let derivedMetricInfos: DerivedMetricInfo[];
      if (isRequestData(columns)) {
        documentConfiguration =
          this.validDocumentFilterConjuctionGroupInfos.get(KnownTelemetryType.Request) ||
          new Map<string, FilterConjunctionGroupInfo[]>();
        derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Request) || [];
      } else {
        documentConfiguration =
          this.validDocumentFilterConjuctionGroupInfos.get(KnownTelemetryType.Dependency) ||
          new Map<string, FilterConjunctionGroupInfo[]>();
        derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Dependency) || [];
      }
      this.applyDocumentFilters(documentConfiguration, columns);
      this.checkMetricFilterAndCreateProjection(derivedMetricInfos, columns);

      const durationMs = hrTimeToMilliseconds(span.duration);
      const success = span.status.code !== SpanStatusCode.ERROR;

      if (span.kind === SpanKind.SERVER || span.kind === SpanKind.CONSUMER) {
        this.totalRequestCount++;
        this.requestDuration += durationMs;
        if (!success) {
          this.totalFailedRequestCount++;
        }
      } else {
        this.totalDependencyCount++;
        this.dependencyDuration += durationMs;
        if (!success) {
          this.totalFailedDependencyCount++;
        }
      }
      if (span.events) {
        span.events.forEach((event: TimedEvent) => {
          event.attributes = event.attributes || {};
          if (event.name === "exception") {
            const exceptionColumns: ExceptionData = getSpanExceptionColumns(
              event.attributes,
              span.attributes,
            );
            documentConfiguration =
              this.validDocumentFilterConjuctionGroupInfos.get(KnownTelemetryType.Exception) ||
              new Map<string, FilterConjunctionGroupInfo[]>();
            this.applyDocumentFilters(
              documentConfiguration,
              exceptionColumns,
              event.attributes[SEMATTRS_EXCEPTION_TYPE] as string,
            );
            derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Exception) || [];
            this.checkMetricFilterAndCreateProjection(derivedMetricInfos, exceptionColumns);
            this.totalExceptionCount++;
          }
        });
      }
    }
  }

  /**
   * Record LogRecord metrics, add attribute so data is not aggregated again in ingestion
   * @internal
   */
  public recordLog(logRecord: SdkLogRecord): void {
    if (this.isCollectingData) {
      const columns: TraceData | ExceptionData = getLogData(logRecord);
      let derivedMetricInfos: DerivedMetricInfo[];
      let documentConfiguration: Map<string, FilterConjunctionGroupInfo[]>;
      if (isExceptionData(columns)) {
        documentConfiguration =
          this.validDocumentFilterConjuctionGroupInfos.get(KnownTelemetryType.Exception) ||
          new Map<string, FilterConjunctionGroupInfo[]>();
        this.applyDocumentFilters(
          documentConfiguration,
          columns,
          logRecord.attributes[SEMATTRS_EXCEPTION_TYPE] as string,
        );
        derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Exception) || [];
        this.totalExceptionCount++;
      } else {
        // trace
        documentConfiguration =
          this.validDocumentFilterConjuctionGroupInfos.get(KnownTelemetryType.Trace) ||
          new Map<string, FilterConjunctionGroupInfo[]>();
        this.applyDocumentFilters(documentConfiguration, columns);
        derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Trace) || [];
      }
      this.checkMetricFilterAndCreateProjection(derivedMetricInfos, columns);
    }
  }

  private getRequestDuration(observableResult: ObservableResult): void {
    const currentTime = +new Date();
    const requestInterval = this.totalRequestCount - this.lastRequestDuration.count || 0;
    const durationInterval = this.requestDuration - this.lastRequestDuration.duration || 0;
    const elapsedMs = currentTime - this.lastRequestDuration.time;
    if (elapsedMs > 0) {
      const averageExecutionTime = durationInterval / requestInterval || 0; // default to 0 in case no requests in this interval
      observableResult.observe(averageExecutionTime);
    }
    this.lastRequestDuration = {
      count: this.totalRequestCount,
      duration: this.requestDuration,
      time: currentTime,
    };
  }

  private getRequestRate(observableResult: ObservableResult): void {
    const currentTime = +new Date();
    const intervalRequests = this.totalRequestCount - this.lastRequestRate.count || 0;
    const elapsedMs = currentTime - this.lastRequestRate.time;
    if (elapsedMs > 0) {
      const elapsedSeconds = elapsedMs / 1000;
      const dataPerSec = intervalRequests / elapsedSeconds;
      observableResult.observe(dataPerSec);
    }
    this.lastRequestRate = {
      count: this.totalRequestCount,
      time: currentTime,
    };
  }

  private getRequestFailedRate(observableResult: ObservableResult): void {
    const currentTime = +new Date();
    const intervalRequests = this.totalFailedRequestCount - this.lastFailedRequestRate.count || 0;
    const elapsedMs = currentTime - this.lastFailedRequestRate.time;
    if (elapsedMs > 0) {
      const elapsedSeconds = elapsedMs / 1000;
      const dataPerSec = intervalRequests / elapsedSeconds;
      observableResult.observe(dataPerSec);
    }
    this.lastFailedRequestRate = {
      count: this.totalFailedRequestCount,
      time: currentTime,
    };
  }

  private getDependencyDuration(observableResult: ObservableResult): void {
    const currentTime = +new Date();
    const dependencyInterval = this.totalDependencyCount - this.lastDependencyDuration.count || 0;
    const durationInterval = this.dependencyDuration - this.lastDependencyDuration.duration || 0;
    const elapsedMs = currentTime - this.lastDependencyDuration.time;
    if (elapsedMs > 0) {
      const averageExecutionTime = durationInterval / dependencyInterval || 0; // default to 0 in case no dependencies in this interval
      observableResult.observe(averageExecutionTime);
    }
    this.lastDependencyDuration = {
      count: this.totalDependencyCount,
      duration: this.dependencyDuration,
      time: currentTime,
    };
  }

  private getDependencyRate(observableResult: ObservableResult): void {
    const currentTime = +new Date();
    const intervalData = this.totalDependencyCount - this.lastDependencyRate.count || 0;
    const elapsedMs = currentTime - this.lastDependencyRate.time;
    if (elapsedMs > 0) {
      const elapsedSeconds = elapsedMs / 1000;
      const dataPerSec = intervalData / elapsedSeconds;
      observableResult.observe(dataPerSec);
    }
    this.lastDependencyRate = {
      count: this.totalDependencyCount,
      time: currentTime,
    };
  }

  private getDependencyFailedRate(observableResult: ObservableResult): void {
    const currentTime = +new Date();
    const intervalData = this.totalFailedDependencyCount - this.lastFailedDependencyRate.count || 0;
    const elapsedMs = currentTime - this.lastFailedDependencyRate.time;
    if (elapsedMs > 0) {
      const elapsedSeconds = elapsedMs / 1000;
      const dataPerSec = intervalData / elapsedSeconds;
      observableResult.observe(dataPerSec);
    }
    this.lastFailedDependencyRate = {
      count: this.totalFailedDependencyCount,
      time: currentTime,
    };
  }

  private getExceptionRate(observableResult: ObservableResult): void {
    const currentTime = +new Date();
    const intervalData = this.totalExceptionCount - this.lastExceptionRate.count || 0;
    const elapsedMs = currentTime - this.lastExceptionRate.time;
    if (elapsedMs > 0) {
      const elapsedSeconds = elapsedMs / 1000;
      const dataPerSec = intervalData / elapsedSeconds;
      observableResult.observe(dataPerSec);
    }
    this.lastExceptionRate = {
      count: this.totalExceptionCount,
      time: currentTime,
    };
  }

  private getPhysicalMemory(observableResult: ObservableResult): void {
    const rss = getPhysicalMemory();
    observableResult.observe(rss);
  }

  private getProcessorTimeNormalized(observableResult: ObservableResult): void {
    if (process && process.hrtime) {
      const cpuUsagePercent = getProcessorTimeNormalized(this.lastHrTime, this.lastCpuUsage);
      observableResult.observe(cpuUsagePercent);
      this.lastHrTime = process.hrtime.bigint();
      this.lastCpuUsage = process.cpuUsage();
    } else {
      Logger.getInstance().debug("Getting Normalized Processor Time Failed. No process available.");
    }
  }

  private updateConfiguration(response: PublishResponse | IsSubscribedResponse): void {
    this.etag = response.xMsQpsConfigurationEtag || "";
    this.quickpulseExporter.setEtag(this.etag);
    this.errorTracker.clearValidationTimeErrors();
    this.validDocumentFilterConjuctionGroupInfos.clear();
    this.validDerivedMetrics.clear();
    this.derivedMetricProjection.clearProjectionMaps();
    this.seenMetricIds.clear();

    this.parseDocumentFilterConfiguration(response);
    this.parseMetricFilterConfiguration(response);
  }

  private parseDocumentFilterConfiguration(response: PublishResponse | IsSubscribedResponse): void {
    if (!response?.documentStreams || typeof response.documentStreams.forEach !== "function") {
      return;
    }
    response.documentStreams.forEach((documentStreamInfo) => {
      documentStreamInfo.documentFilterGroups.forEach((documentFilterGroupInfo) => {
        try {
          this.validator.validateTelemetryType(documentFilterGroupInfo.telemetryType);
          this.validator.validateDocumentFilters(documentFilterGroupInfo);
          this.filter.renameExceptionFieldNamesForFiltering(documentFilterGroupInfo.filters);

          if (
            !this.validDocumentFilterConjuctionGroupInfos.has(documentFilterGroupInfo.telemetryType)
          ) {
            this.validDocumentFilterConjuctionGroupInfos.set(
              documentFilterGroupInfo.telemetryType,
              new Map<string, FilterConjunctionGroupInfo[]>(),
            );
          }

          const innerMap = this.validDocumentFilterConjuctionGroupInfos.get(
            documentFilterGroupInfo.telemetryType,
          );
          if (!innerMap?.has(documentStreamInfo.id)) {
            innerMap?.set(documentStreamInfo.id, [documentFilterGroupInfo.filters]);
          } else {
            innerMap.get(documentStreamInfo.id)?.push(documentFilterGroupInfo.filters);
          }
        } catch (error) {
          const configError: CollectionConfigurationError = {
            collectionConfigurationErrorType: "",
            message: "",
            fullException: "",
            data: [],
          };
          if (error instanceof TelemetryTypeError) {
            configError.collectionConfigurationErrorType = "DocumentTelemetryTypeUnsupported";
          } else if (error instanceof UnexpectedFilterCreateError) {
            configError.collectionConfigurationErrorType =
              KnownCollectionConfigurationErrorType.DocumentStreamFailureToCreateFilterUnexpected;
          }

          if (error instanceof Error) {
            configError.message = error.message;
            configError.fullException = error.stack || "";
          }
          const data: KeyValuePairString[] = [];
          data.push({ key: "DocumentStreamInfoId", value: documentStreamInfo.id });
          data.push({ key: "ETag", value: this.etag });
          configError.data = data;
          this.errorTracker.addValidationError(configError);
        }
      });
    });
  }

  private applyDocumentFilters(
    documentConfiguration: Map<string, FilterConjunctionGroupInfo[]>,
    data: TelemetryData,
    exceptionType?: string,
  ): void {
    const streamIds: Set<string> = new Set<string>();
    documentConfiguration.forEach((filterConjunctionGroupInfoList, streamId) => {
      filterConjunctionGroupInfoList.forEach((filterConjunctionGroupInfo) => {
        // by going though each filterConjuctionGroupInfo, we are implicitly -OR-ing
        // different filterConjunctionGroupInfo within documentStreamInfo. If there are multiple
        // documentStreamInfos, this logic will -OR- the filtering results of each documentStreamInfo.
        if (this.filter.checkFilterConjunctionGroup(filterConjunctionGroupInfo, data)) {
          streamIds.add(streamId);
        }
      });
    });

    // Emit a document when a telemetry data matches a particular filtering configuration,
    // or when filtering configuration is empty.
    if (streamIds.size > 0 || documentConfiguration.size === 0) {
      let document: Request | RemoteDependency | Trace | Exception;
      if (isRequestData(data) || isDependencyData(data)) {
        document = getSpanDocument(data);
      } else if (isExceptionData(data) && exceptionType) {
        document = getLogDocument(data, exceptionType);
      } else {
        document = getLogDocument(data);
      }
      document.documentStreamIds = [...streamIds];
      this.addDocument(document);
    }
  }

  private parseMetricFilterConfiguration(response: PublishResponse | IsSubscribedResponse): void {
    if (!response?.documentStreams || typeof response.documentStreams.forEach !== "function") {
      return;
    }
    response.metrics.forEach((derivedMetricInfo) => {
      try {
        if (!this.seenMetricIds.has(derivedMetricInfo.id)) {
          this.seenMetricIds.add(derivedMetricInfo.id);
          this.validator.validateTelemetryType(derivedMetricInfo.telemetryType);
          this.validator.checkCustomMetricProjection(derivedMetricInfo);
          this.validator.validateMetricFilters(derivedMetricInfo);
          derivedMetricInfo.filterGroups.forEach((filterConjunctionGroupInfo) => {
            this.filter.renameExceptionFieldNamesForFiltering(filterConjunctionGroupInfo);
          });

          if (this.validDerivedMetrics.has(derivedMetricInfo.telemetryType)) {
            this.validDerivedMetrics.get(derivedMetricInfo.telemetryType)?.push(derivedMetricInfo);
          } else {
            this.validDerivedMetrics.set(derivedMetricInfo.telemetryType, [derivedMetricInfo]);
          }
        } else {
          throw new DuplicateMetricIdError(`Duplicate Metric Id: ${derivedMetricInfo.id}`);
        }
        this.derivedMetricProjection.initDerivedMetricProjection(derivedMetricInfo);
      } catch (error) {
        const configError: CollectionConfigurationError = {
          collectionConfigurationErrorType: "",
          message: "",
          fullException: "",
          data: [],
        };
        if (error instanceof TelemetryTypeError) {
          configError.collectionConfigurationErrorType =
            KnownCollectionConfigurationErrorType.MetricTelemetryTypeUnsupported;
        } else if (error instanceof UnexpectedFilterCreateError) {
          configError.collectionConfigurationErrorType =
            KnownCollectionConfigurationErrorType.MetricFailureToCreateFilterUnexpected;
        } else if (error instanceof DuplicateMetricIdError) {
          configError.collectionConfigurationErrorType =
            KnownCollectionConfigurationErrorType.MetricDuplicateIds;
        }

        if (error instanceof Error) {
          configError.message = error.message;
          configError.fullException = error.stack || "";
        }
        const data: KeyValuePairString[] = [];
        data.push({ key: "MetricId", value: derivedMetricInfo.id });
        data.push({ key: "ETag", value: this.etag });
        configError.data = data;
        this.errorTracker.addValidationError(configError);
      }
    });
  }

  private checkMetricFilterAndCreateProjection(
    derivedMetricInfoList: DerivedMetricInfo[],
    data: TelemetryData,
  ): void {
    derivedMetricInfoList.forEach((derivedMetricInfo: DerivedMetricInfo) => {
      if (this.filter.checkMetricFilters(derivedMetricInfo, data)) {
        try {
          this.derivedMetricProjection.calculateProjection(derivedMetricInfo, data);
        } catch (error) {
          const configError: CollectionConfigurationError = {
            collectionConfigurationErrorType: "",
            message: "",
            fullException: "",
            data: [],
          };
          if (error instanceof MetricFailureToCreateError) {
            configError.collectionConfigurationErrorType =
              KnownCollectionConfigurationErrorType.MetricFailureToCreate;

            if (error instanceof Error) {
              configError.message = error.message;
              configError.fullException = error.stack || "";
            }
            const errorData: KeyValuePairString[] = [];
            errorData.push({ key: "MetricId", value: derivedMetricInfo.id });
            errorData.push({ key: "ETag", value: this.etag });
            configError.data = errorData;
            this.errorTracker.addRunTimeError(configError);
          }
        }
      }
    });
  }
}

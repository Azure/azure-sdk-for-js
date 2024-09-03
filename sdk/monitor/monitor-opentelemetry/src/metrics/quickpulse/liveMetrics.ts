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
import {
  Meter,
  ObservableGauge,
  ObservableResult,
  SpanKind,
  SpanStatusCode,
  ValueType,
  context,
} from "@opentelemetry/api";
import { RandomIdGenerator, ReadableSpan, TimedEvent } from "@opentelemetry/sdk-trace-base";
import { LogRecord } from "@opentelemetry/sdk-logs";
import { isExceptionTelemetry } from "../utils";
import {
  DocumentIngress,
  Exception,
  MonitoringDataPoint,
  IsSubscribedOptionalParams,
  IsSubscribedResponse,
  PublishResponse,
  RemoteDependency,
  /* eslint-disable-next-line @typescript-eslint/no-redeclare */
  Request,
  Trace,
  KnownCollectionConfigurationErrorType,
  KeyValuePairString,
  DerivedMetricInfo,
  KnownTelemetryType,
} from "../../generated";
import {
  getCloudRole,
  getCloudRoleInstance,
  getLogDocument,
  getSdkVersion,
  getSpanColumns,
  getLogColumns,
  getSpanDocument,
  getTransmissionTime,
  isRequestData,
  isTraceData,
  getSpanExceptionColumns,
} from "./utils";
import { QuickpulseMetricExporter } from "./export/exporter";
import { QuickpulseSender } from "./export/sender";
import { ConnectionStringParser } from "../../utils/connectionStringParser";
import { DEFAULT_LIVEMETRICS_ENDPOINT } from "../../types";
import {
  QuickPulseOpenTelemetryMetricNames,
  QuickpulseExporterOptions,
  RequestData,
  DependencyData,
  TraceData,
  ExceptionData,
  TelemetryData,
} from "./types";
import { hrTimeToMilliseconds, suppressTracing } from "@opentelemetry/core";
import { getInstance } from "../../utils/statsbeat";
import { CollectionConfigurationError } from "../../generated";
import {
  TelemetryTypeError,
  UnexpectedFilterCreateError,
  Validator,
  DuplicateMetricIdError,
  CollectionConfigurationErrorTracker,
  Filter,
  Projection,
  MetricFailureToCreateError,
} from "./filtering";
import { SEMATTRS_EXCEPTION_TYPE } from "@opentelemetry/semantic-conventions";

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
  private memoryCommitedGauge: ObservableGauge | undefined;
  private processorTimeGauge: ObservableGauge | undefined;
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
  private lastCpus:
    | {
      model: string;
      speed: number;
      times: { user: number; nice: number; sys: number; idle: number; irq: number };
    }[]
    | undefined;
  private statsbeatOptionsUpdated = false;
  private etag: string = "";
  private errorTracker: CollectionConfigurationErrorTracker = new CollectionConfigurationErrorTracker();
  // For tracking of duplicate metric ids in the same configuration.
  private seenMetricIds: Set<string> = new Set();
  private validDerivedMetrics: Map<string, DerivedMetricInfo[]> = new Map();
  private derivedMetricProjection: Projection = new Projection();
  // implementation note: add configuration info or some list representation of filters
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
      invariantVersion: 5, // implementation note: need to change
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
      credentialScopes: this.config.azureMonitorExporterOptions.credentialScopes,
    });
    const exporterOptions: QuickpulseExporterOptions = {
      endpointUrl: parsedConnectionString.liveendpoint || DEFAULT_LIVEMETRICS_ENDPOINT,
      instrumentationKey: parsedConnectionString.instrumentationkey || "",
      credential: this.config.azureMonitorExporterOptions.credential,
      credentialScopes: this.config.azureMonitorExporterOptions.credentialScopes,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      postCallback: this.quickPulseDone.bind(this),
      getDocumentsFn: this.getDocuments.bind(this),
      getErrorsFn: this.getErrors.bind(this),
      getDerivedMetricValuesFn: this.derivedMetricProjection.getMetricValues.bind(this),
      baseMonitoringDataPoint: this.baseMonitoringDataPoint,
    };
    this.quickpulseExporter = new QuickpulseMetricExporter(exporterOptions);
    this.isCollectingData = false;
    this.pingInterval = PING_INTERVAL; // Default
    this.postInterval = POST_INTERVAL;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.handle = <any>setTimeout(this.goQuickpulse.bind(this), this.pingInterval);
    this.handle.unref(); // Don't block apps from terminating
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
          console.log("ping getting called");
          const response = await this.pingSender.isSubscribed(params);
          console.log("ping response {}", response);
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
    this.lastCpus = os.cpus();
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

    this.memoryCommitedGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.COMMITTED_BYTES,
      {
        valueType: ValueType.INT,
      },
    );

    this.processorTimeGauge = this.meter.createObservableGauge(
      QuickPulseOpenTelemetryMetricNames.PROCESSOR_TIME,
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
    this.memoryCommitedGauge.addCallback(this.getCommitedMemory.bind(this));
    this.processorTimeGauge.addCallback(this.getProcessorTime.bind(this));
  }

  /**
   * Deactivate metric collection
   */
  public deactivateMetrics(): void {
    this.documents = [];
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
    // fixing a bug where documents from previous time interval being sent in the current time interval.
    this.documents = [];
    return result;
  }

  public getErrors(): CollectionConfigurationError[] {
    const result = this.errorTracker.getErrors();
    this.errorTracker.clearRunTimeErrors();
    return result;
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
      console.log(span); // implementation note: remove

      const columns: RequestData | DependencyData = getSpanColumns(span);
      let derivedMetricInfos: DerivedMetricInfo[];
      if (isRequestData(columns)) {
        derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Request) || [];
      } else {
        derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Dependency) || [];
      }
      this.checkMetricFilterAndCreateProjection(derivedMetricInfos, columns);

      const document: Request | RemoteDependency = getSpanDocument(columns);
      this.addDocument(document);
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
            const exceptionColumns: ExceptionData = getSpanExceptionColumns(event.attributes, span.attributes);
            derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Exception) || [];
            this.checkMetricFilterAndCreateProjection(derivedMetricInfos, exceptionColumns);
            const exceptionDocument: Exception = getLogDocument(exceptionColumns, event.attributes[SEMATTRS_EXCEPTION_TYPE] as string) as Exception;
            this.addDocument(exceptionDocument);
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
  public recordLog(logRecord: LogRecord): void {
    if (this.isCollectingData) {
      const columns: TraceData | ExceptionData = getLogColumns(logRecord);
      let derivedMetricInfos: DerivedMetricInfo[];
      if (isTraceData(columns)) {
        derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Trace) || [];
      } else { // exception
        derivedMetricInfos = this.validDerivedMetrics.get(KnownTelemetryType.Exception) || [];
      }
      this.checkMetricFilterAndCreateProjection(derivedMetricInfos, columns);
      const exceptionType = String(logRecord.attributes[SEMATTRS_EXCEPTION_TYPE]) || "";
      const document: Trace | Exception = getLogDocument(columns, exceptionType);
      this.addDocument(document);
      if (isExceptionTelemetry(logRecord)) {
        this.totalExceptionCount++;
      }
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

  private getCommitedMemory(observableResult: ObservableResult): void {
    const freeMem = os.freemem();
    const committedMemory = os.totalmem() - freeMem;
    observableResult.observe(committedMemory);
  }

  private getTotalCombinedCpu(
    cpus: os.CpuInfo[],
    lastCpus: os.CpuInfo[],
  ): { combinedTotal: number; totalUser: number; totalIdle: number } {
    let totalUser = 0;
    let totalSys = 0;
    let totalNice = 0;
    let totalIdle = 0;
    let totalIrq = 0;
    for (let i = 0; !!cpus && i < cpus.length; i++) {
      const cpu = cpus[i];
      const lastCpu = lastCpus[i];
      const times = cpu.times;
      const lastTimes = lastCpu.times;
      // user cpu time (or) % CPU time spent in user space
      let user = times.user - lastTimes.user;
      user = user > 0 ? user : 0; // Avoid negative values
      totalUser += user;
      // system cpu time (or) % CPU time spent in kernel space
      let sys = times.sys - lastTimes.sys;
      sys = sys > 0 ? sys : 0; // Avoid negative values
      totalSys += sys;
      // user nice cpu time (or) % CPU time spent on low priority processes
      let nice = times.nice - lastTimes.nice;
      nice = nice > 0 ? nice : 0; // Avoid negative values
      totalNice += nice;
      // idle cpu time (or) % CPU time spent idle
      let idle = times.idle - lastTimes.idle;
      idle = idle > 0 ? idle : 0; // Avoid negative values
      totalIdle += idle;
      // irq (or) % CPU time spent servicing/handling hardware interrupts
      let irq = times.irq - lastTimes.irq;
      irq = irq > 0 ? irq : 0; // Avoid negative values
      totalIrq += irq;
    }
    const combinedTotal = totalUser + totalSys + totalNice + totalIdle + totalIrq;
    return {
      combinedTotal: combinedTotal,
      totalUser: totalUser,
      totalIdle: totalIdle,
    };
  }

  private getProcessorTime(observableResult: ObservableResult): void {
    // this reports total ms spent in each category since the OS was booted, to calculate percent it is necessary
    // to find the delta since the last measurement
    const cpus = os.cpus();
    if (cpus && cpus.length && this.lastCpus && cpus.length === this.lastCpus.length) {
      const cpuTotals = this.getTotalCombinedCpu(cpus, this.lastCpus);

      const value =
        cpuTotals.combinedTotal > 0
          ? ((cpuTotals.combinedTotal - cpuTotals.totalIdle) / cpuTotals.combinedTotal) * 100
          : 0;
      observableResult.observe(value);
    }
    this.lastCpus = cpus;
  }

  private updateConfiguration(response: PublishResponse | IsSubscribedResponse): void {
    this.etag = response.xMsQpsConfigurationEtag || "";
    this.quickpulseExporter.setEtag(this.etag);
    this.errorTracker.clearValidationTimeErrors();
    this.validDerivedMetrics.clear();
    this.derivedMetricProjection.clearProjectionMaps();
    this.seenMetricIds.clear();

    response.metrics.forEach((derivedMetricInfo) => {
      try {
        if (!this.seenMetricIds.has(derivedMetricInfo.id)) {
          this.seenMetricIds.add(derivedMetricInfo.id);
          Validator.validateTelemetryType(derivedMetricInfo);
          Validator.checkCustomMetricProjection(derivedMetricInfo);
          Validator.validateFilters(derivedMetricInfo);
          derivedMetricInfo.filterGroups.forEach((filterConjunctionGroupInfo) => {
            Filter.renameExceptionFieldNamesForFiltering(filterConjunctionGroupInfo);
          });

          if (this.validDerivedMetrics.has(derivedMetricInfo.telemetryType)) {
            this.validDerivedMetrics.get(derivedMetricInfo.telemetryType)?.push(derivedMetricInfo);
          } else {
            this.validDerivedMetrics.set(derivedMetricInfo.telemetryType, [derivedMetricInfo]);
          }
        } else {
          throw new DuplicateMetricIdError(`Duplicate Metric Id: ${derivedMetricInfo.id}`);
        }
      } catch (error) {
        const configError: CollectionConfigurationError = {
          collectionConfigurationErrorType: "",
          message: "",
          fullException: "",
          data: [],
        };
        if (error instanceof TelemetryTypeError) {
          configError.collectionConfigurationErrorType = KnownCollectionConfigurationErrorType.MetricTelemetryTypeUnsupported;
        } else if (error instanceof UnexpectedFilterCreateError) {
          configError.collectionConfigurationErrorType = KnownCollectionConfigurationErrorType.FilterFailureToCreateUnexpected;
        } else if (error instanceof DuplicateMetricIdError) {
          configError.collectionConfigurationErrorType = KnownCollectionConfigurationErrorType.MetricDuplicateIds;
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

  private checkMetricFilterAndCreateProjection(derivedMetricInfoList: DerivedMetricInfo[], data: TelemetryData): void {
    derivedMetricInfoList.forEach((derivedMetricInfo: DerivedMetricInfo) => {
      if (Filter.checkMetricFilters(derivedMetricInfo, data)) {
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
            configError.collectionConfigurationErrorType = KnownCollectionConfigurationErrorType.MetricFailureToCreate;

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

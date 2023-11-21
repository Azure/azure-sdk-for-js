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
  Histogram,
  Meter,
  ObservableGauge,
  ObservableResult,
  SpanKind,
  ValueType,
  context,
} from "@opentelemetry/api";
import { RandomIdGenerator, ReadableSpan, TimedEvent } from "@opentelemetry/sdk-trace-base";
import { LogRecord } from "@opentelemetry/sdk-logs";
import { isExceptionTelemetry } from "../utils";
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
import { QuickPulseMetricNames, QuickpulseExporterOptions } from "./types";
import { hrTimeToMilliseconds, suppressTracing } from "@opentelemetry/core";

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
  private requestDurationHistogram: Histogram | undefined;
  private dependencyDurationHistogram: Histogram | undefined;
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
  private lastRequestRate: { count: number; time: number } = { count: 0, time: 0 };
  private lastFailedRequestRate: { count: number; time: number } = { count: 0, time: 0 };
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
        await context.with(suppressTracing(context.active()), async () => {
          let response = await this.pingSender.ping(params);
          this.quickPulseDone(response);
        });
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
    if (this.meterProvider) {
      return;
    }
    this.lastCpus = os.cpus();
    this.totalDependencyCount = 0;
    this.totalExceptionCount = 0;
    this.totalFailedDependencyCount = 0;
    this.totalFailedRequestCount = 0;
    this.totalRequestCount = 0;
    this.lastRequestRate = { count: 0, time: 0 };
    this.lastFailedRequestRate = { count: 0, time: 0 };
    this.lastDependencyRate = { count: 0, time: 0 };
    this.lastFailedDependencyRate = { count: 0, time: 0 };
    this.lastExceptionRate = { count: 0, time: 0 };

    const meterProviderConfig: MeterProviderOptions = {
      resource: this.config.resource,
    };
    this.meterProvider = new MeterProvider(meterProviderConfig);
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this.quickpulseExporter,
      exportIntervalMillis: options?.collectionInterval,
    };
    this.metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this.meterProvider.addMetricReader(this.metricReader);
    this.meter = this.meterProvider.getMeter("AzureMonitorLiveMetricsMeter");

    this.requestDurationHistogram = this.meter.createHistogram(
      QuickPulseMetricNames.REQUEST_DURATION,
      {
        valueType: ValueType.DOUBLE,
      }
    );
    this.dependencyDurationHistogram = this.meter.createHistogram(
      QuickPulseMetricNames.DEPENDENCY_DURATION,
      {
        valueType: ValueType.DOUBLE,
      }
    );

    this.requestRateGauge = this.meter.createObservableGauge(QuickPulseMetricNames.REQUEST_RATE, {
      valueType: ValueType.DOUBLE,
    });
    this.requestFailedRateGauge = this.meter.createObservableGauge(
      QuickPulseMetricNames.REQUEST_FAILURE_RATE,
      {
        valueType: ValueType.DOUBLE,
      }
    );
    this.dependencyRateGauge = this.meter.createObservableGauge(
      QuickPulseMetricNames.DEPENDENCY_RATE,
      {
        valueType: ValueType.DOUBLE,
      }
    );
    this.dependencyFailedRateGauge = this.meter.createObservableGauge(
      QuickPulseMetricNames.DEPENDENCY_FAILURE_RATE,
      {
        valueType: ValueType.DOUBLE,
      }
    );

    this.memoryCommitedGauge = this.meter.createObservableGauge(
      QuickPulseMetricNames.COMMITTED_BYTES,
      {
        valueType: ValueType.INT,
      }
    );

    this.processorTimeGauge = this.meter.createObservableGauge(
      QuickPulseMetricNames.PROCESSOR_TIME,
      {
        valueType: ValueType.DOUBLE,
      }
    );
    this.exceptionsRateGauge = this.meter.createObservableGauge(
      QuickPulseMetricNames.EXCEPTION_RATE,
      {
        valueType: ValueType.DOUBLE,
      }
    );

    this.requestRateGauge.addCallback(this.getRequestRate.bind(this));
    this.requestFailedRateGauge.addCallback(this.getRequestFailedRate.bind(this));
    this.dependencyRateGauge.addCallback(this.getDependencyRate.bind(this));
    this.dependencyFailedRateGauge.addCallback(this.getDependencyFailedRate.bind(this));
    this.exceptionsRateGauge.addCallback(this.getExceptionRate.bind(this));
    this.memoryCommitedGauge.addCallback(this.getCommitedMemory.bind(this));
    this.processorTimeGauge.addCallback(this.getProcessorTime.bind(this));
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
      // Add document and calculate metrics
      let document: RequestDocumentIngress | RemoteDependencyDocumentIngress =
        getSpanDocument(span);
      this.addDocument(document);
      const durationMs = hrTimeToMilliseconds(span.duration);
      const statusCode = String(span.attributes["http.status_code"]);
      let success = statusCode === "200" ? true : false;

      if (span.kind === SpanKind.SERVER || span.kind === SpanKind.CONSUMER) {
        if (success) {
          this.totalRequestCount++;
        } else {
          this.totalFailedRequestCount++;
        }
        this.requestDurationHistogram?.record(durationMs);
      } else {
        if (success) {
          this.totalDependencyCount++;
        } else {
          this.totalFailedDependencyCount++;
        }
        this.dependencyDurationHistogram?.record(durationMs);
      }
      if (span.events) {
        span.events.forEach((event: TimedEvent) => {
          event.attributes = event.attributes || {};
          if (event.name === "exception") {
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
      let document: TraceDocumentIngress | ExceptionDocumentIngress = getLogDocument(logRecord);
      this.addDocument(document);
      if (isExceptionTelemetry(logRecord)) {
        this.totalExceptionCount++;
      }
    }
  }

  private getRequestRate(observableResult: ObservableResult) {
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

  private getRequestFailedRate(observableResult: ObservableResult) {
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

  private getDependencyRate(observableResult: ObservableResult) {
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

  private getDependencyFailedRate(observableResult: ObservableResult) {
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

  private getExceptionRate(observableResult: ObservableResult) {
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

  private getCommitedMemory(observableResult: ObservableResult) {
    var freeMem = os.freemem();
    var committedMemory = os.totalmem() - freeMem;
    observableResult.observe(committedMemory);
  }

  private getTotalCombinedCpu(cpus: os.CpuInfo[], lastCpus: os.CpuInfo[]) {
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

  private getProcessorTime(observableResult: ObservableResult) {
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
}

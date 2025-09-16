// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import os from "node:os";
import type {
  Histogram,
  Meter,
  ObservableCallback,
  ObservableGauge,
  ObservableResult,
} from "@opentelemetry/api";
import { SpanKind, ValueType } from "@opentelemetry/api";
import type { SdkLogRecord } from "@opentelemetry/sdk-logs";
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import type {
  MeterProviderOptions,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import type { ReadableSpan, TimedEvent } from "@opentelemetry/sdk-trace-base";
import { PerformanceCounterMetricNames } from "./types.js";
import type { AzureMonitorOpenTelemetryOptions } from "../types.js";
import { getLogData, isExceptionData } from "./quickpulse/utils.js";
import type { ExceptionData, TraceData } from "./quickpulse/types.js";
import { Logger } from "../shared/logging/logger.js";
import process from "node:process";

/**
 * Azure Monitor PerformanceCounter Metrics
 */
export class PerformanceCounterMetrics {
  private internalConfig: AzureMonitorOpenTelemetryOptions;
  private collectionInterval = 60000; // 60 seconds
  private meterProvider: MeterProvider;
  private azureExporter: AzureMonitorMetricExporter;
  private meter: Meter;
  private requestDurationHistogram: Histogram;
  private requestRateGauge: ObservableGauge;
  private requestRateGaugeCallback: ObservableCallback;
  private memoryPrivateBytesGauge: ObservableGauge;
  private memoryPrivateBytesGaugeCallback: ObservableCallback;
  private memoryAvailableBytesGauge: ObservableGauge;
  private memoryAvailableBytesGaugeCallback: ObservableCallback;
  private processorTimeGauge: ObservableGauge;
  private processorTimeGaugeCallback: ObservableCallback;
  private processTimeNormalizedGauge: ObservableGauge;
  private processTimeNormalizedGaugeCallback: ObservableCallback;
  private processTimeGauge: ObservableGauge;
  private processTimeGaugeCallback: ObservableCallback;
  private exceptionCountGauge: ObservableGauge;
  private exceptionCountGaugeCallback: ObservableCallback;
  private lastExceptionRate: { count: number; time: number } = { count: 0, time: 0 };
  private totalCount: number = 0;
  private intervalExecutionTime = 0;
  private lastRequestRate: { count: number; time: number; executionInterval: number };
  private lastAppCpuUsage: { user: number; system: number };
  private lastHrtime: number[];
  private lastCpus: {
    model: string;
    speed: number;
    times: { user: number; nice: number; sys: number; idle: number; irq: number };
  }[];
  private lastCpusProcess: {
    model: string;
    speed: number;
    times: { user: number; nice: number; sys: number; idle: number; irq: number };
  }[];
  private totalExceptionCount: number = 0;

  /**
   * Creates performance counter instruments.
   * @param options - Distro configuration.
   * @param config - Application Insights configuration.
   */
  constructor(config: AzureMonitorOpenTelemetryOptions, options?: { collectionInterval: number }) {
    this.internalConfig = config;
    this.lastCpus = os.cpus();
    this.lastCpusProcess = os.cpus();
    this.lastAppCpuUsage = process.cpuUsage();
    this.lastHrtime = process.hrtime();

    this.lastRequestRate = {
      count: this.totalCount,
      time: +new Date(),
      executionInterval: this.intervalExecutionTime,
    };

    this.azureExporter = new AzureMonitorMetricExporter(
      this.internalConfig.azureMonitorExporterOptions,
    );
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this.azureExporter,
      exportIntervalMillis: options?.collectionInterval || this.collectionInterval,
    };
    const meterProviderConfig: MeterProviderOptions = {
      readers: [new PeriodicExportingMetricReader(metricReaderOptions)],
      resource: this.internalConfig.resource,
    };
    this.meterProvider = new MeterProvider(meterProviderConfig);
    this.meter = this.meterProvider.getMeter("AzureMonitorPerformanceCountersMeter");

    this.lastRequestRate = { count: 0, time: 0, executionInterval: 0 };

    // Create Instruments
    this.requestDurationHistogram = this.meter.createHistogram(
      PerformanceCounterMetricNames.REQUEST_DURATION,
      { valueType: ValueType.DOUBLE },
    );
    this.requestRateGauge = this.meter.createObservableGauge(
      PerformanceCounterMetricNames.REQUEST_RATE,
      {
        description: "Incoming Requests Average Execution Time",
        valueType: ValueType.DOUBLE,
      },
    );
    this.memoryPrivateBytesGauge = this.meter.createObservableGauge(
      PerformanceCounterMetricNames.PRIVATE_BYTES,
      { description: "Amount of memory process has used in bytes", valueType: ValueType.INT },
    );
    this.memoryAvailableBytesGauge = this.meter.createObservableGauge(
      PerformanceCounterMetricNames.AVAILABLE_BYTES,
      { description: "Amount of available memory in bytes", valueType: ValueType.INT },
    );
    this.processorTimeGauge = this.meter.createObservableGauge(
      PerformanceCounterMetricNames.PROCESSOR_TIME,
      {
        description: "Processor time as a percentage",
        valueType: ValueType.DOUBLE,
      },
    );
    this.processTimeGauge = this.meter.createObservableGauge(
      PerformanceCounterMetricNames.PROCESS_TIME_STANDARD,
      {
        description: "Process CPU usage as a percentage",
        valueType: ValueType.DOUBLE,
      },
    );
    this.processTimeNormalizedGauge = this.meter.createObservableGauge(
      PerformanceCounterMetricNames.PROCESS_TIME_NORMALIZED,
      {
        description: "Process CPU usage normalized as a percentage",
        valueType: ValueType.DOUBLE,
      },
    );
    this.exceptionCountGauge = this.meter.createObservableGauge(
      PerformanceCounterMetricNames.EXCEPTION_RATE,
      {
        description: "Exception Rate",
        valueType: ValueType.DOUBLE,
      },
    );

    // Add callbacks
    this.requestRateGaugeCallback = this.getRequestRate.bind(this);
    this.memoryPrivateBytesGaugeCallback = this.getPrivateMemory.bind(this);
    this.memoryAvailableBytesGaugeCallback = this.getAvailableMemory.bind(this);
    this.processorTimeGaugeCallback = this.getProcessorTime.bind(this);
    this.processTimeGaugeCallback = this.getProcessTime.bind(this);
    this.processTimeNormalizedGaugeCallback = this.getNormalizedProcessTime.bind(this);
    this.exceptionCountGaugeCallback = this.getExceptionRate.bind(this);

    this.memoryPrivateBytesGauge.addCallback(this.memoryPrivateBytesGaugeCallback);
    this.memoryAvailableBytesGauge.addCallback(this.memoryAvailableBytesGaugeCallback);
    this.processTimeGauge.addCallback(this.processTimeGaugeCallback);
    this.processTimeNormalizedGauge.addCallback(this.processTimeNormalizedGaugeCallback);
    this.processorTimeGauge.addCallback(this.processorTimeGaugeCallback);
    this.requestRateGauge.addCallback(this.requestRateGaugeCallback);
    this.exceptionCountGauge.addCallback(this.exceptionCountGaugeCallback);
  }

  /**
   * Shutdown Meter Provider it will return no-op Meters after being called.
   */
  public async shutdown(): Promise<void> {
    return this.meterProvider.shutdown();
  }

  /**
   * Force flush Meter Provider.
   */
  public async flush(): Promise<void> {
    return this.meterProvider.forceFlush();
  }

  /**
   *Get OpenTelemetry MeterProvider
   */
  public getMeterProvider(): MeterProvider {
    return this.meterProvider;
  }

  /**
   * Record Span metrics
   * @internal
   */
  public recordSpan(span: ReadableSpan): void {
    if (span.kind !== SpanKind.SERVER) {
      return;
    }
    this.totalCount++;
    const durationMs = span.duration[0];
    this.intervalExecutionTime += durationMs;
    this.requestDurationHistogram.record(durationMs);
    if (span.events) {
      span.events.forEach((event: TimedEvent) => {
        event.attributes = event.attributes || {};
        if (event.name === "exception") {
          this.totalExceptionCount++;
        }
      });
    }
  }

  /**
   * Record Log metrics
   * @internal
   */
  public recordLog(logRecord: SdkLogRecord): void {
    const columns: TraceData | ExceptionData = getLogData(logRecord);
    if (isExceptionData(columns)) {
      this.totalExceptionCount++;
    }
  }

  private getRequestRate(observableResult: ObservableResult): void {
    const currentTime = +new Date();
    const intervalRequests = this.totalCount - this.lastRequestRate.count || 0;
    const elapsedMs = currentTime - this.lastRequestRate.time;
    if (elapsedMs > 0) {
      const elapsedSeconds = elapsedMs / 1000;
      const requestsPerSec = intervalRequests / elapsedSeconds;
      observableResult.observe(requestsPerSec);
    }
    this.lastRequestRate = {
      count: this.totalCount,
      time: currentTime,
      executionInterval: this.lastRequestRate.executionInterval,
    };
  }

  private getPrivateMemory(observableResult: ObservableResult): void {
    if (process?.memoryUsage) {
      observableResult.observe(process.memoryUsage().rss);
    } else {
      Logger.getInstance().debug("Couldn't report Private Memory. Process is not defined.");
    }
  }

  private getAvailableMemory(observableResult: ObservableResult): void {
    observableResult.observe(os.freemem());
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

  private getNormalizedProcessTime(observableResult: ObservableResult): void {
    // this reports total ms spent in each category since the OS was booted, to calculate percent it is necessary
    // to find the delta since the last measurement
    const cpus = os.cpus();
    if (
      cpus &&
      cpus.length &&
      this.lastCpusProcess &&
      cpus.length === this.lastCpusProcess.length
    ) {
      // Calculate % of total cpu time (user + system) this App Process used (Only supported by node v6.1.0+)
      let appCpuPercent: number | undefined = undefined;
      const appCpuUsage = process.cpuUsage();
      const hrtime = process.hrtime();
      const totalApp =
        appCpuUsage.user -
          this.lastAppCpuUsage.user +
          (appCpuUsage.system - this.lastAppCpuUsage.system) || 0;

      if (typeof this.lastHrtime !== "undefined" && this.lastHrtime.length === 2) {
        const elapsedTime =
          (hrtime[0] - this.lastHrtime[0]) * 1e6 + (hrtime[1] - this.lastHrtime[1]) / 1e3 || 0; // convert to microseconds

        appCpuPercent = (100 * totalApp) / (elapsedTime * cpus.length);
      }
      // Set previous
      this.lastAppCpuUsage = appCpuUsage;
      this.lastHrtime = hrtime;
      const cpuTotals = this.getTotalCombinedCpu(cpus, this.lastCpusProcess);
      let value = 0;
      if (appCpuPercent !== undefined) {
        value = appCpuPercent;
      } else {
        value = (cpuTotals.totalUser / cpuTotals.combinedTotal) * 100;
      }
      observableResult.observe(value);
    }
    this.lastCpusProcess = cpus;
  }

  private getProcessTime(observableResult: ObservableResult): void {
    // this reports total ms spent in each category since the OS was booted, to calculate percent it is necessary
    // to find the delta since the last measurement
    if (process) {
      const cpus = os.cpus();
      if (
        cpus &&
        cpus.length &&
        this.lastCpusProcess &&
        cpus.length === this.lastCpusProcess.length
      ) {
        // Calculate % of total cpu time (user + system) this App Process used (Only supported by node v6.1.0+)
        let appCpuPercent: number | undefined = undefined;
        const appCpuUsage = process.cpuUsage();
        const hrtime = process.hrtime();
        const totalApp =
          appCpuUsage.user -
            this.lastAppCpuUsage.user +
            (appCpuUsage.system - this.lastAppCpuUsage.system) || 0;

        if (typeof this.lastHrtime !== "undefined" && this.lastHrtime.length === 2) {
          const elapsedTime =
            (hrtime[0] - this.lastHrtime[0]) * 1e6 + (hrtime[1] - this.lastHrtime[1]) / 1e3 || 0; // convert to microseconds
          appCpuPercent = (100 * totalApp) / elapsedTime;
        }
        // Set previous
        this.lastAppCpuUsage = appCpuUsage;
        this.lastHrtime = hrtime;
        const cpuTotals = this.getTotalCombinedCpu(cpus, this.lastCpusProcess);
        let value = 0;
        if (appCpuPercent !== undefined) {
          value = appCpuPercent;
        } else {
          value = (cpuTotals.totalUser / cpuTotals.combinedTotal) * 100;
        }
        observableResult.observe(value);
      }
      this.lastCpusProcess = cpus;
    } else {
      Logger.getInstance().debug("Couldn't report process time. Process is not defined.");
    }
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

  // TODO: Add Process I/O Rate
}

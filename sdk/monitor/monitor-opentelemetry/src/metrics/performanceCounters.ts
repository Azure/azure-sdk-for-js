// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "os";
import {
  Histogram,
  Meter,
  ObservableCallback,
  ObservableGauge,
  ObservableResult,
  SpanKind,
  ValueType,
} from "@opentelemetry/api";
import { AzureMonitorOpenTelemetryConfig } from "../shared/config";
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { SemanticAttributes } from "@opentelemetry/semantic-conventions";
import { PerformanceCounterMetricNames } from "./types";

/**
 * Azure Monitor Performance Counter Metrics
 * @internal
 */
export class PerformanceCounterMetrics {
  private _config: AzureMonitorOpenTelemetryConfig;
  private _collectionInterval = 60000; // 60 seconds
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _meter: Meter;
  private _requestDurationHistogram: Histogram;
  private _requestRateGauge: ObservableGauge;
  private _requestRateGaugeCallback: ObservableCallback;
  private _memoryPrivateBytesGauge: ObservableGauge;
  private _memoryPrivateBytesGaugeCallback: ObservableCallback;
  private _memoryAvailableBytesGauge: ObservableGauge;
  private _memoryAvailableBytesGaugeCallback: ObservableCallback;
  private _processorTimeGauge: ObservableGauge;
  private _processorTimeGaugeCallback: ObservableCallback;
  private _processTimeGauge: ObservableGauge;
  private _processTimeGaugeCallback: ObservableCallback;
  private _totalCount = 0;
  private _intervalExecutionTime = 0;
  private _lastRequestRate: { count: number; time: number; executionInterval: number };
  private _lastAppCpuUsage: { user: number; system: number };
  private _lastHrtime: number[];
  private _lastCpus: {
    model: string;
    speed: number;
    times: { user: number; nice: number; sys: number; idle: number; irq: number };
  }[];

  /**
   * Initializes a new instance of the PerformanceCounterMetrics class.
   * @param config - Distro configuration.
   * @param options - Performance Counters options.
   */
  constructor(config: AzureMonitorOpenTelemetryConfig, options?: { collectionInterval: number }) {
    this._config = config;
    const meterProviderConfig: MeterProviderOptions = {
      resource: this._config.resource,
    };
    this._meterProvider = new MeterProvider(meterProviderConfig);
    this._azureExporter = new AzureMonitorMetricExporter(this._config.azureMonitorExporterConfig);
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: options?.collectionInterval || this._collectionInterval,
    };
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);
    this._meter = this._meterProvider.getMeter("AzureMonitorPerformanceCountersMeter");

    this._lastRequestRate = { count: 0, time: 0, executionInterval: 0 };

    // Create Instruments
    this._requestDurationHistogram = this._meter.createHistogram(
      PerformanceCounterMetricNames.REQUEST_DURATION,
      { valueType: ValueType.DOUBLE }
    );
    this._requestRateGauge = this._meter.createObservableGauge(
      PerformanceCounterMetricNames.REQUEST_RATE,
      {
        description: "Incoming Requests Average Execution Time",
        valueType: ValueType.DOUBLE,
      }
    );
    this._memoryPrivateBytesGauge = this._meter.createObservableGauge(
      PerformanceCounterMetricNames.PRIVATE_BYTES,
      { description: "Amount of memory process has used in bytes", valueType: ValueType.INT }
    );
    this._memoryAvailableBytesGauge = this._meter.createObservableGauge(
      PerformanceCounterMetricNames.AVAILABLE_BYTES,
      { description: "Amount of available memory in bytes", valueType: ValueType.INT }
    );
    this._processorTimeGauge = this._meter.createObservableGauge(
      PerformanceCounterMetricNames.PROCESSOR_TIME,
      {
        description: "Processor time as a percentage",
        valueType: ValueType.DOUBLE,
      }
    );
    this._processTimeGauge = this._meter.createObservableGauge(
      PerformanceCounterMetricNames.PROCESS_TIME,
      {
        description: "Process CPU usage as a percentage",
        valueType: ValueType.DOUBLE,
      }
    );

    this._lastCpus = os.cpus();
    this._lastAppCpuUsage = (process as any).cpuUsage();
    this._lastHrtime = process.hrtime();

    this._lastRequestRate = {
      count: this._totalCount,
      time: +new Date(),
      executionInterval: this._intervalExecutionTime,
    };

    // Add callbacks
    this._requestRateGaugeCallback = this._getRequestRate.bind(this);
    this._memoryPrivateBytesGaugeCallback = this._getPrivateMemory.bind(this);
    this._memoryAvailableBytesGaugeCallback = this._getAvailableMemory.bind(this);
    this._processorTimeGaugeCallback = this._getProcessorTime.bind(this);
    this._processTimeGaugeCallback = this._getProcessTime.bind(this);
    this._memoryPrivateBytesGauge.addCallback(this._memoryPrivateBytesGaugeCallback);
    this._memoryAvailableBytesGauge.addCallback(this._memoryAvailableBytesGaugeCallback);
    this._processTimeGauge.addCallback(this._processTimeGaugeCallback);
    this._processorTimeGauge.addCallback(this._processorTimeGaugeCallback);
    this._requestRateGauge.addCallback(this._requestRateGaugeCallback);
  }

  /**
   * Shutdown Meter Provider it will return no-op Meters after being called.
   */
  public shutdown() {
    this._meterProvider.shutdown();
  }

  /**
   * Force flush Meter Provider.
   */
  public async flush(): Promise<void> {
    await this._meterProvider.forceFlush();
  }

  /**
   * Record Span metrics
   */
  public recordSpan(span: ReadableSpan): void {
    if (span.kind !== SpanKind.SERVER) {
      return;
    }
    const durationMs = span.duration[0];
    this._requestDurationHistogram.record(durationMs);

    let success = false;
    const statusCode = parseInt(String(span.attributes[SemanticAttributes.HTTP_STATUS_CODE]));
    if (!isNaN(statusCode)) {
      success = 0 < statusCode && statusCode < 500;
    }
    if (success) {
      this._totalCount++;
    }
    this._intervalExecutionTime += durationMs;
  }

  private _getRequestRate(observableResult: ObservableResult) {
    const currentTime = +new Date();
    const intervalRequests = this._totalCount - this._lastRequestRate.count || 0;
    const elapsedMs = currentTime - this._lastRequestRate.time;
    if (elapsedMs > 0) {
      const elapsedSeconds = elapsedMs / 1000;
      const requestsPerSec = intervalRequests / elapsedSeconds;
      observableResult.observe(requestsPerSec);
    }
    this._lastRequestRate = {
      count: this._totalCount,
      time: currentTime,
      executionInterval: this._lastRequestRate.executionInterval,
    };
  }

  private _getPrivateMemory(observableResult: ObservableResult) {
    observableResult.observe(process.memoryUsage().rss);
  }

  private _getAvailableMemory(observableResult: ObservableResult) {
    observableResult.observe(os.freemem());
  }

  private _getTotalCombinedCpu(cpus: os.CpuInfo[]) {
    let totalUser = 0;
    let totalSys = 0;
    let totalNice = 0;
    let totalIdle = 0;
    let totalIrq = 0;
    for (let i = 0; !!cpus && i < cpus.length; i++) {
      const cpu = cpus[i];
      const lastCpu = this._lastCpus[i];
      const times = cpu.times;
      const lastTimes = lastCpu.times;
      // user cpu time (or) % CPU time spent in user space
      const user = times.user - lastTimes.user || 0;
      totalUser += user;
      // system cpu time (or) % CPU time spent in kernel space
      const sys = times.sys - lastTimes.sys || 0;
      totalSys += sys;
      // user nice cpu time (or) % CPU time spent on low priority processes
      const nice = times.nice - lastTimes.nice || 0;
      totalNice += nice;
      // idle cpu time (or) % CPU time spent idle
      const idle = times.idle - lastTimes.idle || 0;
      totalIdle += idle;
      // irq (or) % CPU time spent servicing/handling hardware interrupts
      const irq = times.irq - lastTimes.irq || 0;
      totalIrq += irq;
    }
    const combinedTotal = totalUser + totalSys + totalNice + totalIdle + totalIrq || 1;
    return {
      combinedTotal: combinedTotal,
      totalUser: totalUser,
      totalIdle: totalIdle,
    };
  }

  private _getProcessorTime(observableResult: ObservableResult) {
    // this reports total ms spent in each category since the OS was booted, to calculate percent it is necessary
    // to find the delta since the last measurement
    const cpus = os.cpus();
    if (cpus && cpus.length && this._lastCpus && cpus.length === this._lastCpus.length) {
      const cpuTotals = this._getTotalCombinedCpu(cpus);
      const value =
        ((cpuTotals.combinedTotal - cpuTotals.totalIdle) / cpuTotals.combinedTotal) * 100;
      observableResult.observe(value);
    }
    this._lastCpus = cpus;
  }

  private _getProcessTime(observableResult: ObservableResult) {
    // this reports total ms spent in each category since the OS was booted, to calculate percent it is necessary
    // to find the delta since the last measurement
    const cpus = os.cpus();
    if (cpus && cpus.length && this._lastCpus && cpus.length === this._lastCpus.length) {
      // Calculate % of total cpu time (user + system) this App Process used (Only supported by node v6.1.0+)
      let appCpuPercent: number | undefined = undefined;
      const appCpuUsage = (process as any).cpuUsage();
      const hrtime = process.hrtime();
      const totalApp =
        appCpuUsage.user -
          this._lastAppCpuUsage.user +
          (appCpuUsage.system - this._lastAppCpuUsage.system) || 0;

      if (typeof this._lastHrtime !== "undefined" && this._lastHrtime.length === 2) {
        const elapsedTime =
          (hrtime[0] - this._lastHrtime[0]) * 1e6 + (hrtime[1] - this._lastHrtime[1]) / 1e3 || 0; // convert to microseconds

        appCpuPercent = (100 * totalApp) / (elapsedTime * cpus.length);
      }
      // Set previous
      this._lastAppCpuUsage = appCpuUsage;
      this._lastHrtime = hrtime;
      const cpuTotals = this._getTotalCombinedCpu(cpus);
      const value = appCpuPercent || (cpuTotals.totalUser / cpuTotals.combinedTotal) * 100;
      observableResult.observe(value);
    }
    this._lastCpus = cpus;
  }
}

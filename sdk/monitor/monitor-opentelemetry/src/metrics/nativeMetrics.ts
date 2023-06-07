// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { AzureMonitorOpenTelemetryConfig } from "../shared/config";
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { Histogram, Meter, ObservableGauge, ObservableResult } from "@opentelemetry/api";
import { Logger } from "../shared/logging";

/**
 * Azure Monitor Native Metrics
 * @internal
 */
export class _NativeMetrics {
  private _emitter: any;
  private _handle: NodeJS.Timer | undefined;
  private _collectionInterval = 60000; // 60 seconds
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _meter: Meter;
  private _eventLoopHistogram: Histogram;
  private _garbageCollectionScavenge: Histogram;
  private _garbageCollectionMarkSweepCompact: Histogram;
  private _garbageCollectionIncrementalMarking: Histogram;
  private _heapMemoryTotalGauge: ObservableGauge;
  private _heapMemoryUsageGauge: ObservableGauge;
  private _memoryUsageNonHeapGauge: ObservableGauge;

  /**
   * Initializes a new instance of the NativeMetrics class.
   * @param _config - Configuration.
   */
  constructor(
    private _config: AzureMonitorOpenTelemetryConfig,
    options?: { collectionInterval: number }
  ) {
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
    this._meter = this._meterProvider.getMeter("AzureMonitorNativeMetricsMeter");
    this._eventLoopHistogram = this._meter.createHistogram("Event Loop CPU Time");
    this._garbageCollectionScavenge = this._meter.createHistogram(
      "Scavenge Garbage Collection Duration"
    );
    this._garbageCollectionMarkSweepCompact = this._meter.createHistogram(
      "MarkSweepCompact Garbage Collection Duration"
    );
    this._garbageCollectionIncrementalMarking = this._meter.createHistogram(
      "IncrementalMarking Collection Duration"
    );
    this._heapMemoryTotalGauge = this._meter.createObservableGauge("Memory Total (Heap)");
    this._heapMemoryUsageGauge = this._meter.createObservableGauge("Memory Usage (Heap)");
    this._memoryUsageNonHeapGauge = this._meter.createObservableGauge("Memory Usage (Non-Heap)");
    this._initialize();
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

  private _initialize() {
    // Try to require in the native-metrics library. If it's found initialize it, else do nothing and never try again.
    try {
      const NativeMetricsEmitter = require("applicationinsights-native-metrics");
      this._emitter = new NativeMetricsEmitter();
      Logger.getInstance().info("Native metrics module successfully loaded!");
    } catch (err) {
      // Package not available
      return;
    }

    // Enable the emitter if we were able to construct one
    if (this._emitter) {
      try {
        // enable self
        this._emitter.enable(true, this._collectionInterval);
      } catch (err) {
        Logger.getInstance().error("Native metrics enable failed", err);
      }
      // Add histogram data collection
      this._handle = setInterval(() => this._collectHistogramData(), this._collectionInterval);
      this._handle.unref();
      // Add observable callbacks
      this._heapMemoryTotalGauge.addCallback(this._getHeapTotal.bind(this));
      this._heapMemoryUsageGauge.addCallback(this._getHeapUsage.bind(this));
      this._memoryUsageNonHeapGauge.addCallback(this._getNonHeapUsage.bind(this));
    }
  }

  private _getHeapUsage(observableResult: ObservableResult) {
    const memoryUsage = process.memoryUsage();
    const { heapUsed } = memoryUsage;
    observableResult.observe(heapUsed);
  }

  private _getHeapTotal(observableResult: ObservableResult) {
    const memoryUsage = process.memoryUsage();
    const { heapTotal } = memoryUsage;
    observableResult.observe(heapTotal);
  }

  private _getNonHeapUsage(observableResult: ObservableResult) {
    const memoryUsage = process.memoryUsage();
    const { heapTotal, rss } = memoryUsage;
    observableResult.observe(rss - heapTotal);
  }

  private _collectHistogramData() {
    this._getEventLoopCpu();
    this._getGarbageCollection();
  }

  private _getEventLoopCpu() {
    try {
      const loopData = this._emitter.getLoopData();
      const metrics = loopData.loopUsage;
      if (metrics.count === 0) {
        return;
      }
      this._eventLoopHistogram.record(metrics.total);
    } catch (err) {
      Logger.getInstance().error("Native metrics failed to get event loop CPU", err);
    }
  }

  private _getGarbageCollection() {
    try {
      const gcData = this._emitter.getGCData();
      for (const gc in gcData) {
        const metrics = gcData[gc].metrics;
        switch (gc) {
          case "IncrementalMarking":
            this._garbageCollectionIncrementalMarking.record(metrics.total);
            break;
          case "MarkSweepCompact":
            this._garbageCollectionMarkSweepCompact.record(metrics.total);
            break;
          case "Scavenge":
            this._garbageCollectionScavenge.record(metrics.total);
            break;
        }
      }
    } catch (err) {
      Logger.getInstance().error(
        "Native metrics failed to get event Garbage Collection metrics",
        err
      );
    }
  }
}

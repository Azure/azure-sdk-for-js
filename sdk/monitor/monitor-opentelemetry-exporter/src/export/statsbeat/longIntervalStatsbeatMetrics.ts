// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  BatchObservableResult,
  ObservableGauge,
  ObservableResult,
  Meter,
} from "@opentelemetry/api";
import { diag } from "@opentelemetry/api";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode } from "@opentelemetry/core";
import type { PeriodicExportingMetricReaderOptions } from "@opentelemetry/sdk-metrics";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import type { AzureMonitorExporterOptions } from "../../index.js";
import * as ai from "../../utils/constants/applicationinsights.js";
import { StatsbeatMetrics } from "./statsbeatMetrics.js";
import type {
  CommonStatsbeatProperties,
  AttachStatsbeatProperties,
  StatsbeatOptions,
} from "./types.js";
import { StatsbeatCounter, STATSBEAT_LANGUAGE, StatsbeatFeatureType } from "./types.js";
import { AzureMonitorStatsbeatExporter } from "./statsbeatExporter.js";
import { getAttachType } from "../../utils/metricUtils.js";

let instance: LongIntervalStatsbeatMetrics | null = null;

/**
 * Long Interval Statsbeat Metrics
 * @internal
 */
class LongIntervalStatsbeatMetrics extends StatsbeatMetrics {
  private statsCollectionLongInterval: number = 86400000; // 1 day
  // Custom dimensions
  private cikey: string;
  private runtimeVersion: string;
  private language: string;
  private version: string;
  private attach: string = getAttachType();

  private commonProperties: CommonStatsbeatProperties;
  private attachProperties: AttachStatsbeatProperties;

  private feature: number = 0;
  private instrumentation: number = 0;

  private longIntervalStatsbeatMeterProvider: MeterProvider;
  private longIntervalAzureExporter: AzureMonitorStatsbeatExporter;
  private longIntervalMetricReader: PeriodicExportingMetricReader;
  private longIntervalStatsbeatMeter: Meter;

  // Network Attributes
  private connectionString: string;

  // Observable Gauges
  private featureStatsbeatGauge: ObservableGauge;
  private attachStatsbeatGauge: ObservableGauge;

  public isInitialized: boolean = false;

  constructor(options: StatsbeatOptions) {
    super();
    this.connectionString = super.getConnectionString(options.endpointUrl);
    const exporterConfig: AzureMonitorExporterOptions = {
      connectionString: this.connectionString,
      disableOfflineStorage: options.disableOfflineStorage,
    };

    this.setFeatures();

    this.longIntervalStatsbeatMeterProvider = new MeterProvider();
    this.longIntervalAzureExporter = new AzureMonitorStatsbeatExporter(exporterConfig);

    // Export Long Interval Statsbeats every day
    const longIntervalMetricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this.longIntervalAzureExporter,
      exportIntervalMillis:
        Number(process.env.LONG_INTERVAL_EXPORT_MILLIS) || this.statsCollectionLongInterval, // 1 day
    };

    this.longIntervalMetricReader = new PeriodicExportingMetricReader(
      longIntervalMetricReaderOptions,
    );
    this.longIntervalStatsbeatMeterProvider.addMetricReader(this.longIntervalMetricReader);
    this.longIntervalStatsbeatMeter = this.longIntervalStatsbeatMeterProvider.getMeter(
      "Azure Monitor Long Interval Statsbeat",
    );

    // Assign Common Properties
    this.runtimeVersion = process.version;
    this.language = STATSBEAT_LANGUAGE;
    this.version = ai.packageVersion;
    this.cikey = options.instrumentationKey;

    this.featureStatsbeatGauge = this.longIntervalStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.FEATURE,
    );
    this.attachStatsbeatGauge = this.longIntervalStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.ATTACH,
    );
    this.isInitialized = true;
    this.initialize();

    this.commonProperties = {
      os: this.os,
      rp: this.resourceProvider,
      cikey: this.cikey,
      runtimeVersion: this.runtimeVersion,
      language: this.language,
      version: this.version,
      attach: this.attach,
    };

    this.attachProperties = {
      rpId: this.resourceIdentifier,
    };
  }

  private async initialize(): Promise<void> {
    try {
      await this.getResourceProvider();

      // Add long interval observable callbacks
      this.attachStatsbeatGauge.addCallback(this.attachCallback.bind(this));
      this.longIntervalStatsbeatMeter.addBatchObservableCallback(
        this.getEnvironmentStatus.bind(this),
        [this.featureStatsbeatGauge],
      );

      // Export Feature/Attach Statsbeat once upon app initialization after 15 second delay
      setTimeout(async () => {
        this.longIntervalAzureExporter.export(
          (await this.longIntervalMetricReader.collect()).resourceMetrics,
          (result: ExportResult) => {
            if (result.code !== ExportResultCode.SUCCESS) {
              diag.error(`LongIntervalStatsbeat: metrics export failed (error ${result.error})`);
            }
          },
        );
      }, 15000); // 15 seconds
    } catch (error) {
      diag.debug("Call to get the resource provider failed.");
    }
  }

  private getEnvironmentStatus(observableResult: BatchObservableResult): void {
    this.setFeatures();
    let attributes;
    if (this.instrumentation) {
      attributes = {
        ...this.commonProperties,
        feature: this.instrumentation,
        type: StatsbeatFeatureType.INSTRUMENTATION,
      };
      observableResult.observe(this.featureStatsbeatGauge, 1, { ...attributes });
    }

    if (this.feature) {
      attributes = {
        ...this.commonProperties,
        feature: this.feature,
        type: StatsbeatFeatureType.FEATURE,
      };
      observableResult.observe(this.featureStatsbeatGauge, 1, { ...attributes });
    }
  }

  private setFeatures(): void {
    const statsbeatFeatures = process.env.AZURE_MONITOR_STATSBEAT_FEATURES;
    if (statsbeatFeatures) {
      try {
        this.feature = JSON.parse(statsbeatFeatures).feature;
        this.instrumentation = JSON.parse(statsbeatFeatures).instrumentation;
      } catch (error: any) {
        diag.error(
          `LongIntervalStatsbeat: Failed to parse features/instrumentations (error ${error})`,
        );
      }
    }
  }

  private attachCallback(observableResult: ObservableResult): void {
    const attributes = { ...this.commonProperties, ...this.attachProperties };
    observableResult.observe(1, attributes);
  }

  public shutdown(): Promise<void> {
    return this.longIntervalStatsbeatMeterProvider.shutdown();
  }
}

/**
 * Singleton LongIntervalStatsbeatMetrics instance.
 * @internal
 */
export function getInstance(options: StatsbeatOptions): LongIntervalStatsbeatMetrics {
  if (!instance) {
    instance = new LongIntervalStatsbeatMetrics(options);
  }
  return instance;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchObservableResult, Meter, ObservableGauge } from "@opentelemetry/api";
import { diag } from "@opentelemetry/api";
import type { PeriodicExportingMetricReaderOptions } from "@opentelemetry/sdk-metrics";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import type { AzureMonitorExporterOptions } from "../../index.js";
import * as ai from "../../utils/constants/applicationinsights.js";
import { StatsbeatMetrics } from "./statsbeatMetrics.js";
import type { CustomerStatsbeatProperties, StatsbeatOptions } from "./types.js";
import { CustomerStatsbeat, DropCode, RetryCode } from "./types.js";
import { CustomStatsbeatCounter, STATSBEAT_LANGUAGE, TelemetryType } from "./types.js";
import { getAttachType } from "../../utils/metricUtils.js";
import { AzureMonitorStatsbeatExporter } from "./statsbeatExporter.js";

/**
 * Class that handles customer-facing statsbeat metrics
 * These metrics are sent to the customer's breeze endpoint
 *
 * Implements a singleton pattern to ensure only one set of customer statsbeat metrics
 * is exported every 15 minutes, regardless of the number of exporters or senders.
 */
export class CustomerStatsbeatMetrics extends StatsbeatMetrics {
  private static _instance: CustomerStatsbeatMetrics | undefined;

  private statsCollectionInterval: number = 900000; // 15 minutes
  private customerStatsbeatMeter: Meter;
  private customerStatsbeatMeterProvider: MeterProvider;
  private customerStatsbeatExporter: AzureMonitorStatsbeatExporter;
  private customerStatsbeatCounter: CustomerStatsbeat;
  private customerStatsbeatMetricReader: PeriodicExportingMetricReader;
  private isInitialized: boolean = false;

  // Custom dimensions
  private language: string;
  private version: string;
  private attach: string = getAttachType();

  // Observable Gauges
  private itemSuccessCountGauge: ObservableGauge;
  private itemDropCountGauge: ObservableGauge;
  private itemRetryCountGauge: ObservableGauge;

  // Customer statsbeat properties
  private customerProperties: CustomerStatsbeatProperties;

  private constructor(options: StatsbeatOptions) {
    super();
    const exporterConfig: AzureMonitorExporterOptions = {
      connectionString: `InstrumentationKey=${options.instrumentationKey};IngestionEndpoint=${options.endpointUrl}`,
    };

    this.customerStatsbeatExporter = new AzureMonitorStatsbeatExporter(exporterConfig);
    // Exports Customer Statsbeat every 15 minutes
    const customerMetricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this.customerStatsbeatExporter,
      exportIntervalMillis: options.networkCollectionInterval || this.statsCollectionInterval,
    };
    this.customerStatsbeatMetricReader = new PeriodicExportingMetricReader(
      customerMetricReaderOptions,
    );
    this.customerStatsbeatMeterProvider = new MeterProvider({
      readers: [this.customerStatsbeatMetricReader],
    });

    this.customerStatsbeatMeter = this.customerStatsbeatMeterProvider.getMeter(
      "Azure Monitor Customer Statsbeat",
    );

    this.language = STATSBEAT_LANGUAGE;
    this.version = ai.packageVersion;

    this.itemSuccessCountGauge = this.customerStatsbeatMeter.createObservableGauge(
      CustomStatsbeatCounter.ITEM_SUCCESS_COUNT,
    );
    this.itemDropCountGauge = this.customerStatsbeatMeter.createObservableGauge(
      CustomStatsbeatCounter.ITEM_DROP_COUNT,
    );
    this.itemRetryCountGauge = this.customerStatsbeatMeter.createObservableGauge(
      CustomStatsbeatCounter.ITEM_RETRY_COUNT,
    );

    if (!this.isInitialized) {
      this.initialize();
    }
    this.isInitialized = true;

    // Initialize the single customer statsbeat counter
    this.customerStatsbeatCounter = new CustomerStatsbeat();

    this.customerProperties = {
      language: this.language,
      version: this.version,
      computeType: this.attach,
    };
  }

  /**
   * Get singleton instance of CustomerStatsbeatMetrics
   * @param options - Configuration options for customer statsbeat metrics
   * @returns The singleton instance
   */
  public static getInstance(options: StatsbeatOptions): CustomerStatsbeatMetrics {
    if (!CustomerStatsbeatMetrics._instance) {
      CustomerStatsbeatMetrics._instance = new CustomerStatsbeatMetrics(options);
    }
    return CustomerStatsbeatMetrics._instance;
  }

  /**
   * Shutdown the singleton instance
   * Used for cleanup and complete shutdown
   */
  public static shutdown(): Promise<void> | undefined {
    if (CustomerStatsbeatMetrics._instance) {
      const shutdownPromise = CustomerStatsbeatMetrics._instance.shutdown();
      CustomerStatsbeatMetrics._instance = undefined;
      return shutdownPromise;
    }
    return undefined;
  }

  /**
   * Shuts down the customer statsbeat metrics provider
   * @returns Promise<void>
   */
  public shutdown(): Promise<void> {
    return this.customerStatsbeatMeterProvider.shutdown();
  }

  /**
   * Initializes the customer statsbeat metrics
   * Sets up the resource provider and adds observable callbacks for each metric
   * @returns Promise<void>
   */
  private async initialize(): Promise<void> {
    try {
      await super.getResourceProvider();
      this.customerStatsbeatMeter.addBatchObservableCallback(this.itemSuccessCallback.bind(this), [
        this.itemSuccessCountGauge,
      ]);
      this.customerStatsbeatMeter.addBatchObservableCallback(this.itemDropCallback.bind(this), [
        this.itemDropCountGauge,
      ]);
      this.customerStatsbeatMeter.addBatchObservableCallback(this.itemRetryCallback.bind(this), [
        this.itemRetryCountGauge,
      ]);
    } catch (error) {
      diag.debug("Call to get the resource provider failed for customer statsbeat metrics.");
    }
  }

  // Observable gauge callbacks
  private itemSuccessCallback(observableResult: BatchObservableResult): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;
    const attributes = { ...this.customerProperties, telemetry_type: TelemetryType.UNKNOWN };

    // For each { telemetry_type -> count } mapping, call observe, passing the count and attributes that include the telemetry_type
    for (const [telemetry_type, count] of counter.totalItemSuccessCount.entries()) {
      attributes.telemetry_type = telemetry_type;
      observableResult.observe(this.itemSuccessCountGauge, count, {
        ...attributes,
      });
      counter.totalItemSuccessCount.set(telemetry_type, 0);
    }
  }

  private itemDropCallback(observableResult: BatchObservableResult): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;
    const baseAttributes: CustomerStatsbeatProperties & {
      "drop.code": DropCode | number;
      telemetry_type: TelemetryType;
    } = {
      ...this.customerProperties,
      "drop.code": DropCode.UNKNOWN,
      telemetry_type: TelemetryType.UNKNOWN,
    };

    // For each { drop.code, telemetry_type -> count } mapping, call observe, passing the count and attributes that include the drop.code and telemetry_type
    for (let i = 0; i < counter.totalItemDropCount.length; i++) {
      const attributes = { ...baseAttributes };
      attributes["drop.code"] = counter.totalItemDropCount[i]["drop.code"];
      attributes.telemetry_type = counter.totalItemDropCount[i].telemetry_type;

      // Add exception.message only for CLIENT_EXCEPTION drop code
      if (
        counter.totalItemDropCount[i]["drop.code"] === DropCode.CLIENT_EXCEPTION &&
        counter.totalItemDropCount[i]["exception.message"]
      ) {
        (attributes as any)["exception.message"] =
          counter.totalItemDropCount[i]["exception.message"];
      }

      observableResult.observe(this.itemDropCountGauge, counter.totalItemDropCount[i].count, {
        ...attributes,
      });
      counter.totalItemDropCount[i].count = 0;
    }
  }

  private itemRetryCallback(observableResult: BatchObservableResult): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;
    const baseAttributes: CustomerStatsbeatProperties & {
      "retry.code": RetryCode | number;
      telemetry_type: TelemetryType;
    } = {
      ...this.customerProperties,
      "retry.code": RetryCode.UNKNOWN,
      telemetry_type: TelemetryType.UNKNOWN,
    };

    // For each { retry.code, telemetry_type -> count } mapping, call observe, passing the count and attributes that include the retry.code and telemetry_type
    for (let i = 0; i < counter.totalItemRetryCount.length; i++) {
      const attributes = { ...baseAttributes };
      attributes["retry.code"] = counter.totalItemRetryCount[i]["retry.code"];
      attributes.telemetry_type = counter.totalItemRetryCount[i].telemetry_type;

      // Add exception.message only for CLIENT_EXCEPTION retry code
      if (
        counter.totalItemRetryCount[i]["retry.code"] === RetryCode.CLIENT_EXCEPTION &&
        counter.totalItemRetryCount[i]["exception.message"]
      ) {
        (attributes as any)["exception.message"] =
          counter.totalItemRetryCount[i]["exception.message"];
      }

      observableResult.observe(this.itemRetryCountGauge, counter.totalItemRetryCount[i].count, {
        ...attributes,
      });
      counter.totalItemRetryCount[i].count = 0;
    }
  }

  // Public methods to track metrics
  /**
   * Tracks succcessful items
   * @param envelopes - Number of successful envelopes
   * @param telemetry_type - The type of telemetry being tracked
   */
  public countSuccessfulItems(envelopes: number, telemetry_type: TelemetryType): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;

    // Get the current count for this telemetry type, or 0 if it doesn't exist
    const currentCount = counter.totalItemSuccessCount.get(telemetry_type) || 0;
    counter.totalItemSuccessCount.set(telemetry_type, currentCount + envelopes);
  }

  /**
   * Tracks dropped items
   * @param envelopes - Number of envelopes dropped
   * @param dropCode - The drop code indicating the reason for drop
   * @param telemetry_type - The type of telemetry being tracked
   * @param exceptionMessage - Optional exception message when dropCode is CLIENT_EXCEPTION
   */
  public countDroppedItems(
    envelopes: number,
    dropCode: DropCode | number,
    telemetry_type: TelemetryType,
    exceptionMessage?: string,
  ): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;

    // Check if an entry with the same drop code, telemetry type, and exception message already exists
    const existingEntry = counter.totalItemDropCount.find(
      (entry) =>
        entry["drop.code"] === dropCode &&
        entry.telemetry_type === telemetry_type &&
        entry["exception.message"] === exceptionMessage,
    );

    if (existingEntry) {
      existingEntry.count += envelopes;
    } else {
      const newEntry: {
        count: number;
        "drop.code": DropCode | number;
        telemetry_type: TelemetryType;
        "exception.message"?: string;
      } = {
        count: envelopes,
        "drop.code": dropCode,
        telemetry_type,
      };

      if (dropCode === DropCode.CLIENT_EXCEPTION && exceptionMessage) {
        newEntry["exception.message"] = exceptionMessage;
      }

      counter.totalItemDropCount.push(newEntry);
    }
  }
  /**
   * Tracks retried envelopes
   * @param envelopes - Number of envelopes retried
   * @param retryCode - The retry code indicating the reason for retry
   * @param telemetry_type - The type of telemetry being tracked
   * @param exceptionMessage - Optional exception message when retryCode is CLIENT_EXCEPTION
   */
  public countRetryItems(
    envelopes: number,
    retryCode: RetryCode | number,
    telemetry_type: TelemetryType,
    exceptionMessage?: string,
  ): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;

    // Check if an entry with the same retry code, telemetry type, and exception message already exists
    const existingEntry = counter.totalItemRetryCount.find(
      (entry) =>
        entry["retry.code"] === retryCode &&
        entry.telemetry_type === telemetry_type &&
        entry["exception.message"] === exceptionMessage,
    );

    if (existingEntry) {
      existingEntry.count += envelopes;
    } else {
      const newEntry: {
        count: number;
        "retry.code": RetryCode | number;
        telemetry_type: TelemetryType;
        "exception.message"?: string;
      } = {
        count: envelopes,
        "retry.code": retryCode,
        telemetry_type,
      };

      if (retryCode === RetryCode.CLIENT_EXCEPTION && exceptionMessage) {
        newEntry["exception.message"] = exceptionMessage;
      }

      counter.totalItemRetryCount.push(newEntry);
    }
  }
}

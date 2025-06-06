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
 *
 * Use `CustomerStatsbeatMetrics.getInstance()` to get a reference to the shared instance.
 * Use `CustomerStatsbeatMetrics.shutdown()` to shut down the singleton instance.
 */
export class CustomerStatsbeatMetrics extends StatsbeatMetrics {
  private static _instance: CustomerStatsbeatMetrics | undefined;

  private statsCollectionInterval: number = 30000; // 15 minutes
  private customerStatsbeatMeter: Meter;
  private customerStatsbeatMeterProvider: MeterProvider;
  private customerStatsbeatExporter: AzureMonitorStatsbeatExporter;
  private customerStatsbeatCounter: CustomerStatsbeat;
  private customerStatsbeatMetricReader: PeriodicExportingMetricReader;
  private isInitialized: boolean = false;

  private endpointUrl: string;
  private host: string;

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
      exportIntervalMillis: options.networkCollectionInterval || this.statsCollectionInterval, // Using network interval option for customer metrics
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
    this.host = this.getShortHost(options.endpointUrl);
    this.endpointUrl = options.endpointUrl;

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
    this.customerStatsbeatCounter = new CustomerStatsbeat(this.endpointUrl, this.host);

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

      // Add customer statsbeat observable callbacks
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
    // Only send metrics if count is greater than zero
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;
    const attributes = { ...this.customerProperties, telemetry_type: TelemetryType.UNKNOWN };

    // For each { telemetry_type -> count } mapping, call observe, passing the count and attributes that include the telemetry_type
    for (let i = 0; i < counter.totalItemSuccessCount.length; i++) {
      // Only send metrics if count is greater than zero
      // if (counter.totalItemSuccessCount[i].count > 0) {
        attributes.telemetry_type = counter.totalItemSuccessCount[i].telemetry_type;
        observableResult.observe(
          this.itemSuccessCountGauge,
          counter.totalItemSuccessCount[i].count,
          {
            ...attributes,
          },
        );
        counter.totalItemSuccessCount[i].count = 0;
      // }
    }
  }

  private itemDropCallback(observableResult: BatchObservableResult): void {
    // Only send metrics if count is greater than zero
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;
    const baseAttributes = { ...this.customerProperties, "drop.code": DropCode.UNKNOWN };

    // For each { drop.code -> count } mapping, call observe, passing the count and attributes that include the drop.code
    for (let i = 0; i < counter.totalItemDropCount.length; i++) {
      // Only send metrics if count is greater than zero
      if (counter.totalItemDropCount[i].count > 0) {
        const attributes = { ...baseAttributes };
        attributes["drop.code"] = counter.totalItemDropCount[i]["drop.code"];

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
  }

  private itemRetryCallback(observableResult: BatchObservableResult): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;
    const baseAttributes = { ...this.customerProperties, "retry.code": RetryCode.UNKNOWN };

    // For each { retry.code -> count } mapping, call observe, passing the count and attributes that include the retry.code
    for (let i = 0; i < counter.totalItemRetryCount.length; i++) {
      // Only send metrics if count is greater than zero
      if (counter.totalItemRetryCount[i].count > 0) {
        const attributes = { ...baseAttributes };
        attributes["retry.code"] = counter.totalItemRetryCount[i]["retry.code"];

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
  }

  // Public methods to track metrics
  /**
   * Tracks succcessful items
   * @param envelopes - Number of successful envelopes
   * @param telemetry_type - The type of telemetry being tracked
   */
  public countSuccessfulItems(envelopes: number, telemetry_type: TelemetryType): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;

    // Check if an entry with the same telemetry_type already exists
    const existingEntry = counter.totalItemSuccessCount.find(
      (entry) => entry.telemetry_type === telemetry_type,
    );

    if (existingEntry) {
      // Increment the existing entry's count
      existingEntry.count += envelopes;
    } else {
      // Create a new entry
      counter.totalItemSuccessCount.push({ count: envelopes, telemetry_type });
    }
  }

  /**
   * Tracks dropped items
   * @param envelopes - Number of envelopes dropped
   * @param dropCode - The drop code indicating the reason for drop
   * @param exceptionMessage - Optional exception message when dropCode is CLIENT_EXCEPTION
   */
  public countDroppedItems(envelopes: number, dropCode: DropCode, exceptionMessage?: string): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;

    // Check if an entry with the same drop code and exception message already exists
    const existingEntry = counter.totalItemDropCount.find(
      (entry) => entry["drop.code"] === dropCode && entry["exception.message"] === exceptionMessage,
    );

    if (existingEntry) {
      // Increment the existing entry's count
      existingEntry.count += envelopes;
    } else {
      // Create a new entry
      const newEntry: { count: number; "drop.code": DropCode; "exception.message"?: string } = {
        count: envelopes,
        "drop.code": dropCode,
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
   * @param exceptionMessage - Optional exception message when retryCode is CLIENT_EXCEPTION
   */
  public countRetryItems(envelopes: number, retryCode: RetryCode, exceptionMessage?: string): void {
    const counter: CustomerStatsbeat = this.customerStatsbeatCounter;

    // Check if an entry with the same retry code and exception message already exists
    const existingEntry = counter.totalItemRetryCount.find(
      (entry) =>
        entry["retry.code"] === retryCode && entry["exception.message"] === exceptionMessage,
    );

    if (existingEntry) {
      // Increment the existing entry's count
      existingEntry.count += envelopes;
    } else {
      // Create a new entry
      const newEntry: { count: number; "retry.code": RetryCode; "exception.message"?: string } = {
        count: envelopes,
        "retry.code": retryCode,
      };

      if (retryCode === RetryCode.CLIENT_EXCEPTION && exceptionMessage) {
        newEntry["exception.message"] = exceptionMessage;
      }

      counter.totalItemRetryCount.push(newEntry);
    }
  }

  private getShortHost(originalHost: string): string {
    let shortHost = originalHost;
    try {
      const hostRegex = new RegExp(/^https?:\/\/(?:www\.)?([^/.-]+)/);
      const res = hostRegex.exec(originalHost);
      if (res !== null && res.length > 1) {
        shortHost = res[1];
      }
      shortHost = shortHost.replace(".in.applicationinsights.azure.com", "");
    } catch (error) {
      diag.debug("Failed to get the short host name.");
    }
    return shortHost;
  }
}

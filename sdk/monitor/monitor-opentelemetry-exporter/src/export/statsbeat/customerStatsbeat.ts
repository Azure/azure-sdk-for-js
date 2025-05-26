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
import { AzureMonitorMetricExporter } from "../metric.js";
import { getAttachType } from "../../utils/metricUtils.js";

/**
 * Class that handles customer-facing statsbeat metrics
 * These metrics are sent to the customer's breeze endpoint
 */
export class CustomerStatsbeatMetrics extends StatsbeatMetrics {
  private statsCollectionInterval: number = 900000; // 15 minutes
  private customerStatsbeatMeter: Meter;
  private customerStatsbeatMeterProvider: MeterProvider;
  private customerAzureExporter: AzureMonitorMetricExporter;
  private customerStatsbeatCollection: Array<CustomerStatsbeat> = [];

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

  constructor(options: StatsbeatOptions) {
    super();
    // Use the customer's regular endpoint, not the statsbeat endpoint
    // TODO: Fix this to use the correct connection string value
    const exporterConfig: AzureMonitorExporterOptions = {
      connectionString: `InstrumentationKey=${options.instrumentationKey};IngestionEndpoint=${options.endpointUrl}`,
    };

    this.customerAzureExporter = new AzureMonitorMetricExporter(exporterConfig);
    // Exports Customer Statsbeat every 15 minutes
    const customerMetricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this.customerAzureExporter,
      exportIntervalMillis: options.networkCollectionInterval || this.statsCollectionInterval, // Using network interval option for customer metrics
    };
    this.customerStatsbeatMeterProvider = new MeterProvider({
      readers: [new PeriodicExportingMetricReader(customerMetricReaderOptions)],
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

    this.initialize();

    this.customerProperties = {
      language: this.language,
      version: this.version,
      computeType: this.attach,
    };
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
    const counter: CustomerStatsbeat = this.getCustomerStatsbeatCounter(
      this.endpointUrl,
      this.host,
    );
    const attributes = { ...this.customerProperties, telemetry_type: TelemetryType.UNKNOWN };

    // For each { telemetry_type -> count } mapping, call observe, passing the count and attributes that include the telemetry_type
    for (let i = 0; i < counter.totalItemDropCount.length; i++) {
      // Only send metrics if count is greater than zero
      if (counter.totalItemSuccessCount[i].count > 0) {
        attributes.telemetry_type = counter.totalItemSuccessCount[i].telemetry_type;
        observableResult.observe(
          this.itemSuccessCountGauge,
          counter.totalItemSuccessCount[i].count,
          {
            ...attributes,
          },
        );
        counter.totalItemSuccessCount[i].count = 0;
      }
    }
  }

  // TODO: exception.message populate if "drop.code" is CLIENT_EXCEPTION
  private itemDropCallback(observableResult: BatchObservableResult): void {
    // Only send metrics if count is greater than zero
    const counter: CustomerStatsbeat = this.getCustomerStatsbeatCounter(
      this.endpointUrl,
      this.host,
    );
    const attributes = { ...this.customerProperties, "drop.code": DropCode.UNKNOWN };

    // For each { drop.code -> count } mapping, call observe, passing the count and attributes that include the drop.code
    for (let i = 0; i < counter.totalItemDropCount.length; i++) {
      // Only send metrics if count is greater than zero
      if (counter.totalItemDropCount[i].count > 0) {
        attributes["drop.code"] = counter.totalItemDropCount[i]["drop.code"];
        observableResult.observe(this.itemDropCountGauge, counter.totalItemDropCount[i].count, {
          ...attributes,
        });
        counter.totalItemDropCount[i].count = 0;
      }
    }
  }

  // TODO: exception.message populate if "drop.code" is CLIENT_EXCEPTION
  private itemRetryCallback(observableResult: BatchObservableResult): void {
    const counter: CustomerStatsbeat = this.getCustomerStatsbeatCounter(
      this.endpointUrl,
      this.host,
    );
    const attributes = { ...this.customerProperties, "retry.code": RetryCode.UNKNOWN };

    // For each { retry.code -> count } mapping, call observe, passing the count and attributes that include the retry.code
    for (let i = 0; i < counter.totalItemRetryCount.length; i++) {
      // Only send metrics if count is greater than zero
      if (counter.totalItemRetryCount[i].count > 0) {
        attributes["retry.code"] = counter.totalItemRetryCount[i]["retry.code"];
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
    const counter: CustomerStatsbeat = this.getCustomerStatsbeatCounter(this.endpointUrl, this.host);
    counter.totalItemSuccessCount.push({ count: envelopes, telemetry_type });
  }

  /**
   * Tracks dropped items
   * @param envelopes - Number of envelopes dropped
   * @param dropCode - The drop code indicating the reason for drop
   */
  public countDroppedItems(envelopes: number, dropCode: DropCode): void {
    const counter: CustomerStatsbeat = this.getCustomerStatsbeatCounter(this.endpointUrl, this.host);
    counter.totalItemDropCount.push({
      count: envelopes,
      "drop.code": dropCode,
    });
  }
  /**
   * Tracks retried envelopes
   * @param envelopes - Number of envelopes retried
   * @param retryCode - The retry code indicating the reason for retry
   */
  public countRetryItems(envelopes: number, retryCode: RetryCode): void {
    const counter: CustomerStatsbeat = this.getCustomerStatsbeatCounter(this.endpointUrl, this.host);
    counter.totalItemRetryCount.push({
      count: envelopes,
      "retry.code": retryCode,
    });
  }

  // Gets a customerStatsbeat counter if one exists for the given endpoint
  private getCustomerStatsbeatCounter(endpoint: string, host: string): CustomerStatsbeat {
    // Check if the counter is available
    for (let i = 0; i < this.customerStatsbeatCollection.length; i++) {
      // Same object
      if (
        endpoint === this.customerStatsbeatCollection[i].endpoint &&
        host === this.customerStatsbeatCollection[i].host
      ) {
        return this.customerStatsbeatCollection[i];
      }
    }
    // Create a new counter if not found
    const newCounter = new CustomerStatsbeat(endpoint, host);
    this.customerStatsbeatCollection.push(newCounter);
    return newCounter;
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

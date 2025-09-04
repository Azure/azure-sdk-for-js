// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchObservableResult, Meter, ObservableGauge } from "@opentelemetry/api";
import { diag } from "@opentelemetry/api";
import type { PeriodicExportingMetricReaderOptions } from "@opentelemetry/sdk-metrics";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import type { AzureMonitorExporterOptions } from "../../index.js";
import * as ai from "../../utils/constants/applicationinsights.js";
import { StatsbeatMetrics } from "./statsbeatMetrics.js";
import type { CustomerSDKStatsProperties, StatsbeatOptions } from "./types.js";
import {
  CustomerSDKStats,
  DropCode,
  RetryCode,
  ExceptionType,
  DropReason,
  RetryReason,
} from "./types.js";
import { CustomSDKStatsCounter, STATSBEAT_LANGUAGE, TelemetryType } from "./types.js";
import { getAttachType } from "../../utils/metricUtils.js";
import { AzureMonitorStatsbeatExporter } from "./statsbeatExporter.js";
import { BreezePerformanceCounterNames } from "../../types.js";
import type { MetricsData, RemoteDependencyData, RequestData } from "../../generated/index.js";
import type { TelemetryItem as Envelope } from "../../generated/index.js";

/**
 * Class that handles customer-facing SDK Stats metrics
 * These metrics are sent to the customer's breeze endpoint
 *
 * Implements a singleton pattern to ensure only one set of customer SDK Stats metrics
 * is exported every 15 minutes, regardless of the number of exporters or senders.
 */
export class CustomerSDKStatsMetrics extends StatsbeatMetrics {
  private static _instance: CustomerSDKStatsMetrics | undefined;

  private statsCollectionInterval: number = 900000; // 15 minutes
  private customerSDKStatsMeter: Meter;
  private customerSDKStatsMeterProvider: MeterProvider;
  private customerSDKStatsExporter: AzureMonitorStatsbeatExporter;
  private customerSDKStatsCounter: CustomerSDKStats;
  private customerSDKStatsMetricReader: PeriodicExportingMetricReader;
  private isInitialized: boolean = false;

  // Custom dimensions
  private language: string;
  private version: string;
  private attach: string = getAttachType();

  // Observable Gauges
  private itemSuccessCountGauge: ObservableGauge;
  private itemDropCountGauge: ObservableGauge;
  private itemRetryCountGauge: ObservableGauge;

  // Customer SDK Stats properties
  private customerProperties: CustomerSDKStatsProperties;

  private constructor(options: StatsbeatOptions) {
    super();
    const exporterConfig: AzureMonitorExporterOptions = {
      connectionString: `InstrumentationKey=${options.instrumentationKey};IngestionEndpoint=${options.endpointUrl}`,
    };

    this.customerSDKStatsExporter = new AzureMonitorStatsbeatExporter(exporterConfig);
    // Exports Customer SDK Stats every 15 minutes
    const customerMetricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this.customerSDKStatsExporter,
      exportIntervalMillis: options.networkCollectionInterval || this.statsCollectionInterval,
    };
    this.customerSDKStatsMetricReader = new PeriodicExportingMetricReader(
      customerMetricReaderOptions,
    );
    this.customerSDKStatsMeterProvider = new MeterProvider({
      readers: [this.customerSDKStatsMetricReader],
    });

    this.customerSDKStatsMeter = this.customerSDKStatsMeterProvider.getMeter(
      "Azure Monitor Customer SDK Stats",
    );

    this.language = STATSBEAT_LANGUAGE;
    this.version = ai.packageVersion;

    this.itemSuccessCountGauge = this.customerSDKStatsMeter.createObservableGauge(
      CustomSDKStatsCounter.ITEM_SUCCESS_COUNT,
    );
    this.itemDropCountGauge = this.customerSDKStatsMeter.createObservableGauge(
      CustomSDKStatsCounter.ITEM_DROP_COUNT,
    );
    this.itemRetryCountGauge = this.customerSDKStatsMeter.createObservableGauge(
      CustomSDKStatsCounter.ITEM_RETRY_COUNT,
    );

    if (!this.isInitialized) {
      this.initialize();
    }
    this.isInitialized = true;

    // Initialize the single customer SDK Stats counter
    this.customerSDKStatsCounter = new CustomerSDKStats();

    this.customerProperties = {
      language: this.language,
      version: this.version,
      computeType: this.attach,
    };
  }

  /**
   * Get singleton instance of CustomerSDKStatsMetrics
   * @param options - Configuration options for customer SDK Stats metrics
   * @returns The singleton instance
   */
  public static getInstance(options: StatsbeatOptions): CustomerSDKStatsMetrics {
    if (!CustomerSDKStatsMetrics._instance) {
      CustomerSDKStatsMetrics._instance = new CustomerSDKStatsMetrics(options);
    }
    return CustomerSDKStatsMetrics._instance;
  }

  /**
   * Shutdown the singleton instance
   * Used for cleanup and complete shutdown
   */
  public static shutdown(): Promise<void> | undefined {
    if (CustomerSDKStatsMetrics._instance) {
      const shutdownPromise = CustomerSDKStatsMetrics._instance.shutdown();
      CustomerSDKStatsMetrics._instance = undefined;
      return shutdownPromise;
    }
    return undefined;
  }

  /**
   * Shuts down the customer SDK Stats metrics provider
   * @returns Promise<void>
   */
  public shutdown(): Promise<void> {
    return this.customerSDKStatsMeterProvider.shutdown();
  }

  /**
   * Initializes the customer SDK Stats metrics
   * Sets up the resource provider and adds observable callbacks for each metric
   * @returns Promise<void>
   */
  private async initialize(): Promise<void> {
    try {
      await super.getResourceProvider();
      this.customerSDKStatsMeter.addBatchObservableCallback(this.itemSuccessCallback.bind(this), [
        this.itemSuccessCountGauge,
      ]);
      this.customerSDKStatsMeter.addBatchObservableCallback(this.itemDropCallback.bind(this), [
        this.itemDropCountGauge,
      ]);
      this.customerSDKStatsMeter.addBatchObservableCallback(this.itemRetryCallback.bind(this), [
        this.itemRetryCountGauge,
      ]);
    } catch (error) {
      diag.debug("Call to get the resource provider failed for customer SDK Stats metrics.");
    }
  }

  // Observable gauge callbacks
  private itemSuccessCallback(observableResult: BatchObservableResult): void {
    const counter: CustomerSDKStats = this.customerSDKStatsCounter;
    const attributes = { ...this.customerProperties, telemetry_type: TelemetryType.UNKNOWN };

    // For each { telemetry_type -> count } mapping, call observe, passing the count and attributes that include the telemetry_type
    for (const [telemetry_type, count] of counter.totalItemSuccessCount.entries()) {
      // Only send metrics if count is greater than zero
      if (count > 0) {
        attributes.telemetry_type = telemetry_type;
        observableResult.observe(this.itemSuccessCountGauge, count, {
          ...attributes,
        });
        counter.totalItemSuccessCount.set(telemetry_type, 0);
      }
    }
  }

  private itemDropCallback(observableResult: BatchObservableResult): void {
    const counter: CustomerSDKStats = this.customerSDKStatsCounter;
    const baseAttributes: CustomerSDKStatsProperties & {
      "drop.code": DropCode | number;
      telemetry_type: TelemetryType;
    } = {
      ...this.customerProperties,
      "drop.code": DropCode.UNKNOWN,
      telemetry_type: TelemetryType.UNKNOWN,
    };

    // Iterate through the nested Map structure: telemetry_type -> drop.code -> reason -> telemetry_success -> count
    for (const [telemetryType, dropCodeMap] of counter.totalItemDropCount.entries()) {
      for (const [dropCode, reasonMap] of dropCodeMap.entries()) {
        for (const [reason, successMap] of reasonMap.entries()) {
          for (const [success, count] of successMap.entries()) {
            const attributes = { ...baseAttributes };
            attributes.telemetry_type = telemetryType;
            attributes["drop.code"] = dropCode;

            // Include drop.reason for all cases
            if (reason) {
              (attributes as any)["drop.reason"] = reason;
            }

            // Include telemetry_success only for request/dependency telemetry when success is not null
            if (
              (telemetryType === TelemetryType.REQUEST ||
                telemetryType === TelemetryType.DEPENDENCY) &&
              success !== null
            ) {
              (attributes as any)["telemetry_success"] = success;
            }

            // Only send metrics if count is greater than zero
            if (count > 0) {
              observableResult.observe(this.itemDropCountGauge, count, {
                ...attributes,
              });
            }

            // Reset the count to 0
            successMap.set(success, 0);
          }
        }
      }
    }
  }

  private itemRetryCallback(observableResult: BatchObservableResult): void {
    const counter: CustomerSDKStats = this.customerSDKStatsCounter;
    const baseAttributes: CustomerSDKStatsProperties & {
      "retry.code": RetryCode | number;
      telemetry_type: TelemetryType;
    } = {
      ...this.customerProperties,
      "retry.code": RetryCode.UNKNOWN,
      telemetry_type: TelemetryType.UNKNOWN,
    };

    // Iterate through the nested Map structure: telemetry_type -> retry.code -> reason -> count
    for (const [telemetryType, retryCodeMap] of counter.totalItemRetryCount.entries()) {
      for (const [retryCode, reasonMap] of retryCodeMap.entries()) {
        for (const [reason, count] of reasonMap.entries()) {
          const attributes = { ...baseAttributes };
          attributes.telemetry_type = telemetryType;
          attributes["retry.code"] = retryCode;

          // Include retry.reason for all cases
          if (reason) {
            (attributes as any)["retry.reason"] = reason;
          }

          // Only send metrics if count is greater than zero
          if (count > 0) {
            observableResult.observe(this.itemRetryCountGauge, count, {
              ...attributes,
            });
          }

          // Reset the count to 0
          reasonMap.set(reason, 0);
        }
      }
    }
  }

  // Public methods to track metrics
  /**
   * Tracks succcessful items
   * @param envelopes - Number of successful envelopes
   * @param telemetry_type - The type of telemetry being tracked
   */
  public countSuccessfulItems(envelopes: Envelope[]): void {
    const counter: CustomerSDKStats = this.customerSDKStatsCounter;
    let telemetry_type: TelemetryType;

    // Get the current count for this telemetry type, or 0 if it doesn't exist
    for (const envelope of envelopes) {
      telemetry_type = this.getTelemetryTypeFromEnvelope(envelope);
      const currentCount = counter.totalItemSuccessCount.get(telemetry_type) || 0;
      counter.totalItemSuccessCount.set(telemetry_type, currentCount + 1);
    }
  }

  /**
   * Tracks dropped items
   * @param envelopes - Array of envelopes dropped
   * @param dropCode - The drop code indicating the reason for drop
   * @param exceptionMessage - Optional exception message when dropCode is CLIENT_EXCEPTION
   * @param exceptionType - Optional explicit exception type override when dropCode is CLIENT_EXCEPTION
   */
  public countDroppedItems(
    envelopes: Envelope[],
    dropCode: DropCode | number,
    exceptionMessage?: string,
    exceptionType?: ExceptionType,
  ): void {
    const counter: CustomerSDKStats = this.customerSDKStatsCounter;
    let telemetry_type: TelemetryType;

    for (const envelope of envelopes) {
      telemetry_type = this.getTelemetryTypeFromEnvelope(envelope);

      let dropCodeMap = counter.totalItemDropCount.get(telemetry_type);
      if (!dropCodeMap) {
        dropCodeMap = new Map<DropCode | number, Map<string, Map<boolean | null, number>>>();
        counter.totalItemDropCount.set(telemetry_type, dropCodeMap);
      }

      // Get or create the reason map for this dropCode
      let reasonMap = dropCodeMap.get(dropCode);
      if (!reasonMap) {
        reasonMap = new Map<string, Map<boolean | null, number>>();
        dropCodeMap.set(dropCode, reasonMap);
      }

      // Generate a low-cardinality, informative reason description
      const reason = this.getDropReason(dropCode, exceptionMessage, exceptionType);

      // Get or create the success map for this reason
      let successMap = reasonMap.get(reason);
      if (!successMap) {
        successMap = new Map<boolean | null, number>();
        reasonMap.set(reason, successMap);
      }

      // For non-request/dependency telemetry or when success is not provided, use null as the success key
      const individualTelemetrySuccess = this.getTelemetrySuccessFromEnvelope(envelope);
      const successKey =
        (telemetry_type === TelemetryType.REQUEST || telemetry_type === TelemetryType.DEPENDENCY) &&
        individualTelemetrySuccess !== undefined
          ? individualTelemetrySuccess
          : null;

      // Update the count for this reason and success combination
      const currentCount = successMap.get(successKey) || 0;
      successMap.set(successKey, currentCount + 1);
    }
  }

  /**
   * Generates a low-cardinality, informative description for drop reasons
   * @param dropCode - The drop code (enum value or status code number)
   * @param exceptionMessage - Optional exception message for CLIENT_EXCEPTION
   * @param exceptionType - Optional explicit exception type override for CLIENT_EXCEPTION
   * @returns A descriptive reason string with low cardinality
   */
  private getDropReason(
    dropCode: DropCode | number,
    exceptionMessage?: string,
    exceptionType?: ExceptionType,
  ): string {
    if (dropCode === DropCode.CLIENT_EXCEPTION) {
      // If an explicit exception type is provided, use it
      if (exceptionType) {
        return exceptionType;
      }
      // For client exceptions, derive a well-known exception category from the exception message
      if (exceptionMessage) {
        return this.categorizeExceptionMessage(exceptionMessage);
      }
      return ExceptionType.CLIENT_EXCEPTION; // Default to "Client exception" if no message provided
    }

    // Handle status code drop codes (numeric values)
    if (typeof dropCode === "number") {
      return this.categorizeStatusCode(dropCode);
    }

    // Handle other enum drop codes
    switch (dropCode) {
      case DropCode.CLIENT_READONLY:
        return DropReason.CLIENT_READONLY;
      case DropCode.CLIENT_PERSISTENCE_CAPACITY:
        return DropReason.CLIENT_PERSISTENCE_CAPACITY;
      case DropCode.CLIENT_STORAGE_DISABLED:
        return DropReason.CLIENT_STORAGE_DISABLED;
      case DropCode.UNKNOWN:
      default:
        return DropReason.UNKNOWN;
    }
  }

  /**
   * Categorizes exception messages into well-known exception categories
   * @param exceptionMessage - The exception message to categorize
   * @returns A well-known exception category string
   */
  private categorizeExceptionMessage(exceptionMessage: string): ExceptionType {
    const message = exceptionMessage.toLowerCase();

    if (message.includes("timeout") || message.includes("timed out")) {
      return ExceptionType.TIMEOUT_EXCEPTION;
    }
    if (
      message.includes("network") ||
      message.includes("connection") ||
      message.includes("dns") ||
      message.includes("socket")
    ) {
      return ExceptionType.NETWORK_EXCEPTION;
    }
    if (
      message.includes("disk") ||
      message.includes("storage") ||
      message.includes("file") ||
      message.includes("persist")
    ) {
      return ExceptionType.STORAGE_EXCEPTION;
    }

    // Default to Client exception for any other cases
    return ExceptionType.CLIENT_EXCEPTION;
  }

  /**
   * Categorizes HTTP status codes into informative descriptions
   * @param statusCode - The HTTP status code
   * @returns A descriptive category string
   */
  private categorizeStatusCode(statusCode: number): string {
    if (statusCode >= 400 && statusCode < 500) {
      switch (statusCode) {
        case 400:
          return "Bad request";
        case 401:
          return "Unauthorized";
        case 403:
          return "Forbidden";
        case 404:
          return "Not found";
        case 408:
          return "Request timeout";
        case 413:
          return "Payload too large";
        case 429:
          return "Too many requests";
        default:
          return "Client error 4xx";
      }
    }

    if (statusCode >= 500 && statusCode < 600) {
      switch (statusCode) {
        case 500:
          return "Internal server error";
        case 502:
          return "Bad gateway";
        case 503:
          return "Service unavailable";
        case 504:
          return "Gateway timeout";
        default:
          return "Server error 5xx";
      }
    }

    return `status_${statusCode}`;
  }
  /**
   * Tracks retried envelopes
   * @param envelopes - Number of envelopes retried
   * @param retryCode - The retry code indicating the reason for retry
   * @param exceptionMessage - Optional exception message when retryCode is CLIENT_EXCEPTION
   * @param exceptionType - Optional explicit exception type override when retryCode is CLIENT_EXCEPTION
   */
  public countRetryItems(
    envelopes: Envelope[],
    retryCode: RetryCode | number,
    exceptionMessage?: string,
    exceptionType?: ExceptionType,
  ): void {
    const counter: CustomerSDKStats = this.customerSDKStatsCounter;
    let telemetry_type: TelemetryType;

    for (const envelope of envelopes) {
      telemetry_type = this.getTelemetryTypeFromEnvelope(envelope);
      // Get or create the retryCode map for this telemetry_type
      let retryCodeMap = counter.totalItemRetryCount.get(telemetry_type);
      if (!retryCodeMap) {
        retryCodeMap = new Map<RetryCode | number, Map<string, number>>();
        counter.totalItemRetryCount.set(telemetry_type, retryCodeMap);
      }

      // Get or create the reason map for this retryCode
      let reasonMap = retryCodeMap.get(retryCode);
      if (!reasonMap) {
        reasonMap = new Map<string, number>();
        retryCodeMap.set(retryCode, reasonMap);
      }

      // Generate a low-cardinality, informative reason description
      const reason = this.getRetryReason(retryCode, exceptionMessage, exceptionType);

      // Update the count for this reason
      const currentCount = reasonMap.get(reason) || 0;
      reasonMap.set(reason, currentCount + 1);
    }
  }

  /**
   * Generates a low-cardinality, informative description for retry reasons
   * @param retryCode - The retry code (enum value or status code number)
   * @param exceptionMessage - Optional exception message for CLIENT_EXCEPTION
   * @param exceptionType - Optional explicit exception type override for CLIENT_EXCEPTION
   * @returns A descriptive reason string with low cardinality
   */
  private getRetryReason(
    retryCode: RetryCode | number,
    exceptionMessage?: string,
    exceptionType?: ExceptionType,
  ): string {
    if (retryCode === RetryCode.CLIENT_EXCEPTION) {
      // If an explicit exception type is provided, use it
      if (exceptionType) {
        return exceptionType;
      }
      // For client exceptions, derive a low-cardinality reason from the exception message
      if (exceptionMessage) {
        return this.categorizeExceptionMessage(exceptionMessage);
      }
      return ExceptionType.CLIENT_EXCEPTION;
    }

    // Handle status code retry codes (numeric values)
    if (typeof retryCode === "number") {
      return this.categorizeStatusCode(retryCode);
    }

    // Handle other enum retry codes
    switch (retryCode) {
      case RetryCode.CLIENT_TIMEOUT:
        return RetryReason.CLIENT_TIMEOUT;
      case RetryCode.UNKNOWN:
      default:
        return RetryReason.UNKNOWN;
    }
  }

  /**
   * Check if a metric name corresponds to a performance counter
   * @param metricName - The name of the metric to check
   * @returns true if the metric name is a performance counter, false otherwise
   */
  private isPerformanceCounterMetric(metricName: string): boolean {
    return Object.values(BreezePerformanceCounterNames).includes(
      metricName as BreezePerformanceCounterNames,
    );
  }

  /**
   * Extract telemetry type from an envelope based on its baseType
   * @param envelope - The envelope to extract telemetry type from
   * @returns The corresponding telemetry type
   */
  public getTelemetryTypeFromEnvelope(envelope: Envelope): TelemetryType {
    if (envelope.data && envelope.data.baseType) {
      switch (envelope.data.baseType) {
        case "MessageData":
          return TelemetryType.TRACE;
        case "AvailabilityData":
          return TelemetryType.AVAILABILITY;
        case "TelemetryEventData":
          return TelemetryType.CUSTOM_EVENT;
        case "TelemetryExceptionData":
          return TelemetryType.EXCEPTION;
        case "PageViewData":
          return TelemetryType.PAGE_VIEW;
        case "RemoteDependencyData":
          return TelemetryType.DEPENDENCY;
        case "RequestData":
          return TelemetryType.REQUEST;
        case "MetricData": {
          const metricsData = envelope.data.baseData as MetricsData;
          if (metricsData && metricsData.metrics && metricsData.metrics.length > 0) {
            // Check if any of the metrics are performance counters
            const hasPerformanceCounter = metricsData.metrics.some((metric) =>
              this.isPerformanceCounterMetric(metric.name),
            );
            return hasPerformanceCounter
              ? TelemetryType.PERFORMANCE_COUNTER
              : TelemetryType.CUSTOM_METRIC;
          }
          return TelemetryType.CUSTOM_METRIC;
        }
        default:
          return TelemetryType.UNKNOWN;
      }
    }
    return TelemetryType.UNKNOWN;
  }

  /**
   * Extract telemetry success value from an envelope for REQUEST and DEPENDENCY telemetry types
   * @param envelope - The envelope to extract success value from
   * @returns The success value if available, undefined otherwise
   */
  public getTelemetrySuccessFromEnvelope(envelope: Envelope): boolean | undefined {
    if (!envelope.data || !envelope.data.baseData) {
      return undefined;
    }

    const baseType = envelope.data.baseType;
    if (baseType === "RequestData") {
      const requestData = envelope.data.baseData as RequestData;
      return requestData.success;
    } else if (baseType === "RemoteDependencyData") {
      const dependencyData = envelope.data.baseData as RemoteDependencyData;
      return dependencyData.success;
    }

    return undefined;
  }

  /**
   * Checks if the given error is a timeout-related error
   * @param error - The error to check
   * @returns true if the error is timeout-related, false otherwise
   */
  public isTimeoutError(error: { code?: string; message?: string }): boolean {
    // Check for various timeout error codes that indicate client timeouts
    const timeoutErrorCodes = [
      "ETIMEDOUT", // Connection timed out
      "ESOCKETTIMEDOUT", // Socket timeout
      "ECONNRESET", // Connection reset (often due to timeout)
      "ENOTFOUND", // DNS lookup failed/timeout
    ];

    if (error && error.code && timeoutErrorCodes.includes(error.code)) {
      return true;
    }

    // Also check if the error message contains timeout-related keywords
    if (error && error.message) {
      const timeoutKeywords = ["timeout", "timed out", "connection reset"];
      const errorMessage = error.message.toLowerCase();
      return timeoutKeywords.some((keyword) => errorMessage.includes(keyword));
    }

    return false;
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import type { PersistentStorage, SenderResult } from "../../types.js";
import { BreezePerformanceCounterNames } from "../../types.js";
import type { AzureMonitorExporterOptions } from "../../config.js";
import { FileSystemPersist } from "./persist/index.js";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode } from "@opentelemetry/core";
import { NetworkStatsbeatMetrics } from "../../export/statsbeat/networkStatsbeatMetrics.js";
import { getInstance } from "../../export/statsbeat/longIntervalStatsbeatMetrics.js";
import type { RestError } from "@azure/core-rest-pipeline";
import {
  DropCode,
  MAX_STATSBEAT_FAILURES,
  RetryCode,
  TelemetryType,
  isStatsbeatShutdownStatus,
} from "../../export/statsbeat/types.js";
import type { BreezeResponse } from "../../utils/breezeUtils.js";
import { isRetriable } from "../../utils/breezeUtils.js";
import type { TelemetryItem as Envelope, MetricsData } from "../../generated/index.js";
import {
  ENV_APPLICATIONINSIGHTS_STATSBEAT_ENABLED_PREVIEW,
  RetriableRestErrorTypes,
} from "../../Declarations/Constants.js";
import { CustomerStatsbeatMetrics } from "../../export/statsbeat/customerStatsbeat.js";

const DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS = 60_000;

/**
 * Check if a metric name corresponds to a performance counter
 * @param metricName - The name of the metric to check
 * @returns true if the metric name is a performance counter, false otherwise
 */
function isPerformanceCounterMetric(metricName: string): boolean {
  return Object.values(BreezePerformanceCounterNames).includes(
    metricName as BreezePerformanceCounterNames,
  );
}

/**
 * Base sender class
 * @internal
 */
export abstract class BaseSender {
  private readonly persister: PersistentStorage;
  private numConsecutiveRedirects: number;
  private retryTimer: NodeJS.Timeout | null;
  private networkStatsbeatMetrics: NetworkStatsbeatMetrics | undefined;
  private customerStatsbeatMetrics: CustomerStatsbeatMetrics | undefined;
  private longIntervalStatsbeatMetrics;
  private statsbeatFailureCount: number = 0;
  private batchSendRetryIntervalMs: number = DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS;
  private isStatsbeatSender: boolean;
  private disableOfflineStorage: boolean;

  constructor(options: {
    endpointUrl: string;
    instrumentationKey: string;
    trackStatsbeat: boolean;
    exporterOptions: AzureMonitorExporterOptions;
    aadAudience?: string;
    isStatsbeatSender?: boolean;
  }) {
    this.numConsecutiveRedirects = 0;
    this.disableOfflineStorage = options.exporterOptions.disableOfflineStorage || false;
    if (options.trackStatsbeat) {
      // Initialize statsbeatMetrics
      this.networkStatsbeatMetrics = new NetworkStatsbeatMetrics({
        instrumentationKey: options.instrumentationKey,
        endpointUrl: options.endpointUrl,
        disableOfflineStorage: this.disableOfflineStorage,
      });
      this.longIntervalStatsbeatMetrics = getInstance({
        instrumentationKey: options.instrumentationKey,
        endpointUrl: options.endpointUrl,
        disableOfflineStorage: this.disableOfflineStorage,
      });
      if (process.env[ENV_APPLICATIONINSIGHTS_STATSBEAT_ENABLED_PREVIEW]) {
        this.customerStatsbeatMetrics = CustomerStatsbeatMetrics.getInstance({
          instrumentationKey: options.instrumentationKey,
          endpointUrl: options.endpointUrl,
          disableOfflineStorage: this.disableOfflineStorage,
        });
      }
    }
    this.persister = new FileSystemPersist(
      options.instrumentationKey,
      options.exporterOptions,
      this.customerStatsbeatMetrics,
    );
    this.retryTimer = null;
    this.isStatsbeatSender = options.isStatsbeatSender || false;
  }

  abstract send(payload: unknown[]): Promise<SenderResult>;
  abstract shutdown(): Promise<void>;
  abstract handlePermanentRedirect(location: string | undefined): void;

  /**
   * Export envelopes
   */
  public async exportEnvelopes(envelopes: Envelope[]): Promise<ExportResult> {
    diag.info(`Exporting ${envelopes.length} envelope(s)`);

    if (envelopes.length < 1) {
      return { code: ExportResultCode.SUCCESS };
    }

    try {
      const startTime = new Date().getTime();
      const { result, statusCode } = await this.send(envelopes);
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      this.numConsecutiveRedirects = 0;

      if (statusCode === 200) {
        // Success -- @todo: start retry timer
        if (!this.retryTimer) {
          this.retryTimer = setTimeout(() => {
            this.retryTimer = null;
            this.sendFirstPersistedFile();
          }, this.batchSendRetryIntervalMs);
          this.retryTimer.unref();
        }
        // If we are not exportings statsbeat and statsbeat is not disabled -- count success
        if (!this.isStatsbeatSender) {
          this.networkStatsbeatMetrics?.countSuccess(duration);
          this.countSuccessfulEnvelopes(envelopes);
        }
        return { code: ExportResultCode.SUCCESS };
      } else if (statusCode && isRetriable(statusCode)) {
        // Failed -- persist failed data
        if (statusCode === 429 || statusCode === 439) {
          this.networkStatsbeatMetrics?.countThrottle(statusCode);
          this.customerStatsbeatMetrics?.countRetryItems(
            envelopes.length,
            RetryCode.RETRYABLE_STATUS_CODE,
          );
          return {
            code: ExportResultCode.SUCCESS,
          };
        }
        if (result) {
          diag.info(result);
          const breezeResponse = JSON.parse(result) as BreezeResponse;
          const filteredEnvelopes: Envelope[] = [];
          // Create a list of successful envelopes by filtering out the failed ones for customer statsbeat
          const successfulEnvelopes: Envelope[] = [...envelopes];

          // Figure out if we need to either retry or count failures
          if (breezeResponse.errors) {
            breezeResponse.errors.forEach((error) => {
              // Mark as undefined so we don't process them in countSuccessfulEnvelopes
              successfulEnvelopes[error.index] = undefined as unknown as Envelope;

              // Add to retry list if status code is retriable
              if (error.statusCode && isRetriable(error.statusCode)) {
                filteredEnvelopes.push(envelopes[error.index]);
              }
            });
          }

          // If we have a partial success, count the succeeded envelopes
          if (breezeResponse.itemsAccepted > 0) {
            this.networkStatsbeatMetrics?.countSuccess(duration);
            // Count only the successful envelopes (non-undefined)
            if (!this.isStatsbeatSender) {
              this.countSuccessfulEnvelopes(successfulEnvelopes.filter(Boolean));
            }
            // For network statsbeat we just care that some envelopes were successful
            this.networkStatsbeatMetrics?.countSuccess(duration);
          }
          if (filteredEnvelopes.length > 0) {
            this.networkStatsbeatMetrics?.countRetry(statusCode);
            this.customerStatsbeatMetrics?.countRetryItems(
              filteredEnvelopes.length,
              RetryCode.RETRYABLE_STATUS_CODE,
            );
            // calls resultCallback(ExportResult) based on result of persister.push
            return await this.persist(filteredEnvelopes);
          }
          // Failed -- not retriable
          this.networkStatsbeatMetrics?.countFailure(duration, statusCode);
          // Count dropped items for customer statsbeat for non-retriable status codes
          this.customerStatsbeatMetrics?.countDroppedItems(
            envelopes.length - successfulEnvelopes.filter(Boolean).length,
            DropCode.NON_RETRYABLE_STATUS_CODE,
          );
          return {
            code: ExportResultCode.FAILED,
          };
        } else {
          // calls resultCallback(ExportResult) based on result of persister.push
          this.networkStatsbeatMetrics?.countRetry(statusCode);
          this.customerStatsbeatMetrics?.countRetryItems(
            envelopes.length,
            RetryCode.RETRYABLE_STATUS_CODE,
          );
          return await this.persist(envelopes);
        }
      } else {
        // Failed -- not retriable
        if (this.networkStatsbeatMetrics) {
          if (statusCode) {
            this.networkStatsbeatMetrics.countFailure(duration, statusCode);
            this.customerStatsbeatMetrics?.countDroppedItems(
              envelopes.length,
              DropCode.NON_RETRYABLE_STATUS_CODE,
            );
          }
        } else {
          // Handles all other status codes or client exceptions for Statsbeat
          this.incrementStatsbeatFailure();
          this.customerStatsbeatMetrics?.countDroppedItems(
            envelopes.length,
            DropCode.CLIENT_EXCEPTION,
          );
        }
        return {
          code: ExportResultCode.FAILED,
        };
      }
    } catch (error: any) {
      const restError = error as RestError;
      if (
        restError.statusCode &&
        (restError.statusCode === 307 || // Temporary redirect
          restError.statusCode === 308)
      ) {
        // Permanent redirect
        this.numConsecutiveRedirects++;
        // To prevent circular redirects
        if (this.numConsecutiveRedirects < 10) {
          if (restError.response && restError.response.headers) {
            const location = restError.response.headers.get("location");
            if (location) {
              // Update sender URL
              this.handlePermanentRedirect(location);
              // Send to redirect endpoint as HTTPs library doesn't handle redirect automatically
              return this.exportEnvelopes(envelopes);
            }
          }
        } else {
          const redirectError = new Error("Circular redirect");
          this.networkStatsbeatMetrics?.countException(redirectError);
          this.customerStatsbeatMetrics?.countDroppedItems(
            envelopes.length,
            DropCode.CLIENT_EXCEPTION,
            redirectError.message,
          );
          return { code: ExportResultCode.FAILED, error: redirectError };
        }
      } else if (
        restError.statusCode &&
        isRetriable(restError.statusCode) &&
        !this.isStatsbeatSender
      ) {
        this.networkStatsbeatMetrics?.countRetry(restError.statusCode);
        this.customerStatsbeatMetrics?.countRetryItems(
          envelopes.length,
          RetryCode.RETRYABLE_STATUS_CODE,
        );
        return this.persist(envelopes);
      } else if (
        restError.statusCode === 400 &&
        restError.message.includes("Invalid instrumentation key")
      ) {
        // Invalid instrumentation key, shutdown statsbeat, fail silently
        this.shutdownStatsbeat();
        return { code: ExportResultCode.SUCCESS };
      } else if (
        restError.statusCode &&
        this.isStatsbeatSender &&
        isStatsbeatShutdownStatus(restError.statusCode)
      ) {
        // If the status code is a shutdown status code for statsbeat, shutdown statsbeat and fail silently
        this.incrementStatsbeatFailure();
        return { code: ExportResultCode.SUCCESS };
      }
      if (this.isRetriableRestError(restError)) {
        if (restError.statusCode) {
          this.networkStatsbeatMetrics?.countRetry(restError.statusCode);
          this.customerStatsbeatMetrics?.countRetryItems(
            envelopes.length,
            RetryCode.RETRYABLE_STATUS_CODE,
          );
        }
        if (!this.isStatsbeatSender) {
          diag.error(
            "Retrying due to transient client side error. Error message:",
            restError.message,
          );
        }
        return this.persist(envelopes);
      }
      this.networkStatsbeatMetrics?.countException(restError);
      if (!this.isStatsbeatSender) {
        diag.error(
          "Envelopes could not be exported and are not retriable. Error message:",
          restError.message,
        );
      }
      return { code: ExportResultCode.FAILED, error: restError };
    }
  }

  /**
   * Persist envelopes to disk
   */
  private async persist(envelopes: unknown[]): Promise<ExportResult> {
    try {
      const success = await this.persister.push(envelopes);
      return success
        ? { code: ExportResultCode.SUCCESS }
        : {
            code: ExportResultCode.FAILED,
            error: new Error("Failed to persist envelope in disk."),
          };
    } catch (ex: any) {
      this.networkStatsbeatMetrics?.countWriteFailure();
      // If offline storage is disabled, we count a customer statsbeat metric for retry stating client storage is disabled
      if (this.disableOfflineStorage && envelopes) {
        this.customerStatsbeatMetrics?.countRetryItems(
          envelopes.length,
          RetryCode.CLIENT_STORAGE_DISABLED,
        );
      }
      return { code: ExportResultCode.FAILED, error: ex };
    }
  }

  /**
   * Disable collection of statsbeat metrics after max failures
   */
  private incrementStatsbeatFailure(): void {
    this.statsbeatFailureCount++;
    if (this.statsbeatFailureCount > MAX_STATSBEAT_FAILURES) {
      this.shutdownStatsbeat();
    }
  }

  /**
   * Shutdown statsbeat metrics
   */
  private shutdownStatsbeat(): void {
    this.networkStatsbeatMetrics?.shutdown();
    this.longIntervalStatsbeatMetrics?.shutdown();
    if (this.customerStatsbeatMetrics) {
      CustomerStatsbeatMetrics.shutdown();
      this.customerStatsbeatMetrics = undefined;
    }
    this.networkStatsbeatMetrics = undefined;
    this.statsbeatFailureCount = 0;
  }

  private async sendFirstPersistedFile(): Promise<void> {
    const envelopes = (await this.persister.shift()) as Envelope[] | null;
    try {
      if (envelopes) {
        await this.send(envelopes);
      }
    } catch (err: any) {
      this.networkStatsbeatMetrics?.countReadFailure();
      diag.warn(`Failed to fetch persisted file`, err);
    }
  }

  private isRetriableRestError(error: RestError): boolean {
    const restErrorTypes: string[] = Object.values(RetriableRestErrorTypes);
    if (error && error.code && restErrorTypes.includes(error.code)) {
      return true;
    }
    return false;
  }

 private countSuccessfulEnvelopes(envelopes: Envelope[]): void {
    for (const envelope of envelopes) {
      if (envelope.data && envelope.data.baseType === "MessageData") {
        this.customerStatsbeatMetrics?.countSuccessfulItems(1, TelemetryType.TRACE);
      }
      if (envelope.data && envelope.data.baseType === "AvailabilityData") {
        this.customerStatsbeatMetrics?.countSuccessfulItems(1, TelemetryType.AVAILABILITY);
      }
      if (envelope.data && envelope.data.baseType === "TelemetryEventData") {
        this.customerStatsbeatMetrics?.countSuccessfulItems(1, TelemetryType.CUSTOM_EVENT);
      }
      if (envelope.data && envelope.data.baseType === "TelemetryExceptionData") {
        this.customerStatsbeatMetrics?.countSuccessfulItems(1, TelemetryType.EXCEPTION);
      }
      if (envelope.data && envelope.data.baseType === "PageViewData") {
        this.customerStatsbeatMetrics?.countSuccessfulItems(1, TelemetryType.PAGE_VIEW);
      }
      if (envelope.data && envelope.data.baseType === "RemoteDependencyData") {
        this.customerStatsbeatMetrics?.countSuccessfulItems(1, TelemetryType.DEPENDENCY);
      }
      if (envelope.data && envelope.data.baseType === "RequestData") {
        this.customerStatsbeatMetrics?.countSuccessfulItems(1, TelemetryType.REQUEST);
      }
      if (envelope.data && envelope.data.baseType === "MetricData") {
        const metricsData = envelope.data.baseData as MetricsData;
        if (metricsData && metricsData.metrics && metricsData.metrics.length > 0) {
          // Check if any of the metrics are performance counters
          const hasPerformanceCounter = metricsData.metrics.some((metric) =>
            isPerformanceCounterMetric(metric.name),
          );

          if (hasPerformanceCounter) {
            this.customerStatsbeatMetrics?.countSuccessfulItems(
              1,
              TelemetryType.PERFORMANCE_COUNTER,
            );
          } else {
            this.customerStatsbeatMetrics?.countSuccessfulItems(1, TelemetryType.CUSTOM_METRIC);
          }
        }
      }
    }
  }
}

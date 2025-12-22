// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import type { PersistentStorage, SenderResult } from "../../types.js";
import { ExceptionType } from "../../export/statsbeat/types.js";
import type { AzureMonitorExporterOptions } from "../../config.js";
import { FileSystemPersist } from "./persist/index.js";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode } from "@opentelemetry/core";
import { NetworkStatsbeatMetrics } from "../../export/statsbeat/networkStatsbeatMetrics.js";
import { LongIntervalStatsbeatMetrics } from "../../export/statsbeat/longIntervalStatsbeatMetrics.js";
import type { RestError } from "@azure/core-rest-pipeline";
import {
  DropCode,
  RetryCode,
  MAX_STATSBEAT_FAILURES,
  isStatsbeatShutdownStatus,
} from "../../export/statsbeat/types.js";
import type { BreezeResponse } from "../../utils/breezeUtils.js";
import { isRetriable } from "../../utils/breezeUtils.js";
import type { TelemetryItem as Envelope } from "../../generated/index.js";
import {
  ENV_APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW,
  ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL,
  ENV_APPLICATIONINSIGHTS_SDK_STATS_LOGGING,
  RetriableRestErrorTypes,
} from "../../Declarations/Constants.js";
import { CustomerSDKStatsMetrics } from "../../export/statsbeat/customerSDKStats.js";

const DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS = 60_000;

/**
 * Base sender class
 * @internal
 */
export abstract class BaseSender {
  private readonly persister: PersistentStorage;
  private numConsecutiveRedirects: number;
  private retryTimer: NodeJS.Timeout | null;
  private networkStatsbeatMetrics: NetworkStatsbeatMetrics | undefined;
  private customerSDKStatsMetrics: CustomerSDKStatsMetrics | undefined;
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
      this.networkStatsbeatMetrics = NetworkStatsbeatMetrics.getInstance({
        instrumentationKey: options.instrumentationKey,
        endpointUrl: options.endpointUrl,
        disableOfflineStorage: this.disableOfflineStorage,
      });
      this.longIntervalStatsbeatMetrics = LongIntervalStatsbeatMetrics.getInstance({
        instrumentationKey: options.instrumentationKey,
        endpointUrl: options.endpointUrl,
        disableOfflineStorage: this.disableOfflineStorage,
      });
      if (process.env[ENV_APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW]) {
        let exportInterval: number | undefined;
        if (process.env[ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL]) {
          const envValue = process.env[ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL];
          const exportIntervalSeconds = parseInt(envValue, 10);
          if (!isNaN(exportIntervalSeconds) && exportIntervalSeconds > 0) {
            exportInterval = exportIntervalSeconds * 1000; // Convert seconds to milliseconds
          } else {
            diag.warn(
              `Invalid value for APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL environment variable: '${envValue}'. Expected a positive number (seconds). Using default export interval.`,
            );
          }
        }
        // Initialize customer SDK stats metrics asynchronously to avoid circular dependency
        // Only initialize if not already set (e.g., by tests)
        if (!this.customerSDKStatsMetrics) {
          import("../../export/statsbeat/customerSDKStats.js")
            .then((module) =>
              module.CustomerSDKStatsMetrics.getInstance({
                instrumentationKey: options.instrumentationKey,
                endpointUrl: options.endpointUrl,
                disableOfflineStorage: this.disableOfflineStorage,
                networkCollectionInterval: exportInterval,
              }),
            )
            .then((metrics) => {
              this.customerSDKStatsMetrics = metrics;
              return;
            })
            .catch((error) => {
              diag.warn("Failed to initialize customer SDK stats metrics:", error);
            });
        }
      }
    }
    this.persister = new FileSystemPersist(
      options.instrumentationKey,
      options.exporterOptions,
      this.customerSDKStatsMetrics,
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
        // If we are not exporting statsbeat and statsbeat is not disabled -- count success
        if (!this.isStatsbeatSender) {
          this.networkStatsbeatMetrics?.countSuccess(duration);
          this.customerSDKStatsMetrics?.countSuccessfulItems(envelopes);
        }
        return { code: ExportResultCode.SUCCESS };
      } else if (statusCode && isRetriable(statusCode)) {
        // Failed -- persist failed data
        if (statusCode === 429 || statusCode === 439) {
          if (!this.isStatsbeatSender) {
            this.networkStatsbeatMetrics?.countThrottle(statusCode);
            this.customerSDKStatsMetrics?.countRetryItems(envelopes, statusCode);
          }
          return {
            code: ExportResultCode.SUCCESS,
          };
        }
        if (result) {
          diag.info(result);
          const breezeResponse = JSON.parse(result) as BreezeResponse;
          const filteredEnvelopes: Envelope[] = [];
          // Create a list of successful envelopes by filtering out the failed ones for customer SDK Stats
          const successfulEnvelopes: Envelope[] = [...envelopes];

          // If we have a partial success, count the succeeded envelopes
          if (breezeResponse.itemsAccepted > 0 && statusCode === 206 && !this.isStatsbeatSender) {
            this.networkStatsbeatMetrics?.countSuccess(duration);
          }
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
            // Count only the successful envelopes (non-undefined)
            if (!this.isStatsbeatSender) {
              this.networkStatsbeatMetrics?.countSuccess(duration);
              this.customerSDKStatsMetrics?.countSuccessfulItems(envelopes);
            }
          }
          if (filteredEnvelopes.length > 0) {
            if (!this.isStatsbeatSender) {
              this.networkStatsbeatMetrics?.countRetry(statusCode);
              this.customerSDKStatsMetrics?.countRetryItems(envelopes, statusCode);
            }
            // calls resultCallback(ExportResult) based on result of persister.push
            return await this.persist(filteredEnvelopes);
          }
          // Failed -- not retriable
          if (!this.isStatsbeatSender) {
            this.networkStatsbeatMetrics?.countFailure(duration, statusCode);
            // Count dropped items for customer SDK Stats for non-retriable status codes
            const filteredSuccessfulEnvelopes = successfulEnvelopes.filter(Boolean);
            this.customerSDKStatsMetrics?.countDroppedItems(
              filteredSuccessfulEnvelopes,
              statusCode,
            );
          }
          return this.buildExportResult({
            code: ExportResultCode.FAILED,
          });
        } else {
          // calls resultCallback(ExportResult) based on result of persister.push
          if (!this.isStatsbeatSender) {
            this.networkStatsbeatMetrics?.countRetry(statusCode);
            this.customerSDKStatsMetrics?.countRetryItems(envelopes, statusCode);
          }
          return await this.persist(envelopes);
        }
      } else {
        // Failed -- not retriable
        if (this.networkStatsbeatMetrics && !this.isStatsbeatSender) {
          if (statusCode) {
            this.networkStatsbeatMetrics.countFailure(duration, statusCode);
            this.customerSDKStatsMetrics?.countDroppedItems(envelopes, statusCode);
          }
        } else {
          // Handles all other status codes or client exceptions for Statsbeat
          this.incrementStatsbeatFailure();
          this.customerSDKStatsMetrics?.countDroppedItems(envelopes, DropCode.CLIENT_EXCEPTION);
        }
        return this.buildExportResult({
          code: ExportResultCode.FAILED,
        });
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
          if (!this.isStatsbeatSender) {
            this.networkStatsbeatMetrics?.countException(redirectError);
            this.customerSDKStatsMetrics?.countDroppedItems(
              envelopes,
              DropCode.CLIENT_EXCEPTION,
              redirectError.message,
              ExceptionType.CLIENT_EXCEPTION,
            );
          }
          return this.buildExportResult({ code: ExportResultCode.FAILED, error: redirectError });
        }
      } else if (
        restError.statusCode &&
        isRetriable(restError.statusCode) &&
        !this.isStatsbeatSender
      ) {
        this.networkStatsbeatMetrics?.countRetry(restError.statusCode);
        this.customerSDKStatsMetrics?.countRetryItems(envelopes, restError.statusCode);
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

      // For retriable REST errors
      if (this.isRetriableRestError(restError) && !this.isStatsbeatSender) {
        if (this.customerSDKStatsMetrics?.isTimeoutError(restError) && !this.isStatsbeatSender) {
          this.customerSDKStatsMetrics?.countRetryItems(
            envelopes,
            RetryCode.CLIENT_TIMEOUT,
            "timeout_exception",
            ExceptionType.TIMEOUT_EXCEPTION,
          );
          diag.error("Request timed out. Error message:", restError.message);
        } else if (restError.statusCode) {
          this.networkStatsbeatMetrics?.countRetry(restError.statusCode);
          this.customerSDKStatsMetrics?.countRetryItems(envelopes, restError.statusCode);
        }
        diag.error(
          "Retrying due to transient client side error. Error message:",
          restError.message,
        );
        return this.persist(envelopes);
      }
      // For non-retriable REST errors or client exceptions
      if (!this.isStatsbeatSender) {
        this.networkStatsbeatMetrics?.countException(restError);
        this.customerSDKStatsMetrics?.countDroppedItems(
          envelopes,
          DropCode.CLIENT_EXCEPTION,
          restError.message,
        );
        diag.error(
          "Envelopes could not be exported and are not retriable. Error message:",
          restError.message,
        );
      }
      return this.buildExportResult({ code: ExportResultCode.FAILED, error: restError });
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
        : this.buildExportResult({
            code: ExportResultCode.FAILED,
            error: new Error("Failed to persist envelope in disk."),
          });
    } catch (ex: any) {
      if (!this.isStatsbeatSender) {
        this.networkStatsbeatMetrics?.countWriteFailure();
        if (this.disableOfflineStorage && envelopes) {
          this.customerSDKStatsMetrics?.countDroppedItems(
            envelopes as Envelope[],
            DropCode.CLIENT_STORAGE_DISABLED,
          );
        }
      }
      return this.buildExportResult({ code: ExportResultCode.FAILED, error: ex });
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
    if (this.networkStatsbeatMetrics) {
      this.networkStatsbeatMetrics.shutdown();
    }
    if (this.longIntervalStatsbeatMetrics) {
      this.longIntervalStatsbeatMetrics?.shutdown();
    }
    if (this.customerSDKStatsMetrics) {
      this.customerSDKStatsMetrics.shutdown();
    }
    this.statsbeatFailureCount = 0;
  }

  private async sendFirstPersistedFile(): Promise<void> {
    const envelopes = (await this.persister.shift()) as Envelope[] | null;
    try {
      if (envelopes) {
        await this.send(envelopes);
      }
    } catch (err: any) {
      if (!this.isStatsbeatSender) {
        this.networkStatsbeatMetrics?.countReadFailure();
      }
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

  // Silence noisy failures from statsbeat OTel metric readers unless logging is explicitly enabled
  private buildExportResult(result: ExportResult): ExportResult {
    const shouldSurfaceStatsbeatFailures = !!process.env[ENV_APPLICATIONINSIGHTS_SDK_STATS_LOGGING];
    if (this.isStatsbeatSender && result.code === ExportResultCode.FAILED) {
      return shouldSurfaceStatsbeatFailures ? result : { code: ExportResultCode.SUCCESS };
    }
    return result;
  }
}

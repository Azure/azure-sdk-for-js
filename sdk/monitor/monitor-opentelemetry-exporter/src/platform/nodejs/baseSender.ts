// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import type { PersistentStorage, SenderResult } from "../../types.js";
import type { AzureMonitorExporterOptions } from "../../config.js";
import { FileSystemPersist } from "./persist/index.js";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode } from "@opentelemetry/core";
import { NetworkStatsbeatMetrics } from "../../export/statsbeat/networkStatsbeatMetrics.js";
import { getInstance } from "../../export/statsbeat/longIntervalStatsbeatMetrics.js";
import type { RestError } from "@azure/core-rest-pipeline";
import { MAX_STATSBEAT_FAILURES, isStatsbeatShutdownStatus } from "../../export/statsbeat/types.js";
import type { BreezeResponse } from "../../utils/breezeUtils.js";
import { isRetriable } from "../../utils/breezeUtils.js";
import type { TelemetryItem as Envelope } from "../../generated/index.js";

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
    this.persister = new FileSystemPersist(options.instrumentationKey, options.exporterOptions);
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
    }
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
        this.networkStatsbeatMetrics?.countSuccess(duration);
        return { code: ExportResultCode.SUCCESS };
      } else if (statusCode && isRetriable(statusCode)) {
        // Failed -- persist failed data
        if (statusCode === 429 || statusCode === 439) {
          this.networkStatsbeatMetrics?.countThrottle(statusCode);
        }
        if (result) {
          diag.info(result);
          const breezeResponse = JSON.parse(result) as BreezeResponse;
          const filteredEnvelopes: Envelope[] = [];
          if (breezeResponse.errors) {
            breezeResponse.errors.forEach((error) => {
              if (error.statusCode && isRetriable(error.statusCode)) {
                filteredEnvelopes.push(envelopes[error.index]);
              }
            });
          }
          if (filteredEnvelopes.length > 0) {
            this.networkStatsbeatMetrics?.countRetry(statusCode);
            // calls resultCallback(ExportResult) based on result of persister.push
            return await this.persist(filteredEnvelopes);
          }
          // Failed -- not retriable
          this.networkStatsbeatMetrics?.countFailure(duration, statusCode);
          return {
            code: ExportResultCode.FAILED,
          };
        } else {
          // calls resultCallback(ExportResult) based on result of persister.push
          this.networkStatsbeatMetrics?.countRetry(statusCode);
          return await this.persist(envelopes);
        }
      } else {
        // Failed -- not retriable
        if (this.networkStatsbeatMetrics) {
          if (statusCode) {
            this.networkStatsbeatMetrics.countFailure(duration, statusCode);
          }
        } else {
          // Handles all other status codes or client exceptions for Statsbeat
          this.incrementStatsbeatFailure();
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
          return { code: ExportResultCode.FAILED, error: redirectError };
        }
      } else if (
        restError.statusCode &&
        isRetriable(restError.statusCode) &&
        !this.isStatsbeatSender
      ) {
        this.networkStatsbeatMetrics?.countRetry(restError.statusCode);
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
      if (this.isNetworkError(restError)) {
        if (restError.statusCode) {
          this.networkStatsbeatMetrics?.countRetry(restError.statusCode);
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
      return { code: ExportResultCode.FAILED, error: ex };
    }
  }

  /**
   * Disable collection of statsbeat metrics after max failures
   */
  private incrementStatsbeatFailure() {
    this.statsbeatFailureCount++;
    if (this.statsbeatFailureCount > MAX_STATSBEAT_FAILURES) {
      this.shutdownStatsbeat();
    }
  }

  /**
   * Shutdown statsbeat metrics
   */
  private shutdownStatsbeat() {
    this.networkStatsbeatMetrics?.shutdown();
    this.longIntervalStatsbeatMetrics?.shutdown();
    this.networkStatsbeatMetrics = undefined;
    this.statsbeatFailureCount = 0;
  }

  private async sendFirstPersistedFile(): Promise<void> {
    try {
      const envelopes = (await this.persister.shift()) as Envelope[] | null;
      if (envelopes) {
        await this.send(envelopes);
      }
    } catch (err: any) {
      this.networkStatsbeatMetrics?.countReadFailure();
      diag.warn(`Failed to fetch persisted file`, err);
    }
  }

  private isNetworkError(error: RestError): boolean {
    if (error && error.code && error.code === "REQUEST_SEND_ERROR") {
      return true;
    }
    return false;
  }
}

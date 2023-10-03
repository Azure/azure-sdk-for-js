// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { diag } from "@opentelemetry/api";
import { PersistentStorage, SenderResult } from "../../types";
import { AzureMonitorExporterOptions } from "../../config";
import { FileSystemPersist } from "./persist";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { NetworkStatsbeatMetrics } from "../../export/statsbeat/networkStatsbeatMetrics";
import { getInstance } from "../../export/statsbeat/longIntervalStatsbeatMetrics";
import { RestError } from "@azure/core-rest-pipeline";
import { MAX_STATSBEAT_FAILURES } from "../../export/statsbeat/types";
import { BreezeResponse, isRetriable } from "../../utils/breezeUtils";
import { TelemetryItem as Envelope } from "../../generated";

const DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS = 60_000;

/**
 * Base sender class
 * @internal
 */
export abstract class BaseSender {
  private readonly _persister: PersistentStorage;
  private _numConsecutiveRedirects: number;
  private _retryTimer: NodeJS.Timer | null;
  private _networkStatsbeatMetrics: NetworkStatsbeatMetrics | undefined;
  private _longIntervalStatsbeatMetrics;
  private _statsbeatFailureCount: number = 0;
  private _batchSendRetryIntervalMs: number = DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS;

  constructor(options: {
    endpointUrl: string;
    instrumentationKey: string;
    trackStatsbeat: boolean;
    exporterOptions: AzureMonitorExporterOptions;
    aadAudience?: string;
  }) {
    this._numConsecutiveRedirects = 0;
    this._persister = new FileSystemPersist(options.instrumentationKey, options.exporterOptions);
    if (options.trackStatsbeat) {
      // Initialize statsbeatMetrics
      this._networkStatsbeatMetrics = new NetworkStatsbeatMetrics({
        instrumentationKey: options.instrumentationKey,
        endpointUrl: options.endpointUrl,
      });
      this._longIntervalStatsbeatMetrics = getInstance({
        instrumentationKey: options.instrumentationKey,
        endpointUrl: options.endpointUrl,
      });
    }
    this._retryTimer = null;
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
      this._numConsecutiveRedirects = 0;

      if (statusCode === 200) {
        // Success -- @todo: start retry timer
        if (!this._retryTimer) {
          this._retryTimer = setTimeout(() => {
            this._retryTimer = null;
            this._sendFirstPersistedFile();
          }, this._batchSendRetryIntervalMs);
          this._retryTimer.unref();
        }
        // If we are not exportings statsbeat and statsbeat is not disabled -- count success
        this._networkStatsbeatMetrics?.countSuccess(duration);
        return { code: ExportResultCode.SUCCESS };
      } else if (statusCode && isRetriable(statusCode)) {
        // Failed -- persist failed data
        if (statusCode === 429 || statusCode === 439) {
          this._networkStatsbeatMetrics?.countThrottle(statusCode);
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
            this._networkStatsbeatMetrics?.countRetry(statusCode);
            // calls resultCallback(ExportResult) based on result of persister.push
            return await this._persist(filteredEnvelopes);
          }
          // Failed -- not retriable
          this._networkStatsbeatMetrics?.countFailure(duration, statusCode);
          return {
            code: ExportResultCode.FAILED,
          };
        } else {
          // calls resultCallback(ExportResult) based on result of persister.push
          this._networkStatsbeatMetrics?.countRetry(statusCode);
          return await this._persist(envelopes);
        }
      } else {
        // Failed -- not retriable
        if (this._networkStatsbeatMetrics) {
          if (statusCode) {
            this._networkStatsbeatMetrics.countFailure(duration, statusCode);
          }
        } else {
          this._incrementStatsbeatFailure();
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
        this._numConsecutiveRedirects++;
        // To prevent circular redirects
        if (this._numConsecutiveRedirects < 10) {
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
          let redirectError = new Error("Circular redirect");
          this._networkStatsbeatMetrics?.countException(redirectError);
          return { code: ExportResultCode.FAILED, error: redirectError };
        }
      } else if (restError.statusCode && isRetriable(restError.statusCode)) {
        this._networkStatsbeatMetrics?.countRetry(restError.statusCode);
        return await this._persist(envelopes);
      }
      if (this._isNetworkError(restError)) {
        if (restError.statusCode) {
          this._networkStatsbeatMetrics?.countRetry(restError.statusCode);
        }
        diag.error(
          "Retrying due to transient client side error. Error message:",
          restError.message
        );
        return await this._persist(envelopes);
      }
      this._networkStatsbeatMetrics?.countException(restError);
      diag.error(
        "Envelopes could not be exported and are not retriable. Error message:",
        restError.message
      );
      return { code: ExportResultCode.FAILED, error: restError };
    }
  }

  /**
   * Persist envelopes to disk
   */
  private async _persist(envelopes: unknown[]): Promise<ExportResult> {
    try {
      const success = await this._persister.push(envelopes);
      return success
        ? { code: ExportResultCode.SUCCESS }
        : {
            code: ExportResultCode.FAILED,
            error: new Error("Failed to persist envelope in disk."),
          };
    } catch (ex: any) {
      return { code: ExportResultCode.FAILED, error: ex };
    }
  }

  // Disable collection of statsbeat metrics after max failures
  private _incrementStatsbeatFailure() {
    this._statsbeatFailureCount++;
    if (this._statsbeatFailureCount > MAX_STATSBEAT_FAILURES) {
      this._networkStatsbeatMetrics?.shutdown();
      this._longIntervalStatsbeatMetrics?.shutdown();
      this._networkStatsbeatMetrics = undefined;
      this._statsbeatFailureCount = 0;
    }
  }

  private async _sendFirstPersistedFile(): Promise<void> {
    try {
      const envelopes = (await this._persister.shift()) as Envelope[] | null;
      if (envelopes) {
        await this.send(envelopes);
      }
    } catch (err: any) {
      diag.warn(`Failed to fetch persisted file`, err);
    }
  }

  private _isNetworkError(error: RestError): boolean {
    if (error && error.code && error.code === "REQUEST_SEND_ERROR") {
      return true;
    }
    return false;
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { diag } from "@opentelemetry/api";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { RestError } from "@azure/core-rest-pipeline";
import { ConnectionStringParser } from "../utils/connectionStringParser";
import { HttpSender, FileSystemPersist } from "../platform";
import { AzureMonitorExporterOptions } from "../config";
import { PersistentStorage, Sender } from "../types";
import { isRetriable, BreezeResponse } from "../utils/breezeUtils";
import { DEFAULT_BREEZE_ENDPOINT, ENV_CONNECTION_STRING } from "../Declarations/Constants";
import { TelemetryItem as Envelope } from "../generated";

const DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS = 60_000;
/**
 * Azure Monitor OpenTelemetry Trace Exporter.
 */
export abstract class AzureMonitorBaseExporter {
  /**
   * Instrumentation key to be used for exported envelopes
   */
  protected _instrumentationKey: string;
  private readonly _persister: PersistentStorage;
  private readonly _sender: Sender;
  private _numConsecutiveRedirects: number;
  private _retryTimer: NodeJS.Timer | null;
  private _endpointUrl: string;

  private _batchSendRetryIntervalMs: number = DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS;
  /**
   * Exporter internal configuration
   */
  private readonly _options: AzureMonitorExporterOptions;

  /**
   * Initializes a new instance of the AzureMonitorBaseExporter class.
   * @param AzureMonitorExporterOptions - Exporter configuration.
   */
  constructor(options: AzureMonitorExporterOptions = {}) {
    this._options = options;
    this._numConsecutiveRedirects = 0;
    this._instrumentationKey = "";
    this._endpointUrl = DEFAULT_BREEZE_ENDPOINT;
    const connectionString = this._options.connectionString || process.env[ENV_CONNECTION_STRING];
    if (connectionString) {
      const parsedConnectionString = ConnectionStringParser.parse(connectionString);
      this._instrumentationKey =
        parsedConnectionString.instrumentationkey || this._instrumentationKey;
      this._endpointUrl = parsedConnectionString.ingestionendpoint?.trim() || this._endpointUrl;
    }

    // Instrumentation key is required
    if (!this._instrumentationKey) {
      const message =
        "No instrumentation key or connection string was provided to the Azure Monitor Exporter";
      diag.error(message);
      throw new Error(message);
    }

    this._sender = new HttpSender(this._endpointUrl, this._options);
    this._persister = new FileSystemPersist(this._instrumentationKey, this._options);
    this._retryTimer = null;
    diag.debug("AzureMonitorExporter was successfully setup");
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

  /**
   * Shutdown exporter
   */
  protected async _shutdown(): Promise<void> {
    return this._sender.shutdown();
  }

  /**
   * Export envelopes
   */
  protected async _exportEnvelopes(envelopes: Envelope[]): Promise<ExportResult> {
    diag.info(`Exporting ${envelopes.length} envelope(s)`);
    if (envelopes.length < 1) {
      return { code: ExportResultCode.SUCCESS };
    }
    try {
      const { result, statusCode } = await this._sender.send(envelopes);
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
        return { code: ExportResultCode.SUCCESS };
      } else if (statusCode && isRetriable(statusCode)) {
        // Failed -- persist failed data
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
            // calls resultCallback(ExportResult) based on result of persister.push
            return await this._persist(filteredEnvelopes);
          }
          // Failed -- not retriable
          return {
            code: ExportResultCode.FAILED,
          };
        } else {
          // calls resultCallback(ExportResult) based on result of persister.push
          return await this._persist(envelopes);
        }
      } else {
        // Failed -- not retriable
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
              this._sender.handlePermanentRedirect(location);
              // Send to redirect endpoint as HTTPs library doesn't handle redirect automatically
              return this._exportEnvelopes(envelopes);
            }
          }
        } else {
          return { code: ExportResultCode.FAILED, error: new Error("Circular redirect") };
        }
      } else if (restError.statusCode && isRetriable(restError.statusCode)) {
        return await this._persist(envelopes);
      }
      if (this._isNetworkError(restError)) {
        diag.error(
          "Retrying due to transient client side error. Error message:",
          restError.message
        );
        return await this._persist(envelopes);
      }

      diag.error(
        "Envelopes could not be exported and are not retriable. Error message:",
        restError.message
      );
      return { code: ExportResultCode.FAILED, error: restError };
    }
  }

  private async _sendFirstPersistedFile(): Promise<void> {
    try {
      const envelopes = (await this._persister.shift()) as Envelope[] | null;
      if (envelopes) {
        await this._sender.send(envelopes);
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

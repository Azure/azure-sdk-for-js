// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { diag } from "@opentelemetry/api";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { ReadableSpan, SpanExporter } from "@opentelemetry/tracing";
import { RestError } from "@azure/core-http";
import { ConnectionStringParser } from "../utils/connectionStringParser";
import { HttpSender, FileSystemPersist } from "../platform";
import {
  DEFAULT_EXPORTER_CONFIG,
  AzureExporterConfig,
  AzureExporterInternalConfig
} from "../config";
import { PersistentStorage, Sender } from "../types";
import { isRetriable, BreezeResponse } from "../utils/breezeUtils";
import { ENV_CONNECTION_STRING } from "../Declarations/Constants";
import { TelemetryItem as Envelope } from "../generated";
import { readableSpanToEnvelope } from "../utils/spanUtils";

export class AzureMonitorTraceExporter implements SpanExporter {
  private readonly _persister: PersistentStorage;

  private readonly _sender: Sender;

  private _retryTimer: NodeJS.Timer | null;

  private readonly _options: AzureExporterInternalConfig;

  constructor(options: AzureExporterConfig = {}) {
    const connectionString = options.connectionString || process.env[ENV_CONNECTION_STRING];
    this._options = {
      ...DEFAULT_EXPORTER_CONFIG
    };
    this._options.apiVersion = options.apiVersion ?? this._options.apiVersion;

    if (connectionString) {
      const parsedConnectionString = ConnectionStringParser.parse(connectionString);
      this._options.instrumentationKey =
        parsedConnectionString.instrumentationkey ?? this._options.instrumentationKey;
      this._options.endpointUrl =
        parsedConnectionString.ingestionendpoint?.trim() ?? this._options.endpointUrl;
    }
    // Instrumentation key is required
    if (!this._options.instrumentationKey) {
      const message =
        "No instrumentation key or connection string was provided to the Azure Monitor Exporter";
      diag.error(message);
      throw new Error(message);
    }

    this._sender = new HttpSender(this._options);
    this._persister = new FileSystemPersist(this._options);
    this._retryTimer = null;
    diag.debug("AzureMonitorTraceExporter was successfully setup");
  }

  private async _persist(envelopes: unknown[]): Promise<ExportResult> {
    try {
      const success = await this._persister.push(envelopes);
      return success
        ? { code: ExportResultCode.SUCCESS }
        : {
            code: ExportResultCode.FAILED,
            error: new Error("Failed to persist envelope in disk.")
          };
    } catch (ex) {
      return { code: ExportResultCode.FAILED, error: ex };
    }
  }

  private async exportEnvelopes(envelopes: Envelope[]): Promise<ExportResult> {
    diag.info(`Exporting ${envelopes.length} envelope(s)`);

    try {
      const { result, statusCode } = await this._sender.send(envelopes);
      if (statusCode === 200) {
        // Success -- @todo: start retry timer
        if (!this._retryTimer) {
          this._retryTimer = setTimeout(() => {
            this._retryTimer = null;
            this._sendFirstPersistedFile();
          }, this._options.batchSendRetryIntervalMs);
          this._retryTimer.unref();
        }
        return { code: ExportResultCode.SUCCESS };
      } else if (statusCode && isRetriable(statusCode)) {
        // Failed -- persist failed data
        if (result) {
          diag.info(result);
          const breezeResponse = JSON.parse(result) as BreezeResponse;
          const filteredEnvelopes = breezeResponse.errors.reduce(
            (acc, v) => [...acc, envelopes[v.index]],
            [] as Envelope[]
          );
          // calls resultCallback(ExportResult) based on result of persister.push
          return await this._persist(filteredEnvelopes);
        } else {
          // calls resultCallback(ExportResult) based on result of persister.push
          return await this._persist(envelopes);
        }
      } else {
        // Failed -- not retriable
        return {
          code: ExportResultCode.FAILED
        };
      }
    } catch (senderErr) {
      if (this._isNetworkError(senderErr)) {
        diag.error(
          "Retrying due to transient client side error. Error message:",
          senderErr.message
        );
        return await this._persist(envelopes);
      } else {
        diag.error(
          "Envelopes could not be exported and are not retriable. Error message:",
          senderErr.message
        );
        return { code: ExportResultCode.FAILED, error: senderErr };
      }
    }
  }

  async export(
    spans: ReadableSpan[],
    resultCallback: (result: ExportResult) => void
  ): Promise<void> {
    diag.info(`Exporting ${spans.length} span(s). Converting to envelopes...`);
    const envelopes = spans.map((span) =>
      readableSpanToEnvelope(span, this._options.instrumentationKey)
    );
    resultCallback(await this.exportEnvelopes(envelopes));
  }

  async shutdown(): Promise<void> {
    diag.info("Azure Monitor Trace Exporter shutting down");
    return this._sender.shutdown();
  }

  private async _sendFirstPersistedFile(): Promise<void> {
    try {
      const envelopes = (await this._persister.shift()) as Envelope[] | null;
      if (envelopes) {
        await this._sender.send(envelopes);
      }
    } catch (err) {
      diag.warn(`Failed to fetch persisted file`, err);
    }
  }

  private _isNetworkError(error: Error): boolean {
    if (error instanceof RestError) {
      if (error && error.code && error.code === "REQUEST_SEND_ERROR") {
        return true;
      }
    }
    return false;
  }
}

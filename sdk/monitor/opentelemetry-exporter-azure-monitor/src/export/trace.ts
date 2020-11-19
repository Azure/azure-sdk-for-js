// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Logger } from "@opentelemetry/api";
import { ConsoleLogger, LogLevel, ExportResult } from "@opentelemetry/core";
import { ReadableSpan, SpanExporter } from "@opentelemetry/tracing";
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

  private readonly _logger: Logger;

  private readonly _sender: Sender;

  private _retryTimer: NodeJS.Timer | null;

  private readonly _options: AzureExporterInternalConfig;

  constructor(options: Partial<AzureExporterConfig> = {}) {
    const connectionString = options.connectionString || process.env[ENV_CONNECTION_STRING];

    this._logger = new ConsoleLogger(LogLevel.ERROR);
    this._options = {
      ...DEFAULT_EXPORTER_CONFIG,
      ...options
    };

    if (connectionString) {
      const parsedConnectionString = ConnectionStringParser.parse(connectionString, this._logger);
      this._options = {
        ...DEFAULT_EXPORTER_CONFIG,
        // Overwrite options with connection string results, if any
        instrumentationKey: parsedConnectionString.instrumentationkey ?? "",
        endpointUrl: parsedConnectionString.ingestionendpoint ?? ""
      };
    }

    // Instrumentation key is required
    if (!this._options.instrumentationKey) {
      const message =
        "No instrumentation key or connection string was provided to the Azure Monitor Exporter";
      this._logger.error(message);
      throw new Error(message);
    }

    this._sender = new HttpSender();
    this._persister = new FileSystemPersist(this._options);
    this._retryTimer = null;
    this._logger.debug("AzureMonitorTraceExporter was successfully setup");
  }

  private async _persist(envelopes: unknown[]): Promise<ExportResult> {
    try {
      const success = await this._persister.push(envelopes);
      return success ? ExportResult.FAILED_RETRYABLE : ExportResult.FAILED_NOT_RETRYABLE;
    } catch (e) {
      return ExportResult.FAILED_NOT_RETRYABLE;
    }
  }

  private async exportEnvelopes(envelopes: Envelope[]): Promise<ExportResult> {
    this._logger.info(`Exporting ${envelopes.length} envelope(s)`);

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
        return ExportResult.SUCCESS;
      } else if (statusCode && isRetriable(statusCode)) {
        // Failed -- persist failed data
        if (result) {
          this._logger.info(result);
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
        return ExportResult.FAILED_NOT_RETRYABLE;
      }
    } catch (senderErr) {
      // Request failed -- always retry
      this._logger.error(
        "Envelopes could not be exported and are not retriable. Error message:",
        senderErr.message
      );
      return ExportResult.FAILED_NOT_RETRYABLE;
    }
  }

  async export(
    spans: ReadableSpan[],
    resultCallback: (result: ExportResult) => void
  ): Promise<void> {
    this._logger.info(`Exporting ${spans.length} span(s). Converting to envelopes...`);
    const envelopes = spans.map((span) =>
      readableSpanToEnvelope(span, this._options.instrumentationKey, this._logger)
    );
    resultCallback(await this.exportEnvelopes(envelopes));
  }

  shutdown(): void {
    this._logger.info("Azure Monitor Trace Exporter shutting down");
    this._sender.shutdown();
  }

  private async _sendFirstPersistedFile(): Promise<void> {
    try {
      const envelopes = (await this._persister.shift()) as Envelope[] | null;
      if (envelopes) {
        await this._sender.send(envelopes);
      }
    } catch (err) {
      this._logger.warn(`Failed to fetch persisted file`, err);
    }
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Logger } from "@opentelemetry/api";
import { ConsoleLogger, LogLevel, ExportResult } from "@opentelemetry/core";
import { Envelope } from "../Declarations/Contracts";
import { ConnectionStringParser } from "../utils/connectionStringParser";
import { HttpSender, FileSystemPersist } from "../platform";
import { DEFAULT_EXPORTER_CONFIG, AzureExporterConfig } from "../config";
import { BaseExporter, TelemetryProcessor, PersistentStorage, Sender } from "../types";
import { isRetriable, BreezeResponse } from "../utils/breezeUtils";
import { ENV_CONNECTION_STRING, ENV_INSTRUMENTATION_KEY } from "../Declarations/Constants";

export abstract class AzureMonitorBaseExporter implements BaseExporter {
  protected readonly _persister: PersistentStorage;

  protected readonly _logger: Logger;

  protected readonly _sender: Sender;

  protected _retryTimer: NodeJS.Timer | null;

  protected _telemetryProcessors: TelemetryProcessor[];

  protected readonly _options: AzureExporterConfig;

  constructor(_options: Partial<AzureExporterConfig> = {}) {
    const connectionString = _options.connectionString || process.env[ENV_CONNECTION_STRING];
    const instrumentationKey =
      _options.instrumentationKey || process.env[ENV_INSTRUMENTATION_KEY] || "";

    this._logger = _options.logger || new ConsoleLogger(LogLevel.ERROR);
    this._options = {
      ...DEFAULT_EXPORTER_CONFIG,
      ..._options,
      instrumentationKey
    };

    if (connectionString) {
      const parsedConnectionString = ConnectionStringParser.parse(connectionString, this._logger);
      this._options = {
        ...DEFAULT_EXPORTER_CONFIG,
        // Overwrite options with connection string results, if any
        instrumentationKey: parsedConnectionString.instrumentationkey || instrumentationKey,
        endpointUrl: parsedConnectionString.ingestionendpoint || _options.endpointUrl!
      };
    }

    // Instrumentation key is required
    if (!this._options.instrumentationKey) {
      const message =
        "No instrumentation key or connection string was provided to the Azure Monitor Exporter";
      this._logger.error(message);
      throw new Error(message);
    }

    this._telemetryProcessors = [];
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

  async exportEnvelopes(payload: Envelope[]): Promise<ExportResult> {
    const envelopes = this._applyTelemetryProcessors(payload);
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
      this._logger.error(senderErr.message);
      return this._persist(envelopes);
    }
  }

  addTelemetryProcessor(processor: TelemetryProcessor): void {
    this._telemetryProcessors.push(processor);
  }

  clearTelemetryProcessors(): void {
    this._telemetryProcessors = [];
  }

  shutdown(): void {
    this._sender.shutdown();
  }

  protected _applyTelemetryProcessors(envelopes: Envelope[]): Envelope[] {
    const filteredEnvelopes: Envelope[] = [];
    for (const envelope of envelopes) {
      let accepted = true;

      for (const processor of this._telemetryProcessors) {
        // Don't use CPU cycles if item is already rejected
        if (accepted && processor(envelope) === false) {
          accepted = false;
        }
      }

      if (accepted) {
        filteredEnvelopes.push(envelope);
      }
    }

    return filteredEnvelopes;
  }

  private async _sendFirstPersistedFile(): Promise<void> {
    try {
      const envelopes = (await this._persister.shift()) as Envelope[];
      this._sender.send(envelopes);
    } catch (err) {
      this._logger.warn(`Failed to fetch persisted file`, err);
    }
  }
}

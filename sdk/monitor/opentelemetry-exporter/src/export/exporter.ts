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

  async exportEnvelopes(
    payload: Envelope[],
    resultCallback: (result: ExportResult) => void
  ): Promise<void> {
    const envelopes = this._applyTelemetryProcessors(payload);
    this._logger.info(`Exporting ${envelopes.length} envelope(s)`);
    const persistCb = (persistErr: Error | null, persistSuccess?: boolean) => {
      if (persistErr || !persistSuccess) {
        return resultCallback(ExportResult.FAILED_NOT_RETRYABLE);
      }
      return resultCallback(ExportResult.FAILED_RETRYABLE);
    };

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
        resultCallback(ExportResult.SUCCESS);
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
          this._persister.push(filteredEnvelopes, persistCb);
        } else {
          // calls resultCallback(ExportResult) based on result of persister.push
          this._persister.push(envelopes, persistCb);
        }
      } else {
        // Failed -- not retriable
        resultCallback(ExportResult.FAILED_NOT_RETRYABLE);
      }
    } catch (senderErr) {
      // Request failed -- always retry
      this._logger.error(senderErr.message);
      this._persister.push(envelopes, persistCb);
    }
  }

  addTelemetryProcessor(processor: TelemetryProcessor): void {
    this._telemetryProcessors.push(processor);
  }

  clearTelemetryProcessors() {
    this._telemetryProcessors = [];
  }

  shutdown() {
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

  private _sendFirstPersistedFile() {
    this._persister.shift((err, envelopes) => {
      if (err) {
        this._logger.warn(`Failed to fetch persisted file`, err);
      } else if (envelopes) {
        this._sender.send(envelopes);
      }
    });
  }
}

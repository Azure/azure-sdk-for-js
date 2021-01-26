// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Logger } from "@opentelemetry/api";
import { ConsoleLogger, LogLevel } from "@opentelemetry/core";
import { Sender, SenderResult } from "../../types";
import {
  TelemetryItem as Envelope,
  ApplicationInsightsClient,
  ApplicationInsightsClientOptionalParams
} from "../../generated";
import { AzureExporterInternalConfig } from "../../config";

export class HttpSender implements Sender {
  private readonly _logger: Logger;

  private readonly _appInsightsClient: ApplicationInsightsClient;

  constructor(
    private _exporterOptions: Partial<AzureExporterInternalConfig> = {},
    private _appInsightsClientOptions: ApplicationInsightsClientOptionalParams = {}
  ) {
    this._logger = this._exporterOptions.logger || new ConsoleLogger(LogLevel.ERROR);
    this._appInsightsClient = new ApplicationInsightsClient({
      ...this._appInsightsClientOptions
    });
  }

  async send(envelopes: Envelope[]): Promise<SenderResult> {
    try {
      const { _response: res } = await this._appInsightsClient.track(envelopes);
      return { statusCode: res.status, result: res.bodyAsText ?? "" };
    } catch (e) {
      throw e;
    }
  }

  async shutdown(): Promise<void> {
    this._logger.info("HttpSender shutting down");
  }
}

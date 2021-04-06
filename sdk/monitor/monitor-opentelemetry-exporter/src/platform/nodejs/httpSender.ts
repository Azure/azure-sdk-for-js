// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { diag } from "@opentelemetry/api";
import { Sender, SenderResult } from "../../types";
import {
  TelemetryItem as Envelope,
  ApplicationInsightsClient,
  ApplicationInsightsClientOptionalParams
} from "../../generated";
import { AzureExporterInternalConfig } from "../../config";
import { URL } from "@azure/core-http/types/latest/src/url";

/**
 * Exporter HTTP sender class
 * @internal
 */
export class HttpSender implements Sender {
  private readonly _appInsightsClient: ApplicationInsightsClient;
  private _appInsightsClientOptions: ApplicationInsightsClientOptionalParams;

  constructor(private _exporterOptions: AzureExporterInternalConfig) {
    // Build endpoint using provided configuration or default values
    this._appInsightsClientOptions = {
      host: this._exporterOptions.endpointUrl
    };

    this._appInsightsClient = new ApplicationInsightsClient({
      ...this._appInsightsClientOptions
    });
  }

  /**
   * Send Azure envelopes
   * @internal
   */
  async send(envelopes: Envelope[]): Promise<SenderResult> {
    try {
      const { _response: res } = await this._appInsightsClient.track(envelopes);
      return { statusCode: res.status, result: res.bodyAsText ?? "" };
    } catch (e) {
      throw e;
    }
  }

  /**
   * Shutdown sender
   * @internal
   */
  async shutdown(): Promise<void> {
    diag.info("HttpSender shutting down");
  }

  handlePermanentRedirect(location: string | undefined) {
    if (location) {
      let locUrl = new URL(location);
      if (locUrl && locUrl.host) {
        this._appInsightsClient.host = locUrl.host;
      }
    }
  }
}

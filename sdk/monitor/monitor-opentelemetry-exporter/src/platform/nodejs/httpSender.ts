// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import url from "url";
import { diag } from "@opentelemetry/api";
import { FullOperationResponse } from "@azure/core-client";
import { redirectPolicyName } from "@azure/core-rest-pipeline";
import { SenderResult } from "../../types";
import {
  TelemetryItem as Envelope,
  ApplicationInsightsClient,
  ApplicationInsightsClientOptionalParams,
  TrackOptionalParams,
} from "../../generated";
import { AzureMonitorExporterOptions } from "../../config";
import { BaseSender } from "./baseSender";

const applicationInsightsResource = "https://monitor.azure.com//.default";

/**
 * Exporter HTTP sender class
 * @internal
 */
export class HttpSender extends BaseSender {
  private readonly _appInsightsClient: ApplicationInsightsClient;
  private _appInsightsClientOptions: ApplicationInsightsClientOptionalParams;

  constructor(options: {
    endpointUrl: string;
    instrumentationKey: string;
    trackStatsbeat: boolean;
    exporterOptions: AzureMonitorExporterOptions;
    aadAudience?: string;
  }) {
    super(options);
    // Build endpoint using provided configuration or default values
    this._appInsightsClientOptions = {
      host: options.endpointUrl,
      ...options.exporterOptions,
    };

    if (this._appInsightsClientOptions.credential) {
      // Add credentialScopes
      if (options.aadAudience) {
        this._appInsightsClientOptions.credentialScopes = [options.aadAudience];
      } else {
        // Default
        this._appInsightsClientOptions.credentialScopes = [applicationInsightsResource];
      }
    }
    this._appInsightsClient = new ApplicationInsightsClient(this._appInsightsClientOptions);

    // Handle redirects in HTTP Sender
    this._appInsightsClient.pipeline.removePolicy({ name: redirectPolicyName });
  }

  /**
   * Send Azure envelopes
   * @internal
   */
  async send(envelopes: Envelope[]): Promise<SenderResult> {
    let options: TrackOptionalParams = {};
    try {
      let response: FullOperationResponse | undefined;
      function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
        response = rawResponse;
        if (options.onResponse) {
          options.onResponse(rawResponse, flatResponse);
        }
      }
      await this._appInsightsClient.track(envelopes, {
        ...options,
        onResponse,
      });

      return { statusCode: response?.status, result: response?.bodyAsText ?? "" };
    } catch (e: any) {
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
      const locUrl = new url.URL(location);
      if (locUrl && locUrl.host) {
        this._appInsightsClient.host = "https://" + locUrl.host;
      }
    }
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
  private readonly appInsightsClient: ApplicationInsightsClient;
  private appInsightsClientOptions: ApplicationInsightsClientOptionalParams;

  constructor(options: {
    endpointUrl: string;
    instrumentationKey: string;
    trackStatsbeat: boolean;
    exporterOptions: AzureMonitorExporterOptions;
    aadAudience?: string;
    isStatsbeatSender?: boolean;
  }) {
    super(options);
    // Build endpoint using provided configuration or default values
    this.appInsightsClientOptions = {
      host: options.endpointUrl,
      ...options.exporterOptions,
    };

    if (this.appInsightsClientOptions.credential) {
      // Add credentialScopes
      if (options.aadAudience) {
        this.appInsightsClientOptions.credentialScopes = [options.aadAudience];
      } else {
        // Default
        this.appInsightsClientOptions.credentialScopes = [applicationInsightsResource];
      }
    }
    this.appInsightsClient = new ApplicationInsightsClient(this.appInsightsClientOptions);

    // Handle redirects in HTTP Sender
    this.appInsightsClient.pipeline.removePolicy({ name: redirectPolicyName });
  }

  /**
   * Send Azure envelopes
   * @internal
   */
  async send(envelopes: Envelope[]): Promise<SenderResult> {
    const options: TrackOptionalParams = {};
    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (options.onResponse) {
        options.onResponse(rawResponse, flatResponse);
      }
    }
    await this.appInsightsClient.track(envelopes, {
      ...options,
      onResponse,
    });

    return { statusCode: response?.status, result: response?.bodyAsText ?? "" };
  }

  /**
   * Shutdown sender
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async shutdown(): Promise<void> {
    diag.info("HttpSender shutting down");
  }

  handlePermanentRedirect(location: string | undefined): void {
    if (location) {
      const locUrl = new url.URL(location);
      if (locUrl && locUrl.host) {
        this.appInsightsClient.host = "https://" + locUrl.host;
      }
    }
  }
}

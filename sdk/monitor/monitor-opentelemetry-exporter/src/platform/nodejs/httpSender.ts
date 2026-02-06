// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import url from "node:url";
import { diag } from "@opentelemetry/api";
import type { FullOperationResponse } from "@azure/core-client";
import { bearerTokenAuthenticationPolicyName, redirectPolicyName } from "@azure/core-rest-pipeline";
import type { SenderResult } from "../../types.js";
import type { TelemetryItem as Envelope, TrackOptionalParams } from "../../generated/index.js";
import { ApplicationInsightsClient } from "../../generated/index.js";
import type { AzureMonitorExporterOptions } from "../../config.js";
import { BaseSender } from "./baseSender.js";
import type { TokenCredential } from "@azure/core-auth";

const applicationInsightsResource = "https://monitor.azure.com//.default";

type TrackOptionsWithResponse = TrackOptionalParams & {
  onResponse?: (rawResponse: FullOperationResponse, flatResponse: unknown) => void;
};

/**
 * Exporter HTTP sender class
 * @internal
 */
export class HttpSender extends BaseSender {
  private appInsightsClient: ApplicationInsightsClient;
  private readonly credential?: TokenCredential;
  public appInsightsClientOptions: AzureMonitorExporterOptions;

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
      const scopes = options.aadAudience ? [options.aadAudience] : [applicationInsightsResource];
      this.appInsightsClientOptions.credentials = { scopes };
      this.appInsightsClientOptions.credentialScopes = scopes;
    }

    const { credential, ...clientOptions } = this.appInsightsClientOptions;
    this.credential = credential as TokenCredential | undefined;

    this.appInsightsClient = this.createClient(clientOptions);
  }

  private createClient(
    clientOptions: Omit<AzureMonitorExporterOptions, "credential">,
  ): ApplicationInsightsClient {
    const client = new ApplicationInsightsClient(this.credential as any, clientOptions);

    // Expose host for tests and redirect handling
    (client as any).host = clientOptions.host;

    // Handle redirects in HTTP Sender
    if (!this.appInsightsClientOptions.credential) {
      client.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });
    }

    client.pipeline.removePolicy({ name: redirectPolicyName });
    return client;
  }

  /**
   * Send Azure envelopes
   * @internal
   */
  async send(envelopes: Envelope[]): Promise<SenderResult> {
    const options: TrackOptionsWithResponse = {};
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
    return {
      statusCode: response?.status,
      result: response?.bodyAsText ?? "",
      headers: response?.headers,
    };
  }

  /**
   * Shutdown sender
   * @internal
   */
  async shutdown(): Promise<void> {
    diag.info("HttpSender shutting down");
  }

  handlePermanentRedirect(location: string | undefined): void {
    if (location) {
      const locUrl = new url.URL(location);
      if (locUrl && locUrl.host) {
        this.appInsightsClientOptions.host = "https://" + locUrl.host;
        const { credential, ...clientOptions } = this.appInsightsClientOptions;
        this.appInsightsClient = this.createClient(clientOptions);
      }
    }
  }
}

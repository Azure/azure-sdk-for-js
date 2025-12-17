// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import url from "node:url";
import { diag } from "@opentelemetry/api";
import type { FullOperationResponse } from "@azure/core-client";
import { redirectPolicyName } from "@azure/core-rest-pipeline";
import type { SenderResult } from "../../types.js";
import type { TelemetryItem as Envelope, TrackOptionalParams } from "../../generated/index.js";
import { ApplicationInsightsClient } from "../../client/applicationInsightsClient.js";
import type { AzureMonitorExporterOptions } from "../../config.js";
import { BaseSender } from "./baseSender.js";

const applicationInsightsResource = "https://monitor.azure.com//.default";

/**
 * Exporter HTTP sender class
 * @internal
 */
export class HttpSender extends BaseSender {
  private appInsightsClient: ApplicationInsightsClient;
  private appInsightsClientOptions: AzureMonitorExporterOptions;

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

    if (
      this.appInsightsClientOptions.credential &&
      !this.appInsightsClientOptions.credentialScopes
    ) {
      this.appInsightsClientOptions.credentialScopes = options.aadAudience
        ? [options.aadAudience]
        : [applicationInsightsResource];
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
  async shutdown(): Promise<void> {
    diag.info("HttpSender shutting down");
  }

  handlePermanentRedirect(location: string | undefined): void {
    if (location) {
      const locUrl = new url.URL(location);
      if (locUrl && locUrl.host) {
        this.appInsightsClientOptions = {
          ...this.appInsightsClientOptions,
          host: "https://" + locUrl.host,
        };
        this.appInsightsClient = new ApplicationInsightsClient(this.appInsightsClientOptions);
        this.appInsightsClient.pipeline.removePolicy({ name: redirectPolicyName });
      }
    }
  }
}

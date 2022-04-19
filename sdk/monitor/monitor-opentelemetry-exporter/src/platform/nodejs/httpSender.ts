// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ApplicationInsightsClient,
  ApplicationInsightsClientOptionalParams,
  TelemetryItem as Envelope,
  TrackOptionalParams,
} from "../../generated";
import { Sender, SenderResult } from "../../types";
import { bearerTokenAuthenticationPolicy, redirectPolicyName } from "@azure/core-rest-pipeline";
import { AzureExporterInternalConfig } from "../../config";
import { FullOperationResponse } from "@azure/core-client";
import { diag } from "@opentelemetry/api";

const applicationInsightsResource = "https://monitor.azure.com//.default";

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
      host: this._exporterOptions.endpointUrl,
    };
    this._appInsightsClient = new ApplicationInsightsClient({
      ...this._appInsightsClientOptions,
    });
    // Handle redirects in HTTP Sender
    this._appInsightsClient.pipeline.removePolicy({ name: redirectPolicyName });

    if (this._exporterOptions.aadTokenCredential) {
      const scopes: string[] = [applicationInsightsResource];
      this._appInsightsClient.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          credential: this._exporterOptions.aadTokenCredential,
          scopes: scopes,
        })
      );
    }
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
      await this._appInsightsClient.track(envelopes, {
        ...options,
        onResponse,
      });

      return { statusCode: response?.status, result: response?.bodyAsText ?? "" };
    } catch (e: any) {
      throw e;
    }
    await this._appInsightsClient.track(envelopes, {
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
      const locUrl = new URL(location);
      if (locUrl && locUrl.host) {
        this._appInsightsClient.host = "https://" + locUrl.host;
      }
    }
  }
}

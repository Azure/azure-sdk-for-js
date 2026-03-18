// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import url from "node:url";
import { diag } from "@opentelemetry/api";
import {
  bearerTokenAuthenticationPolicyName,
  redirectPolicyName,
} from "@azure/core-rest-pipeline";
import type { Pipeline, PipelineResponse } from "@azure/core-rest-pipeline";
import type { SenderResult } from "../../types.js";
import type { TelemetryItem as Envelope } from "../../generated/index.js";
import { ApplicationInsightsClient } from "../../generated/index.js";
import type { AzureMonitorExporterOptions } from "../../config.js";
import { BaseSender } from "./baseSender.js";
import type { TokenCredential } from "@azure/core-auth";

const applicationInsightsResource = "https://monitor.azure.com/.default";

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
    } else if (
      !this.appInsightsClientOptions.credentials?.scopes &&
      (this.appInsightsClientOptions as any).credentialScopes
    ) {
      // Backward compat: map ServiceClientOptions.credentialScopes to ClientOptions.credentials.scopes
      const legacy = (this.appInsightsClientOptions as any).credentialScopes;
      this.appInsightsClientOptions.credentials = {
        scopes: Array.isArray(legacy) ? legacy : [legacy],
      };
    }

    const { credential, ...clientOptions } = this.appInsightsClientOptions;
    this.credential = credential as TokenCredential | undefined;

    this.appInsightsClient = this.createClient(clientOptions);
  }

  private createClient(
    clientOptions: Omit<AzureMonitorExporterOptions, "credential">,
  ): ApplicationInsightsClient {
    // Extract pipeline from options — ServiceClientOptions allowed passing a pre-built pipeline,
    // but the TypeSpec-generated REST client always creates its own. If a user passed one,
    // we adopt its policies onto the generated client's pipeline for backward compatibility.
    const userPipeline: Pipeline | undefined = (clientOptions as any).pipeline;

    const client = new ApplicationInsightsClient(this.credential as any, clientOptions);

    // Expose host for tests and redirect handling
    (client as any).host = clientOptions.host;

    // If user provided a pre-built pipeline, copy its policies onto the generated client's pipeline
    if (userPipeline) {
      for (const policy of userPipeline.getOrderedPolicies()) {
        if (!client.pipeline.getOrderedPolicies().some((p) => p.name === policy.name)) {
          client.pipeline.addPolicy(policy);
        }
      }
    }

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
    let response: PipelineResponse | undefined;
    // The TypeSpec-generated client throws RestError for non-200/206 responses.
    // For success responses, we capture the raw response via onResponse callback
    // and return it as a SenderResult. Error responses propagate as RestError
    // so baseSender.exportEnvelopes() catch block can handle retries, redirects, etc.
    await this.appInsightsClient.track(envelopes, {
      onResponse(rawResponse) {
        response = rawResponse;
      },
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

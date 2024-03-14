// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import url from "url";
import { RestError, redirectPolicyName } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { diag } from "@opentelemetry/api";
import {
  PingOptionalParams,
  PingResponse,
  PostOptionalParams,
  PostResponse,
  QuickpulseClient,
  QuickpulseClientOptionalParams,
} from "../../../generated";


const applicationInsightsResource = "https://monitor.azure.com//.default";

/**
 * Quickpulse sender class
 * @internal
 */
export class QuickpulseSender {
  private readonly quickpulseClient: QuickpulseClient;
  private quickpulseClientOptions: QuickpulseClientOptionalParams;
  private instrumentationKey: string;

  constructor(options: {
    endpointUrl: string;
    instrumentationKey: string;
    credential?: TokenCredential;
    aadAudience?: string;
  }) {
    // Build endpoint using provided configuration or default values
    this.quickpulseClientOptions = {
      host: options.endpointUrl,
    };

    this.instrumentationKey = options.instrumentationKey;

    if (options.credential) {
      this.quickpulseClientOptions.credential = options.credential;
      // Add credentialScopes
      if (options.aadAudience) {
        this.quickpulseClientOptions.credentialScopes = [options.aadAudience];
      } else {
        // Default
        this.quickpulseClientOptions.credentialScopes = [applicationInsightsResource];
      }
    }
    this.quickpulseClient = new QuickpulseClient(this.quickpulseClientOptions);

    // Handle redirects in HTTP Sender
    this.quickpulseClient.pipeline.removePolicy({ name: redirectPolicyName });
  }

  /**
   * Ping Quickpulse service
   * @internal
   */
  async ping(optionalParams: PingOptionalParams): Promise<PingResponse | undefined> {

    try {
      let response = await this.quickpulseClient.ping(this.instrumentationKey, optionalParams);
      return response;
    } catch (error: any) {
      const restError = error as RestError;
      diag.info(
        "Failed to ping Quickpulse service",
        restError.message,
      );
    }
    return;
  }

  /**
   * Post Quickpulse service
   * @internal
   */
  async post(optionalParams: PostOptionalParams): Promise<PostResponse | undefined> {
    try {
      let response = await this.quickpulseClient.post(this.instrumentationKey, optionalParams);
      return response;
    } catch (error: any) {
      const restError = error as RestError;
      diag.warn(
        "Failed to post Quickpulse service",
        restError.message,
      );
    }
    return;
  }

  handlePermanentRedirect(location: string | undefined) {
    if (location) {
      const locUrl = new url.URL(location);
      if (locUrl && locUrl.host) {
        this.quickpulseClient.host = "https://" + locUrl.host;
      }
    }
  }
}

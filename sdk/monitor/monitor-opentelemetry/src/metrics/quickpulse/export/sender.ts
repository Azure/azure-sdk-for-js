// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import url from "url";
import type { RestError } from "@azure/core-rest-pipeline";
import { redirectPolicyName } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import { diag } from "@opentelemetry/api";
import type {
  IsSubscribedOptionalParams,
  PublishOptionalParams,
  QuickpulseClientOptionalParams,
  CollectionConfigurationInfo,
} from "../../../generated/index.js";
import { QuickpulseClient } from "../../../generated/index.js";

const applicationInsightsResource = "https://monitor.azure.com/.default";

/**
 * Response type that includes the body and response headers from the Live Metrics service.
 * @internal
 */
export interface QuickpulseResponse extends CollectionConfigurationInfo {
  /** Whether the instrumentation key is subscribed. */
  xMsQpsSubscribed?: string;
  /** Configuration ETag. */
  xMsQpsConfigurationEtag?: string;
  /** Polling interval hint (only for ping). */
  xMsQpsServicePollingIntervalHint?: string;
  /** Endpoint redirect (only for ping). */
  xMsQpsServiceEndpointRedirectV2?: string;
}

/**
 * Quickpulse sender class
 * @internal
 */
export class QuickpulseSender {
  private quickpulseClient: QuickpulseClient;
  private instrumentationKey: string;
  private endpointUrl: string;
  private credential: TokenCredential;
  private credentialScopes: string[];
  // @ts-expect-error - assigned in constructor, accessed by tests via bracket notation
  private quickpulseClientOptions: {
    credential?: TokenCredential;
    credentialScopes?: string[];
  };

  constructor(options: {
    endpointUrl: string;
    instrumentationKey: string;
    credential?: TokenCredential;
    credentialScopes?: string | string[];
  }) {
    // Build endpoint using provided configuration or default values
    this.endpointUrl = options.endpointUrl;
    const clientOptions: QuickpulseClientOptionalParams = {
      endpoint: this.endpointUrl,
    };

    this.instrumentationKey = options.instrumentationKey;
    this.credential = options.credential as TokenCredential;

    // Configure credential scopes
    if (options.credentialScopes) {
      this.credentialScopes = Array.isArray(options.credentialScopes)
        ? options.credentialScopes
        : [options.credentialScopes];
    } else {
      this.credentialScopes = [applicationInsightsResource];
    }
    if (options.credential) {
      clientOptions.credentials = { scopes: this.credentialScopes };
    }

    // Store credential info for testability
    this.quickpulseClientOptions = {
      credential: options.credential,
      credentialScopes: this.credentialScopes,
    };

    this.quickpulseClient = this.createQuickpulseClient(clientOptions);
  }

  private createQuickpulseClient(clientOptions: QuickpulseClientOptionalParams): QuickpulseClient {
    const client = new QuickpulseClient(this.credential, clientOptions);
    // Handle redirects in HTTP Sender
    client.pipeline.removePolicy({ name: redirectPolicyName });
    return client;
  }

  /**
   * isSubscribed Quickpulse service
   * @internal
   */
  async isSubscribed(
    optionalParams: IsSubscribedOptionalParams,
  ): Promise<QuickpulseResponse | undefined> {
    try {
      let responseHeaders: Record<string, string> = {};
      const body = await this.quickpulseClient.isSubscribed(this.instrumentationKey, {
        ...optionalParams,
        onResponse: (rawResponse) => {
          responseHeaders = rawResponse.headers.toJSON();
        },
      });
      return {
        ...body,
        xMsQpsSubscribed: responseHeaders["x-ms-qps-subscribed"],
        xMsQpsConfigurationEtag: responseHeaders["x-ms-qps-configuration-etag"],
        xMsQpsServicePollingIntervalHint: responseHeaders["x-ms-qps-service-polling-interval-hint"],
        xMsQpsServiceEndpointRedirectV2: responseHeaders["x-ms-qps-service-endpoint-redirect-v2"],
      };
    } catch (error: any) {
      const restError = error as RestError;
      diag.info("Failed to ping Quickpulse service", restError.message);
    }
    return;
  }

  /**
   * publish Quickpulse service
   * @internal
   */
  async publish(optionalParams: PublishOptionalParams): Promise<QuickpulseResponse | undefined> {
    try {
      let responseHeaders: Record<string, string> = {};
      const body = await this.quickpulseClient.publish(this.instrumentationKey, {
        ...optionalParams,
        onResponse: (rawResponse) => {
          responseHeaders = rawResponse.headers.toJSON();
        },
      });
      return {
        ...body,
        xMsQpsSubscribed: responseHeaders["x-ms-qps-subscribed"],
        xMsQpsConfigurationEtag: responseHeaders["x-ms-qps-configuration-etag"],
      };
    } catch (error: any) {
      const restError = error as RestError;
      diag.warn("Failed to post Quickpulse service", restError.message);
    }
    return;
  }

  handlePermanentRedirect(location: string | undefined): void {
    if (location) {
      const locUrl = new url.URL(location);
      if (locUrl && locUrl.host) {
        this.endpointUrl = "https://" + locUrl.host;
        // Recreate the client so subsequent requests use the new endpoint
        this.quickpulseClient = this.createQuickpulseClient({
          endpoint: this.endpointUrl,
          credentials: { scopes: this.credentialScopes },
        });
      }
    }
  }
}

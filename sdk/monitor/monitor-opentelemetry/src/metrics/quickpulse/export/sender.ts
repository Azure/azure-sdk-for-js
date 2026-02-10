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

const applicationInsightsResource = "https://monitor.azure.com//.default";

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
  private readonly quickpulseClient: QuickpulseClient;
  private instrumentationKey: string;
  private endpointUrl: string;
  // @ts-expect-error - accessed by tests via bracket notation
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

    // Configure credential scopes
    if (options.credential) {
      if (options.credentialScopes) {
        const scopes = Array.isArray(options.credentialScopes)
          ? options.credentialScopes
          : [options.credentialScopes];
        clientOptions.credentials = { scopes };
      } else {
        clientOptions.credentials = { scopes: [applicationInsightsResource] };
      }
    }
    // Store credential info for testability
    this.quickpulseClientOptions = {
      credential: options.credential,
      credentialScopes: clientOptions.credentials?.scopes
        ? clientOptions.credentials.scopes
        : undefined,
    };

    this.quickpulseClient = new QuickpulseClient(
      options.credential as TokenCredential,
      clientOptions,
    );

    // Handle redirects in HTTP Sender
    this.quickpulseClient.pipeline.removePolicy({ name: redirectPolicyName });
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
          responseHeaders = rawResponse.headers as unknown as Record<string, string>;
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
          responseHeaders = rawResponse.headers as unknown as Record<string, string>;
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
      }
    }
  }
}

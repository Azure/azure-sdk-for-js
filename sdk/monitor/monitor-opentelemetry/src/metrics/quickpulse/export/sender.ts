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
import { isSameRegisteredDomain } from "../redirectUtils.js";

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

  /**
   * Apply a server-issued Live Metrics redirect (`x-ms-qps-service-endpoint-redirect-v2`) by
   * re-pointing the underlying client at the new host.
   *
   * Cross-origin redirects are refused (no state mutated) when the target is neither the configured
   * Live Metrics host nor under a known Azure Monitor ingestion domain suffix. Refusing them is
   * required to prevent an attacker-controlled redirect from causing the bearer auth policy to
   * attach a freshly-signed AAD token (scope `https://monitor.azure.com/.default`) — and the
   * telemetry body — to a foreign host on the next ping/publish call.
   */
  handlePermanentRedirect(location: string | undefined): void {
    if (location) {
      let locUrl: url.URL;
      try {
        locUrl = new url.URL(location);
      } catch {
        return;
      }
      if (!locUrl.host) {
        return;
      }

      let currentHost = "";
      try {
        currentHost = new url.URL(this.endpointUrl).host;
      } catch {
        currentHost = "";
      }

      if (!isSameRegisteredDomain(currentHost, locUrl.host)) {
        diag.error(
          `Refusing cross-origin Live Metrics redirect to https://${locUrl.host}: target is neither the configured endpoint host nor under a known Azure Monitor ingestion domain.`,
        );
        return;
      }

      this.endpointUrl = "https://" + locUrl.host;
      // Recreate the client so subsequent requests use the new endpoint
      this.quickpulseClient = this.createQuickpulseClient({
        endpoint: this.endpointUrl,
        credentials: { scopes: this.credentialScopes },
      });
    }
  }
}

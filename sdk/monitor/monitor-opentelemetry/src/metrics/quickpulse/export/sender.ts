// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import url from "url";
import type { RestError } from "@azure/core-rest-pipeline";
import { redirectPolicyName } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import { diag } from "@opentelemetry/api";
import type {
  IsSubscribedOptionalParams,
  IsSubscribedResponse,
  PublishOptionalParams,
  PublishResponse,
  QuickpulseClientOptionalParams,
} from "../../../generated";
import { QuickpulseClient } from "../../../generated";

const applicationInsightsResource = "https://monitor.azure.com//.default";

/**
 * Quickpulse sender class
 * @internal
 */
export class QuickpulseSender {
  private readonly quickpulseClient: QuickpulseClient;
  private quickpulseClientOptions: QuickpulseClientOptionalParams;
  private instrumentationKey: string;
  private endpointUrl: string;

  constructor(options: {
    endpointUrl: string;
    instrumentationKey: string;
    credential?: TokenCredential;
    credentialScopes?: string | string[];
  }) {
    // Build endpoint using provided configuration or default values
    this.endpointUrl = options.endpointUrl;
    this.quickpulseClientOptions = {
      endpoint: this.endpointUrl,
    };

    this.instrumentationKey = options.instrumentationKey;

    if (options.credential) {
      this.quickpulseClientOptions.credential = options.credential;
      // Add credentialScopes
      if (options.credentialScopes) {
        this.quickpulseClientOptions.credentialScopes = options.credentialScopes;
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
   * isSubscribed Quickpulse service
   * @internal
   */
  async isSubscribed(
    optionalParams: IsSubscribedOptionalParams,
  ): Promise<IsSubscribedResponse | undefined> {
    try {
      const response = await this.quickpulseClient.isSubscribed(
        this.endpointUrl,
        this.instrumentationKey,
        optionalParams,
      );
      return response;
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
  async publish(optionalParams: PublishOptionalParams): Promise<PublishResponse | undefined> {
    try {
      const response = await this.quickpulseClient.publish(
        this.endpointUrl,
        this.instrumentationKey,
        optionalParams,
      );
      return response;
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

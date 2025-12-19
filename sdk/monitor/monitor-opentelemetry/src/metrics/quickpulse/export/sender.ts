// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import url from "url";
import type { RestError } from "@azure/core-rest-pipeline";
import { redirectPolicyName } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import { diag } from "@opentelemetry/api";
import createClient from "../../../generated/liveMetricsClient.js";
import type {
  IsSubscribed200Response,
  IsSubscribedParameters,
  Publish200Response,
  PublishParameters,
} from "../../../generated/index.js";
import { isUnexpected } from "../../../generated/index.js";

const applicationInsightsResource = "https://monitor.azure.com/.default";

/**
 * Quickpulse sender class
 * @internal
 */
export class QuickpulseSender {
  private readonly quickpulseClient: ReturnType<typeof createClient>;
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
    this.instrumentationKey = options.instrumentationKey;
    const credential =
      options.credential ??
      ({
        getToken: async () => ({ token: "", expiresOnTimestamp: Date.now() + 60 * 60 * 1000 }),
      } as TokenCredential);

    const scopes = Array.isArray(options.credentialScopes)
      ? options.credentialScopes
      : options.credentialScopes
        ? [options.credentialScopes]
        : [applicationInsightsResource];

    this.quickpulseClient = createClient(credential, {
      endpointParam: this.endpointUrl,
      credentials: {
        scopes,
      },
    });

    // Handle redirects in HTTP Sender
    this.quickpulseClient.pipeline.removePolicy({ name: redirectPolicyName });
  }

  /**
   * isSubscribed Quickpulse service
   * @internal
   */
  async isSubscribed(
    optionalParams: IsSubscribedParameters,
  ): Promise<IsSubscribed200Response | undefined> {
    try {
      const response = await this.quickpulseClient
        .path("/QuickPulseService.svc/ping")
        .post(optionalParams);
      if (isUnexpected(response)) {
        throw response;
      }
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
  async publish(optionalParams: PublishParameters): Promise<Publish200Response | undefined> {
    try {
      const response = await this.quickpulseClient
        .path("/QuickPulseService.svc/post")
        .post(optionalParams);
      if (isUnexpected(response)) {
        throw response;
      }
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

  public getInstrumentationKey(): string {
    return this.instrumentationKey;
  }
}

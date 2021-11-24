// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  InternalPipelineOptions,
  TokenCredential,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions
} from "@azure/core-http";
import {
  MixedRealityStsRestClient,
  MixedRealityStsRestClientGetTokenOptionalParams,
  MixedRealityStsRestClientOptionalParams
} from "./generated";
import { logger } from "./logger";
import { GetTokenOptions, MixedRealityStsClientOptions } from "./models/options";
import { createSpan } from "./tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";
import { constructAuthenticationEndpointFromDomain } from "./util/authenticationEndpoint";
import { AccessToken, AzureKeyCredential } from "@azure/core-auth";
import { MixedRealityAccountKeyCredential } from "./models/auth";
import { mapToAccessToken } from "./models/mappers";
import { generateCvBase } from "./util/cv";

/**
 * Represents the Mixed Reality STS client for retrieving STS tokens used to access Mixed Reality services.
 */
export class MixedRealityStsClient {
  /**
   * Gets the Mixed Reality service account identifier.
   */
  public readonly accountId: string;

  /**
   * Gets the Mixed Reality STS service endpoint.
   */
  public readonly endpointUrl: string;

  private readonly restClient: MixedRealityStsRestClient;

  /**
   * Creates an instance of a MixedRealityStsClient.
   * @param accountId - The Mixed Reality service account identifier.
   * @param accountDomain - The Mixed Reality service account domain.
   * @param keyCredential - The Mixed Reality service account primary or secondary key credential.
   * @param options - Additional client options.
   */
  constructor(
    accountId: string,
    accountDomain: string,
    keyCredential: AzureKeyCredential,
    options?: MixedRealityStsClientOptions
  );

  /**
   * Creates an instance of a MixedRealityStsClient.
   * @param accountId - The Mixed Reality service account identifier.
   * @param accountDomain - The Mixed Reality service account domain.
   * @param credential - The credential used to access the Mixed Reality service.
   * @param options - Additional client options.
   */
  constructor(
    accountId: string,
    accountDomain: string,
    credential: TokenCredential,
    options?: MixedRealityStsClientOptions
  );

  /**
   * Creates an instance of a MixedRealityStsClient.
   * @param accountId - The Mixed Reality service account identifier.
   * @param accountDomain - The Mixed Reality service account domain.
   * @param credential - The credential used to access the Mixed Reality service.
   * @param options - Additional client options.
   */
  constructor(
    accountId: string,
    accountDomain: string,
    credential: TokenCredential | AzureKeyCredential,
    options: MixedRealityStsClientOptions = {}
  ) {
    if (!accountId) {
      throw new Error("Argument cannot be null or empty: 'accountId'.");
    }

    if (!accountDomain) {
      throw new Error("Argument cannot be null or empty: 'accountDomain'.");
    }

    this.accountId = accountId;
    this.endpointUrl =
      options.customEndpointUrl || constructAuthenticationEndpointFromDomain(accountDomain);

    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-mixed-reality-authentication/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    const userAgentOptions = { ...options.userAgentOptions };
    if (options.userAgentOptions.userAgentPrefix) {
      userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...{ ...options, userAgentOptions },
      ...{
        loggingOptions: {
          logger: logger.info,
          // This array contains header names we want to log that are not already
          // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
          allowedHeaderNames: ["X-MRC-CV", "MS-CV"]
        }
      }
    };

    let tokenCredential: TokenCredential;

    if (credential instanceof AzureKeyCredential) {
      tokenCredential = new MixedRealityAccountKeyCredential(this.accountId, credential);
    } else {
      tokenCredential = credential;
    }

    const authPolicy = bearerTokenAuthenticationPolicy(
      tokenCredential,
      `${this.endpointUrl}/.default`
    );
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    const clientOptions: MixedRealityStsRestClientOptionalParams = {
      ...internalPipelineOptions,
      ...pipeline,
      endpoint: this.endpointUrl
    };

    this.restClient = new MixedRealityStsRestClient(clientOptions);
  }

  /**
   * Retrieve a token from the STS service.
   * @param options - Operation options.
   */
  public async getToken(options: GetTokenOptions = {}): Promise<AccessToken> {
    const internalOptions: MixedRealityStsRestClientGetTokenOptionalParams = {
      ...options,
      tokenRequestOptions: {
        clientRequestId: generateCvBase()
      }
    };

    const { span, updatedOptions } = createSpan("MixedRealityStsClient-GetToken", internalOptions);

    try {
      const tokenResponse = await this.restClient.getToken(this.accountId, updatedOptions);

      return mapToAccessToken(tokenResponse);
    } catch (e) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });

      throw e;
    } finally {
      span.end();
    }
  }
}

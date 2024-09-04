// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import {
  GetTokenOptionalParams,
  MixedRealityStsRestClient,
  MixedRealityStsRestClientOptionalParams,
} from "./generated";
import { GetTokenOptions, MixedRealityStsClientOptions } from "./models/options";
import { InternalClientPipelineOptions } from "@azure/core-client";
import { MixedRealityAccountKeyCredential } from "./models/auth";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { constructAuthenticationEndpointFromDomain } from "./util/authenticationEndpoint";
import { generateCvBase } from "./util/cv";
import { logger } from "./logger";
import { mapToAccessToken } from "./models/mappers";
import { tracingClient } from "./generated/tracing";

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
    options?: MixedRealityStsClientOptions,
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
    options?: MixedRealityStsClientOptions,
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
    options: MixedRealityStsClientOptions = {},
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

    const internalClientPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
          // This array contains header names we want to log that are not already
          // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
          additionalAllowedHeaderNames: ["X-MRC-CV", "MS-CV"],
        },
      },
    };

    let tokenCredential: TokenCredential;

    if (credential instanceof AzureKeyCredential) {
      tokenCredential = new MixedRealityAccountKeyCredential(this.accountId, credential);
    } else {
      tokenCredential = credential;
    }

    const clientOptions: MixedRealityStsRestClientOptionalParams = {
      ...internalClientPipelineOptions,
      endpoint: this.endpointUrl,
    };

    this.restClient = new MixedRealityStsRestClient(clientOptions);

    const authPolicy = bearerTokenAuthenticationPolicy({
      credential: tokenCredential,
      scopes: `${this.endpointUrl}/.default`,
    });

    this.restClient.pipeline.addPolicy(authPolicy);
  }

  /**
   * Retrieve a token from the STS service.
   * @param options - Operation options.
   */
  public async getToken(options: GetTokenOptions = {}): Promise<AccessToken> {
    const internalOptions: GetTokenOptionalParams = {
      ...options,
      tokenRequestOptions: {
        clientRequestId: generateCvBase(),
      },
    };

    return tracingClient.withSpan(
      "MixedRealityStsClient-GetToken",
      internalOptions,
      async (updatedOptions) => {
        const tokenResponse = await this.restClient.getToken(this.accountId, updatedOptions);

        return mapToAccessToken(tokenResponse);
      },
    );
  }
}

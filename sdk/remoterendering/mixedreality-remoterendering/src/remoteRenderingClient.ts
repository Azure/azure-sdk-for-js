// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TokenCredential,
  OperationOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";

import { AccessToken, AzureKeyCredential } from "@azure/core-auth";

import { RemoteRenderingRestClient } from "./generated";
import { AssetConversionOptions, RemoteRenderingCreateConversionResponse, RemoteRenderingRestClientOptionalParams } from "./generated/models/index";

// TODO: Maybe copy and paste this?
import { constructAuthenticationEndpointFromDomain } from "../../../mixedreality/mixedreality-authentication/src/util/authenticationEndpoint";
import { RemoteRenderingClientOptions } from "./options";
import { MixedRealityTokenCredential } from "../authentication/mixedRealityTokenCredential";
import { StaticAccessTokenCredential } from "../authentication/staticAccessTokenCredential";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";

import { PollerLike } from "@azure/core-lro";


import { MixedRealityAccountKeyCredential } from "../authentication/mixedRealityAccountKeyCredential";

import { AssetConversion } from "./generated/models/index";
import { RemoteRendering } from "./generated/operations";
import { AssetConversionPoller, AssetConversionOperationState } from "./lro/assetConversionPoller";

/**
 * The client class used to interact with the App Configuration service.
 */
export class RemoteRenderingClient {
  private client: RemoteRenderingRestClient;
  private operations: RemoteRendering;

  /**
   * Creates an instance of a MixedRealityStsClient.
   * @param accountId The Mixed Reality service account identifier.
   * @param accountDomain The Mixed Reality service account domain.
   * @param keyCredential The Mixed Reality service account primary or secondary key credential.
   * @param options Additional client options.
   */
  constructor(
    endpoint: string,
    accountId: string,
    accountDomain: string,
    credential: AzureKeyCredential,
    options: RemoteRenderingClientOptions
  );

  /**
   * Creates an instance of a MixedRealityStsClient.
   * @param accountId The Mixed Reality service account identifier.
   * @param accountDomain The Mixed Reality service account domain.
   * @param keyCredential The Mixed Reality service account primary or secondary key credential.
   * @param options Additional client options.
   */
  constructor(
    endpoint: string,
    accountId: string,
    accountDomain: string,
    credential: TokenCredential,
    options: RemoteRenderingClientOptions
  );

  /**
   * Creates an instance of a MixedRealityStsClient.
   * @param accountId The Mixed Reality service account identifier.
   * @param accountDomain The Mixed Reality service account domain.
   * @param keyCredential The Mixed Reality service account primary or secondary key credential.
   * @param options Additional client options.
   */
  constructor(
    endpoint: string,
    accountId: string,
    accountDomain: string,
    credential: TokenCredential | AzureKeyCredential | AccessToken,
    options: RemoteRenderingClientOptions = {}
  ) {
    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-mixedreality-authentication/${SDK_VERSION}`;

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

    const tokenCredential: TokenCredential = (credential as AzureKeyCredential)
      ? new MixedRealityAccountKeyCredential(accountId, credential as AzureKeyCredential)
      : (credential as AccessToken)
      ? new StaticAccessTokenCredential(credential as AccessToken)
      : (credential as TokenCredential);

    const authenticationEndpoint =
      options.authenticationEndpointUrl ?? constructAuthenticationEndpointFromDomain(accountDomain);

    const mrTokenCredential: TokenCredential = MixedRealityTokenCredential.getMixedRealityCredential(
      accountId,
      authenticationEndpoint,
      tokenCredential,
      { customEndpointUrl: authenticationEndpoint }
    );

    const authPolicy = bearerTokenAuthenticationPolicy(mrTokenCredential, `${endpoint}/.default`);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    const clientOptions: RemoteRenderingRestClientOptionalParams = {
      ...internalPipelineOptions,
      ...pipeline,
      endpoint: endpoint
    };

    this.client = new RemoteRenderingRestClient(endpoint, clientOptions);
    this.operations = new RemoteRendering(this.client);
  }

  public async beginConversion(
    accountId: string,
    conversionId: string,
    conversionOptions: AssetConversionOptions,
    options?: OperationOptions
  ): Promise<PollerLike<AssetConversionOperationState, AssetConversion>> {
    let assetConversion : RemoteRenderingCreateConversionResponse = await this.operations.createConversion(accountId, conversionId, { settings : conversionOptions }, options);
    
    let poller = new AssetConversionPoller(this, accountId, assetConversion);

    await poller.poll();
    return poller;
  }

  /**
   * Gets the status of a particular conversion.
   * @param accountId The Azure Remote Rendering account ID.
   * @param conversionId An ID uniquely identifying the conversion for the given account. The ID is case
   *                     sensitive, can contain any combination of alphanumeric characters including hyphens and underscores,
   *                     and cannot contain more than 256 characters.
   * @param options The options parameters.
   */
  public async getConversion(
    accountId: string,
    conversionId: string,
    options?: OperationOptions
  ): Promise<AssetConversion> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-GetConversion", {
      conversionId: conversionId,
      ...options
    });

    try {
      let result = await this.operations.getConversion(accountId, conversionId, updatedOptions);

      // TODO Presumably, this may not carry a conversion object.
      return Promise.resolve(result);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

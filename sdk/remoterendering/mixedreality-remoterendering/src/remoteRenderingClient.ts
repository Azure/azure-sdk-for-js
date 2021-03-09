// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO:
// * Work out how options should be passed to functions.
// * Work out how responses are normally obtained
// * Should there be a synchronous version of the API?
// * Generate the artifact (a doc model file: https://api-extractor.com/pages/setup/generating_docs/)
// * Upload to apiview

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
import {
  AssetConversion,
  AssetConversionOptions,
  RemoteRenderingCreateConversionResponse,
  RemoteRenderingRestClientOptionalParams,
  RenderingSession,
  RenderingSessionOptions,
  RemoteRenderingCreateSessionResponse,
  UpdateSessionOptions
} from "./generated/models/index";

// TODO: Maybe copy and paste this?
import { constructAuthenticationEndpointFromDomain } from "../../../mixedreality/mixedreality-authentication/src/util/authenticationEndpoint";
import { RemoteRenderingClientOptions } from "./options";
import { MixedRealityTokenCredential } from "../authentication/mixedRealityTokenCredential";
import { StaticAccessTokenCredential } from "../authentication/staticAccessTokenCredential";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";

import { PollerLike } from "@azure/core-lro";
//import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

import { MixedRealityAccountKeyCredential } from "../authentication/mixedRealityAccountKeyCredential";

import { RemoteRendering } from "./generated/operations";
import { AssetConversionPoller, AssetConversionOperationState } from "./lro/assetConversionPoller";
import {
  RenderingSessionPoller,
  RenderingSessionOperationState
} from "./lro/renderingSessionPoller";

export {
  AssetConversionOperationState,
  AssetConversion,
  RenderingSessionPoller,
  RenderingSessionOperationState
};

export type AssetConversionPollerLike = PollerLike<AssetConversionOperationState, AssetConversion>;
export type RenderingSessionPollerLike = PollerLike<
  RenderingSessionOperationState,
  RenderingSession
>;

/**
 * The client class used to interact with the App Configuration service.
 */
export class RemoteRenderingClient {
  private accountId: string;
  private client: RemoteRenderingRestClient;
  private operations: RemoteRendering;

  /**
   * Creates an instance of a RemoteRenderingClient.
   * @param accountId The Remote Rendering service account identifier.
   * @param accountDomain The Remote Rendering service account domain.
   * @param keyCredential The Remote Rendering service account primary or secondary key credential.
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
   * Creates an instance of a RemoteRenderingClient.
   * @param accountId The Remote Rendering service account identifier.
   * @param accountDomain The Remote Rendering service account domain.
   * @param credential A token credential obtained from the Mixed Reality STS service.
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
   * @param accountId The Remote Rendering service account identifier.
   * @param accountDomain The Remote Rendering service account domain.
   * @param credential A token credential suitable for use with the Mixed Reality STS service.
   * @param options Additional client options.
   */
  constructor(
    endpoint: string,
    accountId: string,
    accountDomain: string,
    credential: TokenCredential | AzureKeyCredential | AccessToken,
    options: RemoteRenderingClientOptions = {}
  ) {
    this.accountId = accountId;

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

  /**
   * Creates a conversion using an asset stored in an Azure Blob Storage account.
   * @param conversionId An ID uniquely identifying the conversion for the given account. The ID is case
   *                     sensitive, can contain any combination of alphanumeric characters including hyphens and underscores,
   *                     and cannot contain more than 256 characters.
   * @param conversionOptions Settings configuring the asset conversion.
   * @param options The options parameters.
   */
  public async beginConversion(
    conversionId: string,
    conversionOptions: AssetConversionOptions,
    options?: OperationOptions
  ): Promise<AssetConversionPollerLike> {
    let assetConversion: RemoteRenderingCreateConversionResponse = await this.operations.createConversion(
      this.accountId,
      conversionId,
      { settings: conversionOptions },
      options
    );

    let poller = new AssetConversionPoller(this, assetConversion);

    await poller.poll();
    return poller;
  }

  /**
   * Gets the status of a particular conversion.
   * @param conversionId An ID uniquely identifying the conversion for the given account. The ID is case
   *                     sensitive, can contain any combination of alphanumeric characters including hyphens and underscores,
   *                     and cannot contain more than 256 characters.
   * @param options The options parameters.
   */
  public async getConversion(
    conversionId: string,
    options?: OperationOptions
  ): Promise<AssetConversion> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-GetConversion", {
      conversionId: conversionId,
      ...options
    });

    try {
      let result = await this.operations.getConversion(
        this.accountId,
        conversionId,
        updatedOptions
      );

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

  /**
   * Gets a list of all conversions.
   * @param options The options parameters.
   */
  public listConversions(options?: OperationOptions): PagedAsyncIterableIterator<AssetConversion> {
    throw new Error("Not yet implemented.");
  }

  /**
   * Creates a new rendering session.
   * @param sessionId An ID uniquely identifying the rendering session for the given account. The ID is
   *                  case sensitive, can contain any combination of alphanumeric characters including hyphens and
   *                  underscores, and cannot contain more than 256 characters.
   * @param renderingSessionOptions Settings of the session to be created.
   * @param options The options parameters.
   */
  public async beginSession(
    sessionId: string,
    renderingSessionOptions: RenderingSessionOptions,
    options?: OperationOptions
  ): Promise<RenderingSessionPollerLike> {
    let renderingSession: RemoteRenderingCreateSessionResponse = await this.operations.createSession(
      this.accountId,
      sessionId,
      renderingSessionOptions,
      options
    );

    let poller = new RenderingSessionPoller(this, renderingSession);

    await poller.poll();
    return poller;
  }

  /**
   * Gets the status of a particular conversion.
   * @param conversionId An ID uniquely identifying the conversion for the given account. The ID is case
   *                     sensitive, can contain any combination of alphanumeric characters including hyphens and underscores,
   *                     and cannot contain more than 256 characters.
   * @param options The options parameters.
   */
  public async getSession(
    sessionId: string,
    options?: OperationOptions
  ): Promise<RenderingSession> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-GetSession", {
      sessionId,
      ...options
    });

    try {
      let result = await this.operations.getSession(this.accountId, sessionId, updatedOptions);

      // TODO Presumably, this may not carry a session object.
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

  /**
   * Updates the max lease time of a particular rendering session.
   * @param sessionId An ID uniquely identifying the rendering session for the given account. The ID is
   *                  case sensitive, can contain any combination of alphanumeric characters including hyphens and
   *                  underscores, and cannot contain more than 256 characters.
   * @param updateOptions Settings used to update the session.
   * @param options The options parameters.
   */
  updateSession(
    sessionId: string,
    updateOptions: UpdateSessionOptions,
    options?: OperationOptions
  ): Promise<RenderingSession> {
    throw new Error("Not yet implemented.");
  }

  /**
   * Stops a particular rendering session.
   * @param sessionId An ID uniquely identifying the rendering session for the given account. The ID is
   *                  case sensitive, can contain any combination of alphanumeric characters including hyphens and
   *                  underscores, and cannot contain more than 256 characters.
   * @param options The options parameters.
   */
  endSession(sessionId: string, options?: OperationOptions): Promise<void> {
    throw new Error("Not yet implemented.");
  }

  /**
   * Gets a list of all sessions.
   * @param options The options parameters.
   */
  public listSessions(options?: OperationOptions): PagedAsyncIterableIterator<RenderingSession> {
    throw new Error("Not yet implemented.");
  }
}

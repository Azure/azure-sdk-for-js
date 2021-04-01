// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO:
// * Work out how responses are normally obtained
// * Should there be a synchronous version of the API?
// * Generate the artifact (a doc model file: https://api-extractor.com/pages/setup/generating_docs/)
// * Upload to apiview

import {
  TokenCredential,
  OperationOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions,
  HttpResponse
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";

import { AccessToken, AzureKeyCredential } from "@azure/core-auth";

import { RemoteRenderingRestClient } from "./generated";
import {
  AssetConversion,
  AssetConversionSettings,
  RemoteRenderingRestClientOptionalParams,
  RemoteRenderingCreateConversionResponse,
  RenderingSession,
  RenderingSessionSettings,
  RemoteRenderingCreateSessionResponse,
  UpdateSessionSettings
} from "./generated/models/index";

import { constructAuthenticationEndpointFromDomain } from "../authentication/authenticationEndpoint";
import { RemoteRenderingClientOptions } from "./options";
import { MixedRealityTokenCredential } from "../authentication/mixedRealityTokenCredential";
import { StaticAccessTokenCredential } from "../authentication/staticAccessTokenCredential";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";

import { PollerLike } from "@azure/core-lro";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

import { MixedRealityAccountKeyCredential } from "../authentication/mixedRealityAccountKeyCredential";

import { RemoteRendering } from "./generated/operations";
import { AssetConversionPoller, AssetConversionOperationState } from "./lro/assetConversionPoller";
import {
  RenderingSessionPoller,
  RenderingSessionOperationStateImpl
} from "./lro/renderingSessionPoller";

export {
  AssetConversionOperationState,
  AssetConversion,
  AssetConversionSettings,
  RenderingSession,
  RenderingSessionSettings,
  RenderingSessionOperationStateImpl as RenderingSessionOperationState,
  UpdateSessionSettings,
  RemoteRenderingClientOptions
};

import {
  AssetConversionInputSettings,
  AssetConversionOutputSettings,
  RemoteRenderingServiceError,
  AssetConversionOutput,
  AssetConversionStatus,
  KnownAssetConversionStatus,
  KnownRenderingSessionStatus,
  RenderingServerSize,
  KnownRenderingServerSize
} from "./generated/models/index";

export {
  AssetConversionInputSettings,
  AssetConversionOutputSettings,
  AssetConversionOutput,
  AssetConversionStatus,
  RemoteRenderingServiceError,
  KnownAssetConversionStatus,
  KnownRenderingSessionStatus,
  RenderingServerSize,
  KnownRenderingServerSize
};

export type AssetConversionPollerLike = PollerLike<
  AssetConversionOperationState,
  WithResponse<AssetConversion>
>;
export type RenderingSessionPollerLike = PollerLike<
  RenderingSessionOperationStateImpl,
  WithResponse<RenderingSession>
>;

/**
 * Represents the returned response of the operation along with the raw response.
 */
export type WithResponse<T extends object> = T & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse;
};

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
    options?: RemoteRenderingClientOptions
  );

  /**
   * Creates an instance of a RemoteRenderingClient.
   * @param accountId The Remote Rendering service account identifier.
   * @param accountDomain The Remote Rendering service account domain.
   * @param credential A token credential for authenticating the account with the Mixed Reality STS service.
   * @param options Additional client options.
   */
  constructor(
    endpoint: string,
    accountId: string,
    accountDomain: string,
    credential: TokenCredential,
    options?: RemoteRenderingClientOptions
  );

  /**
   * Creates an instance of a RemoteRenderingClient.
   * @param accountId The Remote Rendering service account identifier.
   * @param accountDomain The Remote Rendering service account domain.
   * @param credential An access token obtained from the Mixed Reality STS service.
   * @param options Additional client options.
   */
  constructor(
    endpoint: string,
    accountId: string,
    accountDomain: string,
    credential: AccessToken,
    options?: RemoteRenderingClientOptions
  );

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
   * @param assetConversionSettings Settings configuring the asset conversion.
   * @param options The options parameters.
   */
  public async beginConversion(
    conversionId: string,
    assetConversionSettings: AssetConversionSettings,
    options?: OperationOptions
  ): Promise<AssetConversionPollerLike> {
    let assetConversion: RemoteRenderingCreateConversionResponse = await this.operations.createConversion(
      this.accountId,
      conversionId,
      { settings: assetConversionSettings },
      options
    );

    let poller = new AssetConversionPoller(this, assetConversion);

    await poller.poll();
    return poller;
  }

  /**
   * Gets the status of a particular conversion.
   * @param conversionId The ID of a previously created conversion.
   * @param options The options parameters.
   */
  public async getConversion(
    conversionId: string,
    options?: OperationOptions
  ): Promise<WithResponse<AssetConversion>> {
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns a poller for a pre-existing conversion by conversionId
   * @param conversionId The ID of a previously created conversion.
   * @param options The options parameters.
   */
  public async getConversionPoller(
    conversionId: string,
    options?: OperationOptions
  ): Promise<AssetConversionPollerLike> {
    conversionId = conversionId;
    options = options;
    throw new Error("Not yet implemented.");
  }

  /**
   * Gets a list of all conversions.
   * @param options The options parameters.
   */
  public listConversions(options?: OperationOptions): PagedAsyncIterableIterator<AssetConversion> {
    options = options;
    throw new Error("Not yet implemented.");
  }

  /**
   * Creates a new rendering session.
   * @param sessionId An ID uniquely identifying the rendering session for the given account. The ID is
   *                  case sensitive, can contain any combination of alphanumeric characters including hyphens and
   *                  underscores, and cannot contain more than 256 characters.
   * @param renderingSessionSettings Settings of the session to be created.
   * @param options The options parameters.
   */
  public async beginSession(
    sessionId: string,
    renderingSessionSettings: RenderingSessionSettings,
    options?: OperationOptions
  ): Promise<RenderingSessionPollerLike> {
    let renderingSession: RemoteRenderingCreateSessionResponse = await this.operations.createSession(
      this.accountId,
      sessionId,
      renderingSessionSettings,
      options
    );

    let poller = new RenderingSessionPoller(this, renderingSession);

    await poller.poll();
    return poller;
  }

  /**
   * Gets the status of a particular session.
   * @param conversionId An ID uniquely identifying the conversion for the given account. The ID is case
   *                     sensitive, can contain any combination of alphanumeric characters including hyphens and underscores,
   *                     and cannot contain more than 256 characters.
   * @param options The options parameters.
   */
  public async getSession(
    sessionId: string,
    options?: OperationOptions
  ): Promise<WithResponse<RenderingSession>> {
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns a poller for a pre-existing session by sessionId.
   * @param sessionId The ID of a previously created session.
   * @param options The options parameters.
   */
  public async getSessionPoller(
    sessionId: string,
    options?: OperationOptions
  ): Promise<AssetConversionPollerLike> {
    sessionId = sessionId;
    options = options;
    throw new Error("Not yet implemented.");
  }

  /**
   * Updates the max lease time of a particular rendering session.
   * @param sessionId An ID uniquely identifying the rendering session for the given account. The ID is
   *                  case sensitive, can contain any combination of alphanumeric characters including hyphens and
   *                  underscores, and cannot contain more than 256 characters.
   * @param updateSessionSettings Settings used to update the session.
   * @param options The options parameters.
   */
  public async updateSession(
    sessionId: string,
    updateSessionSettings: UpdateSessionSettings,
    options?: OperationOptions
  ): Promise<WithResponse<RenderingSession>> {
    sessionId = sessionId;
    updateSessionSettings = updateSessionSettings;
    options = options;
    throw new Error("Not yet implemented.");
  }

  /**
   * Stops a particular rendering session.
   * @param sessionId An ID uniquely identifying the rendering session for the given account. The ID is
   *                  case sensitive, can contain any combination of alphanumeric characters including hyphens and
   *                  underscores, and cannot contain more than 256 characters.
   * @param options The options parameters.
   */
  public async endSession(
    sessionId: string,
    options?: OperationOptions
  ): Promise<WithResponse<{}>> {
    sessionId = sessionId;
    options = options;
    throw new Error("Not yet implemented.");
  }

  /**
   * Gets a list of all sessions.
   * @param options The options parameters.
   */
  public listSessions(options?: OperationOptions): PagedAsyncIterableIterator<RenderingSession> {
    options = options;
    throw new Error("Not yet implemented.");
  }
}

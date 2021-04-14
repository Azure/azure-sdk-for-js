// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  UpdateSessionSettings,
  RemoteRenderingGetSessionResponse
} from "./generated/models/index";

import { RemoteRenderingClientOptions } from "./options";

import { constructAuthenticationEndpointFromDomain } from "../authentication/authenticationEndpoint";
import { MixedRealityTokenCredential } from "../authentication/mixedRealityTokenCredential";
import { StaticAccessTokenCredential } from "../authentication/staticAccessTokenCredential";
import { MixedRealityAccountKeyCredential } from "../authentication/mixedRealityAccountKeyCredential";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";

import { PollerLike } from "@azure/core-lro";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

import { RemoteRendering } from "./generated/operations";
import { AssetConversionPoller, AssetConversionOperationState } from "./lro/assetConversionPoller";
import {
  RenderingSessionPoller,
  RenderingSessionOperationState
} from "./lro/renderingSessionPoller";

export {
  AssetConversionOperationState,
  AssetConversion,
  AssetConversionSettings,
  RenderingSession,
  RenderingSessionSettings,
  RenderingSessionOperationState,
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
  RenderingSessionOperationState,
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
    const libInfo = `azsdk-js-mixedreality-remoterendering/${SDK_VERSION}`;

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

    const tokenCredential: TokenCredential =
      credential instanceof AzureKeyCredential
        ? new MixedRealityAccountKeyCredential(accountId, credential as AzureKeyCredential)
        : // TODO Make this more type safe.
        credential.hasOwnProperty("token") !== undefined
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
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-BeginConversion", {
      conversionId: conversionId,
      ...options
    });

    try {
      let assetConversion: RemoteRenderingCreateConversionResponse = await this.operations.createConversion(
        this.accountId,
        conversionId,
        { settings: assetConversionSettings },
        updatedOptions
      );

      let poller = new AssetConversionPoller(this, assetConversion);

      // TODO Do I want this?
      await poller.poll();

      return poller;
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
      return await this.operations.getConversion(
        this.accountId,
        conversionId,
        updatedOptions
      );
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
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-GetConversionPoller", {
      conversionId,
      ...options
    });

    try {
      let assetConversion: RemoteRenderingCreateConversionResponse = await this.operations.getConversion(
        this.accountId,
        conversionId,
        updatedOptions
      );

      return new AssetConversionPoller(this, assetConversion);
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

  private async *getAllConversionsPagingPage(
    options?: OperationOptions
  ): AsyncIterableIterator<AssetConversion[]> {
    let result = await this.operations.listConversions(this.accountId, options);
    yield result.conversions;
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this.operations.listConversionsNext(
        this.accountId,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.conversions;
    }
  }

  private async *getAllConversionsPagingAll(
    options?: OperationOptions
  ): AsyncIterableIterator<AssetConversion> {
    for await (const page of this.getAllConversionsPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of all conversions.
   * @param options The options parameters.
   */
  public listConversions(options?: OperationOptions): PagedAsyncIterableIterator<AssetConversion> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-ListConversion", {
      ...options
    });
    try {
      const iter = this.getAllConversionsPagingAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: () => {
          return this.getAllConversionsPagingPage(updatedOptions);
        }
      };
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
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-BeginSession", {
      conversionId: sessionId,
      ...options
    });

    try {
      let renderingSession: RemoteRenderingCreateSessionResponse = await this.operations.createSession(
        this.accountId,
        sessionId,
        renderingSessionSettings,
        updatedOptions
      );

      let poller = new RenderingSessionPoller(this, renderingSession);

      // Do I want this?
      await poller.poll();

      return poller;
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
      return this.operations.getSession(this.accountId, sessionId, updatedOptions);
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
  ): Promise<RenderingSessionPollerLike> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-GetSessionPoller", {
      sessionId,
      ...options
    });

    try {
      let renderingSession: RemoteRenderingGetSessionResponse = await this.operations.getSession(
        this.accountId,
        sessionId,
        updatedOptions
      );

      return new RenderingSessionPoller(this, renderingSession);
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
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-UpdateSession", {
      conversionId: sessionId,
      ...options
    });

    try {
      return this.operations.updateSession(this.accountId, sessionId, updateSessionSettings, updatedOptions);
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
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-EndSession", {
      conversionId: sessionId,
      ...options
    });

    try {
      return this.operations.stopSession(this.accountId, sessionId, updatedOptions);
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

  private async *getAllSessionsPagingPage(
    options?: OperationOptions
  ): AsyncIterableIterator<RenderingSession[]> {
    let result = await this.operations.listSessions(this.accountId, options);
    yield result.sessions;
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this.operations.listSessionsNext(this.accountId, continuationToken, options);
      continuationToken = result.nextLink;
      yield result.sessions;
    }
  }

  private async *getAllSessionsPagingAll(
    options?: OperationOptions
  ): AsyncIterableIterator<RenderingSession> {
    for await (const page of this.getAllSessionsPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of all sessions.
   * @param options The options parameters.
   */
  public listSessions(options?: OperationOptions): PagedAsyncIterableIterator<RenderingSession> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-ListConversion", {
      ...options
    });
    try {
      const iter = this.getAllSessionsPagingAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: () => {
          return this.getAllSessionsPagingPage(updatedOptions);
        }
      };
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
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { OperationOptions } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";

import { AccessToken, AzureKeyCredential, TokenCredential } from "@azure/core-auth";

import { RemoteRenderingRestClient } from "./generated";
import {
  AssetConversionSettings,
  RemoteRenderingRestClientOptionalParams,
  RemoteRenderingCreateConversionResponse,
  RenderingSessionSettings,
  RemoteRenderingCreateSessionResponse,
  UpdateSessionSettings
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
import {
  AssetConversionPoller,
  AssetConversionOperationState,
  AssetConversionPollerOptions
} from "./lro/assetConversionPoller";
import {
  RenderingSessionPoller,
  RenderingSessionOperationState,
  RenderingSessionPollerOptions
} from "./lro/renderingSessionPoller";

import {
  endSessionInternal,
  getConversionInternal,
  getSessionInternal
} from "./internal/commonQueries";

import { AssetConversion, assetConversionFromConversion } from "./internal/assetConversion";
import { RenderingSession, renderingSessionFromSessionProperties } from "./internal/renderingSession";

export {
  AssetConversion,
  AssetConversionOperationState,
  AssetConversionSettings,
  RenderingSession,
  RenderingSessionSettings,
  RenderingSessionOperationState,
  UpdateSessionSettings,
  RemoteRenderingClientOptions,
  AssetConversionPollerOptions,
  RenderingSessionPollerOptions
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

export type AssetConversionPollerLike = PollerLike<AssetConversionOperationState, AssetConversion>;

export type AssetConversionOptions = AssetConversionPollerOptions & OperationOptions;
export type RenderingSessionOptions = RenderingSessionPollerOptions & OperationOptions;

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
    if (!endpoint) {
      throw new Error("Argument cannot be null or empty: 'endpoint'.");
    }

    if (!accountId) {
      throw new Error("Argument cannot be null or empty: 'accountId'.");
    }

    if (!accountDomain) {
      throw new Error("Argument cannot be null or empty: 'accountDomain'.");
    }

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
          additionalAllowedHeaderNames: ["X-MRC-CV", "MS-CV"]
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

    const clientOptions: RemoteRenderingRestClientOptionalParams = {
      ...internalPipelineOptions,
      endpoint: endpoint,
      credential: mrTokenCredential,
      credentialScopes: `${endpoint}/.default`
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
    options: AssetConversionOptions = {}
  ): Promise<AssetConversionPollerLike> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-BeginConversion", {
      conversionId: conversionId,
      ...options
    });

    try {
      let conversion: RemoteRenderingCreateConversionResponse = await this.operations.createConversion(
        this.accountId,
        conversionId,
        { settings: assetConversionSettings },
        updatedOptions
      );

      let poller = new AssetConversionPoller(
        this.accountId,
        this.operations,
        assetConversionFromConversion(conversion),
        options
      );

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
  ): Promise<AssetConversion> {
    return getConversionInternal(
      this.accountId,
      this.operations,
      conversionId,
      "RemoteRenderingClient-GetConversion",
      options
    );
  }

  /**
   * Returns a poller for a pre-existing conversion by conversionId
   * @param conversionId The ID of a previously created conversion.
   * @param options The options parameters.
   */
  public async getConversionPoller(
    conversionId: string,
    options: AssetConversionOptions = {}
  ): Promise<AssetConversionPollerLike> {
    let assetConversion: AssetConversion = await getConversionInternal(
      this.accountId,
      this.operations,
      conversionId,
      "RemoteRenderingClient-GetConversionPoller",
      options
    );

    return new AssetConversionPoller(this.accountId, this.operations, assetConversion, options);
  }

  private async *getAllConversionsPagingPage(
    options?: OperationOptions
  ): AsyncIterableIterator<AssetConversion[]> {
    let result = await this.operations.listConversions(this.accountId, options);
    let assetConversionResult = Array.from(result.conversions).map(assetConversionFromConversion);
    yield assetConversionResult;
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this.operations.listConversionsNext(
        this.accountId,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      assetConversionResult = Array.from(result.conversions).map(assetConversionFromConversion);
      yield assetConversionResult;
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
    options: RenderingSessionOptions = {}
  ): Promise<RenderingSessionPollerLike> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-BeginSession", {
      conversionId: sessionId,
      ...options
    });

    try {
      let sessionProperties: RemoteRenderingCreateSessionResponse = await this.operations.createSession(
        this.accountId,
        sessionId,
        renderingSessionSettings,
        updatedOptions
      );

      let poller = new RenderingSessionPoller(
        this.accountId,
        this.operations,
        renderingSessionFromSessionProperties(sessionProperties),
        options
      );

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
  ): Promise<RenderingSession> {
    return getSessionInternal(
      this.accountId,
      this.operations,
      sessionId,
      "RemoteRenderingClient-GetSession",
      options
    );
  }

  /**
   * Returns a poller for a pre-existing session by sessionId.
   * @param sessionId The ID of a previously created session.
   * @param options The options parameters.
   */
  public async getSessionPoller(
    sessionId: string,
    options: RenderingSessionOptions = {}
  ): Promise<RenderingSessionPollerLike> {
    let renderingSession: RenderingSession = await getSessionInternal(
      this.accountId,
      this.operations,
      sessionId,
      "RemoteRenderingClient-GetSessionPoller",
      options
    );
    return new RenderingSessionPoller(this.accountId, this.operations, renderingSession, options);
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
  ): Promise<RenderingSession> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-UpdateSession", {
      conversionId: sessionId,
      ...options
    });

    try {
      let sessionProperties = await this.operations.updateSession(
        this.accountId,
        sessionId,
        updateSessionSettings,
        updatedOptions
      );
      return renderingSessionFromSessionProperties(sessionProperties);
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
  public async endSession(sessionId: string, options?: OperationOptions): Promise<void> {
    return endSessionInternal(
      this.accountId,
      this.operations,
      sessionId,
      "RemoteRenderingClient-EndSession",
      options
    );
  }

  private async *getAllSessionsPagingPage(
    options?: OperationOptions
  ): AsyncIterableIterator<RenderingSession[]> {
    let result = await this.operations.listSessions(this.accountId, options);
    let sessions = Array.from(result.sessions).map(renderingSessionFromSessionProperties);
    yield sessions;
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this.operations.listSessionsNext(this.accountId, continuationToken, options);
      continuationToken = result.nextLink;
      sessions = Array.from(result.sessions).map(renderingSessionFromSessionProperties);
      yield sessions;
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

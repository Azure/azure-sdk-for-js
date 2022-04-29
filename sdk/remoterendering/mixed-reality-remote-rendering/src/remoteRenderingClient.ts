// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { OperationOptions } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";

import {
  AccessToken,
  AzureKeyCredential,
  isTokenCredential,
  TokenCredential,
} from "@azure/core-auth";

import { RemoteRenderingRestClient } from "./generated";
import {
  AssetConversionSettings,
  RemoteRenderingRestClientOptionalParams,
  RemoteRenderingCreateConversionResponse,
  RenderingSessionSettings,
  RemoteRenderingCreateSessionResponse,
  UpdateSessionSettings,
} from "./generated/models/index";

import { RemoteRenderingClientOptions } from "./options";

import { constructAuthenticationEndpointFromDomain } from "./authentication/authenticationEndpoint";
import { MixedRealityTokenCredential } from "./authentication/mixedRealityTokenCredential";
import { StaticAccessTokenCredential } from "./authentication/staticAccessTokenCredential";
import { MixedRealityAccountKeyCredential } from "./authentication/mixedRealityAccountKeyCredential";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";

import { PollerLike } from "@azure/core-lro";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

import { RemoteRenderingImpl } from "./generated/operations";
import {
  AssetConversionPoller,
  AssetConversionOperationState,
  AssetConversionPollerOptions,
} from "./lro/assetConversionPoller";
import {
  RenderingSessionPoller,
  RenderingSessionOperationState,
  RenderingSessionPollerOptions,
} from "./lro/renderingSessionPoller";

import {
  endSessionInternal,
  getConversionInternal,
  getSessionInternal,
} from "./internal/commonQueries";

import {
  AssetConversion,
  AssetConversionBase,
  NonStartedAssetConversion,
  RunningAssetConversion,
  SucceededAssetConversion,
  FailedAssetConversion,
  CancelledAssetConversion,
  assetConversionFromConversion,
} from "./internal/assetConversion";
import {
  RenderingSession,
  RenderingSessionBase,
  RenderingSessionProperties,
  PartialRenderingSessionProperties,
  ReadyRenderingSession,
  ErrorRenderingSession,
  StartingRenderingSession,
  ExpiredRenderingSession,
  StoppedRenderingSession,
  renderingSessionFromSessionProperties,
} from "./internal/renderingSession";

export {
  AssetConversion,
  AssetConversionBase,
  NonStartedAssetConversion,
  RunningAssetConversion,
  SucceededAssetConversion,
  FailedAssetConversion,
  CancelledAssetConversion,
  AssetConversionOperationState,
  AssetConversionSettings,
  RenderingSession,
  RenderingSessionSettings,
  RenderingSessionOperationState,
  RenderingSessionBase,
  RenderingSessionProperties,
  PartialRenderingSessionProperties,
  ReadyRenderingSession,
  ErrorRenderingSession,
  StartingRenderingSession,
  ExpiredRenderingSession,
  StoppedRenderingSession,
  UpdateSessionSettings,
  RemoteRenderingClientOptions,
  AssetConversionPollerOptions,
  RenderingSessionPollerOptions,
};

import {
  AssetConversionInputSettings,
  AssetConversionOutputSettings,
  AssetConversionOutput,
  AssetConversionStatus,
  KnownAssetConversionStatus,
  KnownRenderingSessionStatus,
  RenderingServerSize,
  KnownRenderingServerSize,
} from "./generated/models/index";

import { RemoteRenderingServiceError } from "./remoteRenderingServiceError";

export {
  AssetConversionInputSettings,
  AssetConversionOutputSettings,
  AssetConversionOutput,
  AssetConversionStatus,
  RemoteRenderingServiceError,
  KnownAssetConversionStatus,
  KnownRenderingSessionStatus,
  RenderingServerSize,
  KnownRenderingServerSize,
};

/** The poller returned by the beginConversion operation. */
export type AssetConversionPollerLike = PollerLike<AssetConversionOperationState, AssetConversion>;

/** Options to configure the beginConversion operation. */
export type BeginConversionOptions = AssetConversionPollerOptions & OperationOptions;

/** Options for resuming a pre-existing conversion operation. */
export type ResumeBeginConversionOptions = BeginConversionOptions & { resumeFrom: string };

/** Options to configure the beginSession operation. */
export type BeginSessionOptions = RenderingSessionPollerOptions & OperationOptions;

/** Options for resuming a pre-existing session operation. */
export type ResumeBeginSessionOptions = BeginSessionOptions & { resumeFrom: string };

/** Options to configure the updateSession operation. */
export type UpdateSessionOptions = OperationOptions;

/** Options to configure the getSession operation. */
export type GetSessionOptions = OperationOptions;

/** Options to configure the getConversion operation. */
export type GetConversionOptions = OperationOptions;

/** Options to configure the listConversions operation. */
export type ListConversionsOptions = OperationOptions;

/** Options to configure the endSession operation. */
export type EndSessionOptions = OperationOptions;

/** Options to configure the listSessions operation. */
export type ListSessionsOptions = OperationOptions;

/** The poller returned by the beginSession operation. */
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
  private operations: RemoteRenderingImpl;

  /**
   * Creates an instance of a RemoteRenderingClient.
   * @param endpoint - The RemoteRendering endpoint to use.
   * @param accountId - The Remote Rendering service account identifier.
   * @param accountDomain - The Remote Rendering service account domain.
   * @param keyCredential - The Remote Rendering service account primary or secondary key credential.
   * @param options - Additional client options.
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
   * @param endpoint - The RemoteRendering endpoint to use.
   * @param accountId - The Remote Rendering service account identifier.
   * @param accountDomain - The Remote Rendering service account domain.
   * @param credential - A token credential for authenticating the account with the Mixed Reality STS service.
   * @param options - Additional client options.
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
   * @param endpoint - The RemoteRendering endpoint to use.
   * @param accountId - The Remote Rendering service account identifier.
   * @param accountDomain - The Remote Rendering service account domain.
   * @param credential - An access token obtained from the Mixed Reality STS service.
   * @param options - Additional client options.
   */
  constructor(
    endpoint: string,
    accountId: string,
    credential: AccessToken,
    options?: RemoteRenderingClientOptions
  );

  constructor(endpoint: string, accountId: string, ...args: Array<any>) {
    let tokenCredential: TokenCredential | null = null;
    let options: RemoteRenderingClientOptions = {};

    if (args.length === 0 || args.length > 3) {
      throw new Error("Wrong number of arguments.");
    } else if (!args[0]) {
      throw new Error("Argument 3 cannot be null or empty.");
    } else if (typeof args[0] === "object" && args.length <= 2) {
      tokenCredential = new StaticAccessTokenCredential(args[0] as AccessToken);
      if (args.length === 2) {
        options = args[1];
      }
    } else if (typeof args[0] === "string" && args.length >= 2 && args.length <= 3) {
      const accountDomain: string = args[0];

      let credential: TokenCredential;

      if (args[1] instanceof AzureKeyCredential) {
        credential = new MixedRealityAccountKeyCredential(accountId, args[1]);
      } else if (isTokenCredential(args[1])) {
        credential = args[1];
      } else {
        throw new Error("Argument 4 is not a supported type of credential.");
      }

      const authenticationEndpoint =
        options.authenticationEndpointUrl ??
        constructAuthenticationEndpointFromDomain(accountDomain);
      const stsOptions = { customEndpointUrl: authenticationEndpoint };
      tokenCredential = new MixedRealityTokenCredential(
        accountId,
        accountDomain,
        credential,
        stsOptions
      );
      if (args.length === 3) {
        options = args[2];
      }
    } else {
      throw new Error("Argument 3 is invalid.");
    }

    if (!endpoint) {
      throw new Error("Argument cannot be null or empty: 'endpoint'.");
    }

    if (!accountId) {
      throw new Error("Argument cannot be null or empty: 'accountId'.");
    }

    this.accountId = accountId;

    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-mixed-reality-remote-rendering/${SDK_VERSION}`;

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
      ...options,
      userAgentOptions,
      loggingOptions: {
        logger: logger.info,
        // This array contains header names we want to log that are not already
        // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
        additionalAllowedHeaderNames: ["X-MRC-CV", "MS-CV"],
      },
    };

    const clientOptions: RemoteRenderingRestClientOptionalParams = {
      ...internalPipelineOptions,
      endpoint: endpoint,
      credential: tokenCredential,
      credentialScopes: `${endpoint}/.default`,
    };

    this.client = new RemoteRenderingRestClient(endpoint, clientOptions);
    this.operations = new RemoteRenderingImpl(this.client);
  }

  /**
   * Creates a conversion using an asset stored in an Azure Blob Storage account.
   * @param conversionId - An ID uniquely identifying the conversion for the given account. The ID is case
   *                     sensitive, can contain any combination of alphanumeric characters including hyphens and underscores,
   *                     and cannot contain more than 256 characters.
   * @param assetConversionSettings - Settings configuring the asset conversion.
   * @param options - The options parameters.
   */
  public async beginConversion(
    conversionId: string,
    assetConversionSettings: AssetConversionSettings,
    options?: BeginConversionOptions
  ): Promise<AssetConversionPollerLike>;

  /**
   * Obtains a poller corresponding to a conversion that was already started.
   * @param options - The options parameters, carrying a resumeFrom value.
   */
  public async beginConversion(
    options: ResumeBeginConversionOptions
  ): Promise<AssetConversionPollerLike>;

  public async beginConversion(
    conversionIdOrResumeOptions: string | ResumeBeginConversionOptions,
    assetConversionSettings?: AssetConversionSettings,
    options?: BeginConversionOptions
  ): Promise<AssetConversionPollerLike> {
    let conversionId: string;
    let settings: AssetConversionSettings;
    let operationOptions: BeginConversionOptions;
    if (typeof conversionIdOrResumeOptions === "string") {
      conversionId = conversionIdOrResumeOptions;
      settings = assetConversionSettings!;
      operationOptions = options ?? {};
    } else {
      const assetConversion: AssetConversion = await getConversionInternal(
        this.accountId,
        this.operations,
        conversionIdOrResumeOptions.resumeFrom,
        "RemoteRenderingClient-GetConversionPoller",
        options
      );

      return new AssetConversionPoller(
        this.accountId,
        this.operations,
        assetConversion,
        conversionIdOrResumeOptions
      );
    }

    const { span, updatedOptions } = createSpan("RemoteRenderingClient-BeginConversion", {
      conversionId: conversionId,
      ...options,
    });

    try {
      const conversion: RemoteRenderingCreateConversionResponse =
        await this.operations.createConversion(
          this.accountId,
          conversionId,
          { settings: settings },
          updatedOptions
        );

      const poller = new AssetConversionPoller(
        this.accountId,
        this.operations,
        assetConversionFromConversion(conversion),
        operationOptions
      );

      await poller.poll();

      return poller;
    } catch (e: any) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the status of a particular conversion.
   * @param conversionId - The ID of a previously created conversion.
   * @param options - The options parameters.
   */
  public async getConversion(
    conversionId: string,
    options?: GetConversionOptions
  ): Promise<AssetConversion> {
    return getConversionInternal(
      this.accountId,
      this.operations,
      conversionId,
      "RemoteRenderingClient-GetConversion",
      options
    );
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
   * @param options - The options parameters.
   */
  public listConversions(
    options?: ListConversionsOptions
  ): PagedAsyncIterableIterator<AssetConversion> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-ListConversion", {
      ...options,
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
        },
      };
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new rendering session.
   * @param sessionId - An ID uniquely identifying the rendering session for the given account. The ID is
   *                  case sensitive, can contain any combination of alphanumeric characters including hyphens and
   *                  underscores, and cannot contain more than 256 characters.
   * @param settings - Settings of the session to be created.
   * @param options - The options parameters.
   */
  public async beginSession(
    sessionId: string,
    settings: RenderingSessionSettings,
    options?: BeginSessionOptions
  ): Promise<RenderingSessionPollerLike>;

  /**
   * Obtains a poller for a pre-existing session
   * @param options - The options parameters, carrying a resumeFrom value.
   */
  public async beginSession(
    options: ResumeBeginSessionOptions
  ): Promise<RenderingSessionPollerLike>;

  public async beginSession(
    sessionIdOrResumeOptions: string | ResumeBeginSessionOptions,
    renderingSessionSettings?: RenderingSessionSettings,
    options?: BeginSessionOptions
  ): Promise<RenderingSessionPollerLike> {
    let sessionId: string;
    let settings: RenderingSessionSettings;
    let operationOptions: BeginSessionOptions;
    if (typeof sessionIdOrResumeOptions === "string") {
      sessionId = sessionIdOrResumeOptions;
      settings = renderingSessionSettings!;
      operationOptions = options ?? {};
    } else {
      const renderingSession: RenderingSession = await getSessionInternal(
        this.accountId,
        this.operations,
        sessionIdOrResumeOptions.resumeFrom,
        "RemoteRenderingClient-GetSessionPoller",
        sessionIdOrResumeOptions
      );
      return new RenderingSessionPoller(
        this.accountId,
        this.operations,
        renderingSession,
        sessionIdOrResumeOptions
      );
    }

    const { span, updatedOptions } = createSpan("RemoteRenderingClient-BeginSession", {
      conversionId: sessionId,
      ...operationOptions,
    });

    try {
      const sessionProperties: RemoteRenderingCreateSessionResponse =
        await this.operations.createSession(this.accountId, sessionId, settings, updatedOptions);

      const poller = new RenderingSessionPoller(
        this.accountId,
        this.operations,
        renderingSessionFromSessionProperties(sessionProperties),
        operationOptions
      );

      // Do I want this?
      await poller.poll();

      return poller;
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the status of a particular session.
   * @param sessionId - An ID uniquely identifying the session for the given account. The ID is case
   *                     sensitive, can contain any combination of alphanumeric characters including hyphens and underscores,
   *                     and cannot contain more than 256 characters.
   * @param options - The options parameters.
   */
  public async getSession(
    sessionId: string,
    options?: GetSessionOptions
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
   * Updates the max lease time of a particular rendering session.
   * @param sessionId - An ID uniquely identifying the rendering session for the given account. The ID is
   *                  case sensitive, can contain any combination of alphanumeric characters including hyphens and
   *                  underscores, and cannot contain more than 256 characters.
   * @param updateSessionSettings - Settings used to update the session.
   * @param options - The options parameters.
   */
  public async updateSession(
    sessionId: string,
    settings: UpdateSessionSettings,
    options?: UpdateSessionOptions
  ): Promise<RenderingSession> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-UpdateSession", {
      conversionId: sessionId,
      ...options,
    });

    try {
      const sessionProperties = await this.operations.updateSession(
        this.accountId,
        sessionId,
        settings,
        updatedOptions
      );
      return renderingSessionFromSessionProperties(sessionProperties);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Stops a particular rendering session.
   * @param sessionId - An ID uniquely identifying the rendering session for the given account. The ID is
   *                  case sensitive, can contain any combination of alphanumeric characters including hyphens and
   *                  underscores, and cannot contain more than 256 characters.
   * @param options - The options parameters.
   */
  public async endSession(sessionId: string, options?: EndSessionOptions): Promise<void> {
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
   * @param options - The options parameters.
   */
  public listSessions(options?: ListSessionsOptions): PagedAsyncIterableIterator<RenderingSession> {
    const { span, updatedOptions } = createSpan("RemoteRenderingClient-ListConversion", {
      ...options,
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
        },
      };
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

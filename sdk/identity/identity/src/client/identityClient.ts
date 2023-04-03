// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-common";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { ServiceClient } from "@azure/core-client";
import { isNode } from "@azure/core-util";
import {
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { AuthenticationError, AuthenticationErrorName } from "../errors";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
import { DefaultAuthorityHost, SDK_VERSION } from "../constants";
import { tracingClient } from "../util/tracing";
import { logger } from "../util/logging";
import { TokenCredentialOptions } from "../tokenCredentialOptions";
import {
  TokenResponseParsedBody,
  parseExpirationTimestamp,
  parseRefreshTimestamp,
} from "../credentials/managedIdentityCredential/utils";

const noCorrelationId = "noCorrelationId";

/**
 * An internal type used to communicate details of a token request's
 * response that should not be sent back as part of the access token.
 */
export interface TokenResponse {
  /**
   * The AccessToken to be returned from getToken.
   */
  accessToken: AccessToken;
  /**
   * The time in which the access token should be refreshed,
   * specified in milliseconds, UNIX epoch time
   */
  refreshesIn?: number;
  /**
   * The refresh token if the 'offline_access' scope was used.
   */
  refreshToken?: string;
}

/**
 * @internal
 */
export function getIdentityClientAuthorityHost(options?: TokenCredentialOptions): string {
  // The authorityHost can come from options or from the AZURE_AUTHORITY_HOST environment variable.
  let authorityHost = options?.authorityHost;

  // The AZURE_AUTHORITY_HOST environment variable can only be provided in Node.js.
  if (isNode) {
    authorityHost = authorityHost ?? process.env.AZURE_AUTHORITY_HOST;
  }

  // If the authorityHost is not provided, we use the default one from the public cloud: https://login.microsoftonline.com
  return authorityHost ?? DefaultAuthorityHost;
}

/**
 * The network module used by the Identity credentials.
 *
 * It allows for credentials to abort any pending request independently of the MSAL flow,
 * by calling to the `abortRequests()` method.
 *
 */
export class IdentityClient extends ServiceClient implements INetworkModule {
  public authorityHost: string;
  private allowLoggingAccountIdentifiers?: boolean;
  private abortControllers: Map<string, AbortController[] | undefined>;
  // used for WorkloadIdentity
  private tokenCredentialOptions: TokenCredentialOptions;

  constructor(options?: TokenCredentialOptions) {
    const packageDetails = `azsdk-js-identity/${SDK_VERSION}`;
    const userAgentPrefix = options?.userAgentOptions?.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
      : `${packageDetails}`;

    const baseUri = getIdentityClientAuthorityHost(options);
    if (!baseUri.startsWith("https:")) {
      throw new Error("The authorityHost address must use the 'https' protocol.");
    }

    super({
      requestContentType: "application/json; charset=utf-8",
      retryOptions: {
        maxRetries: 3,
      },
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      baseUri,
    });

    this.authorityHost = baseUri;
    this.abortControllers = new Map();
    this.allowLoggingAccountIdentifiers = options?.loggingOptions?.allowLoggingAccountIdentifiers;
    // used for WorkloadIdentity
    this.tokenCredentialOptions = { ...options };
  }

  async sendTokenRequest(request: PipelineRequest): Promise<TokenResponse | null> {
    logger.info(`IdentityClient: sending token request to [${request.url}]`);
    const response = await this.sendRequest(request);

    if (response.bodyAsText && (response.status === 200 || response.status === 201)) {
      const parsedBody: TokenResponseParsedBody = JSON.parse(response.bodyAsText);

      if (!parsedBody.access_token) {
        return null;
      }

      this.logIdentifiers(response);

      const token = {
        accessToken: {
          token: parsedBody.access_token,
          expiresOnTimestamp: parseExpirationTimestamp(parsedBody),
        },
        refreshesIn: parseRefreshTimestamp(parsedBody),
        refreshToken: parsedBody.refresh_token,
      };

      logger.info(
        `IdentityClient: [${request.url}] token acquired, expires on ${token.accessToken.expiresOnTimestamp}`
      );
      return token;
    } else {
      const error = new AuthenticationError(response.status, response.bodyAsText);
      logger.warning(
        `IdentityClient: authentication error. HTTP status: ${response.status}, ${error.errorResponse.errorDescription}`
      );
      throw error;
    }
  }

  async refreshAccessToken(
    tenantId: string,
    clientId: string,
    scopes: string,
    refreshToken: string | undefined,
    clientSecret: string | undefined,
    options: GetTokenOptions = {}
  ): Promise<TokenResponse | null> {
    if (refreshToken === undefined) {
      return null;
    }
    logger.info(
      `IdentityClient: refreshing access token with client ID: ${clientId}, scopes: ${scopes} started`
    );

    const refreshParams = {
      grant_type: "refresh_token",
      client_id: clientId,
      refresh_token: refreshToken,
      scope: scopes,
    };

    if (clientSecret !== undefined) {
      (refreshParams as any).client_secret = clientSecret;
    }

    const query = new URLSearchParams(refreshParams);

    return tracingClient.withSpan(
      "IdentityClient.refreshAccessToken",
      options,
      async (updatedOptions) => {
        try {
          const urlSuffix = getIdentityTokenEndpointSuffix(tenantId);
          const request = createPipelineRequest({
            url: `${this.authorityHost}/${tenantId}/${urlSuffix}`,
            method: "POST",
            body: query.toString(),
            abortSignal: options.abortSignal,
            headers: createHttpHeaders({
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            }),
            tracingOptions: updatedOptions.tracingOptions,
          });

          const response = await this.sendTokenRequest(request);
          logger.info(`IdentityClient: refreshed token for client ID: ${clientId}`);
          return response;
        } catch (err: any) {
          if (
            err.name === AuthenticationErrorName &&
            err.errorResponse.error === "interaction_required"
          ) {
            // It's likely that the refresh token has expired, so
            // return null so that the credential implementation will
            // initiate the authentication flow again.
            logger.info(`IdentityClient: interaction required for client ID: ${clientId}`);
            return null;
          } else {
            logger.warning(
              `IdentityClient: failed refreshing token for client ID: ${clientId}: ${err}`
            );
            throw err;
          }
        }
      }
    );
  }

  // Here is a custom layer that allows us to abort requests that go through MSAL,
  // since MSAL doesn't allow us to pass options all the way through.

  generateAbortSignal(correlationId: string): AbortSignalLike {
    const controller = new AbortController();
    const controllers = this.abortControllers.get(correlationId) || [];
    controllers.push(controller);
    this.abortControllers.set(correlationId, controllers);
    const existingOnAbort = controller.signal.onabort;
    controller.signal.onabort = (...params) => {
      this.abortControllers.set(correlationId, undefined);
      if (existingOnAbort) {
        existingOnAbort(...params);
      }
    };
    return controller.signal;
  }

  abortRequests(correlationId?: string): void {
    const key = correlationId || noCorrelationId;
    const controllers = [
      ...(this.abortControllers.get(key) || []),
      // MSAL passes no correlation ID to the get requests...
      ...(this.abortControllers.get(noCorrelationId) || []),
    ];
    if (!controllers.length) {
      return;
    }
    for (const controller of controllers) {
      controller.abort();
    }
    this.abortControllers.set(key, undefined);
  }

  getCorrelationId(options?: NetworkRequestOptions): string {
    const parameter = options?.body
      ?.split("&")
      .map((part) => part.split("="))
      .find(([key]) => key === "client-request-id");
    return parameter && parameter.length ? parameter[1] || noCorrelationId : noCorrelationId;
  }

  // The MSAL network module methods follow

  async sendGetRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions
  ): Promise<NetworkResponse<T>> {
    const request = createPipelineRequest({
      url,
      method: "GET",
      body: options?.body,
      headers: createHttpHeaders(options?.headers),
      abortSignal: this.generateAbortSignal(noCorrelationId),
    });

    const response = await this.sendRequest(request);

    this.logIdentifiers(response);

    return {
      body: response.bodyAsText ? JSON.parse(response.bodyAsText) : undefined,
      headers: response.headers.toJSON(),
      status: response.status,
    };
  }

  async sendPostRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions
  ): Promise<NetworkResponse<T>> {
    const request = createPipelineRequest({
      url,
      method: "POST",
      body: options?.body,
      headers: createHttpHeaders(options?.headers),
      // MSAL doesn't send the correlation ID on the get requests.
      abortSignal: this.generateAbortSignal(this.getCorrelationId(options)),
    });

    const response = await this.sendRequest(request);

    this.logIdentifiers(response);

    return {
      body: response.bodyAsText ? JSON.parse(response.bodyAsText) : undefined,
      headers: response.headers.toJSON(),
      status: response.status,
    };
  }

  /**
   *
   * @internal
   */
  getTokenCredentialOptions(): TokenCredentialOptions {
    return this.tokenCredentialOptions;
  }
  /**
   * If allowLoggingAccountIdentifiers was set on the constructor options
   * we try to log the account identifiers by parsing the received access token.
   *
   * The account identifiers we try to log are:
   * - `appid`: The application or Client Identifier.
   * - `upn`: User Principal Name.
   *   - It might not be available in some authentication scenarios.
   *   - If it's not available, we put a placeholder: "No User Principal Name available".
   * - `tid`: Tenant Identifier.
   * - `oid`: Object Identifier of the authenticated user.
   */
  private logIdentifiers(response: PipelineResponse): void {
    if (!this.allowLoggingAccountIdentifiers || !response.bodyAsText) {
      return;
    }
    const unavailableUpn = "No User Principal Name available";
    try {
      const parsed = (response as any).parsedBody || JSON.parse(response.bodyAsText);
      const accessToken = parsed.access_token;
      if (!accessToken) {
        // Without an access token allowLoggingAccountIdentifiers isn't useful.
        return;
      }
      const base64Metadata = accessToken.split(".")[1];
      const { appid, upn, tid, oid } = JSON.parse(
        Buffer.from(base64Metadata, "base64").toString("utf8")
      );

      logger.info(
        `[Authenticated account] Client ID: ${appid}. Tenant ID: ${tid}. User Principal Name: ${
          upn || unavailableUpn
        }. Object ID (user): ${oid}`
      );
    } catch (e: any) {
      logger.warning(
        "allowLoggingAccountIdentifiers was set, but we couldn't log the account information. Error:",
        e.message
      );
    }
  }
}

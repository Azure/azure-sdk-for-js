// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-common";
import { CommonClientOptions, ServiceClient } from "@azure/core-client";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { SpanStatusCode } from "@azure/core-tracing";
import { isNode } from "@azure/core-util";
import {
  createHttpHeaders,
  createPipelineRequest,
  PipelineRequest
} from "@azure/core-rest-pipeline";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { AuthenticationError, AuthenticationErrorName } from "./errors";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
import { DefaultAuthorityHost } from "../constants";
import { createSpan } from "../util/tracing";
import { logger } from "../util/logging";

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
  private abortControllers: Map<string, AbortController[] | undefined>;

  constructor(options?: TokenCredentialOptions) {
    const packageDetails = `azsdk-js-identity/2.0.0-beta.7`;
    const userAgentPrefix = options?.userAgentOptions?.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
      : `${packageDetails}`;

    const baseUri = getIdentityClientAuthorityHost(options);
    if (!baseUri.startsWith("https:")) {
      throw new Error("The authorityHost address must use the 'https' protocol.");
    }

    super({
      requestContentType: "application/json; charset=utf-8",
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      baseUri
    });

    this.authorityHost = baseUri;
    this.abortControllers = new Map();
  }

  async sendTokenRequest(
    request: PipelineRequest,
    expiresOnParser?: (responseBody: any) => number
  ): Promise<TokenResponse | null> {
    logger.info(`IdentityClient: sending token request to [${request.url}]`);
    const response = await this.sendRequest(request);

    expiresOnParser =
      expiresOnParser ||
      ((responseBody: any) => {
        return Date.now() + responseBody.expires_in * 1000;
      });

    if (response.bodyAsText && (response.status === 200 || response.status === 201)) {
      const parsedBody: {
        token?: string;
        access_token?: string;
        refresh_token?: string;
      } = JSON.parse(response.bodyAsText);

      if (!parsedBody.access_token) {
        return null;
      }

      const token = {
        accessToken: {
          token: parsedBody.access_token,
          expiresOnTimestamp: expiresOnParser(parsedBody)
        },
        refreshToken: parsedBody.refresh_token
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
    expiresOnParser?: (responseBody: any) => number,
    options?: GetTokenOptions
  ): Promise<TokenResponse | null> {
    if (refreshToken === undefined) {
      return null;
    }
    logger.info(
      `IdentityClient: refreshing access token with client ID: ${clientId}, scopes: ${scopes} started`
    );

    const { span, updatedOptions } = createSpan("IdentityClient-refreshAccessToken", options);

    const refreshParams = {
      grant_type: "refresh_token",
      client_id: clientId,
      refresh_token: refreshToken,
      scope: scopes
    };

    if (clientSecret !== undefined) {
      (refreshParams as any).client_secret = clientSecret;
    }

    const query = new URLSearchParams(refreshParams);

    try {
      const urlSuffix = getIdentityTokenEndpointSuffix(tenantId);
      const request = createPipelineRequest({
        url: `${this.authorityHost}/${tenantId}/${urlSuffix}`,
        method: "POST",
        body: query.toString(),
        abortSignal: options && options.abortSignal,
        headers: createHttpHeaders({
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }),
        tracingOptions: updatedOptions?.tracingOptions
      });

      const response = await this.sendTokenRequest(request, expiresOnParser);
      logger.info(`IdentityClient: refreshed token for client ID: ${clientId}`);
      return response;
    } catch (err) {
      if (
        err.name === AuthenticationErrorName &&
        err.errorResponse.error === "interaction_required"
      ) {
        // It's likely that the refresh token has expired, so
        // return null so that the credential implementation will
        // initiate the authentication flow again.
        logger.info(`IdentityClient: interaction required for client ID: ${clientId}`);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: err.message
        });

        return null;
      } else {
        logger.warning(
          `IdentityClient: failed refreshing token for client ID: ${clientId}: ${err}`
        );
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: err.message
        });
        throw err;
      }
    } finally {
      span.end();
    }
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
      ...(this.abortControllers.get(noCorrelationId) || [])
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
      abortSignal: this.generateAbortSignal(noCorrelationId)
    });

    const response = await this.sendRequest(request);
    return {
      body: response.bodyAsText ? JSON.parse(response.bodyAsText) : undefined,
      headers: response.headers.toJSON(),
      status: response.status
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
      abortSignal: this.generateAbortSignal(this.getCorrelationId(options))
    });

    const response = await this.sendRequest(request);
    return {
      body: response.bodyAsText ? JSON.parse(response.bodyAsText) : undefined,
      headers: response.headers.toJSON(),
      status: response.status
    };
  }
}

/**
 * Provides options to configure how the Identity library makes authentication
 * requests to Azure Active Directory.
 */
export interface TokenCredentialOptions extends CommonClientOptions {
  /**
   * The authority host to use for authentication requests.
   * Possible values are available through {@link AzureAuthorityHosts}.
   * The default is "https://login.microsoftonline.com".
   */
  authorityHost?: string;
}

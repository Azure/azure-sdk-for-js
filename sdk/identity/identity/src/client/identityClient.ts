// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";
import {
  AccessToken,
  ServiceClient,
  PipelineOptions,
  WebResource,
  RequestPrepareOptions,
  GetTokenOptions,
  createPipelineFromOptions,
  isNode
} from "@azure/core-http";
import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-node";
import { SpanStatusCode } from "@azure/core-tracing";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { AuthenticationError, AuthenticationErrorName } from "./errors";
import { getAuthorityHostEnvironment } from "../util/authHostEnv";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
import { DefaultAuthorityHost } from "../constants";
import { createSpan } from "../util/tracing";
import { logger } from "../util/logging";

const noCorrelationId = "noCorrelationId";

/**
 * An internal type used to communicate details of a token request's
 * response that should not be sent back as part of the access token.
 * @internal
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
 * The network module used by the Identity credentials.
 *
 * It allows for credentials to abort any pending request independently of the MSAL flow,
 * by calling to the `abortRequests()` method.
 *
 * @internal
 */
export class IdentityClient extends ServiceClient implements INetworkModule {
  public authorityHost: string;
  private abortControllers: Map<string, AbortController[] | undefined>;

  constructor(options?: TokenCredentialOptions) {
    if (isNode) {
      options = options || getAuthorityHostEnvironment();
    }
    // Only if the authorityHost is not provided, we use the default one.
    options = {
      authorityHost: DefaultAuthorityHost,
      ...options
    };
    super(
      undefined,
      createPipelineFromOptions({
        ...options,
        deserializationOptions: {
          expectedContentTypes: {
            json: ["application/json", "text/json", "text/plain"]
          }
        }
      })
    );

    this.baseUri = this.authorityHost = options.authorityHost || DefaultAuthorityHost;

    if (!this.baseUri.startsWith("https:")) {
      throw new Error("The authorityHost address must use the 'https' protocol.");
    }

    this.abortControllers = new Map();
  }

  createWebResource(requestOptions: RequestPrepareOptions): WebResource {
    const webResource = new WebResource();
    webResource.prepare(requestOptions);
    return webResource;
  }

  async sendTokenRequest(
    webResource: WebResource,
    expiresOnParser?: (responseBody: any) => number
  ): Promise<TokenResponse | null> {
    logger.info(`IdentityClient: sending token request to [${webResource.url}]`);
    const response = await this.sendRequest(webResource);

    expiresOnParser =
      expiresOnParser ||
      ((responseBody: any) => {
        return Date.now() + responseBody.expires_in * 1000;
      });

    if (response.status === 200 || response.status === 201) {
      const token = {
        accessToken: {
          token: response.parsedBody.access_token,
          expiresOnTimestamp: expiresOnParser(response.parsedBody)
        },
        refreshToken: response.parsedBody.refresh_token
      };

      logger.info(
        `IdentityClient: [${webResource.url}] token acquired, expires on ${token.accessToken.expiresOnTimestamp}`
      );
      return token;
    } else {
      const error = new AuthenticationError(
        response.status,
        response.parsedBody || response.bodyAsText
      );
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

    try {
      const urlSuffix = getIdentityTokenEndpointSuffix(tenantId);
      const webResource = this.createWebResource({
        url: `${this.authorityHost}/${tenantId}/${urlSuffix}`,
        method: "POST",
        disableJsonStringifyOnBody: true,
        deserializationMapper: undefined,
        body: qs.stringify(refreshParams),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        spanOptions: updatedOptions?.tracingOptions?.spanOptions,
        tracingContext: updatedOptions?.tracingOptions?.tracingContext,
        abortSignal: options && options.abortSignal
      });

      const response = await this.sendTokenRequest(webResource, expiresOnParser);
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

  generateAbortSignal(correlationId?: string): AbortSignalLike {
    const controller = new AbortController();
    const key = correlationId || noCorrelationId;

    const controllers = this.abortControllers.get(key) || [];
    controllers.push(controller);
    this.abortControllers.set(key, controllers);

    return controller.signal;
  }

  abortRequests(correlationId: string = noCorrelationId): void {
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
    this.abortControllers.set(noCorrelationId, undefined);
  }

  getCorrelationId(options?: NetworkRequestOptions): string | undefined {
    const parameter = options?.body
      ?.split("&")
      .map((part) => part.split("="))
      .find(([key]) => key === "client-request-id");
    return parameter && parameter.length ? parameter[1] : noCorrelationId;
  }

  // The MSAL network module methods follow

  sendGetRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions
  ): Promise<NetworkResponse<T>> {
    const webResource = new WebResource(
      url,
      "GET",
      options?.body,
      {},
      options?.headers,
      false,
      false,
      // MSAL doesn't send the correlation ID on the get requests.
      this.generateAbortSignal()
    );

    return this.sendRequest(webResource).then((response) => {
      return {
        body: response.parsedBody as T,
        headers: response.headers.rawHeaders(),
        status: response.status
      };
    });
  }

  sendPostRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions
  ): Promise<NetworkResponse<T>> {
    const webResource = new WebResource(
      url,
      "POST",
      options?.body,
      {},
      options?.headers,
      false,
      false,
      // MSAL doesn't send the correlation ID on the get requests.
      this.generateAbortSignal(this.getCorrelationId(options))
    );

    return this.sendRequest(webResource).then((response) => {
      return {
        body: response.parsedBody as T,
        headers: response.headers.rawHeaders(),
        status: response.status
      };
    });
  }
}

/**
 * Provides options to configure how the Identity library makes authentication
 * requests to Azure Active Directory.
 */
export interface TokenCredentialOptions extends PipelineOptions {
  /**
   * The authority host to use for authentication requests.
   * The default is "https://login.microsoftonline.com".
   */
  authorityHost?: string;
}

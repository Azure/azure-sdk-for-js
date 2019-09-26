// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import {
  AccessToken,
  ServiceClient,
  ServiceClientOptions,
  WebResource,
  RequestPrepareOptions,
  GetTokenOptions
} from "@azure/core-http";
import { AuthenticationError } from "./errors";

const DefaultAuthorityHost = "https://login.microsoftonline.com";

/**
 * An internal type used to communicate details of a token request's
 * response that should not be sent back as part of the AccessToken.
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

export class IdentityClient extends ServiceClient {
  public authorityHost: string;

  constructor(options?: IdentityClientOptions) {
    options = options || IdentityClient.getDefaultOptions();
    super(undefined, options);

    this.baseUri = this.authorityHost = options.authorityHost || DefaultAuthorityHost;

    if (!this.baseUri.startsWith("https:")) {
      throw new Error("The authorityHost address must use the 'https' protocol.");
    }
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
    const response = await this.sendRequest(webResource);

    expiresOnParser =
      expiresOnParser ||
      ((responseBody: any) => {
        return Date.now() + responseBody.expires_in * 1000;
      });

    if (response.status === 200 || response.status === 201) {
      return {
        accessToken: {
          token: response.parsedBody.access_token,
          expiresOnTimestamp: expiresOnParser(response.parsedBody)
        },
        refreshToken: response.parsedBody.refresh_token
      };
    } else {
      throw new AuthenticationError(response.status, response.parsedBody || response.bodyAsText);
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

    const refreshParams = {
      grant_type: "refresh_token",
      client_id: clientId,
      refresh_token: refreshToken,
      scope: scopes
    };

    if (clientSecret !== undefined) {
      (refreshParams as any).client_secret = clientSecret;
    }

    const webResource = this.createWebResource({
      url: `${this.authorityHost}/${tenantId}/oauth2/v2.0/token`,
      method: "POST",
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      body: qs.stringify(refreshParams),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      abortSignal: options && options.abortSignal
    });

    try {
      return await this.sendTokenRequest(webResource, expiresOnParser);
    } catch (err) {
      if (
        err instanceof AuthenticationError &&
        err.errorResponse.error === "interaction_required"
      ) {
        // It's likely that the refresh token has expired, so
        // return null so that the credential implementation will
        // initiate the authentication flow again.
        return null;
      } else {
        throw err;
      }
    }
  }

  static getDefaultOptions(): IdentityClientOptions {
    return {
      authorityHost: DefaultAuthorityHost
    };
  }
}

export interface IdentityClientOptions extends ServiceClientOptions {
  authorityHost?: string;
}

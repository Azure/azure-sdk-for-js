// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential } from "@azure/core-http";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions, RequestPolicyFactory } from "@azure/core-http";
import { Constants } from "@azure/core-http";
import { HttpOperationResponse } from "@azure/core-http";
import { HttpHeaders } from "@azure/core-http";
import { WebResource } from "@azure/core-http";
import { AccessTokenCache, ExpiringAccessTokenCache } from "@azure/core-http";

/**
 * Creates a new ChallengeBasedAuthenticationPolicy factory.
 *
 * @param credential The TokenCredential implementation that can supply the challenge token.
 */
export function challengeBasedAuthenticationPolicy(credential: TokenCredential): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ChallengeBasedAuthenticationPolicy(nextPolicy, options, credential, tokenCache);
    }
  };
}

export class AuthenticationChallenge {
  constructor(public scopes: string[] | string) { }
}

/**
 *
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request
 * as a Bearer token.
 *
 */
export class ChallengeBasedAuthenticationPolicy extends BaseRequestPolicy {
  private challenge: AuthenticationChallenge | undefined = undefined;

  /**
   * Creates a new ChallengeBasedAuthenticationPolicy object.
   *
   * @param nextPolicy The next RequestPolicy in the request pipeline.
   * @param options Options for this RequestPolicy.
   * @param credential The TokenCredential implementation that can supply the bearer token.
   * @param tokenCache The cache for the most recent AccessToken returned by the TokenCredential.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private credential: TokenCredential,
    private tokenCache: AccessTokenCache
  ) {
    super(nextPolicy, options);
  }

  private parseWWWAuthenticate(www_authenticate: string): string {
    // Parses an authentication message like:
    // ```
    // Bearer authorization="some_authorization", resource="https://some.url"
    // ```
    let authenticateArray = www_authenticate.split(" ");

    // Remove the "Bearer" piece
    delete authenticateArray[0];

    // Split the KV comma-separated list
    let commaSep = authenticateArray.join().split(",");
    for (let item of commaSep) {
      // Split the key/value pairs
      let kv = item.split("=");
      if (kv[0].trim() == "resource") {
        // Remove the quotations around the string
        let resource = kv[1].trim().replace(/['"]+/g, '');
        return resource;
      }
    }
    return "";
  }

  /**
   * Applies the Bearer token to the request through the Authorization header.
   * @param webResource
   */
  public async sendRequest(
    webResource: WebResource
  ): Promise<HttpOperationResponse> {
    if (!webResource.headers) webResource.headers = new HttpHeaders();

    let originalBody = webResource.body;

    if (this.challenge == undefined) {
      // Use a blank to start the challenge
      webResource.body = "";
    } else {
      // or use the cached token if we have one
      await this.authenticateRequest(webResource);
    }

    let response = await this._nextPolicy.sendRequest(webResource);

    if (response.status == 401) {
      webResource.body = originalBody;

      let www_authenticate = response.headers.get("WWW-Authenticate");

      if (www_authenticate) {
        let resource = this.parseWWWAuthenticate(www_authenticate);
        let challenge = new AuthenticationChallenge(resource + "/.default")

        if (this.challenge != challenge) {
          this.challenge = challenge;
          this.tokenCache.setCachedToken(undefined);

          await this.authenticateRequest(webResource);
        }
      }
      return this._nextPolicy.sendRequest(webResource);
    } else {
      return response;
    }
  }

  private async authenticateRequest(webResource: WebResource): Promise<void> {
    let accessToken = this.tokenCache.getCachedToken();
    if (accessToken === undefined) {
      accessToken = (await this.credential.getToken(this.challenge!.scopes)) || undefined;
      this.tokenCache.setCachedToken(accessToken);
    }

    if (accessToken) {
      webResource.headers.set(
        Constants.HeaderConstants.AUTHORIZATION,
        `Bearer ${accessToken.token}`
      );
    }
  }
}

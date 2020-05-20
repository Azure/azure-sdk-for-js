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
 * Representation of the Authentication Challenge
 */
export class AuthenticationChallenge {
  constructor(public authorization: string, public scope: string) {
  }

  /**
   * Checks that this AuthenticationChallenge is equal to another one given.
   * @param other The other AuthenticationChallenge
   */
  public equalTo(other: AuthenticationChallenge | undefined) {
    if (!other) {
      return false;
    }
    return this.authorization === other.authorization && this.scope === other.scope;
  }
}

/**
 * Helps keep a copy of any previous authentication challenges,
 * so that we can compare on any further request.
 */
export class AuthenticationChallengeCache {
  public challenge?: AuthenticationChallenge;

  public setCachedChallenge(challenge: AuthenticationChallenge) {
    this.challenge = challenge;
  }
}

/**
 * Creates a new ChallengeBasedAuthenticationPolicy factory.
 *
 * @param credential The TokenCredential implementation that can supply the challenge token.
 */
export function challengeBasedAuthenticationPolicy(credential: TokenCredential): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const challengeCache = new AuthenticationChallengeCache();
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ChallengeBasedAuthenticationPolicy(nextPolicy, options, credential, tokenCache, challengeCache);
    }
  };
}

/**
 *
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request
 * as a Bearer token.
 *
 */
export class ChallengeBasedAuthenticationPolicy extends BaseRequestPolicy {

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
    private tokenCache: AccessTokenCache,
    private challengeCache: AuthenticationChallengeCache
  ) {
    super(nextPolicy, options);
  }

  private parseWWWAuthenticate(www_authenticate: string): {
    authorization: string,
    resource: string
  } {
    const returnValue = {
      authorization: "",
      resource: ""
    };
    // Parses an authentication message like:
    // ```
    // Bearer authorization="some_authorization", resource="https://some.url"
    // ```
    let spaceSep = www_authenticate.split(" ");

    // Split the KV comma-separated list
    for (const spaceItem of spaceSep) {
      const commaSep = spaceItem.split(",");
      for (const commaItem of commaSep) {
        // Split the key/value pairs
        const kv = commaItem.split("=");
        const key = kv[0].trim();
        const removeQuotes = (x: string): string => x.trim().replace(/['"]+/g, '');
        if (key == "authorization" || key == "authorization_uri") {
          returnValue.authorization = removeQuotes(kv[1]);
        } else if (key == "resource" || key == "scope") {
          returnValue.resource = removeQuotes(kv[1]);
        }
      }
    }
    return returnValue;
  }

  /**
   * Applies the Bearer token to the request through the Authorization header.
   * @param webResource
   */
  public async sendRequest(
    webResource: WebResource
  ): Promise<HttpOperationResponse> {
    if (!webResource.headers) webResource.headers = new HttpHeaders();

    // Ensure that we're about to use a secure connection
    if (!webResource.url.startsWith("https:")) {
      throw new Error("The resource address for authorization must use the 'https' protocol.");
    }

    const originalBody = webResource.body;

    if (this.challengeCache.challenge == undefined) {
      // Use a blank to start the challenge
      webResource.body = "";
    } else {
      // or use the cached token if we have one
      await this.authenticateRequest(webResource);
    }

    const response = await this._nextPolicy.sendRequest(webResource);

    if (response.status == 401) {
      webResource.body = originalBody;

      let www_authenticate = response.headers.get("WWW-Authenticate");

      if (www_authenticate) {
        // The challenge based authentication will contain both an authorization URI with a token,
        // and the resource to which that token is valid against (also called the scope).
        const { authorization, resource } = this.parseWWWAuthenticate(www_authenticate);
        const challenge = new AuthenticationChallenge(authorization, resource + "/.default")

        this.challengeCache.setCachedChallenge(challenge);
        this.tokenCache.setCachedToken(undefined);

        await this.authenticateRequest(webResource);
        return this._nextPolicy.sendRequest(webResource);
      }
      return response;
    } else {
      return response;
    }
  }

  private async authenticateRequest(webResource: WebResource): Promise<void> {
    let accessToken = this.tokenCache.getCachedToken();
    if (accessToken === undefined) {
      accessToken = (await this.credential.getToken(this.challengeCache.challenge!.scope)) || undefined;
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

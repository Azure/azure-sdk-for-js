// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential, AccessToken } from "@azure/core-http";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions, RequestPolicyFactory } from "@azure/core-http";
import { Constants } from "@azure/core-http";
import { HttpOperationResponse } from "@azure/core-http";
import { HttpHeaders } from "@azure/core-http";
import { WebResource } from "@azure/core-http";

export const TokenRefreshBufferMs = 2 * 60 * 1000; // 2 Minutes

/**
 * Creates a new ChallengeBasedAuthenticationPolicy factory.
 *
 * @param credential The TokenCredential implementation that can supply the bearer token.
 * @param scopes The scopes for which the bearer token applies.
 */
export function challengeBasedAuthenticationPolicy(credential: TokenCredential): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ChallengeBasedAuthenticationPolicy(nextPolicy, options, credential, Date.now());
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
  private cachedToken: AccessToken | undefined = undefined;
  private challenge: AuthenticationChallenge | undefined = undefined;

  /**
   * Creates a new ChallengeBasedAuthenticationPolicy object.
   *
   * @param nextPolicy The next RequestPolicy in the request pipeline.
   * @param options Options for this RequestPolicy.
   * @param credential The TokenCredential implementation that can supply the bearer token.
   * @param scopes The scopes for which the bearer token applies.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private credential: TokenCredential,
    //private scopes: string | string[],
    private refreshOn: number,
  ) {
    super(nextPolicy, options);
  }

  private parseWWWAuthenticate(www_authenticate: string): string {
    let authenticateArray = www_authenticate.split(" ");
    delete authenticateArray[0];
    let commaSep = authenticateArray.join().split(",");
    for (let item of commaSep) {
      let kv = item.split("=");
      if (kv[0].trim() == "resource") {
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
      webResource.body = "";
    } else {
      await this.authenticateRequest(webResource);
    }

    // Use a blank to start the challenge
    let headers = webResource.headers;
    webResource.headers = new HttpHeaders();
    webResource.body = "";
    let response = await this._nextPolicy.sendRequest(webResource);

    if (response.status == 401) {
      webResource.body = originalBody;
      webResource.headers = headers;

      let www_authenticate = response.headers.get("WWW-Authenticate");

      if (www_authenticate) {
        let resource = this.parseWWWAuthenticate(www_authenticate);
        let challenge = new AuthenticationChallenge(resource + "/.default")

        if (this.challenge != challenge) {
          console.log("CHALLENGE UNMATCHED");
          this.challenge = challenge;

          await this.authenticateRequest(webResource);
        } else {
          console.log("CHALLENGE MATCHED");
        }
      }
      return this._nextPolicy.sendRequest(webResource);
    } else {
      return response;
    }
  }

  private async authenticateRequest(webResource: WebResource): Promise<void> {
    console.log("CACHED TOKEN: ", this.cachedToken);
    if (
      this.cachedToken &&
      (Date.now() < this.refreshOn)
    ) {
      console.log("USING CACHED TOKEN");
      webResource.headers.set(
        Constants.HeaderConstants.AUTHORIZATION,
        `Bearer ${this.cachedToken.token}`
      );
    } else {
      let token: AccessToken | null = await this.credential.getToken(this.challenge!.scopes);
      if (token) {
        this.cachedToken = token;
        this.refreshOn = token.expiresOnTimestamp - TokenRefreshBufferMs;
        console.log("REFRESHON: ", this.refreshOn - Date.now());
        webResource.headers.set(
          Constants.HeaderConstants.AUTHORIZATION,
          `Bearer ${token.token}`
        );
      }
    }
  }
}

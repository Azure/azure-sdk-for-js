// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential, AccessToken, GetTokenOptions } from "@azure/core-http";
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
export function challengeBasedAuthenticationPolicy(credential: TokenCredential, scopes: string | string[]): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ChallengeBasedAuthenticationPolicy(nextPolicy, options, credential, scopes, Date.now());
    }
  };
}

export class AuthenticationChallenge {
  constructor(public scopes: string[]) { }
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
  private headerValue = "";

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
    private scopes: string | string[],
    private refreshOn: number,
  ) {
    super(nextPolicy, options);
  }

  /**
   * Applies the Bearer token to the request through the Authorization header.
   * @param webResource
   */
  public async sendRequest(
    webResource: WebResource
  ): Promise<HttpOperationResponse> {
    if (!webResource.headers) webResource.headers = new HttpHeaders();
    /*
    const token = await this.getToken({
      abortSignal: webResource.abortSignal
    });
    webResource.headers.set(
      Constants.HeaderConstants.AUTHORIZATION,
      `Bearer ${token}`
    );
    */

    console.log(webResource);

    if (this.challenge == undefined) {
      // Use a blank to start the challenge
      let headers = webResource.headers;
      webResource.headers = new HttpHeaders();
      let backupBody = webResource.body;
      webResource.body = "";
      let response = await this._nextPolicy.sendRequest(webResource);

      if (response.status == 401) {
        webResource.headers = headers;

        let www_authenticate = response.headers.get("WWW-Authenticate");
        console.log(www_authenticate);

        if (www_authenticate) {
          let authenticateArray = www_authenticate.split(" ");
          delete authenticateArray[0];
          let commaSep = authenticateArray.join().split(",");
          for (let item of commaSep) {
            console.log("item: ", item);
            let kv = item.split("=");
            if (kv[0].trim() == "authorization") {
              console.log("AUTHORIZATION: ", kv[1].trim());
              this.headerValue = kv[1].trim();
              webResource.headers.set("authorization", this.headerValue);
            }
            else if (kv[0].trim() == "resource") {
              console.log("RESOURCE: ", kv[1].trim());
              webResource.headers.set("resource", kv[1].trim());
            }

            /*
            // Do something with www_authenticate
            let challenge = "foo";
            if (this.challenge != challenge) {
              //this.challenge = challenge;
              await this.authenticateRequest(webResource);
            }
            */
          }
        }
      }
      webResource.body = backupBody;
    }
    console.log(webResource);
    return this._nextPolicy.sendRequest(webResource);
  }

  private async authenticateRequest(webResource: WebResource): Promise<void> {
    if (Date.now() >= this.refreshOn) {
      /*
      let token: AccessToken?= await this.credential.getToken(this.challenge!.scopes, ???);
      if (token) {
        this.headerValue = "Bearer" + token.token;
        this.refreshOn = token.expiresOnTimestamp - TokenRefreshBufferMs;
      }
      */
    }
    webResource.headers.set("authorization", this.headerValue);
  }

  private async getToken(options: GetTokenOptions): Promise<string | undefined> {
    if (
      this.cachedToken &&
      Date.now() + TokenRefreshBufferMs < this.cachedToken.expiresOnTimestamp
    ) {
      return this.cachedToken.token;
    }

    this.cachedToken = (await this.credential.getToken(this.scopes, options)) || undefined;
    return this.cachedToken ? this.cachedToken.token : undefined;
  }
}

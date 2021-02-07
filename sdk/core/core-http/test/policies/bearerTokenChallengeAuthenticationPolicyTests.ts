// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import {
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "../../src/policies/requestPolicy";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { HttpHeaders } from "../../src/httpHeaders";
import { WebResource, WebResourceLike } from "../../src/webResource";
import { AccessTokenCache, ExpiringAccessTokenCache } from "../../src/credentials/accessTokenCache";
import { AccessTokenRefresher } from "../../src/credentials/accessTokenRefresher";
import { ChallengeCache } from "../../src/CAE/challengeCache";
import { BearerTokenChallengeAuthenticationPolicy } from "../../src/policies/bearerTokenChallengeAuthenticationPolicy";
import { parseCAEChallenges } from "../../src/CAE/parseCAEChallenges";
import { decodeString, encodeString, uint8ArrayToString } from "../../src/util/base64";

export interface TestChallenge {
  scope: string;
  claims: string;
}

export function testChallengeAuthenticationPolicyFactory(
  credential: TokenCredential
): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const tokenRefresher = new AccessTokenRefresher(credential, "https://localhost/.default");
  const challengeCache = new ChallengeCache<TestChallenge>();
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new TestChallengeBasedAuthenticationPolicy(
        nextPolicy,
        options,
        tokenCache,
        tokenRefresher,
        challengeCache
      );
    }
  };
}

export class TestChallengeBasedAuthenticationPolicy extends BearerTokenChallengeAuthenticationPolicy<
  TestChallenge
> {
  async prepareRequest(_webResource: WebResourceLike): Promise<void> {
    // Nothing to do here since our goal is to skip the first getToken
  }

  async processChallenge(webResource: WebResourceLike, challenge?: string): Promise<boolean> {
    if (!challenge) {
      return false;
    }

    const challenges: TestChallenge[] = parseCAEChallenges(challenge) || [];

    const parsedChallenge = challenges.find((x) => x.claims);
    if (!parsedChallenge) {
      throw new Error("Missing claims");
    }
    if (!this.challengeCache.equalTo(parsedChallenge)) {
      this.challengeCache.setCachedChallenge(parsedChallenge);
      this.tokenCache.setCachedToken(undefined);
    }

    this.scope = parsedChallenge.scope;
    this.claims = uint8ArrayToString(decodeString(parsedChallenge.claims));

    await this.loadToken(webResource);
    return true;
  }
}

class MockRefreshAzureCredential implements TokenCredential {
  private _expiresOnTimestamp: number;
  public authCount = 0;
  public scopesAndClaims: { scope: string | string[]; claims: string | undefined }[] = [];

  constructor(expiresOnTimestamp: number) {
    this._expiresOnTimestamp = expiresOnTimestamp;
  }

  public getToken(scope: string | string[], options: GetTokenOptions): Promise<AccessToken | null> {
    this.authCount++;
    this.scopesAndClaims.push({ scope, claims: options.claims });
    return Promise.resolve({ token: "mock-token", expiresOnTimestamp: this._expiresOnTimestamp });
  }
}

describe("BearerTokenChallengeAuthenticationPolicy", function() {
  it("tests that the scope and the claim have been passed through to getToken correctly", async function() {
    const now = Date.now();
    const credentialToTest = new MockRefreshAzureCredential(now);

    const expected = {
      scope: "http://localhost/.default",
      claims: JSON.stringify({
        access_token: { foo: "bar" }
      })
    };

    const request = new WebResource();
    const responses: HttpOperationResponse[] = [
      {
        request,
        status: 401,
        headers: new HttpHeaders({
          "WWW-Authenticate": `Bearer scope="${expected.scope}", claims="${encodeString(
            expected.claims
          )}"`
        })
      },
      {
        request,
        status: 200,
        headers: new HttpHeaders()
      }
    ];

    const policy = testChallengeAuthenticationPolicyFactory(credentialToTest).create(
      {
        async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
          if (responses.length) {
            const response = responses.shift()!;
            response.request = httpRequest;
            return response;
          }
          throw new Error("No responses found");
        }
      },
      {
        shouldLog: () => false,
        log: () => undefined
      }
    );

    await policy.sendRequest(request);

    credentialToTest.authCount.should.equal(1);
    credentialToTest.scopesAndClaims.should.deep.equal([
      {
        scope: expected.scope,
        claims: expected.claims
      }
    ]);
  });
});

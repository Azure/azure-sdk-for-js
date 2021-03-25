// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  HttpClient,
  PipelineResponse
} from "../../src";
import { BearerTokenChallengeResult } from "../../src/policies/bearerTokenAuthenticationPolicy";
import { TextDecoder } from "util";

export interface TestChallenge {
  scope: string;
  claims: string;
}

let cachedChallenge: string | undefined;

/**
 * Converts a uint8Array to a string.
 */
export function uint8ArrayToString(ab: Uint8Array): string {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(ab);
}

/**
 * Encodes a string in base64 format.
 * @param value - The string to encode
 */
export function encodeString(value: string): string {
  return Buffer.from(value).toString("base64");
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - The base64 string to decode
 */
export function decodeString(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}

// Converts:
//     Bearer a="b", c="d", Bearer d="e", f="g"
// Into:
//     [ { a: 'b', c: 'd' }, { d: 'e', f: 'g"' } ]
// Important:
//     Do not use this in production, as values might contain the strings we use to split things up.
function parseCAEChallenge(challenges: string): any[] {
  return challenges
    .split("Bearer ")
    .filter((x) => x)
    .map((challenge) =>
      challenge
        .split('", ')
        .filter((x) => x)
        .map((keyValue) => (([key, value]) => ({ [key]: value }))(keyValue.trim().split('="')))
        .reduce((a, b) => ({ ...a, ...b }), {})
    );
}

async function processChallenge(challenge: string): Promise<BearerTokenChallengeResult> {
  const challenges: TestChallenge[] = parseCAEChallenge(challenge) || [];

  const parsedChallenge = challenges.find((x) => x.claims);
  if (!parsedChallenge) {
    throw new Error("Missing claims");
  }
  if (cachedChallenge !== challenge) {
    cachedChallenge = challenge;
  }

  return {
    scopes: [parsedChallenge.scope],
    claims: uint8ArrayToString(decodeString(parsedChallenge.claims))
  };
}

class MockRefreshAzureCredential implements TokenCredential {
  public authCount = 0;
  public scopesAndClaims: { scope: string | string[]; challengeClaims: string | undefined }[] = [];
  public getTokenResponses: (AccessToken | null)[];

  constructor(getTokenResponses: (AccessToken | null)[]) {
    this.getTokenResponses = getTokenResponses;
  }

  public getToken(scope: string | string[], options: GetTokenOptions): Promise<AccessToken | null> {
    this.authCount++;
    this.scopesAndClaims.push({ scope, challengeClaims: options.claims });
    return Promise.resolve(this.getTokenResponses.shift()!);
  }
}

describe("bearerTokenAuthenticationPolicy with challenge", function() {
  it("tests that the scope and the claim have been passed through to getToken correctly", async function() {
    const expected = {
      scope: "http://localhost/.default",
      challengeClaims: JSON.stringify({
        access_token: { foo: "bar" }
      })
    };

    const request = createPipelineRequest({ url: "https://example.com" });
    const responses: PipelineResponse[] = [
      {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer scope="${expected.scope}", claims="${encodeString(
            expected.challengeClaims
          )}"`
        }),
        request,
        status: 401
      },
      {
        headers: createHttpHeaders(),
        request,
        status: 200
      }
    ];

    const expiresOn = Date.now() + 5000;
    const getTokenResponse = { token: "mock-token", expiresOnTimestamp: expiresOn };
    const credential = new MockRefreshAzureCredential([getTokenResponse]);

    const pipeline = createEmptyPipeline();
    const bearerPolicy = bearerTokenAuthenticationPolicy({
      // Intentionally left empty, as it should be replaced by the challenge.
      scopes: "",
      credential,
      challengeCallbacks: {
        processChallenge
      }
    });
    pipeline.addPolicy(bearerPolicy);

    const finalSendRequestHeaders: (string | undefined)[] = [];

    const testHttpsClient: HttpClient = {
      sendRequest: async (req) => {
        finalSendRequestHeaders.push(req.headers.get("Authorization"));
        if (responses.length) {
          const response = responses.shift()!;
          response.request = req;
          return response;
        }
        throw new Error("No responses found");
      }
    };

    await pipeline.sendRequest(testHttpsClient, request);

    // Our goal is to test that:
    // - Only one getToken request was sent.
    // - That the only getToken request contained the scope and the claims of the challenge.
    // - That the HTTP requests that were sent were:
    //   - Once without the token, to retrieve the challenge.
    //   - A final one with the token.

    assert.equal(credential.authCount, 1);
    assert.deepEqual(credential.scopesAndClaims, [
      {
        scope: [expected.scope],
        challengeClaims: expected.challengeClaims
      }
    ]);
    assert.deepEqual(finalSendRequestHeaders, [undefined, `Bearer ${getTokenResponse.token}`]);
  });

  it("tests that the challenge is processed even we already had a token", async function() {
    const expected = [
      {
        scope: "http://localhost/.default",
        challengeClaims: JSON.stringify({
          access_token: { foo: "bar" }
        })
      },
      {
        scope: "http://localhost/.default2",
        challengeClaims: JSON.stringify({
          access_token: { foo2: "bar2" }
        })
      }
    ];

    const request = createPipelineRequest({ url: "https://example.com" });
    const responses: PipelineResponse[] = [
      {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer scope="${expected[0].scope}", claims="${encodeString(
            expected[0].challengeClaims
          )}"`
        }),
        request,
        status: 401
      },
      {
        headers: createHttpHeaders(),
        request,
        status: 200
      },
      {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer scope="${expected[1].scope}", claims="${encodeString(
            expected[1].challengeClaims
          )}"`
        }),
        request,
        status: 401
      },
      {
        headers: createHttpHeaders(),
        request,
        status: 200
      }
    ];

    const expiresOn = Date.now() + 5000;
    const getTokenResponses = [
      { token: "mock-token", expiresOnTimestamp: expiresOn },
      { token: "mock-token2", expiresOnTimestamp: expiresOn }
    ];
    const credential = new MockRefreshAzureCredential([...getTokenResponses]);

    const pipeline = createEmptyPipeline();
    const bearerPolicy = bearerTokenAuthenticationPolicy({
      // Intentionally left empty, as it should be replaced by the challenge.
      scopes: "",
      credential,
      challengeCallbacks: {
        processChallenge
      }
    });
    pipeline.addPolicy(bearerPolicy);

    const finalSendRequestHeaders: (string | undefined)[] = [];

    const testHttpsClient: HttpClient = {
      sendRequest: async (req) => {
        finalSendRequestHeaders.push(req.headers.get("Authorization"));
        if (responses.length) {
          const response = responses.shift()!;
          response.request = req;
          return response;
        }
        throw new Error("No responses found");
      }
    };

    await pipeline.sendRequest(testHttpsClient, request);
    await pipeline.sendRequest(testHttpsClient, request);

    // Our goal is to test that:
    // - After a second challenge was received, we processed it and retrieved the token again.

    assert.equal(credential.authCount, 2);
    assert.deepEqual(credential.scopesAndClaims, [
      {
        scope: [expected[0].scope],
        challengeClaims: expected[0].challengeClaims
      },
      {
        scope: [expected[1].scope],
        challengeClaims: expected[1].challengeClaims
      }
    ]);
    assert.deepEqual(finalSendRequestHeaders, [
      undefined,
      `Bearer ${getTokenResponses[0].token}`,
      `Bearer ${getTokenResponses[0].token}`,
      `Bearer ${getTokenResponses[1].token}`
    ]);
  });
});

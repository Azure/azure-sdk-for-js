// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  HttpsClient,
  PipelineResponse
} from "../../src";
import { AuthenticationContext } from "../../src/interfaces";

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

async function processChallenge(challenge: string): Promise<AuthenticationContext> {
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
    challengeClaims: uint8ArrayToString(decodeString(parsedChallenge.claims))
  };
}

class MockRefreshAzureCredential implements TokenCredential {
  public authCount = 0;
  public scopesAndClaims: { scope: string | string[]; claims: string | undefined }[] = [];
  public tokens: (AccessToken | null)[];

  constructor(tokens: (AccessToken | null)[]) {
    this.tokens = tokens;
  }

  public getToken(scope: string | string[], options: GetTokenOptions): Promise<AccessToken | null> {
    this.authCount++;
    this.scopesAndClaims.push({ scope, claims: options.claims });
    return Promise.resolve(this.tokens.shift()!);
  }
}

describe("bearerTokenAuthenticationPolicy with challenge", function() {
  it("tests that the scope and the claim have been passed through to getToken correctly", async function() {
    const expected = {
      scope: "http://localhost/.default",
      claims: JSON.stringify({
        access_token: { foo: "bar" }
      })
    };

    const request = createPipelineRequest({ url: "https://example.com" });
    const responses: PipelineResponse[] = [
      {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer scope="${expected.scope}", claims="${encodeString(
            expected.claims
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
    const tokens = [null, { token: "mock-token", expiresOnTimestamp: expiresOn }];
    const credential = new MockRefreshAzureCredential(tokens);

    const pipeline = createEmptyPipeline();
    const policy = bearerTokenAuthenticationPolicy({
      // Intentionally left empty, as it should be replaced by the challenge.
      scopes: "",
      credential,
      challenge: {
        processChallenge
      }
    });

    pipeline.addPolicy(policy);

    const testHttpsClient: HttpsClient = {
      sendRequest: async (req) => {
        if (responses.length) {
          const response = responses.shift()!;
          response.request = req;
          return response;
        }
        throw new Error("No responses found");
      }
    };

    await pipeline.sendRequest(testHttpsClient, request);

    assert.equal(credential.authCount, 2);
    assert.deepEqual(credential.scopesAndClaims, [
      {
        scope: "",
        claims: undefined
      },
      {
        scope: [expected.scope],
        claims: expected.claims
      }
    ]);
  });
});

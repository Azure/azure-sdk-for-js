// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  challengeAuthenticationPolicy,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  HttpsClient,
  PipelineRequest,
  PipelineResponse
} from "../src";
import { parseCAEChallenges } from "../src/util/parseCAEChallenges";

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

async function processChallenge(request: PipelineRequest, challenge?: string): Promise<boolean> {
  if (!challenge) {
    return false;
  }

  const challenges: TestChallenge[] = parseCAEChallenges(challenge) || [];

  const parsedChallenge = challenges.find((x) => x.claims);
  if (!parsedChallenge) {
    throw new Error("Missing claims");
  }
  if (cachedChallenge !== challenge) {
    cachedChallenge = challenge;
  }

  if (!request.authenticationOptions) {
    request.authenticationOptions = {};
  }

  request.authenticationOptions.scope = parsedChallenge.scope;
  request.authenticationOptions.claims = uint8ArrayToString(decodeString(parsedChallenge.claims));

  return true;
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

describe("ChallengeAuthenticationPolicy", function() {
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
    const credential = new MockRefreshAzureCredential(expiresOn);

    const pipeline = createEmptyPipeline();
    const policies = [
      challengeAuthenticationPolicy({ processChallenge }),
      bearerTokenAuthenticationPolicy({ credential, scopes: "" })
    ];

    for (let i = 0; i < policies.length; i++) {
      const prev = policies[i - 1];
      pipeline.addPolicy(policies[i], prev && { afterPolicies: [prev.name] });
    }

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
        scope: expected.scope,
        claims: expected.claims
      }
    ]);
  });
});

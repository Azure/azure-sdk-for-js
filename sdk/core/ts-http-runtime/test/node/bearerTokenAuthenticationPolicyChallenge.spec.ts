// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { AccessToken, GetTokenOptions, TokenCredential } from "../../src/auth/tokenCredential";
import {
  AuthorizeRequestOnChallengeOptions,
  HttpClient,
  PipelineResponse,
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "../../src";
import { TextDecoder } from "util";

export interface TestChallenge {
  scope: string;
  claims: string;
}

let cachedChallenge: string | undefined;
let cachedPreviousToken: AccessToken | null;

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
      `${challenge.trim()}, `
        .split('", ')
        .filter((x) => x)
        .map((keyValue) => (([key, value]) => ({ [key]: value }))(keyValue.trim().split('="')))
        .reduce((a, b) => ({ ...a, ...b }), {})
    );
}

async function authorizeRequestOnChallenge(
  options: AuthorizeRequestOnChallengeOptions
): Promise<boolean> {
  const { scopes } = options;

  const challenge = options.response.headers.get("WWW-Authenticate");
  if (!challenge) {
    throw new Error("Missing challenge");
  }
  const challenges: TestChallenge[] = parseCAEChallenge(challenge) || [];

  const parsedChallenge = challenges.find((x) => x.claims);
  if (!parsedChallenge) {
    throw new Error("Missing claims");
  }
  if (cachedChallenge !== challenge) {
    cachedChallenge = challenge;
  }

  const accessToken = await options.getAccessToken(
    parsedChallenge.scope ? [parsedChallenge.scope] : scopes,
    {
      ...options,
      claims: uint8ArrayToString(Buffer.from(parsedChallenge.claims, "base64")),
    } as GetTokenOptions
  );

  if (!accessToken) {
    return false;
  }
  if (cachedPreviousToken) {
    cachedPreviousToken = accessToken;
  }

  options.request.headers.set("Authorization", `Bearer ${accessToken.token}`);
  return true;
}

class MockRefreshCredential implements TokenCredential {
  public authCount = 0;
  public scopesAndClaims: { scope: string | string[]; challengeClaims: string | undefined }[] = [];
  public getTokenResponses: (AccessToken | null)[];

  constructor(getTokenResponses: (AccessToken | null)[]) {
    this.getTokenResponses = getTokenResponses;
  }

  public getToken(
    scope: string | string[],
    options: GetTokenOptions & { claims?: string }
  ): Promise<AccessToken | null> {
    this.authCount++;
    this.scopesAndClaims.push({ scope, challengeClaims: options.claims });
    return Promise.resolve(this.getTokenResponses.shift()!);
  }
}

describe("bearerTokenAuthenticationPolicy with challenge", function () {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.now());
  });
  afterEach(() => {
    clock.restore();
  });

  it("tests that the scope and the claim have been passed through to getToken correctly", async function () {
    const expected = {
      scope: ["http://localhost/.default"],
      challengeClaims: JSON.stringify({
        access_token: { foo: "bar" },
      }),
    };

    const pipelineRequest = createPipelineRequest({ url: "https://example.com" });
    const responses: PipelineResponse[] = [
      {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer scope="${expected.scope[0]}", claims="${encodeString(
            expected.challengeClaims
          )}"`,
        }),
        request: pipelineRequest,
        status: 401,
      },
      {
        headers: createHttpHeaders(),
        request: pipelineRequest,
        status: 200,
      },
    ];

    const expiresOn = Date.now() + 5000;
    const getTokenResponse = { token: "mock-token", expiresOnTimestamp: expiresOn };
    const credential = new MockRefreshCredential([getTokenResponse]);

    const pipeline = createEmptyPipeline();
    let firstRequest: boolean = true;
    const bearerPolicy = bearerTokenAuthenticationPolicy({
      // Intentionally left empty, as it should be replaced by the challenge.
      scopes: [],
      credential,
      challengeCallbacks: {
        async authorizeRequest({ request, getAccessToken }) {
          if (firstRequest) {
            firstRequest = false;
            // send first request without the Authorization header
          } else {
            const token = await getAccessToken([], {});
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        },
        authorizeRequestOnChallenge,
      },
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
      },
    };

    await pipeline.sendRequest(testHttpsClient, pipelineRequest);

    // Our goal is to test that:
    // - Only one getToken request was sent.
    // - That the only getToken request contained the scope and the claims of the challenge.
    // - That the HTTP requests that were sent were:
    //   - Once without the token, to retrieve the challenge.
    //   - A final one with the token.

    assert.equal(credential.authCount, 1);
    assert.deepEqual(credential.scopesAndClaims, [
      {
        scope: expected.scope,
        challengeClaims: expected.challengeClaims,
      },
    ]);
    assert.deepEqual(finalSendRequestHeaders, [undefined, `Bearer ${getTokenResponse.token}`]);
  });

  it("tests that the challenge is processed even we already had a token", async function () {
    const expected = [
      {
        scope: ["http://localhost/.default"],
        challengeClaims: JSON.stringify({
          access_token: { foo: "bar" },
        }),
      },
      {
        scope: ["http://localhost/.default2"],
        challengeClaims: JSON.stringify({
          access_token: { foo2: "bar2" },
        }),
      },
    ];

    const pipelineRequest = createPipelineRequest({ url: "https://example.com" });
    const responses: PipelineResponse[] = [
      {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer scope="${expected[0].scope[0]}", claims="${encodeString(
            expected[0].challengeClaims
          )}"`,
        }),
        request: pipelineRequest,
        status: 401,
      },
      {
        headers: createHttpHeaders(),
        request: pipelineRequest,
        status: 200,
      },
      {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer scope="${expected[1].scope[0]}", claims="${encodeString(
            expected[1].challengeClaims
          )}"`,
        }),
        request: pipelineRequest,
        status: 401,
      },
      {
        headers: createHttpHeaders(),
        request: pipelineRequest,
        status: 200,
      },
      {
        headers: createHttpHeaders(),
        request: pipelineRequest,
        status: 200,
      },
    ];

    const getTokenResponses = [
      { token: "mock-token", expiresOnTimestamp: Date.now() + 5000 },
      { token: "mock-token2", expiresOnTimestamp: Date.now() + 100000 },
      { token: "mock-token3", expiresOnTimestamp: Date.now() + 100000 },
    ];
    const credential = new MockRefreshCredential([...getTokenResponses]);

    const pipeline = createEmptyPipeline();
    let firstRequest: boolean = true;
    const bearerPolicy = bearerTokenAuthenticationPolicy({
      // Intentionally left empty, as it should be replaced by the challenge.
      scopes: [],
      credential,
      challengeCallbacks: {
        async authorizeRequest({ request, getAccessToken }) {
          if (firstRequest) {
            firstRequest = false;
            // send first request without the Authorization header
          } else {
            if (!cachedPreviousToken) {
              cachedPreviousToken = await getAccessToken([], {});
              if (!cachedPreviousToken) {
                throw new Error("Failed to retrieve an access token");
              }
            }
            request.headers.set("Authorization", `Bearer ${cachedPreviousToken.token}`);
          }
        },
        authorizeRequestOnChallenge,
      },
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
      },
    };

    // Will refresh token once as the first time token is empty
    await pipeline.sendRequest(testHttpsClient, pipelineRequest);
    clock.tick(5000);
    // Will refresh token twice
    // - 1st refreshing because the token is epxired
    // - 2nd refreshing because the response with old token has 401 error and claim details so we need refresh token again
    await pipeline.sendRequest(testHttpsClient, pipelineRequest);
    // Token is still valid and no need to refresh it
    await pipeline.sendRequest(testHttpsClient, pipelineRequest);

    // Our goal is to test that:
    // - After a second challenge was received, we processed it and retrieved the token again.

    assert.equal(credential.authCount, 3);
    assert.deepEqual(credential.scopesAndClaims, [
      {
        scope: expected[0].scope,
        challengeClaims: expected[0].challengeClaims,
      },
      {
        scope: [],
        challengeClaims: undefined,
      },
      {
        scope: expected[1].scope,
        challengeClaims: expected[1].challengeClaims,
      },
    ]);
    assert.deepEqual(finalSendRequestHeaders, [
      undefined,
      `Bearer ${getTokenResponses[0].token}`,
      `Bearer ${getTokenResponses[1].token}`,
      `Bearer ${getTokenResponses[2].token}`,
      `Bearer ${getTokenResponses[2].token}`,
    ]);
  });

  it("tests that once the challenge is processed we won't refresh the token again and again", async function () {
    const expected = [
      {
        scope: ["http://localhost/.default"],
        challengeClaims: JSON.stringify({
          access_token: { foo: "bar" },
        }),
      },
    ];

    const pipelineRequest = createPipelineRequest({ url: "https://example.com" });
    const responses: PipelineResponse[] = [
      {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer scope="${expected[0].scope[0]}", claims="${encodeString(
            expected[0].challengeClaims
          )}"`,
        }),
        request: pipelineRequest,
        status: 401,
      },
      {
        headers: createHttpHeaders(),
        request: pipelineRequest,
        status: 200,
      },
      {
        headers: createHttpHeaders(),
        request: pipelineRequest,
        status: 200,
      },
      {
        headers: createHttpHeaders(),
        request: pipelineRequest,
        status: 200,
      },
    ];

    const getTokenResponses = [
      { token: "mock-token-initialzation", expiresOnTimestamp: Date.now() + 180000 },
      // ensure the token will not expire
      { token: "mock-token-challenge", expiresOnTimestamp: Date.now() + 180000 },
    ];
    const credential = new MockRefreshCredential([...getTokenResponses]);

    const pipeline = createEmptyPipeline();
    const bearerPolicy = bearerTokenAuthenticationPolicy({
      scopes: [],
      credential,
      challengeCallbacks: {
        authorizeRequestOnChallenge,
      },
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
      },
    };

    // Will refresh token twice
    // - 1st refreshing to initialize the token
    // - 2nd refreshing to handle challenge process
    await pipeline.sendRequest(testHttpsClient, pipelineRequest);
    assert.equal(credential.authCount, 2);
    clock.tick(5000);
    // Will not refresh the token because the previous one is still valid
    await pipeline.sendRequest(testHttpsClient, pipelineRequest);
    await pipeline.sendRequest(testHttpsClient, pipelineRequest);

    // Our goal is to test that:
    // - After a challenge is received and processed and once the token is valid, we'll use it in future calls
    assert.equal(credential.authCount, 2);
    assert.deepEqual(credential.scopesAndClaims, [
      {
        scope: [],
        challengeClaims: undefined,
      },
      {
        scope: expected[0].scope,
        challengeClaims: expected[0].challengeClaims,
      },
    ]);
    assert.deepEqual(finalSendRequestHeaders, [
      `Bearer ${getTokenResponses[0].token}`,
      `Bearer ${getTokenResponses[1].token}`,
      `Bearer ${getTokenResponses[1].token}`,
      `Bearer ${getTokenResponses[1].token}`,
    ]);
  });

  it("service errors without challenges should bubble up", async function () {
    const pipelineRequest = createPipelineRequest({ url: "https://example.com" });
    const credential = new MockRefreshCredential([]);

    const pipeline = createEmptyPipeline();
    let firstRequest: boolean = true;
    const bearerPolicy = bearerTokenAuthenticationPolicy({
      // Intentionally left empty, as it should be replaced by the challenge.
      scopes: [],
      credential,
      challengeCallbacks: {
        async authorizeRequest({ request, getAccessToken }) {
          if (firstRequest) {
            firstRequest = false;
            // send first request without the Authorization header
          } else {
            const token = await getAccessToken([], {});
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        },
        authorizeRequestOnChallenge,
      },
    });
    pipeline.addPolicy(bearerPolicy);

    const testHttpsClient: HttpClient = {
      sendRequest: async (req) => {
        throw {
          message: "Failed sendRequest error",
          response: {
            headers: createHttpHeaders(),
            request: req,
            status: 400,
          },
        };
      },
    };

    let error: Error | undefined;
    try {
      await pipeline.sendRequest(testHttpsClient, pipelineRequest);
    } catch (e: any) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.message, "Failed sendRequest error");
  });
});

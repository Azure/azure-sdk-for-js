// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  HttpClient,
  PipelineResponse
} from "@azure/core-rest-pipeline";
import { assert } from "chai";
import {
  authorizeRequestOnClaimChallenge,
  parseCAEChallenge
} from "../src/authorizeRequestOnClaimChallenge";
import { encodeString } from "../src/base64";

describe("authorizeRequestOnClaimChallenge", function() {
  it(`should try to get the access token if the response has a valid claims parameter on the WWW-Authenticate header`, async function() {
    const request = createPipelineRequest({ url: "https://example.com" });
    const getAccessTokenParameters: {
      scopes: string | string[];
      getTokenOptions: GetTokenOptions;
    }[] = [];

    const result = await authorizeRequestOnClaimChallenge({
      async getAccessToken(scopes, getTokenOptions) {
        getAccessTokenParameters.push({ scopes, getTokenOptions });
        return {
          token: "accessToken",
          expiresOnTimestamp: new Date().getTime()
        };
      },
      scopes: [],
      response: {
        headers: createHttpHeaders({
          "WWW-Authenticate": [
            `Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token"`,
            `error_description="User session has been revoked"`,
            `scope="https://endpoint/.default"`,
            `claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="`
          ].join(", ")
        }),
        request,
        status: 401
      },
      request
    });

    assert.isTrue(result);

    assert.deepEqual(getAccessTokenParameters, [
      {
        scopes: ["https://endpoint/.default"],
        getTokenOptions: {
          claims: '{"access_token":{"nbf":{"essential":true, "value":"1603742800"}}}'
        } as GetTokenOptions
      }
    ]);
  });

  it(`should try to get the access token with the parametrized scopes if the response has no scope property on the WWW-authenticate header`, async function() {
    const request = createPipelineRequest({ url: "https://example.com" });
    const getAccessTokenParameters: {
      scopes: string | string[];
      getTokenOptions: GetTokenOptions;
    }[] = [];

    const result = await authorizeRequestOnClaimChallenge({
      async getAccessToken(scopes, getTokenOptions) {
        getAccessTokenParameters.push({ scopes, getTokenOptions });
        return {
          token: "accessToken",
          expiresOnTimestamp: new Date().getTime()
        };
      },
      scopes: ["https://parametrized-endpoint/.default"],
      response: {
        headers: createHttpHeaders({
          "WWW-Authenticate": [
            `Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token"`,
            `error_description="User session has been revoked"`,
            `claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="`
          ].join(", ")
        }),
        request,
        status: 401
      },
      request
    });

    assert.isTrue(result);

    assert.deepEqual(getAccessTokenParameters, [
      {
        scopes: ["https://parametrized-endpoint/.default"],
        getTokenOptions: {
          claims: '{"access_token":{"nbf":{"essential":true, "value":"1603742800"}}}'
        } as GetTokenOptions
      }
    ]);
  });

  it(`should work even if the WWW-authenticate header is missing some base64 padding`, async function() {
    // In Python, padding has to be added at the end if the size of the base64 string is not a multiple of 4.
    // In JavaScript, the padding is added automatically.

    const request = createPipelineRequest({ url: "https://example.com" });
    const getAccessTokenParameters: {
      scopes: string | string[];
      getTokenOptions: GetTokenOptions;
    }[] = [];

    const result = await authorizeRequestOnClaimChallenge({
      async getAccessToken(scopes, getTokenOptions) {
        getAccessTokenParameters.push({ scopes, getTokenOptions });
        return {
          token: "accessToken",
          expiresOnTimestamp: new Date().getTime()
        };
      },
      scopes: ["https://parametrized-endpoint/.default"],
      response: {
        headers: createHttpHeaders({
          "WWW-Authenticate": [
            `Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token"`,
            `error_description="User session has been revoked"`,
            // Missing `=` at the end.
            `claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0"`
          ].join(", ")
        }),
        request,
        status: 401
      },
      request
    });

    assert.isTrue(result);

    assert.deepEqual(getAccessTokenParameters, [
      {
        scopes: ["https://parametrized-endpoint/.default"],
        getTokenOptions: {
          claims: '{"access_token":{"nbf":{"essential":true, "value":"1603742800"}}}'
        } as GetTokenOptions
      }
    ]);
  });

  it(`should return false if getAccessToken is called and if it doesn't return an access token`, async function() {
    const request = createPipelineRequest({ url: "https://example.com" });
    const getAccessTokenParameters: {
      scopes: string | string[];
      getTokenOptions: GetTokenOptions;
    }[] = [];

    const result = await authorizeRequestOnClaimChallenge({
      async getAccessToken(scopes, getTokenOptions) {
        getAccessTokenParameters.push({ scopes, getTokenOptions });
        return null;
      },
      scopes: ["https://parametrized-endpoint/.default"],
      response: {
        headers: createHttpHeaders({
          "WWW-Authenticate": [
            `Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token"`,
            `error_description="User session has been revoked"`,
            `claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="`
          ].join(", ")
        }),
        request,
        status: 401
      },
      request
    });

    assert.isFalse(result);

    assert.deepEqual(getAccessTokenParameters, [
      {
        scopes: ["https://parametrized-endpoint/.default"],
        getTokenOptions: {
          claims: '{"access_token":{"nbf":{"essential":true, "value":"1603742800"}}}'
        } as GetTokenOptions
      }
    ]);
  });

  it(`should return false if the response has an invalid claims parameter on the WWW-Authenticate header`, async function() {
    const request = createPipelineRequest({ url: "https://example.com" });
    const getAccessTokenParameters: {
      scopes: string | string[];
      getTokenOptions: GetTokenOptions;
    }[] = [];

    const result = await authorizeRequestOnClaimChallenge({
      async getAccessToken(scopes, getTokenOptions) {
        getAccessTokenParameters.push({ scopes, getTokenOptions });
        return null;
      },
      scopes: ["https://parametrized-endpoint/.default"],
      response: {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token"`
        }),
        request,
        status: 401
      },
      request
    });

    assert.isFalse(result);

    assert.deepEqual(getAccessTokenParameters, []);
  });

  it(`should return false if the response has no WWW-Authenticate header`, async function() {
    const request = createPipelineRequest({ url: "https://example.com" });
    const getAccessTokenParameters: {
      scopes: string | string[];
      getTokenOptions: GetTokenOptions;
    }[] = [];

    const result = await authorizeRequestOnClaimChallenge({
      async getAccessToken(scopes, getTokenOptions) {
        getAccessTokenParameters.push({ scopes, getTokenOptions });
        return null;
      },
      scopes: ["https://parametrized-endpoint/.default"],
      response: {
        headers: createHttpHeaders({}),
        request,
        status: 401
      },
      request
    });

    assert.isFalse(result);

    assert.deepEqual(getAccessTokenParameters, []);
  });

  describe("(Internal) parseCAEChallenge", function() {
    it("correctly parses a CAE challenge", function() {
      const utf8Claims = `Bearer a="b", c="d", Bearer d="e", f="g"`;
      const result = parseCAEChallenge(utf8Claims);
      assert.deepEqual(result, [
        { a: "b", c: "d" },
        { d: "e", f: "g" }
      ]);
    });
  });

  describe("with the bearerTokenAuthenticationPolicy", function() {
    class MockRefreshAzureCredential implements TokenCredential {
      public authCount = 0;
      public scopesAndClaims: {
        scope: string | string[];
        challengeClaims: string | undefined;
      }[] = [];
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

    it("tests that the scope and the claim have been passed through to getToken correctly - with @azure/core-client's authorizeRequestOnClaimChallenge", async function() {
      const expected = {
        scope: ["http://localhost/.default"],
        challengeClaims: JSON.stringify({
          access_token: { foo: "bar" }
        })
      };

      const pipelineRequest = createPipelineRequest({ url: "https://example.com" });
      const responses: PipelineResponse[] = [
        {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer scope="${expected.scope[0]}", claims="${encodeString(
              expected.challengeClaims
            )}"`
          }),
          request: pipelineRequest,
          status: 401
        },
        {
          headers: createHttpHeaders(),
          request: pipelineRequest,
          status: 200
        }
      ];

      const expiresOn = Date.now() + 5000;
      const getTokenResponse = { token: "mock-token", expiresOnTimestamp: expiresOn };
      const credential = new MockRefreshAzureCredential([getTokenResponse]);

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
          authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge
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

      await pipeline.sendRequest(testHttpsClient, pipelineRequest);

      assert.deepEqual(credential.scopesAndClaims, [
        {
          scope: expected.scope,
          challengeClaims: expected.challengeClaims
        }
      ]);
      assert.deepEqual(finalSendRequestHeaders, [undefined, `Bearer ${getTokenResponse.token}`]);
    });
  });

  it(`a custom logger should log a reasonable message if no challenge is received`, async function() {
    const request = createPipelineRequest({ url: "https://example.com" });
    const getAccessTokenParameters: {
      scopes: string | string[];
      getTokenOptions: GetTokenOptions;
    }[] = [];

    const allParams: any[] = [];
    const logger: any = {
      info: (...params: any) => allParams.push(params)
    };

    const result = await authorizeRequestOnClaimChallenge({
      async getAccessToken(scopes, getTokenOptions) {
        getAccessTokenParameters.push({ scopes, getTokenOptions });
        return {
          token: "accessToken",
          expiresOnTimestamp: new Date().getTime()
        };
      },
      scopes: [],
      response: {
        headers: createHttpHeaders(),
        request,
        status: 401
      },
      request,
      logger
    });

    assert.isFalse(result, "We provided no challenge, so it should return false.");

    assert.equal(
      allParams.map((x) => x.join(" ")).join("\n"),
      `The WWW-Authenticate header was missing. Failed to perform the Continuous Access Evaluation authentication flow.`
    );
  });

  it(`a custom logger should log a reasonable message if a bad challenge is received`, async function() {
    const request = createPipelineRequest({ url: "https://example.com" });
    const getAccessTokenParameters: {
      scopes: string | string[];
      getTokenOptions: GetTokenOptions;
    }[] = [];

    const allParams: any[] = [];
    const logger: any = {
      info: (...params: any) => allParams.push(params)
    };

    const result = await authorizeRequestOnClaimChallenge({
      async getAccessToken(scopes, getTokenOptions) {
        getAccessTokenParameters.push({ scopes, getTokenOptions });
        return {
          token: "accessToken",
          expiresOnTimestamp: new Date().getTime()
        };
      },
      scopes: [],
      response: {
        headers: createHttpHeaders({
          "WWW-Authenticate": [
            `Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token"`,
            `error_description="User session has been revoked"`,
            `scope="https://endpoint/.default"`,
            // Bad challenge
            `claims=""`
          ].join(", ")
        }),
        request,
        status: 401
      },
      request,
      logger
    });

    assert.isFalse(result, "We provided a bad challenge, so it should return false.");

    assert.equal(
      allParams.map((x) => x.join(" ")).join("\n"),
      `The WWW-Authenticate header was missing the necessary "claims" to perform the Continuous Access Evaluation authentication flow.`
    );
  });
});

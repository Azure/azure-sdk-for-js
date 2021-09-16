// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { assert } from "chai";
import {
  authorizeRequestOnClaimChallenge,
  parseCAEChallenge
} from "../src/authorizeRequestOnClaimChallenge";

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
});

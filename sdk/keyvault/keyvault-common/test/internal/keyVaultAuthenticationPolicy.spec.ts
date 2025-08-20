// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pipeline, PipelineRequest, SendRequest } from "@azure/core-rest-pipeline";
import {
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { parseWWWAuthenticateHeader } from "$internal/parseWWWAuthenticate.js";
import { describe, it, beforeEach, expect, vi } from "vitest";
import type { TokenCredential } from "@azure/core-auth";
import { keyVaultAuthenticationPolicy } from "@azure/keyvault-common";

const caeChallenge = `Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNzI2MDc3NTk1In0sInhtc19jYWVlcnJvciI6eyJ2YWx1ZSI6IjEwMDEyIn19fQ=="`;
const caeClaims = `{"access_token":{"nbf":{"essential":true,"value":"1726077595"},"xms_caeerror":{"value":"10012"}}}`;

const challengeResponse: SendRequest = async (req) => {
  expect(req.body).toBeNull();
  return {
    headers: createHttpHeaders({
      "WWW-Authenticate": `Bearer resource="https://vault.azure.net", authorization="http://login.windows.net/testTenantId"`,
    }),
    status: 401,
    request: req,
  };
};

const caeChallengeResponse: SendRequest = async (req) => ({
  headers: createHttpHeaders({
    "WWW-Authenticate": caeChallenge,
  }),
  request: req,
  status: 401,
});

const successfulResponseWith =
  (options: { expectAuthorizationHeader?: string; responseBody?: string } = {}): SendRequest =>
  async (req) => {
    if (options.expectAuthorizationHeader) {
      expect(req.headers.get("Authorization")).toEqual(options.expectAuthorizationHeader);
    }

    return {
      headers: createHttpHeaders({}),
      request: req,
      bodyAsText: options.responseBody,
      status: options.responseBody ? 200 : 204,
    };
  };

const TOKEN_EXPIRY = 10000;

const mockCredential: TokenCredential = {
  getToken: async (scopes, options) => {
    const [scope] = Array.isArray(scopes) ? scopes : [scopes];
    expect(scope).toBe("https://vault.azure.net/.default");
    expect(options?.tenantId).toBe("testTenantId");
    expect(options?.enableCae).toBe(true);
    const later = new Date().getTime() + TOKEN_EXPIRY;

    if (options?.claims) {
      expect(options.claims).toBe(caeClaims);
      return {
        token: "cae_token",
        expiresOnTimestamp: later,
      };
    } else {
      return {
        token: "access_token",
        expiresOnTimestamp: later,
      };
    }
  },
};

describe("Challenge based authentication tests", function () {
  let request: PipelineRequest;
  let pipeline: Pipeline;

  beforeEach(() => {
    request = createPipelineRequest({ url: "https://myvault.vault.azure.net" });
    pipeline = createEmptyPipeline();
    pipeline.addPolicy(keyVaultAuthenticationPolicy(mockCredential));
  });

  it("handles a challenge", async () => {
    const sendRequest = vi
      .fn<SendRequest>()
      .mockImplementationOnce(challengeResponse)
      .mockImplementationOnce(
        successfulResponseWith({ expectAuthorizationHeader: "Bearer access_token" }),
      );

    const rsp = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp.status).toBe(204);
  });

  it("handles a CAE challenge that comes immediately after a successful Key Vault challenge", async () => {
    const sendRequest = vi
      .fn<SendRequest>()
      // First, send the standard challenge
      .mockImplementationOnce(challengeResponse)
      // Then send a CAE challenge immediately after
      .mockImplementationOnce(caeChallengeResponse)
      // Finally, send a successful response, but only after asserting that the token in the Authorization header was obtained by passing the scopes through to the credential.
      .mockImplementationOnce(
        successfulResponseWith({ expectAuthorizationHeader: "Bearer cae_token" }),
      );

    const rsp = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp.status).toBe(204);
  });

  it("handles a CAE challenge where the Base64-encoded claims do not have the correct padding", async () => {
    const sendRequest = vi
      .fn<SendRequest>()
      // First, send the standard challenge
      .mockImplementationOnce(challengeResponse)
      // Then send a CAE challenge immediately after. In this case the padding == at the end of the `claims` has been removed
      .mockImplementationOnce(async (req) => ({
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNzI2MDc3NTk1In0sInhtc19jYWVlcnJvciI6eyJ2YWx1ZSI6IjEwMDEyIn19fQ"`,
        }),
        request: req,
        status: 401,
      }))
      // Finally, send a successful response, but only after asserting that the token in the Authorization header was obtained by passing the scopes through to the credential.
      .mockImplementationOnce(
        successfulResponseWith({ expectAuthorizationHeader: "Bearer cae_token" }),
      );

    const rsp = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp.status).toBe(204);
  });

  it("handles a CAE challenge that comes a few requests after the initial request", async () => {
    const sendRequest = vi
      .fn<SendRequest>()
      // First, send the standard challenge
      .mockImplementationOnce(challengeResponse)
      // Then, send a successful response, but only after asserting that the token in the Authorization header was obtained
      .mockImplementationOnce(
        successfulResponseWith({
          expectAuthorizationHeader: "Bearer access_token",
          responseBody: "response 1",
        }),
      )
      // Do that again
      .mockImplementationOnce(
        successfulResponseWith({
          expectAuthorizationHeader: "Bearer access_token",
          responseBody: "response 2",
        }),
      )
      // Then provide a CAE challenge
      .mockImplementationOnce(caeChallengeResponse)
      // After the CAE challenge, send a successful response, but only after asserting that the token in the Authorization header was obtained by passing the claims through to the credential.
      .mockImplementationOnce(
        successfulResponseWith({
          expectAuthorizationHeader: "Bearer cae_token",
          responseBody: "response 3",
        }),
      )
      // Next request, we should again get the token we got after the CAE challenge.
      .mockImplementationOnce(
        successfulResponseWith({
          expectAuthorizationHeader: "Bearer cae_token",
          responseBody: "response 4",
        }),
      );

    // First request will get the standard challenge followed by a 200
    const rsp = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp.status).toBe(200);
    expect(rsp.bodyAsText).toBe("response 1");

    // Making the request a second time should result in a 200 immediately
    const rsp2 = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp2.status).toBe(200);
    expect(rsp2.bodyAsText).toBe("response 2");

    // The third request will get a CAE challenge, which will get handled and then we will get another 200.
    const rsp3 = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp3.status).toBe(200);
    expect(rsp3.bodyAsText).toBe("response 3");

    // The fourth request should not have any challenge to handle and we will ultimately get a 200 status.
    const rsp4 = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp4.status).toBe(200);
    expect(rsp4.bodyAsText).toBe("response 4");
  });

  it("does not handle multiple consecutive CAE challenges", async () => {
    const sendRequest = vi
      .fn<SendRequest>()
      // First, send the standard challenge
      .mockImplementationOnce(challengeResponse)
      // Then provide a CAE challenge
      .mockImplementationOnce(caeChallengeResponse)
      // Then another CAE challenge. This challenge should not be handled
      .mockImplementationOnce(async (req) => ({
        headers: createHttpHeaders({
          "WWW-Authenticate": caeChallenge,
        }),
        request: req,
        bodyAsText: "CAE challenge 2",
        status: 401,
      }));

    // Should be a 401
    const rsp = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp.status).toBe(401);
    expect(rsp.bodyAsText).toBe("CAE challenge 2");
  });

  it("subsequent calls to getToken do not have claims after the initial call to CAE getToken", async () => {
    vi.useFakeTimers();

    const sendRequest = vi
      .fn<SendRequest>()
      .mockImplementationOnce(challengeResponse)
      .mockImplementationOnce(caeChallengeResponse)
      .mockImplementationOnce(
        successfulResponseWith({ expectAuthorizationHeader: "Bearer cae_token" }),
      )
      // This response will happen after we advance the system clock. Another call to getToken will be made. This
      // call should not have `claims` set, and so the token retrieved from the mock credential will be access_token and not cae_token
      .mockImplementationOnce(
        successfulResponseWith({
          expectAuthorizationHeader: "Bearer access_token",
          responseBody: "response 2",
        }),
      );

    const rsp1 = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp1.status).toBe(204);

    // Update system time to force token expiry
    vi.setSystemTime(new Date().getTime() + TOKEN_EXPIRY);
    const rsp2 = await pipeline.sendRequest({ sendRequest }, request);
    expect(rsp2.status).toBe(200);
    expect(rsp2.bodyAsText).toBe("response 2");

    vi.useRealTimers();
  });

  describe("parseWWWAuthenticateHeader tests", () => {
    it("Should work for known shapes of the WWW-Authenticate header", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net", resource="https://some.url"`;
      const parsed1 = parseWWWAuthenticateHeader(wwwAuthenticate1);
      expect(parsed1).to.deep.equal({
        authorization: "https://login.windows.net",
        resource: "https://some.url",
      });

      const wwwAuthenticate2 = `Bearer authorization="https://login.windows.net/", scope="https://some.url"`;
      const parsed2 = parseWWWAuthenticateHeader(wwwAuthenticate2);
      expect(parsed2).to.deep.equal({
        authorization: "https://login.windows.net/",
        scope: "https://some.url",
      });
    });

    it("Should ignore unknown values in the WWW-Authenticate header", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net", resource="https://some.url" scope="scope", a="a", b="b"`;
      const parsed1 = parseWWWAuthenticateHeader(wwwAuthenticate1);
      expect(parsed1).to.deep.equal({
        authorization: "https://login.windows.net",
        resource: "https://some.url",
        scope: "scope",
      });
    });

    it("should include the tenantId when present", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net/9999", resource="https://some.url"`;
      const parsed1 = parseWWWAuthenticateHeader(wwwAuthenticate1);
      expect(parsed1).to.deep.equal({
        authorization: "https://login.windows.net/9999",
        resource: "https://some.url",
        tenantId: "9999",
      });
    });

    it("should handle Base64-encoded claims", () => {
      const header = `Bearer claims="SGVsbG8=", error="insufficient_claims"`;
      const parsed = parseWWWAuthenticateHeader(header);
      expect(parsed).to.deep.equal({
        claims: "SGVsbG8=",
        error: "insufficient_claims",
      });
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AuthorizeRequestOptions,
  ChallengeCallbacks,
  PipelineRequest,
  SendRequest,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import {
  addKeyVaultAuthenticationPolicies,
  createKeyVaultChallengeCallbacks,
} from "../../src/index.js";
import { parseWWWAuthenticateHeader } from "../../src/parseWWWAuthenticate.js";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { TokenCredential } from "@azure/core-auth";

const caeChallenge = `Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNzI2MDc3NTk1In0sInhtc19jYWVlcnJvciI6eyJ2YWx1ZSI6IjEwMDEyIn19fQ=="`;
const caeClaims = `{"access_token":{"nbf":{"essential":true,"value":"1726077595"},"xms_caeerror":{"value":"10012"}}}`;

const mockCredential: TokenCredential = {
  getToken: async (scopes, options) => {
    const [scope] = Array.isArray(scopes) ? scopes : [scopes];
    expect(scope).toBe("https://vault.azure.net/.default");
    expect(options?.tenantId).toBe("testTenantId");

    if (options?.claims) {
      expect(options.claims).toBe(caeClaims);
      return {
        token: "cae_token",
        expiresOnTimestamp: 999999999,
      };
    } else {
      return {
        token: "access_token",
        expiresOnTimestamp: 999999999,
      };
    }
  },
};

describe("Challenge based authentication tests", function () {
  let request: PipelineRequest;
  let challengeCallbacks: ChallengeCallbacks;

  beforeEach(() => {
    request = createPipelineRequest({ url: "https://myvault.vault.azure.net" });
    challengeCallbacks = createKeyVaultChallengeCallbacks();
  });

  describe("authorizeRequest", () => {
    it("always starts the challenge on the first call", async () => {
      let getAccessTokenCallCount = 0;
      const options: AuthorizeRequestOptions = {
        getAccessToken: () => {
          getAccessTokenCallCount += 1;
          return Promise.resolve({ token: "access_token", expiresOnTimestamp: 1000 });
        },
        request,
        scopes: [],
      };

      await challengeCallbacks.authorizeRequest!(options);

      expect(options.request.headers.get("authorization")).toBeUndefined();
      // We do not call getAccessToken on the first request
      expect(getAccessTokenCallCount).toEqual(0);
    });

    it("sets the authorization token if it gets one on subsequent calls", async () => {
      let getAccessTokenCallCount = 0;
      const options: AuthorizeRequestOptions = {
        getAccessToken: () => {
          getAccessTokenCallCount += 1;
          return Promise.resolve({ token: "access_token", expiresOnTimestamp: 1000 });
        },
        request,
        scopes: [],
      };

      // Set up the challenge state to complete by calling authorizeRequestOnChallenge first
      await challengeCallbacks.authorizeRequestOnChallenge!({
        getAccessToken: () => {
          return Promise.resolve({ token: "successful_token", expiresOnTimestamp: 999999999 });
        },
        request,
        response: {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });

      await challengeCallbacks.authorizeRequest!(options);

      expect(options.request.headers.get("authorization")).toEqual("Bearer access_token");
      expect(getAccessTokenCallCount).toEqual(1);
    });

    it("does not modify headers when unable to get access token", async () => {
      const options: AuthorizeRequestOptions = {
        getAccessToken: () => {
          return Promise.resolve(null);
        },
        request: createPipelineRequest({
          url: "https://foo.bar",
          headers: createHttpHeaders(),
        }),
        scopes: ["any_scope"],
      };

      await challengeCallbacks.authorizeRequest!(options);

      expect(options.request.headers.get("authorization")).toBeUndefined();
    });
  });

  describe("Continuous Access Evaluation (CAE)", () => {
    it("handles a CAE challenge that comes immediately after a successful challenge", async () => {
      const pipeline = createEmptyPipeline();
      addKeyVaultAuthenticationPolicies(pipeline, {
        scopes: [],
        credential: mockCredential,
      });

      const sendRequest = vi
        .fn<SendRequest>()
        // First, send the standard challenge
        .mockImplementationOnce(async (req) => ({
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net", tenantId="testTenantId"`,
          }),
          status: 401,
          request: req,
        }))
        // Then send a CAE challenge immediately after
        .mockImplementationOnce(async (req) => ({
          headers: createHttpHeaders({
            "WWW-Authenticate": caeChallenge,
          }),
          request: req,
          status: 401,
        }))
        // Finally, send a successful response, but only after asserting that the token in the Authorization header was obtained by passing the scopes through to the credential.
        .mockImplementationOnce(async (req) => {
          expect(req.headers.get("Authorization")).toEqual("Bearer cae_token");

          return {
            headers: createHttpHeaders({}),
            request: req,
            status: 204,
          };
        });

      const rsp = await pipeline.sendRequest({ sendRequest }, request);
      expect(rsp.status).toBe(204);
    });

    it("handles a CAE challenge where the Base64-encoded claims do not have the correct padding", async () => {
      const pipeline = createEmptyPipeline();
      addKeyVaultAuthenticationPolicies(pipeline, {
        scopes: [],
        credential: mockCredential,
      });

      const sendRequest = vi
        .fn<SendRequest>()
        // First, send the standard challenge
        .mockImplementationOnce(async (req) => ({
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net", tenantId="testTenantId"`,
          }),
          status: 401,
          request: req,
        }))
        // Then send a CAE challenge immediately after. In this case the padding == at the end of the `claims` has been removed
        .mockImplementationOnce(async (req) => ({
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNzI2MDc3NTk1In0sInhtc19jYWVlcnJvciI6eyJ2YWx1ZSI6IjEwMDEyIn19fQ=="`,
          }),
          request: req,
          status: 401,
        }))
        // Finally, send a successful response, but only after asserting that the token in the Authorization header was obtained by passing the scopes through to the credential.
        .mockImplementationOnce(async (req) => {
          expect(req.headers.get("Authorization")).toEqual("Bearer cae_token");

          return {
            headers: createHttpHeaders({}),
            request: req,
            status: 204,
          };
        });

      const rsp = await pipeline.sendRequest({ sendRequest }, request);
      expect(rsp.status).toBe(204);
    });

    it("handles a CAE challenge that comes a few requests after the initial request", async () => {
      const pipeline = createEmptyPipeline();
      addKeyVaultAuthenticationPolicies(pipeline, {
        scopes: [],
        credential: mockCredential,
      });

      const sendRequest = vi
        .fn<SendRequest>()
        // First, send the standard challenge
        .mockImplementationOnce(async (req) => ({
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net", tenantId="testTenantId"`,
          }),
          status: 401,
          request: req,
        }))
        // Then, send a successful response, but only after asserting that the token in the Authorization header was obtained
        .mockImplementationOnce(async (req) => {
          expect(req.headers.get("Authorization")).toEqual("Bearer access_token");

          return {
            headers: createHttpHeaders({}),
            request: req,
            bodyAsText: "response 1",
            status: 204,
          };
        })
        // Do that again
        .mockImplementationOnce(async (req) => {
          expect(req.headers.get("Authorization")).toEqual("Bearer access_token");

          return {
            headers: createHttpHeaders({}),
            request: req,
            bodyAsText: "response 2",
            status: 204,
          };
        })
        // Then provide a CAE challenge
        .mockImplementationOnce(async (req) => ({
          headers: createHttpHeaders({
            "WWW-Authenticate": caeChallenge,
          }),
          request: req,
          status: 401,
        }))
        // After the CAE challenge, send a successful response, but only after asserting that the token in the Authorization header was obtained by passing the scopes through to the credential.
        .mockImplementationOnce(async (req) => {
          expect(req.headers.get("Authorization")).toEqual("Bearer cae_token");

          return {
            headers: createHttpHeaders({}),
            request: req,
            bodyAsText: "response 3",
            status: 204,
          };
        })
        // Next request, though, we should NOT expect the CAE token and instead should get a access_token
        .mockImplementationOnce(async (req) => {
          expect(req.headers.get("Authorization")).toEqual("Bearer access_token");

          return {
            headers: createHttpHeaders({}),
            request: req,
            bodyAsText: "response 4",
            status: 204,
          };
        });

      // First request will get the standard challenge followed by a 204
      const rsp = await pipeline.sendRequest({ sendRequest }, request);
      expect(rsp.status).toBe(204);
      expect(rsp.bodyAsText).toBe("response 1");

      // Making the request a second time should result in a 204 immediately
      const rsp2 = await pipeline.sendRequest({ sendRequest }, request);
      expect(rsp2.status).toBe(204);
      expect(rsp2.bodyAsText).toBe("response 2");

      // The third request will get a CAE challenge, which will get handled and then we will get another 204.
      const rsp3 = await pipeline.sendRequest({ sendRequest }, request);
      expect(rsp3.status).toBe(204);
      expect(rsp3.bodyAsText).toBe("response 3");

      // The fourth request should be a normal request and should use the normal token, not a CAE token
      const rsp4 = await pipeline.sendRequest({ sendRequest }, request);
      expect(rsp4.status).toBe(204);
      expect(rsp4.bodyAsText).toBe("response 4");
    });

    it("does not handle multiple consecutive CAE challenges", async () => {
      const pipeline = createEmptyPipeline();
      addKeyVaultAuthenticationPolicies(pipeline, {
        scopes: [],
        credential: mockCredential,
      });

      const sendRequest = vi
        .fn<SendRequest>()
        // First, send the standard challenge
        .mockImplementationOnce(async (req) => ({
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net", tenantId="testTenantId"`,
          }),
          status: 401,
          request: req,
        }))
        // Then provide a CAE challenge
        .mockImplementationOnce(async (req) => ({
          headers: createHttpHeaders({
            "WWW-Authenticate": caeChallenge,
          }),
          request: req,
          bodyAsText: "CAE challenge 1",
          status: 401,
        }))
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
  });

  describe("authorizeRequestOnChallenge", () => {
    it("validates WWW-Authenticate exists", async () => {
      await expect(
        challengeCallbacks.authorizeRequestOnChallenge!({
          getAccessToken: () => Promise.resolve(null),
          request,
          response: {
            headers: createHttpHeaders(),
            request,
            status: 200,
          },
          scopes: [],
        }),
      ).rejects.toThrow("Missing challenge");
    });

    it("passes the correct scopes if provided", async () => {
      let getAccessTokenScopes: string[] = [];
      await challengeCallbacks.authorizeRequestOnChallenge!({
        getAccessToken: (scopes) => {
          getAccessTokenScopes = scopes;
          return Promise.resolve(null);
        },
        request,
        response: {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });

      expect(getAccessTokenScopes).to.deep.equal(["https://vault.azure.net/.default"]);
    });

    it("throws if the resource is not a valid URL", async () => {
      await expect(
        challengeCallbacks.authorizeRequestOnChallenge!({
          getAccessToken: () => Promise.resolve(null),
          request,
          response: {
            headers: createHttpHeaders({
              "WWW-Authenticate": `Bearer resource="invalid_scope"`,
            }),
            request,
            status: 200,
          },
          scopes: [],
        }),
      ).rejects.toThrow(`The challenge contains invalid scope 'invalid_scope/.default'`);
    });

    it("throws if the resource URI host does not match the request by default", async () => {
      await expect(
        challengeCallbacks.authorizeRequestOnChallenge!({
          getAccessToken: () => Promise.resolve(null),
          request: createPipelineRequest({ url: "https://foo.bar" }),
          response: {
            headers: createHttpHeaders({
              "WWW-Authenticate": `Bearer resource="https://vault.azure.net"`,
            }),
            request,
            status: 200,
          },
          scopes: [],
        }),
      ).rejects.toThrow(
        "The challenge resource 'vault.azure.net' does not match the requested domain. Set disableChallengeResourceVerification to true in your client options to disable. See https://aka.ms/azsdk/blog/vault-uri for more information.",
      );
    });

    it("throws if the request host is a prefix, but not a subdomain, of the resource URI host", async () => {
      await expect(
        challengeCallbacks.authorizeRequestOnChallenge!({
          getAccessToken: () => Promise.resolve(null),
          request: createPipelineRequest({ url: "https://myvault.azure.net" }),
          response: {
            headers: createHttpHeaders({
              "WWW-Authenticate": `Bearer resource="https://vault.azure.net"`,
            }),
            request,
            status: 200,
          },
          scopes: [],
        }),
      ).rejects.toThrow(
        "The challenge resource 'vault.azure.net' does not match the requested domain. Set disableChallengeResourceVerification to true in your client options to disable. See https://aka.ms/azsdk/blog/vault-uri for more information.",
      );
    });

    it("does not throw if the resource URI matches the request", async () => {
      await challengeCallbacks.authorizeRequestOnChallenge!({
        getAccessToken: () => Promise.resolve(null),
        request: createPipelineRequest({ url: "https://myvault.vault.azure.net" }),
        response: {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });
    });

    it("does not throw if the resource URI host does not match the request but verifyChallengeResource is false", async () => {
      challengeCallbacks = createKeyVaultChallengeCallbacks({
        disableChallengeResourceVerification: true,
      });
      await challengeCallbacks.authorizeRequestOnChallenge!({
        getAccessToken: () => Promise.resolve(null),
        request: createPipelineRequest({ url: "https://foo.bar" }),
        response: {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });
    });

    it("passes the tenantId if provided", async () => {
      const expectedTenantId = "expectedTenantId";

      let getAccessTokenTenantId: string | undefined = "";

      await challengeCallbacks.authorizeRequestOnChallenge!({
        getAccessToken: (_scopes, options) => {
          getAccessTokenTenantId = options.tenantId;
          return Promise.resolve(null);
        },
        request,
        response: {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net" authorization="http://login.windows.net/${expectedTenantId}"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });

      expect(getAccessTokenTenantId).toEqual(expectedTenantId);
    });

    it("returns true and sets the authorization header if challenge succeeds", async () => {
      const result = await challengeCallbacks.authorizeRequestOnChallenge!({
        getAccessToken: () => {
          return Promise.resolve({ token: "successful_token", expiresOnTimestamp: 999999999 });
        },
        request,
        response: {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });
      expect(result).toEqual(true);
    });

    it("returns false and does not modify header if challenge fails", async () => {
      const result = await challengeCallbacks.authorizeRequestOnChallenge!({
        getAccessToken: () => {
          return Promise.resolve(null);
        },
        request,
        response: {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });
      expect(result).toEqual(false);
    });
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

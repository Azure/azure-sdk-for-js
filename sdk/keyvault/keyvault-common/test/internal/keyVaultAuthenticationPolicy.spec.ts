// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pipeline, PipelineRequest, SendRequest } from "@azure/core-rest-pipeline";
import {
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  redirectPolicy,
} from "@azure/core-rest-pipeline";
import { parseWWWAuthenticateHeader } from "../../src/parseWWWAuthenticate.js";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import type { TokenCredential } from "@azure/core-auth";
import { keyVaultAuthenticationPolicy } from "../../src/keyVaultAuthenticationPolicy.js";

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

  describe("challenge resource validation", () => {
    let getToken: ReturnType<typeof vi.fn<TokenCredential["getToken"]>>;

    function resourceChallenge(
      resource: string,
      field: "resource" | "scope" = "resource",
    ): SendRequest {
      return async (req) => ({
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer ${field}="${resource}", authorization="https://login.windows.net/testTenantId"`,
        }),
        request: req,
        status: 401,
      });
    }

    beforeEach(() => {
      getToken = vi.fn<TokenCredential["getToken"]>().mockResolvedValue({
        token: "access_token",
        expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
      });
      pipeline = createEmptyPipeline();
      pipeline.addPolicy(keyVaultAuthenticationPolicy({ getToken }));
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    for (const field of ["resource", "scope"] as const) {
      it.each([
        "https://user@vault.azure.net",
        "https://user:password@vault.azure.net",
        "https://@vault.azure.net",
        "https://:@vault.azure.net",
        "https://user%40name@vault.azure.net",
        "https://user%40vault.azure.net",
        "https://%76ault.azure.net",
        "https:/vault.azure.net",
        "https:////vault.azure.net",
        "https://",
        "https://vault.azure.net:invalid",
        "https://vault.azure.net\\@other.example",
        "https:\\\\vault.azure.net",
        "https://vault.\tazure.net",
        "https://vault.azure.net\u0000",
        "http://vault.azure.net",
        "//vault.azure.net",
        "not a URL",
      ])(`rejects ambiguous ${field} %j before acquiring a token`, async (resource) => {
        request.body = "original body";
        const value = field === "scope" ? `${resource}/.default` : resource;
        const sendRequest = vi
          .fn<SendRequest>()
          .mockImplementation(resourceChallenge(value, field));

        await expect(pipeline.sendRequest({ sendRequest }, request)).rejects.toThrow(
          "The challenge contains an invalid scope.",
        );
        expect(getToken).not.toHaveBeenCalled();
        expect(sendRequest).toHaveBeenCalledTimes(1);
        expect(request.headers.has("Authorization")).toBe(false);
        expect(request.body).toBe("original body");
      });

      it.each([
        ["https://vault.azure.net", "https://myvault.vault.azure.net"],
        ["https://managedhsm.azure.net", "https://myhsm.managedhsm.azure.net"],
        ["https://vault.usgovcloudapi.net", "https://myvault.vault.usgovcloudapi.net"],
        ["https://vault.azure.cn", "https://myvault.vault.azure.cn"],
        ["https://service.example", "https://vault.service.example"],
        ["HTTPS://VAULT.AZURE.NET", "https://myvault.vault.azure.net"],
        ["https://vault.azure.net:443", "https://myvault.vault.azure.net:443"],
        ["https://vault.azure.net/custom@path", "https://myvault.vault.azure.net"],
      ])(`accepts valid ${field} %s for %s`, async (resource, url) => {
        const scope = `${resource}/.default`;
        const sendRequest = vi
          .fn<SendRequest>()
          .mockImplementationOnce(resourceChallenge(field === "scope" ? scope : resource, field))
          .mockImplementation(
            successfulResponseWith({ expectAuthorizationHeader: "Bearer access_token" }),
          );

        await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url }));
        await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url }));
        expect(getToken).toHaveBeenCalledExactlyOnceWith([scope], expect.anything());
        expect(sendRequest).toHaveBeenCalledTimes(3);
      });
    }

    it.each([
      "https://vault.azure.net",
      "https://notvault.azure.net",
      "https://myvault.vault.azure.net.other.example",
      "https://other.example",
    ])("rejects an unrelated request domain %s", async (url) => {
      const sendRequest = vi.fn<SendRequest>().mockImplementation(challengeResponse);
      await expect(
        pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url })),
      ).rejects.toThrow("does not match the requested domain");
      expect(getToken).not.toHaveBeenCalled();
      expect(sendRequest).toHaveBeenCalledTimes(1);
    });

    it.each([false, true])(
      "revalidates a cached challenge before token use (expired: %s)",
      async (expired) => {
        const sendRequest = vi
          .fn<SendRequest>()
          .mockImplementationOnce(challengeResponse)
          .mockImplementation(successfulResponseWith());
        await pipeline.sendRequest({ sendRequest }, request);
        if (expired) {
          vi.spyOn(Date, "now").mockReturnValue(Date.now() + 2 * 60 * 60 * 1000);
        }
        const unrelatedRequest = createPipelineRequest({ url: "https://other.example" });
        await expect(pipeline.sendRequest({ sendRequest }, unrelatedRequest)).rejects.toThrow(
          "does not match the requested domain",
        );
        expect(getToken).toHaveBeenCalledTimes(1);
        expect(sendRequest).toHaveBeenCalledTimes(2);
        expect(unrelatedRequest.headers.has("Authorization")).toBe(false);
      },
    );

    it("does not present a cached token over HTTP", async () => {
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(challengeResponse)
        .mockImplementation(successfulResponseWith());
      await pipeline.sendRequest({ sendRequest }, request);
      await expect(
        pipeline.sendRequest(
          { sendRequest },
          createPipelineRequest({ url: "http://myvault.vault.azure.net" }),
        ),
      ).rejects.toThrow("The request URL must use HTTPS.");
      expect(getToken).toHaveBeenCalledTimes(1);
      expect(sendRequest).toHaveBeenCalledTimes(2);
    });

    it.each([false, true])(
      "keeps cross-origin redirects unauthenticated (enabled: %s)",
      async (allowCrossOriginRedirects) => {
        pipeline.addPolicy(redirectPolicy({ allowCrossOriginRedirects }));
        const sendRequest = vi
          .fn<SendRequest>()
          .mockImplementationOnce(challengeResponse)
          .mockImplementationOnce(async (req) => {
            expect(req.headers.get("Authorization")).toBe("Bearer access_token");
            return {
              headers: createHttpHeaders({ location: "https://other.example" }),
              request: req,
              status: 302,
            };
          })
          .mockImplementationOnce(async (req) => {
            expect(req.url).toBe("https://other.example/");
            expect(req.headers.has("Authorization")).toBe(false);
            return caeChallengeResponse(req);
          });
        if (allowCrossOriginRedirects) {
          await expect(pipeline.sendRequest({ sendRequest }, request)).rejects.toThrow(
            "does not match the requested domain",
          );
        } else {
          const response = await pipeline.sendRequest({ sendRequest }, request);
          expect(response.status).toBe(302);
        }
        expect(getToken).toHaveBeenCalledTimes(1);
        expect(sendRequest).toHaveBeenCalledTimes(allowCrossOriginRedirects ? 3 : 2);
      },
    );

    it("validates a new challenge even after a token has been cached", async () => {
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(challengeResponse)
        .mockImplementationOnce(successfulResponseWith())
        .mockImplementationOnce(resourceChallenge("https://user@vault.azure.net"));
      await pipeline.sendRequest({ sendRequest }, request);
      await expect(pipeline.sendRequest({ sendRequest }, request)).rejects.toThrow(
        "The challenge contains an invalid scope.",
      );
      expect(getToken).toHaveBeenCalledTimes(1);
      expect(sendRequest).toHaveBeenCalledTimes(3);
    });

    it("does not attach a token if the destination changes during credential acquisition", async () => {
      getToken.mockImplementationOnce(async () => {
        request.url = "https://other.example";
        return { token: "access_token", expiresOnTimestamp: Date.now() + 60 * 60 * 1000 };
      });
      const sendRequest = vi.fn<SendRequest>().mockImplementation(challengeResponse);
      await expect(pipeline.sendRequest({ sendRequest }, request)).rejects.toThrow(
        "does not match the requested domain",
      );
      expect(getToken).toHaveBeenCalledTimes(1);
      expect(sendRequest).toHaveBeenCalledTimes(1);
      expect(request.headers.has("Authorization")).toBe(false);
    });

    it("revalidates the cached challenge before acquiring a CAE token", async () => {
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(challengeResponse)
        .mockImplementationOnce(async (req) => {
          req.url = "https://other.example";
          req.headers.delete("Authorization");
          return caeChallengeResponse(req);
        });
      await expect(pipeline.sendRequest({ sendRequest }, request)).rejects.toThrow(
        "does not match the requested domain",
      );
      expect(getToken).toHaveBeenCalledTimes(1);
      expect(sendRequest).toHaveBeenCalledTimes(2);
      expect(request.headers.has("Authorization")).toBe(false);
    });

    it("does not reuse a cached token for a newly accepted scope", async () => {
      getToken.mockImplementation(async (scopes) => ({
        token: String(scopes),
        expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
      }));
      const url = "https://myvault.vault.azure.net";
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(challengeResponse)
        .mockImplementationOnce(
          successfulResponseWith({
            expectAuthorizationHeader: "Bearer https://vault.azure.net/.default",
          }),
        )
        .mockImplementationOnce(resourceChallenge("https://azure.net"))
        .mockImplementationOnce(
          successfulResponseWith({
            expectAuthorizationHeader: "Bearer https://azure.net/.default",
          }),
        )
        .mockImplementationOnce(
          successfulResponseWith({
            expectAuthorizationHeader: "Bearer https://azure.net/.default",
          }),
        );
      await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url }));
      await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url }));
      await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url }));
      expect(getToken).toHaveBeenCalledTimes(2);
      expect(getToken).toHaveBeenLastCalledWith(["https://azure.net/.default"], expect.anything());
    });

    it("does not trust the original endpoint after a continuation completes authentication elsewhere", async () => {
      const originalUrl = "https://other.example";
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(
          successfulResponseWith({
            responseBody: JSON.stringify({ value: [], nextLink: request.url }),
          }),
        )
        .mockImplementationOnce(resourceChallenge("https://vault.azure.net"))
        .mockImplementation(successfulResponseWith());
      await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url: originalUrl }));
      await pipeline.sendRequest({ sendRequest }, request);
      const originalRequest = createPipelineRequest({ url: originalUrl });
      await expect(pipeline.sendRequest({ sendRequest }, originalRequest)).rejects.toThrow(
        "does not match the requested domain",
      );
      expect(getToken).toHaveBeenCalledTimes(1);
      expect(sendRequest).toHaveBeenCalledTimes(3);
      expect(originalRequest.headers.has("Authorization")).toBe(false);
    });

    it("preserves the explicit challenge verification opt-out", async () => {
      pipeline = createEmptyPipeline();
      pipeline.addPolicy(
        keyVaultAuthenticationPolicy({ getToken }, { disableChallengeResourceVerification: true }),
      );
      const resource = "https://user@vault.azure.net";
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(resourceChallenge(resource))
        .mockImplementation(
          successfulResponseWith({ expectAuthorizationHeader: "Bearer access_token" }),
        );
      await pipeline.sendRequest({ sendRequest }, request);
      await pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: "https://other.example" }),
      );
      expect(getToken).toHaveBeenCalledExactlyOnceWith([`${resource}/.default`], expect.anything());
      expect(sendRequest).toHaveBeenCalledTimes(3);
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Pipeline,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import {
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  redirectPolicy,
} from "@azure/core-rest-pipeline";
import { parseWWWAuthenticateHeader } from "../../src/parseWWWAuthenticate.js";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import type { AccessToken, TokenCredential } from "@azure/core-auth";
import { createAbortablePromise } from "@azure/core-util";
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

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
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
      tenantId = "testTenantId",
    ): SendRequest {
      return async (req) => ({
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer ${field}="${resource}", authorization="https://login.windows.net/${tenantId}"`,
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
        "https://vault.azure.net:65536",
        "custom://:123",
        "https://vault.azure.net%2fother.example",
        "https://vault.azure.net%5cother.example",
        "https://vault.azure.net\\@other.example",
        "https:\\\\vault.azure.net",
        "https://vault.\tazure.net",
        "https://vault.azure.net\u0000",
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
        ["https://vault.azure.net:444", "https://myvault.vault.azure.net:8443"],
        ["http://vault.azure.net", "https://myvault.vault.azure.net"],
        ["custom://service.example", "https://vault.service.example"],
        ["https://vault.microsoftazure.de", "https://myvault.vault.microsoftazure.de"],
        ["https://managedhsm.azure.cn", "https://myhsm.managedhsm.azure.cn"],
        ["https://managedhsm.usgovcloudapi.net", "https://myhsm.managedhsm.usgovcloudapi.net"],
        ["https://vault.azure.net.", "https://myvault.vault.azure.net."],
        ["https://xn--bcher-kva.example", "https://vault.xn--bcher-kva.example"],
        ["https://b\u00fccher.example", "https://vault.b\u00fccher.example"],
        ["https://vault.azure.net/path%40part", "https://myvault.vault.azure.net"],
        ["https://vault.azure.net/path?name=value", "https://myvault.vault.azure.net"],
        ["https://vault.azure.net/path#fragment", "https://myvault.vault.azure.net"],
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

    it("does not restore a POST body discarded by a 303 redirect", async () => {
      pipeline.addPolicy(redirectPolicy());
      request.method = "POST";
      request.body = "original body";
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(async (req) => {
          expect(req.body).toBeNull();
          return {
            status: 303,
            headers: createHttpHeaders({ location: "/redirected" }),
            request: req,
          };
        })
        .mockImplementationOnce(resourceChallenge("https://vault.azure.net"))
        .mockImplementationOnce(async (req) => {
          expect(req.method).toBe("GET");
          expect(req.body).toBeUndefined();
          return successfulResponseWith({ expectAuthorizationHeader: "Bearer access_token" })(req);
        });
      await pipeline.sendRequest({ sendRequest }, request);
      expect(sendRequest).toHaveBeenCalledTimes(3);
    });

    it("propagates cancellation without sending a token and recovers on the next request", async () => {
      const controller = new AbortController();
      request.abortSignal = controller.signal;
      request.body = "original body";
      request.timeout = 1234;
      getToken.mockImplementationOnce((_scopes, options) => {
        expect(options?.abortSignal).toBe(controller.signal);
        expect(options?.requestOptions?.timeout).toBe(1234);
        return new Promise<AccessToken>((_resolve, reject) => {
          options?.abortSignal?.addEventListener(
            "abort",
            () => reject(new Error("operation aborted")),
            {
              once: true,
            },
          );
        });
      });
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementation(async (req) =>
          req.headers.has("Authorization")
            ? successfulResponseWith()(req)
            : resourceChallenge("https://vault.azure.net")(req),
        );
      const failedRequest = expect(pipeline.sendRequest({ sendRequest }, request)).rejects.toThrow(
        "operation aborted",
      );
      await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
      controller.abort();
      await failedRequest;
      expect(sendRequest).toHaveBeenCalledTimes(1);
      expect(request.body).toBe("original body");
      expect(request.headers.has("Authorization")).toBe(false);
      await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url: request.url }));
      expect(getToken).toHaveBeenCalledTimes(2);
      expect(sendRequest).toHaveBeenCalledTimes(3);
    });

    it("does not let a cancelled request fail another request using the same challenge", async () => {
      const controller = new AbortController();
      request.abortSignal = controller.signal;
      getToken.mockImplementationOnce((_scopes, options) =>
        createAbortablePromise<AccessToken>(() => {}, { abortSignal: options?.abortSignal }),
      );
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementation(async (req) =>
          req.headers.has("Authorization") ? successfulResponseWith()(req) : challengeResponse(req),
        );
      const cancelled = expect(
        pipeline.sendRequest({ sendRequest }, request),
      ).rejects.toMatchObject({
        name: "AbortError",
      });
      await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));

      const otherRequest = createPipelineRequest({ url: request.url });
      const other = expect(
        pipeline.sendRequest({ sendRequest }, otherRequest),
      ).resolves.toMatchObject({
        status: 204,
      });
      controller.abort();
      await Promise.all([cancelled, other]);

      expect(request.headers.has("Authorization")).toBe(false);
      expect(otherRequest.headers.get("Authorization")).toBe("Bearer access_token");
      await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url: request.url }));
      expect(getToken).toHaveBeenCalledTimes(2);
      expect(sendRequest).toHaveBeenCalledTimes(4);
    });

    it("surfaces a null credential result without caching an unusable token", async () => {
      getToken.mockResolvedValueOnce(null);
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementation(async (req) =>
          req.headers.has("Authorization")
            ? successfulResponseWith()(req)
            : resourceChallenge("https://vault.azure.net")(req),
        );
      await expect(pipeline.sendRequest({ sendRequest }, request)).rejects.toThrow(
        "Failed to refresh access token.",
      );
      expect(sendRequest).toHaveBeenCalledTimes(1);
      expect(request.headers.has("Authorization")).toBe(false);
      await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url: request.url }));
      expect(getToken).toHaveBeenCalledTimes(2);
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

    for (const failure of ["error", "null"] as const) {
      it.each([
        ["tenant", "https://vault.azure.net", "otherTenant"],
        ["scope", "https://azure.net", "testTenantId"],
      ])(
        `retains the successful context after a different %s returns ${failure}`,
        async (_changedContext, resource, tenantId) => {
          const sendRequest = vi
            .fn<SendRequest>()
            .mockImplementationOnce(challengeResponse)
            .mockImplementationOnce(successfulResponseWith())
            .mockImplementationOnce(resourceChallenge(resource, "resource", tenantId))
            .mockImplementation(
              successfulResponseWith({ expectAuthorizationHeader: "Bearer access_token" }),
            );
          await pipeline.sendRequest({ sendRequest }, request);
          if (failure === "error") {
            getToken.mockRejectedValue(new Error("replacement context rejected"));
          } else {
            getToken.mockResolvedValue(null);
          }
          await expect(
            pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url: request.url })),
          ).rejects.toThrow(
            failure === "error"
              ? "replacement context rejected"
              : "Failed to refresh access token.",
          );

          await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url: request.url }));
          expect(getToken).toHaveBeenCalledTimes(2);
          expect(getToken).toHaveBeenLastCalledWith(
            [`${resource}/.default`],
            expect.objectContaining({ tenantId }),
          );
          expect(sendRequest).toHaveBeenCalledTimes(4);
        },
      );
    }

    it("reaches a correcting challenge after the initial tenant is rejected", async () => {
      getToken.mockImplementation(async (_scopes, options) => {
        if (options?.tenantId === "rejectedTenant") {
          throw new Error("initial tenant rejected");
        }
        return { token: "access_token", expiresOnTimestamp: Date.now() + 60 * 60 * 1000 };
      });
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(
          resourceChallenge("https://vault.azure.net", "resource", "rejectedTenant"),
        )
        .mockImplementationOnce(challengeResponse)
        .mockImplementation(
          successfulResponseWith({ expectAuthorizationHeader: "Bearer access_token" }),
        );
      await expect(pipeline.sendRequest({ sendRequest }, request)).rejects.toThrow(
        "initial tenant rejected",
      );

      await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url: request.url }));
      expect(getToken).toHaveBeenCalledTimes(2);
      expect(getToken).toHaveBeenLastCalledWith(
        ["https://vault.azure.net/.default"],
        expect.objectContaining({ tenantId: "testTenantId" }),
      );
      expect(sendRequest).toHaveBeenCalledTimes(3);
    });

    it("uses the successful context while a replacement acquisition is pending", async () => {
      const sendRequest = vi.fn<SendRequest>().mockImplementation(async (req) => {
        if (!req.headers.has("Authorization")) {
          return challengeResponse(req);
        }
        if (
          new URL(req.url).pathname === "/replace" &&
          req.headers.get("Authorization") === "Bearer access_token"
        ) {
          return resourceChallenge("https://vault.azure.net", "resource", "otherTenant")(req);
        }
        return successfulResponseWith()(req);
      });
      await pipeline.sendRequest({ sendRequest }, request);
      let finishReplacement!: (token: AccessToken) => void;
      getToken.mockImplementationOnce(
        () =>
          new Promise<AccessToken>((resolve) => {
            finishReplacement = resolve;
          }),
      );
      const replacing = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: `${request.url}/replace` }),
      );
      await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(2));
      const healthyRequest = createPipelineRequest({ url: request.url });
      let healthyCompleted = false;
      const healthy = pipeline.sendRequest({ sendRequest }, healthyRequest).then((response) => {
        healthyCompleted = true;
        return response;
      });
      await vi.waitFor(() => expect(healthyCompleted).toBe(true));
      expect(healthyRequest.headers.get("Authorization")).toBe("Bearer access_token");

      finishReplacement({
        token: "replacement_token",
        expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
      });
      await Promise.all([replacing, healthy]);
      const nextRequest = createPipelineRequest({ url: request.url });
      await pipeline.sendRequest({ sendRequest }, nextRequest);
      expect(nextRequest.headers.get("Authorization")).toBe("Bearer replacement_token");
      expect(getToken).toHaveBeenCalledTimes(2);
    });

    it("shares interleaved pending challenges without replacing a newer successful context", async () => {
      const sendRequest = vi.fn<SendRequest>().mockImplementation(async (req) => {
        if (!req.headers.has("Authorization")) {
          return challengeResponse(req);
        }
        const path = new URL(req.url).pathname;
        if (req.headers.get("Authorization") === "Bearer access_token" && path !== "/") {
          return resourceChallenge(
            "https://vault.azure.net",
            "resource",
            path.startsWith("/b") ? "tenantB" : "tenantC",
          )(req);
        }
        return successfulResponseWith()(req);
      });
      await pipeline.sendRequest({ sendRequest }, request);
      let finishB!: (token: AccessToken) => void;
      let finishC!: (token: AccessToken) => void;
      const pendingB = new Promise<AccessToken>((resolve) => {
        finishB = resolve;
      });
      const pendingC = new Promise<AccessToken>((resolve) => {
        finishC = resolve;
      });
      getToken.mockImplementation((_scopes, options) =>
        options?.tenantId === "tenantB" ? pendingB : pendingC,
      );
      const firstB = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: `${request.url}/b1` }),
      );
      await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(2));
      const c = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: `${request.url}/c` }),
      );
      await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(3));
      const secondB = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: `${request.url}/b2` }),
      );
      await vi.waitFor(() => expect(sendRequest).toHaveBeenCalledTimes(5));
      finishC({ token: "tenant_c_token", expiresOnTimestamp: Date.now() + 60 * 60 * 1000 });
      await c;
      finishB({ token: "tenant_b_token", expiresOnTimestamp: Date.now() + 60 * 60 * 1000 });
      await Promise.all([firstB, secondB]);

      const nextRequest = createPipelineRequest({ url: request.url });
      await pipeline.sendRequest({ sendRequest }, nextRequest);
      expect(nextRequest.headers.get("Authorization")).toBe("Bearer tenant_c_token");
      expect(getToken).toHaveBeenCalledTimes(3);
    });

    for (const retainInitial of [false, true]) {
      it.each(["challenge", "CAE"])(
        `rejects stale %s cache updates after A/B/A transitions (retained initial: ${retainInitial})`,
        async (kind) => {
          const initialController = new AbortController();
          let finishInitial!: (token: AccessToken) => void;
          let finishStale!: (token: AccessToken) => void;
          const pendingInitial = new Promise<AccessToken>((resolve) => {
            finishInitial = resolve;
          });
          const pendingStale = new Promise<AccessToken>((resolve) => {
            finishStale = resolve;
          });
          getToken.mockImplementation(async (_scopes, options) => {
            if (options?.claims || options?.tenantId === "tenantC") {
              return pendingStale;
            }
            if (options?.abortSignal === initialController.signal) {
              return pendingInitial;
            }
            return {
              token: `token_${options?.tenantId}`,
              expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
            };
          });
          const sendRequest = vi.fn<SendRequest>().mockImplementation(async (req) => {
            const authorization = req.headers.get("Authorization");
            const path = new URL(req.url).pathname;
            if (!authorization || (path === "/a" && authorization !== "Bearer token_tenantA")) {
              return resourceChallenge("https://vault.azure.net", "resource", "tenantA")(req);
            }
            if (path === "/b" && authorization !== "Bearer token_tenantB") {
              return resourceChallenge("https://vault.azure.net", "resource", "tenantB")(req);
            }
            if (path === "/slow" && authorization === "Bearer token_tenantA") {
              return kind === "CAE"
                ? caeChallengeResponse(req)
                : resourceChallenge("https://special.vault.azure.net", "resource", "tenantC")(req);
            }
            if (path === "/healthy") {
              expect(authorization).toBe("Bearer token_tenantA");
            }
            return successfulResponseWith()(req);
          });
          let initial: Promise<PipelineResponse> | undefined;
          if (retainInitial) {
            initial = pipeline.sendRequest(
              { sendRequest },
              createPipelineRequest({
                url: `${request.url}/initial`,
                abortSignal: initialController.signal,
              }),
            );
            await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
          }
          try {
            await pipeline.sendRequest(
              { sendRequest },
              createPipelineRequest({
                url: `${request.url}/warm`,
                abortSignal: new AbortController().signal,
              }),
            );
            const stale = pipeline.sendRequest(
              { sendRequest },
              createPipelineRequest({
                url:
                  kind === "CAE"
                    ? `${request.url}/slow`
                    : "https://child.special.vault.azure.net/slow",
              }),
            );
            await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(retainInitial ? 3 : 2));
            await pipeline.sendRequest(
              { sendRequest },
              createPipelineRequest({ url: `${request.url}/b` }),
            );
            await pipeline.sendRequest(
              { sendRequest },
              createPipelineRequest({ url: `${request.url}/a` }),
            );
            finishStale({
              token: "stale_token",
              expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
            });
            await stale;

            const previousCalls = sendRequest.mock.calls.length;
            await pipeline.sendRequest(
              { sendRequest },
              createPipelineRequest({ url: `${request.url}/healthy` }),
            );
            expect(sendRequest).toHaveBeenCalledTimes(previousCalls + 1);
          } finally {
            finishInitial({
              token: "token_tenantA",
              expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
            });
            if (initial) {
              await initial;
            }
          }
        },
      );
    }

    it("does not replace a successful CAE context with a late initial acquisition", async () => {
      let finishSecond!: (token: AccessToken) => void;
      const pendingSecond = new Promise<AccessToken>((resolve) => {
        finishSecond = resolve;
      });
      const secondController = new AbortController();
      getToken.mockImplementation(async (_scopes, options) => {
        if (options?.claims) {
          return { token: "cae_token", expiresOnTimestamp: Date.now() + 60 * 60 * 1000 };
        }
        if (options?.abortSignal === secondController.signal) {
          return pendingSecond;
        }
        return { token: "access_token", expiresOnTimestamp: Date.now() + 60 * 60 * 1000 };
      });
      const sendRequest = vi.fn<SendRequest>().mockImplementation(async (req) => {
        if (!req.headers.has("Authorization")) {
          return challengeResponse(req);
        }
        if (
          new URL(req.url).pathname === "/first" &&
          req.headers.get("Authorization") === "Bearer access_token"
        ) {
          return caeChallengeResponse(req);
        }
        return successfulResponseWith()(req);
      });
      const first = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: `${request.url}/first` }),
      );
      const second = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({
          url: `${request.url}/second`,
          abortSignal: secondController.signal,
        }),
      );
      await first;
      expect(getToken).toHaveBeenCalledTimes(3);
      finishSecond({ token: "access_token", expiresOnTimestamp: Date.now() + 60 * 60 * 1000 });
      await second;

      const nextRequest = createPipelineRequest({ url: request.url });
      await pipeline.sendRequest({ sendRequest }, nextRequest);
      expect(nextRequest.headers.get("Authorization")).toBe("Bearer cae_token");
      expect(getToken).toHaveBeenCalledTimes(3);
    });

    it("keeps concurrent initial request bodies isolated until authentication", async () => {
      const firstRequest = createPipelineRequest({ url: request.url, body: "first body" });
      const secondRequest = createPipelineRequest({ url: request.url, body: "second body" });
      const bodies = new Map([
        [firstRequest, "first body"],
        [secondRequest, "second body"],
      ]);
      const sendRequest = vi.fn<SendRequest>().mockImplementation(async (req) => {
        if (!req.headers.has("Authorization")) {
          expect(req.body).toBeNull();
          return resourceChallenge("https://vault.azure.net")(req);
        }
        expect(req.body).toBe(bodies.get(req));
        return successfulResponseWith()(req);
      });

      await Promise.all([
        pipeline.sendRequest({ sendRequest }, firstRequest),
        pipeline.sendRequest({ sendRequest }, secondRequest),
      ]);

      expect(firstRequest.body).toBe("first body");
      expect(secondRequest.body).toBe("second body");
      expect(sendRequest).toHaveBeenCalledTimes(4);
    });

    it("coalesces concurrent token acquisition for identical challenges", async () => {
      let finishToken!: (token: AccessToken) => void;
      getToken.mockReturnValue(
        new Promise<AccessToken>((resolve) => {
          finishToken = resolve;
        }),
      );
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementation(async (req) =>
          req.headers.has("Authorization")
            ? successfulResponseWith()(req)
            : resourceChallenge("https://vault.azure.net")(req),
        );
      const first = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: request.url }),
      );
      const second = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: request.url }),
      );
      await vi.waitFor(() => expect(sendRequest).toHaveBeenCalledTimes(2));
      finishToken({ token: "access_token", expiresOnTimestamp: Date.now() + 60 * 60 * 1000 });
      await Promise.all([first, second]);
      expect(getToken).toHaveBeenCalledTimes(1);
      expect(sendRequest).toHaveBeenCalledTimes(4);
    });

    it("keeps the original request's scope and tenant during a concurrent CAE challenge", async () => {
      const firstRequest = createPipelineRequest({ url: request.url });
      let finishResponse!: (response: PipelineResponse) => void;
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(
          resourceChallenge("https://vault.azure.net", "resource", "firstTenant"),
        )
        .mockImplementationOnce(successfulResponseWith())
        .mockImplementationOnce(
          () =>
            new Promise<PipelineResponse>((resolve) => {
              finishResponse = resolve;
            }),
        )
        .mockImplementationOnce(resourceChallenge("https://azure.net", "resource", "secondTenant"))
        .mockImplementation(successfulResponseWith());
      await pipeline.sendRequest({ sendRequest }, request);
      const first = pipeline.sendRequest({ sendRequest }, firstRequest);
      await vi.waitFor(() => expect(sendRequest).toHaveBeenCalledTimes(3));
      await pipeline.sendRequest({ sendRequest }, createPipelineRequest({ url: request.url }));
      finishResponse(await caeChallengeResponse(firstRequest));
      await first;
      expect(getToken).toHaveBeenLastCalledWith(
        ["https://vault.azure.net/.default"],
        expect.objectContaining({ tenantId: "firstTenant", claims: caeClaims, enableCae: true }),
      );
      expect(getToken).toHaveBeenCalledTimes(3);
    });

    it("keeps concurrent claims challenges independent", async () => {
      let finishFirstToken!: (token: AccessToken) => void;
      const secondClaims = '{"access_token":{"xms_caeerror":{"value":"20012"}}}';
      getToken
        .mockResolvedValueOnce({
          token: "access_token",
          expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
        })
        .mockImplementationOnce(
          () =>
            new Promise<AccessToken>((resolve) => {
              finishFirstToken = resolve;
            }),
        )
        .mockResolvedValueOnce({
          token: "second_cae_token",
          expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
        });
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(challengeResponse)
        .mockImplementationOnce(successfulResponseWith())
        .mockImplementation(async (req) => {
          const first = new URL(req.url).pathname === "/first";
          if (req.headers.get("Authorization") === "Bearer access_token") {
            if (first) {
              return caeChallengeResponse(req);
            }
            return {
              status: 401,
              headers: createHttpHeaders({
                "WWW-Authenticate": `Bearer error="insufficient_claims", claims="${btoa(secondClaims)}"`,
              }),
              request: req,
            };
          }
          expect(req.headers.get("Authorization")).toBe(
            first ? "Bearer first_cae_token" : "Bearer second_cae_token",
          );
          return successfulResponseWith()(req);
        });
      await pipeline.sendRequest({ sendRequest }, request);
      const first = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: `${request.url}/first` }),
      );
      await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(2));
      const second = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: `${request.url}/second` }),
      );
      await vi.waitFor(() => expect(sendRequest.mock.calls.length).toBeGreaterThanOrEqual(4));
      finishFirstToken({
        token: "first_cae_token",
        expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
      });
      await Promise.all([first, second]);
      expect(getToken).toHaveBeenCalledTimes(3);
      expect(getToken).toHaveBeenNthCalledWith(
        2,
        ["https://vault.azure.net/.default"],
        expect.objectContaining({ claims: caeClaims }),
      );
      expect(getToken).toHaveBeenNthCalledWith(
        3,
        ["https://vault.azure.net/.default"],
        expect.objectContaining({ claims: secondClaims }),
      );
    });

    it("does not satisfy a CAE challenge with an in-flight refresh that has no claims", async () => {
      let finishRefresh!: (token: AccessToken) => void;
      getToken
        .mockResolvedValueOnce({
          token: "access_token",
          expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
          refreshAfterTimestamp: Date.now() - 1000,
        })
        .mockImplementationOnce(
          () =>
            new Promise<AccessToken>((resolve) => {
              finishRefresh = resolve;
            }),
        )
        .mockResolvedValueOnce({
          token: "cae_token",
          expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
        });
      const sendRequest = vi
        .fn<SendRequest>()
        .mockImplementationOnce(challengeResponse)
        .mockImplementationOnce(successfulResponseWith())
        .mockImplementationOnce(caeChallengeResponse)
        .mockImplementationOnce(
          successfulResponseWith({ expectAuthorizationHeader: "Bearer cae_token" }),
        );
      await pipeline.sendRequest({ sendRequest }, request);
      const second = pipeline.sendRequest(
        { sendRequest },
        createPipelineRequest({ url: request.url }),
      );
      await vi.waitFor(() => expect(sendRequest.mock.calls.length).toBeGreaterThanOrEqual(3));
      finishRefresh({
        token: "refresh_token",
        expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
      });
      await second;
      expect(getToken).toHaveBeenLastCalledWith(
        ["https://vault.azure.net/.default"],
        expect.objectContaining({ claims: caeClaims, enableCae: true }),
      );
      expect(getToken).toHaveBeenCalledTimes(3);
    });

    it.each(["missing challenge", "invalid challenge", "transport failure", "credential failure"])(
      "restores the original body and safely retries after %s",
      async (failure) => {
        const firstRequest = createPipelineRequest({ url: request.url, body: "first body" });
        const sendRequest = vi.fn<SendRequest>();
        if (failure === "missing challenge") {
          sendRequest.mockImplementationOnce(async (req) => ({
            status: 401,
            headers: createHttpHeaders(),
            request: req,
          }));
          await pipeline.sendRequest({ sendRequest }, firstRequest);
        } else {
          if (failure === "invalid challenge") {
            sendRequest.mockImplementationOnce(resourceChallenge("https://user@vault.azure.net"));
          } else if (failure === "transport failure") {
            sendRequest.mockRejectedValueOnce(new Error("transport failed"));
          } else {
            getToken.mockRejectedValueOnce(new Error("credential failed"));
            sendRequest.mockImplementationOnce(resourceChallenge("https://vault.azure.net"));
          }
          const expectedError =
            failure === "invalid challenge"
              ? "The challenge contains an invalid scope."
              : failure === "transport failure"
                ? "transport failed"
                : "credential failed";
          await expect(pipeline.sendRequest({ sendRequest }, firstRequest)).rejects.toThrow(
            expectedError,
          );
        }
        expect(firstRequest.body).toBe("first body");

        const secondRequest = createPipelineRequest({ url: request.url, body: "second body" });
        sendRequest.mockImplementation(async (req) => {
          if (!req.headers.has("Authorization")) {
            expect(req.body).toBeNull();
            return resourceChallenge("https://vault.azure.net")(req);
          }
          expect(req.body).toBe("second body");
          return successfulResponseWith()(req);
        });
        await pipeline.sendRequest({ sendRequest }, secondRequest);
        expect(secondRequest.body).toBe("second body");
        expect(secondRequest.headers.get("Authorization")).toBe("Bearer access_token");
      },
    );

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

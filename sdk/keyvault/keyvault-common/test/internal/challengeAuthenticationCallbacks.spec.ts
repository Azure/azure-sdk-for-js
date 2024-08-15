// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AuthorizeRequestOptions,
  ChallengeCallbacks,
  PipelineRequest,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { createKeyVaultChallengeCallbacks } from "../../src/index.js";
import { parseWWWAuthenticateHeader } from "../../src/parseWWWAuthenticate.js";
import { describe, it, assert } from "vitest";

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

      assert.notExists(options.request.headers.get("authorization"));
      // We do not call getAccessToken on the first request
      assert.equal(getAccessTokenCallCount, 0);
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

      assert.equal(1, getAccessTokenCallCount);
      assert.equal(options.request.headers.get("authorization"), "Bearer access_token");
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

      assert.notExists(options.request.headers.get("authorization"));
    });
  });

  describe("authorizeRequestOnChallenge", () => {
    it("validates WWW-Authenticate exists", async () => {
      await assert.isRejected(
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
        "Missing challenge",
      );
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

      assert.sameMembers(getAccessTokenScopes, ["https://vault.azure.net/.default"]);
    });

    it("throws if the resource is not a valid URL", async () => {
      await assert.isRejected(
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
        `The challenge contains invalid scope 'invalid_scope/.default'`,
      );
    });

    it("throws if the resource URI host does not match the request by default", async () => {
      await assert.isRejected(
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
        "The challenge resource 'vault.azure.net' does not match the requested domain. Set disableChallengeResourceVerification to true in your client options to disable. See https://aka.ms/azsdk/blog/vault-uri for more information.",
      );
    });

    it("throws if the request host is a prefix, but not a subdomain, of the resource URI host", async () => {
      await assert.isRejected(
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

      assert.equal(getAccessTokenTenantId, expectedTenantId);
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
      assert.isTrue(result);
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
      assert.isFalse(result);
    });
  });

  describe("parseWWWAuthenticateHeader tests", () => {
    it("Should work for known shapes of the WWW-Authenticate header", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net", resource="https://some.url"`;
      const parsed1 = parseWWWAuthenticateHeader(wwwAuthenticate1);
      assert.deepEqual(parsed1, {
        authorization: "https://login.windows.net",
        resource: "https://some.url",
      });

      const wwwAuthenticate2 = `Bearer authorization="https://login.windows.net/", scope="https://some.url"`;
      const parsed2 = parseWWWAuthenticateHeader(wwwAuthenticate2);
      assert.deepEqual(parsed2, {
        authorization: "https://login.windows.net/",
        scope: "https://some.url",
      });
    });

    it("Should ignore unknown values in the WWW-Authenticate header", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net", resource="https://some.url" scope="scope", a="a", b="b"`;
      const parsed1 = parseWWWAuthenticateHeader(wwwAuthenticate1);
      assert.deepEqual(parsed1, {
        authorization: "https://login.windows.net",
        resource: "https://some.url",
        scope: "scope",
      });
    });

    it("should include the tenantId when present", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net/9999", resource="https://some.url"`;
      const parsed1 = parseWWWAuthenticateHeader(wwwAuthenticate1);
      assert.deepEqual(parsed1, {
        authorization: "https://login.windows.net/9999",
        resource: "https://some.url",
        tenantId: "9999",
      });
    });
  });
});

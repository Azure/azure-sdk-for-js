// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { createChallengeCallbacks } from "../../src/challengeAuthenticationCallbacks";
import {
  AuthorizeRequestOptions,
  ChallengeCallbacks,
  createHttpHeaders,
  createPipelineRequest,
  PipelineRequest,
} from "@azure/core-rest-pipeline";
import { parseWWWAuthenticate } from "../../../keyvault-common/src";

describe("Challenge based authentication tests", function () {
  let request: PipelineRequest;
  let challengeCallbacks: ChallengeCallbacks;

  beforeEach(() => {
    request = createPipelineRequest({ url: "https://foo.bar" });
    challengeCallbacks = createChallengeCallbacks();
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
            "WWW-Authenticate": `Bearer resource="cae_scope"`,
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
        "Missing challenge"
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
            "WWW-Authenticate": `Bearer scope="cae_scope"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });

      assert.sameMembers(getAccessTokenScopes, ["cae_scope"]);
    });

    it("prefers resource scope and adds .default to resource when provided", async () => {
      let getAccessTokenScopes: string[] = [];
      await challengeCallbacks.authorizeRequestOnChallenge!({
        getAccessToken: (scopes) => {
          getAccessTokenScopes = scopes;
          return Promise.resolve(null);
        },
        request,
        response: {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="cae_resource", scope="cae_scope"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });

      assert.sameMembers(getAccessTokenScopes, ["cae_resource/.default"]);
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
            "WWW-Authenticate": `Bearer resource="cae_scope" authorization="http://login.windows.net/${expectedTenantId}"`,
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
            "WWW-Authenticate": `Bearer resource="cae_scope"`,
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
            "WWW-Authenticate": `Bearer resource="cae_scope"`,
          }),
          request,
          status: 200,
        },
        scopes: [],
      });
      assert.isFalse(result);
    });
  });

  describe("parseWWWAuthenticate tests", () => {
    it("Should work for known shapes of the WWW-Authenticate header", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net", resource="https://some.url"`;
      const parsed1 = parseWWWAuthenticate(wwwAuthenticate1);
      assert.deepEqual(parsed1, {
        authorization: "https://login.windows.net",
        resource: "https://some.url",
      });

      const wwwAuthenticate2 = `Bearer authorization="https://login.windows.net/", scope="https://some.url"`;
      const parsed2 = parseWWWAuthenticate(wwwAuthenticate2);
      assert.deepEqual(parsed2, {
        authorization: "https://login.windows.net/",
        scope: "https://some.url",
      });
    });

    it("Should ignore unknown values in the WWW-Authenticate header", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net", resource="https://some.url" scope="scope", a="a", b="b"`;
      const parsed1 = parseWWWAuthenticate(wwwAuthenticate1);
      assert.deepEqual(parsed1, {
        authorization: "https://login.windows.net",
        resource: "https://some.url",
        scope: "scope",
      });
    });

    it("should include the tenantId when present", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net/9999", resource="https://some.url"`;
      const parsed1 = parseWWWAuthenticate(wwwAuthenticate1);
      assert.deepEqual(parsed1, {
        authorization: "https://login.windows.net/9999",
        resource: "https://some.url",
        tenantId: "9999",
      });
    });
  });
});

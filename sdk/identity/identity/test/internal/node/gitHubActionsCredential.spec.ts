// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import {
  GitHubActionsCredential,
  handleOidcResponse,
  deriveAudience,
} from "$internal/credentials/gitHubActionsCredential.js";
import { IdentityClient } from "$internal/client/identityClient.js";
import { afterEach, describe, it, assert, vi } from "vitest";
import type { ClientAssertionCredential } from "@azure/identity";
import type { MsalClient } from "$internal/msal/nodeFlows/msalClient.js";

describe("GitHubActionsCredential (internal)", function () {
  afterEach(function () {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  describe("requestOidcToken", function () {
    async function requestToken(oidcRequestUrl: string): Promise<PipelineRequest> {
      let capturedRequest: PipelineRequest | undefined;
      vi.spyOn(IdentityClient.prototype, "sendRequest").mockImplementation(async (request) => {
        capturedRequest = request;
        return {
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: JSON.stringify({ value: "test-jwt-token" }),
        };
      });

      vi.stubEnv("AZURE_TENANT_ID", "test-tenant-id");
      vi.stubEnv("AZURE_CLIENT_ID", "test-client-id");
      vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_URL", oidcRequestUrl);
      vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_TOKEN", "test-request-token");

      const credential = new GitHubActionsCredential();
      const requestOidcToken = Reflect.get(credential, "requestOidcToken") as (
        requestUrl: string,
        requestToken: string,
        audience: string,
      ) => Promise<string>;
      const token = await requestOidcToken.call(
        credential,
        oidcRequestUrl,
        "test-request-token",
        "api://AzureADTokenExchange",
      );

      assert.strictEqual(token, "test-jwt-token");
      assert.isDefined(capturedRequest);
      return capturedRequest;
    }

    it("adds the audience when the request URL has no query string", async function () {
      const request = await requestToken("https://token.actions.githubusercontent.com/request");
      const url = new URL(request.url);

      assert.strictEqual(url.searchParams.get("audience"), "api://AzureADTokenExchange");
      assert.strictEqual(request.headers.get("Authorization"), "Bearer test-request-token");
    });

    it("preserves existing query parameters when adding the audience", async function () {
      const request = await requestToken(
        "https://token.actions.githubusercontent.com/request?api-version=1.0",
      );
      const url = new URL(request.url);

      assert.strictEqual(url.searchParams.get("api-version"), "1.0");
      assert.strictEqual(url.searchParams.get("audience"), "api://AzureADTokenExchange");
    });
  });

  it("retrieves the OIDC assertion through getToken and returns the access token", async function () {
    let capturedRequest: PipelineRequest | undefined;
    vi.spyOn(IdentityClient.prototype, "sendRequest").mockImplementation(async (request) => {
      capturedRequest = request;
      return {
        request,
        status: 200,
        headers: createHttpHeaders(),
        bodyAsText: JSON.stringify({ value: "test-jwt-token" }),
      };
    });

    vi.stubEnv("AZURE_TENANT_ID", "test-tenant-id");
    vi.stubEnv("AZURE_CLIENT_ID", "test-client-id");
    vi.stubEnv("AZURE_AUTHORITY_HOST", "https://login.microsoftonline.us");
    vi.stubEnv(
      "ACTIONS_ID_TOKEN_REQUEST_URL",
      "https://token.actions.githubusercontent.com/request?api-version=1.0",
    );
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_TOKEN", "test-request-token");

    const credential = new GitHubActionsCredential();
    const clientAssertionCredential = Reflect.get(
      credential,
      "clientAssertionCredential",
    ) as ClientAssertionCredential;
    const msalClient = Reflect.get(clientAssertionCredential, "msalClient") as MsalClient;
    vi.spyOn(msalClient, "getTokenByClientAssertion").mockImplementation(
      async (_scopes, getAssertion) => {
        assert.strictEqual(await getAssertion(), "test-jwt-token");
        return { token: "test-access-token", expiresOnTimestamp: Date.now() + 60_000 };
      },
    );

    const accessToken = await credential.getToken("https://management.azure.com/.default");

    assert.strictEqual(accessToken.token, "test-access-token");
    assert.isDefined(capturedRequest);
    assert.strictEqual(
      new URL(capturedRequest.url).searchParams.get("audience"),
      "api://AzureADTokenExchangeUSGov",
    );
  });

  describe("handleOidcResponse", function () {
    function createResponse(status: number, bodyAsText?: string): PipelineResponse {
      return {
        request: createPipelineRequest({
          url: "https://token.actions.githubusercontent.com/.well-known/openid-configuration",
          method: "GET",
          headers: createHttpHeaders({
            Authorization: "Bearer REDACTED",
          }),
        }),
        status,
        headers: createHttpHeaders(),
        bodyAsText,
      };
    }

    it("returns the token value on a successful response", function () {
      const response = createResponse(200, JSON.stringify({ value: "test-jwt-token" }));
      const result = handleOidcResponse(response);
      assert.strictEqual(result, "test-jwt-token");
    });

    it("throws Authentication Error when body is null", function () {
      const response = createResponse(400);
      assert.throws(
        () => handleOidcResponse(response),
        /GitHubActionsCredential: Authentication Failed. Received null token from OIDC request/,
      );
    });

    it("throws Authentication Error when 'value' field is missing", function () {
      const response = createResponse(200, JSON.stringify({ error: "Bad Request" }));
      assert.throws(
        () => handleOidcResponse(response),
        /GitHubActionsCredential: Authentication Failed. "value" field not detected in the response/,
      );
    });

    it("throws Authentication Error when response is not valid JSON", function () {
      const response = createResponse(200, "test-sensitive-assertion");
      const error = assert.throws(
        () => handleOidcResponse(response),
        /GitHubActionsCredential: Authentication Failed. Failed to parse OIDC response/,
      );
      assert.notInclude(error.message, "test-sensitive-assertion");
    });

    it("rejects a token value returned with a non-200 response", function () {
      const response = createResponse(500, JSON.stringify({ value: "test-jwt-token" }));
      assert.throws(() => handleOidcResponse(response), /OIDC request returned status code 500/);
    });

    it("includes status code in error for null body", function () {
      const response = createResponse(401);
      assert.throws(() => handleOidcResponse(response), /Status code: 401/);
    });
  });

  describe("deriveAudience", function () {
    const audienceCases: Array<[string, string]> = [
      ["https://login.microsoftonline.com", "api://AzureADTokenExchange"],
      ["https://login.microsoftonline.us", "api://AzureADTokenExchangeUSGov"],
      ["https://login.chinacloudapi.cn", "api://AzureADTokenExchangeChina"],
      ["https://login.sovcloud-identity.fr", "api://AzureADTokenExchangeFrance"],
      ["https://login.sovcloud-identity.de", "api://AzureADTokenExchangeGermany"],
      ["https://login.sovcloud-identity.sg", "api://AzureADTokenExchangeGovSG"],
    ];

    audienceCases.forEach(([authorityHost, audience]) => {
      it(`returns ${audience} for ${authorityHost}`, function () {
        assert.strictEqual(deriveAudience(authorityHost), audience);
      });
    });

    it("throws for unknown hosts", function () {
      assert.throws(
        () => deriveAudience("https://custom.authority.example.com"),
        /The authority host "https:\/\/custom\.authority\.example\.com" is not supported/,
      );
    });

    it("throws for invalid URLs", function () {
      assert.throws(
        () => deriveAudience("not-a-url"),
        /The authority host "not-a-url" is not supported/,
      );
    });
  });
});

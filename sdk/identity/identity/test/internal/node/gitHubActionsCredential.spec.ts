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
      const response = createResponse(400, JSON.stringify({ error: "Bad Request" }));
      assert.throws(
        () => handleOidcResponse(response),
        /GitHubActionsCredential: Authentication Failed. "value" field not detected in the response/,
      );
    });

    it("throws Authentication Error when response is not valid JSON", function () {
      const response = createResponse(500, "Internal Server Error");
      assert.throws(
        () => handleOidcResponse(response),
        /GitHubActionsCredential: Authentication Failed. Failed to parse OIDC response/,
      );
    });

    it("includes status code in error for null body", function () {
      const response = createResponse(401);
      assert.throws(() => handleOidcResponse(response), /Status code: 401/);
    });
  });

  describe("deriveAudience", function () {
    it("returns public cloud audience for login.microsoftonline.com", function () {
      assert.strictEqual(
        deriveAudience("https://login.microsoftonline.com"),
        "api://AzureADTokenExchange",
      );
    });

    it("returns US Gov audience for login.microsoftonline.us", function () {
      assert.strictEqual(
        deriveAudience("https://login.microsoftonline.us"),
        "api://AzureADTokenExchangeUSGov",
      );
    });

    it("returns China audience for login.chinacloudapi.cn", function () {
      assert.strictEqual(
        deriveAudience("https://login.chinacloudapi.cn"),
        "api://AzureADTokenExchangeChina",
      );
    });

    it("returns France audience for login.sovcloud-identity.fr", function () {
      assert.strictEqual(
        deriveAudience("https://login.sovcloud-identity.fr"),
        "api://AzureADTokenExchangeFrance",
      );
    });

    it("returns Germany audience for login.sovcloud-identity.de", function () {
      assert.strictEqual(
        deriveAudience("https://login.sovcloud-identity.de"),
        "api://AzureADTokenExchangeGermany",
      );
    });

    it("returns Singapore Government audience for login.sovcloud-identity.sg", function () {
      assert.strictEqual(
        deriveAudience("https://login.sovcloud-identity.sg"),
        "api://AzureADTokenExchangeGovSG",
      );
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

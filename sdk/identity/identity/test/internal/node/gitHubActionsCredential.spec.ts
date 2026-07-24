// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import {
  handleOidcResponse,
  deriveAudience,
} from "$internal/credentials/gitHubActionsCredential.js";
import { describe, it, assert } from "vitest";

describe("GitHubActionsCredential (internal)", function () {
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

    it("returns public cloud audience for unknown hosts", function () {
      assert.strictEqual(
        deriveAudience("https://custom.authority.example.com"),
        "api://AzureADTokenExchange",
      );
    });

    it("returns public cloud audience for invalid URLs", function () {
      assert.strictEqual(deriveAudience("not-a-url"), "api://AzureADTokenExchange");
    });
  });
});

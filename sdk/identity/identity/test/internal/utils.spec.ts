// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getAuthority } from "$internal/msal/utils.js";
import { processMultiTenantRequest } from "$internal/util/tenantIdUtils.js";
import { parseAndValidateCustomTokenProxy } from "$internal/credentials/workloadIdentityCredential.js";
import { describe, it, assert } from "vitest";

describe("Identity utilities", function () {
  describe("validateMultiTenantRequest", function () {
    it("returns the original tenant if getTokenOptions does not have a tenantId", async function () {
      const originalTenant = "credential-options-tenant-id";
      const resultingTenant = processMultiTenantRequest(originalTenant);
      assert.equal(resultingTenant, originalTenant);
    });

    it("it shouldn't throw if the tenant received is the same as the tenant we already had", async function () {
      assert.equal(
        processMultiTenantRequest("same-tenant", {
          tenantId: "same-tenant",
        }),
        "same-tenant",
      );
    });

    it("should pick the tenant from the options if has allowed all tenants", async function () {
      assert.equal(
        processMultiTenantRequest(
          "credential-options-tenant-id",
          {
            tenantId: "get-token-options-tenant-id",
          },
          ["*"],
        ),
        "get-token-options-tenant-id",
      );
    });

    it("should pick the tenant from the options if has allowed the options tenant", async function () {
      assert.equal(
        processMultiTenantRequest(
          "credential-options-tenant-id",
          {
            tenantId: "get-token-options-tenant-id",
          },
          ["get-token-options-tenant-id"],
        ),
        "get-token-options-tenant-id",
      );
    });
  });

  describe("getAuthority", () => {
    it("should add the tenant Id when the authority host ends with a slash", async function () {
      assert.equal(
        getAuthority("tenant-id", "https://login.microsoftonline.com/"),
        "https://login.microsoftonline.com/tenant-id",
      );
    });
    it("should add the tenant Id when the authority host ends without a slash", async function () {
      assert.equal(
        getAuthority("tenant-id", "https://login.microsoftonline.com"),
        "https://login.microsoftonline.com/tenant-id",
      );
    });
    it("should not add the tenant twice", async function () {
      assert.equal(
        getAuthority("tenant-id", "https://login.microsoftonline.com/tenant-id"),
        "https://login.microsoftonline.com/tenant-id",
      );
    });
    it("should not add the tenant twice even when it ends in a slash", async function () {
      assert.equal(
        getAuthority("tenant-id", "https://login.microsoftonline.com/tenant-id/"),
        "https://login.microsoftonline.com/tenant-id/",
      );
    });
  });

  describe("parseAndValidateCustomTokenProxy", () => {
    const testCases = [
      {
        name: "valid https endpoint without path",
        endpoint: "https://example.com",
        expectError: false,
        expectedPath: "/",
        expectedHost: "example.com",
        expectedScheme: "https",
      },
      {
        name: "valid https endpoint with path",
        endpoint: "https://example.com/token/path",
        expectError: false,
        expectedPath: "/token/path",
      },
      {
        name: "reject non-https scheme",
        endpoint: "http://example.com",
        expectError: true,
        errorContains: "https scheme",
      },
      {
        name: "reject user info",
        endpoint: "https://user:pass@example.com/token",
        expectError: true,
        errorContains: "must not contain user info",
      },
      {
        name: "reject query params",
        endpoint: "https://example.com/token?foo=bar",
        expectError: true,
        errorContains: "must not contain a query",
      },
      {
        name: "reject fragment",
        endpoint: "https://example.com/token#frag",
        expectError: true,
        errorContains: "must not contain a fragment",
      },
      {
        name: "allow valid percent-encoded URLs",
        endpoint: "https://example.com/token%20path",
        expectError: false,
        expectedPath: "/token%20path",
        expectedHost: "example.com",
        expectedScheme: "https",
      },
      {
        name: "reject unparseable URL",
        endpoint: "https://example.com/%zz",
        expectError: true,
        errorContains: "Failed to parse custom token proxy URL",
      },
    ];

    testCases.forEach((testCase) => {
      it(testCase.name, () => {
        if (testCase.expectError) {
          assert.throws(
            () => parseAndValidateCustomTokenProxy(testCase.endpoint),
            testCase.errorContains,
          );
        } else {
          const result = parseAndValidateCustomTokenProxy(testCase.endpoint);
          const url = new URL(result);

          if (testCase.expectedScheme) {
            assert.equal(url.protocol, `${testCase.expectedScheme}:`);
          }
          if (testCase.expectedHost) {
            assert.equal(url.host, testCase.expectedHost);
          }
          if (testCase.expectedPath) {
            assert.equal(url.pathname, testCase.expectedPath);
          }

          // Ensure no query or fragment
          assert.equal(url.search, "");
          assert.equal(url.hash, "");
        }
      });
    });
  });
});

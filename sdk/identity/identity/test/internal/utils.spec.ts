// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { getAuthority } from "../../src/msal/utils";
import { processMultiTenantRequest } from "../../src/util/tenantIdUtils";

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
});

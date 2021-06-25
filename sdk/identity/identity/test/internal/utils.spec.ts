// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { multiTenantError, processMultiTenantRequest } from "../../src/util/validateMultiTenant";

describe("Identity utilities", function() {
  describe("validateMultiTenantRequest", function() {
    it("throws if multi-tenant authentication is disallowed, and the tenants don't match", async function() {
      let error: Error | undefined;
      try {
        processMultiTenantRequest("credential-options-tenant-id", {
          allowMultiTenantAuthentication: false,
          tenantId: "get-token-options-tenant-id"
        });
      } catch (e) {
        error = e;
      }
      assert.ok(
        error,
        "validateMultiTenantRequest should throw if multi-tenant is disallowed and the tenants don't match"
      );
      assert.equal(error!.message, multiTenantError.message);
    });

    it("doesn't throw if multi-tenant authentication is allowed regardless of the value of the tenants", async function() {
      assert.equal(
        processMultiTenantRequest("credential-options-tenant-id", {
          allowMultiTenantAuthentication: true,
          tenantId: "get-token-options-tenant-id"
        }),
        undefined
      );
      assert.equal(
        processMultiTenantRequest("same-tenant", {
          allowMultiTenantAuthentication: true,
          tenantId: "same-tenant"
        }),
        undefined
      );
    });
  });
});

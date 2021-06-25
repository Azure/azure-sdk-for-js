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

    it("throws if multi-tenant authentication is undefined, and the tenants don't match", async function() {
      let error: Error | undefined;
      try {
        processMultiTenantRequest("credential-options-tenant-id", {
          allowMultiTenantAuthentication: undefined,
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

    it("If allowMultiTenantAuthentication is disallowed, it shouldn't throw if the tenant received is the same as the tenant we already had, that same tenant should be returned", async function() {
      assert.equal(
        processMultiTenantRequest("same-tenant", {
          allowMultiTenantAuthentication: false,
          tenantId: "same-tenant"
        }),
        "same-tenant"
      );
      assert.equal(
        processMultiTenantRequest("same-tenant", {
          allowMultiTenantAuthentication: undefined,
          tenantId: "same-tenant"
        }),
        "same-tenant"
      );
    });

    it("If we had a tenant and the options have another tenant, we pick the tenant from the options", async function() {
      assert.equal(
        processMultiTenantRequest("credential-options-tenant-id", {
          allowMultiTenantAuthentication: true,
          tenantId: "get-token-options-tenant-id"
        }),
        "get-token-options-tenant-id"
      );
    });

    it("If we had a tenant and there is no tenant in the options, we pick the tenant we already had", async function() {
      assert.equal(
        processMultiTenantRequest("credential-options-tenant-id", {
          allowMultiTenantAuthentication: true
        }),
        "credential-options-tenant-id"
      );
    });

    it("If the tenant received is the same as the tenant we already had, that same tenant should be returned", async function() {
      assert.equal(
        processMultiTenantRequest("same-tenant", {
          allowMultiTenantAuthentication: true,
          tenantId: "same-tenant"
        }),
        "same-tenant"
      );
    });
  });
});

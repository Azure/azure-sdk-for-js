// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  multiTenantErrorMessage,
  processMultiTenantRequest
} from "../../src/util/validateMultiTenant";

describe("Identity utilities", function () {
  describe("validateMultiTenantRequest", function () {
    it("throws if multi-tenant authentication is disallowed, and the tenants don't match", async function () {
      let error: Error | undefined;
      try {
        processMultiTenantRequest("credential-options-tenant-id", false, {
          tenantId: "get-token-options-tenant-id"
        });
      } catch (e) {
        error = e;
      }
      assert.ok(
        error,
        "validateMultiTenantRequest should throw if multi-tenant is disallowed and the tenants don't match"
      );
      assert.equal(error!.message, multiTenantErrorMessage);
    });

    it("throws if multi-tenant authentication is undefined, and the tenants don't match", async function () {
      let error: Error | undefined;
      try {
        processMultiTenantRequest("credential-options-tenant-id", undefined, {
          tenantId: "get-token-options-tenant-id"
        });
      } catch (e) {
        error = e;
      }
      assert.ok(
        error,
        "validateMultiTenantRequest should throw if multi-tenant is disallowed and the tenants don't match"
      );
      assert.equal(error!.message, multiTenantErrorMessage);
    });

    it("If allowMultiTenantAuthentication is disallowed, it shouldn't throw if the tenant received is the same as the tenant we already had, that same tenant should be returned", async function () {
      assert.equal(
        processMultiTenantRequest("same-tenant", false, {
          tenantId: "same-tenant"
        }),
        "same-tenant"
      );
      assert.equal(
        processMultiTenantRequest("same-tenant", undefined, {
          tenantId: "same-tenant"
        }),
        "same-tenant"
      );
    });

    it("If we had a tenant and the options have another tenant, we pick the tenant from the options", async function () {
      assert.equal(
        processMultiTenantRequest("credential-options-tenant-id", true, {
          tenantId: "get-token-options-tenant-id"
        }),
        "get-token-options-tenant-id"
      );
    });

    it("If we had a tenant and there is no tenant in the options, we pick the tenant we already had", async function () {
      assert.equal(
        processMultiTenantRequest("credential-options-tenant-id", true, {}),
        "credential-options-tenant-id"
      );
    });

    it("If the tenant received is the same as the tenant we already had, that same tenant should be returned", async function () {
      assert.equal(
        processMultiTenantRequest("same-tenant", true, {
          tenantId: "same-tenant"
        }),
        "same-tenant"
      );
    });
  });
});

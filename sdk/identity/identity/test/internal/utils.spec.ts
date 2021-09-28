// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  multiTenantADFSErrorMessage,
  processMultiTenantRequest
} from "../../src/util/validateMultiTenant";

describe("Identity utilities", function() {
  describe("validateMultiTenantRequest", function() {
    it("returns the original tenant if getTokenOptions does not have a tenantId", async function() {
      const originalTenant = "credential-options-tenant-id";
      const resultingTenant = processMultiTenantRequest(originalTenant);
      assert.equal(resultingTenant, originalTenant);
    });

    it("throws if a tenant is provided through getTokenoptions and the original tenant Id is 'asdf'", async function() {
      let error: Error | undefined;
      try {
        processMultiTenantRequest("adfs", {
          tenantId: "get-token-options-tenant-id"
        });
      } catch (e) {
        error = e;
      }
      assert.ok(
        error,
        "validateMultiTenantRequest should throw if a tenant is provided through getTokenoptions and the original tenant Id is 'asdf'"
      );
      assert.equal(error!.message, multiTenantADFSErrorMessage);
    });

    it("it shouldn't throw if the tenant received is the same as the tenant we already had", async function() {
      assert.equal(
        processMultiTenantRequest("same-tenant", {
          tenantId: "same-tenant"
        }),
        "same-tenant"
      );
    });

    it("should pick the tenant from the options", async function() {
      assert.equal(
        processMultiTenantRequest("credential-options-tenant-id", {
          tenantId: "get-token-options-tenant-id"
        }),
        "get-token-options-tenant-id"
      );
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  multiTenantDisabledErrorMessage,
  processMultiTenantRequest,
} from "../../../src/util/validateMultiTenant";

describe("Identity utilities (Node.js only)", function () {
  describe("validateMultiTenantRequest (Node.js only)", function () {
    afterEach(() => {
      delete process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH;
    });

    it("returns the original tenant and doesn't throw if getTokenOptions does not have a tenantId, even if AZURE_IDENTITY_DISABLE_MULTITENANTAUTH is defined", async function () {
      process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH = "true";
      const originalTenant = "credential-options-tenant-id";
      const resultingTenant = processMultiTenantRequest(originalTenant);
      assert.equal(resultingTenant, originalTenant);
    });

    it("throws if multi-tenant authentication is disabled via AZURE_IDENTITY_DISABLE_MULTITENANTAUTH", async function () {
      let error: Error | undefined;
      process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH = "true";
      try {
        processMultiTenantRequest("credential-options-tenant-id", {
          tenantId: "get-token-options-tenant-id",
        });
      } catch (e: any) {
        error = e;
      }
      assert.ok(
        error,
        "validateMultiTenantRequest should throw if multi-tenant authentication is disabled"
      );
      assert.equal(error!.message, multiTenantDisabledErrorMessage);
    });
  });
});

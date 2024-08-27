// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { processMultiTenantRequest } from "../../../src/util/tenantIdUtils";

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
  });
});

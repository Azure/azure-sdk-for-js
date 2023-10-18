// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  checkTenantId,
  resolveAdditionallyAllowedTenantIds,
  resolveTenantId,
} from "../../src/util/tenantIdUtils";
import { DeveloperSignOnClientId } from "../../src/constants";
import { assert } from "@azure/test-utils";
import { credentialLogger } from "../../src/util/logging";

describe("tenantIdUtils", () => {
  describe("resolveAddionallyAllowedTenantIds", () => {
    it("should set to empty if resolveAddionallyAllowedTenantIds is passed null/undefined", () => {
      let additionallyAllowedTenants: string[] | undefined;

      const result = resolveAdditionallyAllowedTenantIds(additionallyAllowedTenants);

      assert.equal(result.length, 0);
    });

    it("should set back to ALL TENANTS '*' if includes '*'", () => {
      const additionallyAllowedTenants = ["123", "456", "789", "*"];

      const result = resolveAdditionallyAllowedTenantIds(additionallyAllowedTenants);

      assert.equal(result.length, 1);
      assert.equal(result[0], "*");
    });

    it("should flow through if tenants are set and doesn't include '*'", () => {
      const additionallyAllowedTenants = ["123", "456"];

      const result = resolveAdditionallyAllowedTenantIds(additionallyAllowedTenants);

      assert.equal(result.length, 2);
      assert.equal(result[0], "123");
      assert.equal(result[1], "456");
    });
  });

  describe("checkTenantId", () => {
    it("should throw if the tenant ID is invalid", () => {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params),
      };
      const logger = credentialLogger("title", fakeLogger as any);
      const tenantId = "abc_123";

      assert.throws(() => {
        checkTenantId(logger, tenantId);
      });

      assert.equal(allParams.length, 1);
    });

    it("should not throw if the tenant ID is valid", () => {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params),
      };
      const logger = credentialLogger("title", fakeLogger as any);
      const tenantId = "abc-123";

      assert.doesNotThrow(() => {
        checkTenantId(logger, tenantId);
      });

      assert.equal(allParams.length, 0);
    });
  });

  describe("test checkTenantId for error with invalid inputs", () => {
    for (const inputTenant of [";", '"', "`", "=", "%", "(", ")", "{", "}", "|"]) {
      it(`when tenant ID has invalid character "${inputTenant}" `, () => {
        const allParams: any[] = [];
        const fakeLogger = {
          info: (...params: any) => allParams.push(params),
        };
        const logger = credentialLogger("title", fakeLogger as any);
        assert.throws(() => {
          checkTenantId(logger, inputTenant);
        }, "Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://learn.microsoft.com/partner-center/find-ids-and-domain-names.");
        assert.equal(allParams.length, 1);
      });
    }
  });

  describe("resolveTenantId", () => {
    it("should throw if the tenant ID is invalid", () => {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params),
      };
      const logger = credentialLogger("title", fakeLogger as any);
      const tenantId = "abc_123";

      assert.throws(() => {
        resolveTenantId(logger, tenantId);
      });

      assert.equal(allParams.length, 1);
    });

    it("should return the tenant ID if properly set", () => {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params),
      };
      const logger = credentialLogger("title", fakeLogger as any);
      const tenantId = "abc-123";
      const clientId = "def-456";

      const result = resolveTenantId(logger, tenantId, clientId);

      assert.equal(result, tenantId);
    });

    it("should return 'common' for non-developer accounts with client ID", () => {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params),
      };
      const logger = credentialLogger("title", fakeLogger as any);
      let tenantId: string | undefined;
      const clientId = "def-456";

      const result = resolveTenantId(logger, tenantId, clientId);

      assert.equal(result, "common");
    });

    it("should return 'organizations' for developer accounts with client ID", () => {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params),
      };
      const logger = credentialLogger("title", fakeLogger as any);
      let tenantId: string | undefined;
      const clientId = DeveloperSignOnClientId;

      const result = resolveTenantId(logger, tenantId, clientId);

      assert.equal(result, "organizations");
    });

    it("should return organizations if client ID not set", () => {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params),
      };
      const logger = credentialLogger("title", fakeLogger as any);

      const result = resolveTenantId(logger);

      assert.equal(result, "organizations");
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { processMultiTenantRequest } from "$internal/util/tenantIdUtils.js";
import {
  extractPemCertificateKeys,
  validatePemCertificates,
} from "$internal/util/certificatesUtils.js";
import { describe, it, assert, afterEach } from "vitest";
import path from "node:path";
import fs from "node:fs";

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

  describe("Certificate utilities", () => {
    const testPemPath = path.join(__dirname, "../../../assets/test.pem");
    const validPemCertificate = fs.readFileSync(testPemPath, "utf8");

    describe("extractPemCertificateKeys", () => {
      it("should extract keys from valid PEM certificate", () => {
        const keys = extractPemCertificateKeys(validPemCertificate);
        assert.equal(keys.length, 1);
        assert.isString(keys[0]);
        assert.isTrue(keys[0].length > 0);
      });

      it("should return empty array for empty input", () => {
        const keys = extractPemCertificateKeys("");
        assert.equal(keys.length, 0);
      });

      it("should return empty array for invalid PEM format", () => {
        const keys = extractPemCertificateKeys("not a certificate at all");
        assert.equal(keys.length, 0);
      });

      it("should handle PEM with different newline formats", () => {
        const pemWithCRLF = validPemCertificate.replace(/\n/g, "\r\n");
        const keys = extractPemCertificateKeys(pemWithCRLF);
        assert.equal(keys.length, 1);
      });
    });

    describe("validatePemCertificates", () => {
      it("should return true for valid PEM certificate", () => {
        assert.isTrue(validatePemCertificates(validPemCertificate));
      });

      it("should return false for invalid PEM format", () => {
        assert.isFalse(validatePemCertificates("not a certificate"));
      });

      it("should return false for PEM with invalid base64 content", () => {
        const invalidPemData = `-----BEGIN CERTIFICATE-----
Invalid base64 data here!!!
-----END CERTIFICATE-----`;
        assert.isFalse(validatePemCertificates(invalidPemData));
      });
    });
  });
});

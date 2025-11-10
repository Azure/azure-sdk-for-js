// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { processMultiTenantRequest } from "$internal/util/tenantIdUtils.js";
import {
  extractPemCertificateKeys,
  canParseAsX509Certificate,
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
    const testPemPath = path.join(__dirname, "../../../assets/fake-cert.pem");
    const validPemCertificate = fs.readFileSync(testPemPath, "utf8");

    describe("extractPemCertificateKeys", () => {
      it("should extract keys from valid PEM certificate", () => {
        const keys = extractPemCertificateKeys(validPemCertificate);
        assert.equal(keys.length, 1);
        assert.isString(keys[0]);
        assert.isTrue(keys[0].length > 0);
      });

      it("should throw error for empty input", () => {
        assert.throws(
          () => extractPemCertificateKeys(""),
          Error,
          "The file at the specified path does not contain a PEM-encoded certificate.",
        );
      });

      it("should throw error for invalid PEM format", () => {
        assert.throws(
          () => extractPemCertificateKeys("not a certificate at all"),
          Error,
          "The file at the specified path does not contain a PEM-encoded certificate.",
        );
      });

      it("should handle PEM with different newline formats", () => {
        const pemWithCRLF = validPemCertificate.replace(/\n/g, "\r\n");
        const keys = extractPemCertificateKeys(pemWithCRLF);
        assert.equal(keys.length, 1);
      });
    });

    describe("canParseAsX509Certificate", () => {
      it("should return true for valid PEM certificate that can be parsed as X509", () => {
        assert.isTrue(canParseAsX509Certificate(validPemCertificate));
      });

      it("should return false for invalid PEM format", () => {
        assert.isFalse(canParseAsX509Certificate("not a certificate"));
      });

      it("should return false for PEM with invalid base64 content", () => {
        const invalidPemData = `-----BEGIN CERTIFICATE-----
invalidbase64content==
-----END CERTIFICATE-----`;
        assert.isFalse(canParseAsX509Certificate(invalidPemData));
      });

      it("should return false for empty or non-certificate data", () => {
        assert.isFalse(canParseAsX509Certificate(""));
        assert.isFalse(canParseAsX509Certificate("non-cert data"));
      });
    });
  });
});

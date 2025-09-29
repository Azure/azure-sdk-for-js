// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type {
  CertificateBundle,
  CertificateOperation as CoreCertificateOperation,
  DeletedCertificateItem,
} from "../../src/models/models.ts";
import {
  getCertificateFromCertificateBundle,
  getCertificateOperationFromCoreOperation,
  getCertificateWithPolicyFromCertificateBundle,
  getDeletedCertificateFromItem,
  getPropertiesFromCertificateBundle,
} from "../../src/transformations.js";
import { describe, it, assert } from "vitest";

describe("transformations", function () {
  describe("getCertificateOperationFromCoreOperation", function () {
    it("transforms null error to undefined", () => {
      const input: any = {
        error: null,
      };

      assert.isUndefined(getCertificateOperationFromCoreOperation("", input).error);
    });

    it("transforms null inner error to undefined", () => {
      const input: any = {
        error: {
          innerError: null,
        },
      };

      const output = getCertificateOperationFromCoreOperation("", input);
      assert.isDefined(output.error);
      assert.isUndefined(output.error!.innerError);
    });

    it("transforms errors correctly when present", () => {
      const input: CoreCertificateOperation = {
        error: {
          code: "outer error",
          message: "The outer error message",
          innerError: {
            code: "inner error",
            innerError: undefined,
            message: "The inner error message",
          },
        },
      };

      const output = getCertificateOperationFromCoreOperation("", input);
      assert.deepNestedInclude(output, input);
    });
  });

  describe("x509ThumbprintString", function () {
    it("is populated by getCertificateFromCertificateBundle", () => {
      const bundle: CertificateBundle = {
        id: "https://myvault.vault.azure.net/certificates/certificateName/version",
        x509Thumbprint: new Uint8Array([0xab, 0xcd, 0xef]),
      };
      const result = getCertificateFromCertificateBundle(bundle);
      assert.equal(result.properties.x509ThumbprintString, "abcdef");
    });

    it("is populated by getCertificateWithPolicyFromCertifiateBundle", () => {
      const bundle: CertificateBundle = {
        id: "https://myvault.vault.azure.net/certificates/certificateName/version",
        x509Thumbprint: new Uint8Array([0xab, 0xcd, 0xef]),
      };

      const result = getCertificateWithPolicyFromCertificateBundle(bundle);
      assert.equal(result.properties.x509ThumbprintString, "abcdef");
    });

    it("is populated by getDeletedCertificateFromItem", () => {
      const item: DeletedCertificateItem = {
        id: "https://myvault.vault.azure.net/certificates/certificateName/version",
        x509Thumbprint: new Uint8Array([0xab, 0xcd, 0xef]),
      };
      const result = getDeletedCertificateFromItem(item);
      assert.equal(result.properties.x509ThumbprintString, "abcdef");
    });

    it("is populated by getPropertiesFromCertificateBundle", () => {
      const bundle: CertificateBundle = {
        id: "https://myvault.vault.azure.net/certificates/certificateName/version",
        x509Thumbprint: new Uint8Array([0xab, 0xcd, 0xef]),
      };
      const result = getPropertiesFromCertificateBundle(bundle);
      assert.equal(result.x509ThumbprintString, "abcdef");
    });
  });
});

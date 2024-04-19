// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import {
  CertificateBundle,
  CertificateOperation as CoreCertificateOperation,
  DeletedCertificateItem,
} from "../../src/generated/models";
import {
  getCertificateFromCertificateBundle,
  getCertificateOperationFromCoreOperation,
  getCertificateWithPolicyFromCertificateBundle,
  getDeletedCertificateFromItem,
  getPropertiesFromCertificateBundle,
} from "../../src/transformations";

describe("transformations", function () {
  describe("getCertificateOperationFromCoreOperation", function () {
    it("transforms null error to undefined", function () {
      const input: CoreCertificateOperation = {
        error: null,
      };

      assert.isUndefined(getCertificateOperationFromCoreOperation("", "", input).error);
    });

    it("transforms null inner error to undefined", function () {
      const input: CoreCertificateOperation = {
        error: {
          innerError: null,
        },
      };

      const output = getCertificateOperationFromCoreOperation("", "", input);
      assert.isDefined(output.error);
      assert.isUndefined(output.error!.innerError);
    });

    it("transforms errors correctly when present", function () {
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

      const output = getCertificateOperationFromCoreOperation("", "", input);
      assert.deepNestedInclude(output, input);
    });
  });

  describe("x509ThumbprintString", function () {
    it("is populated by getCertificateFromCertificateBundle", function () {
      const bundle: CertificateBundle = {
        id: "https://myvault.vault.azure.net/certificates/certificateName/version",
        x509Thumbprint: new Uint8Array([0xab, 0xcd, 0xef]),
      };
      const result = getCertificateFromCertificateBundle(bundle);
      assert.equal(result.properties.x509ThumbprintString, "abcdef");
    });

    it("is populated by getCertificateWithPolicyFromCertifiateBundle", function () {
      const bundle: CertificateBundle = {
        id: "https://myvault.vault.azure.net/certificates/certificateName/version",
        x509Thumbprint: new Uint8Array([0xab, 0xcd, 0xef]),
      };

      const result = getCertificateWithPolicyFromCertificateBundle(bundle);
      assert.equal(result.properties.x509ThumbprintString, "abcdef");
    });

    it("is populated by getDeletedCertificateFromItem", function () {
      const item: DeletedCertificateItem = {
        id: "https://myvault.vault.azure.net/certificates/certificateName/version",
        x509Thumbprint: new Uint8Array([0xab, 0xcd, 0xef]),
      };
      const result = getDeletedCertificateFromItem(item);
      assert.equal(result.properties.x509ThumbprintString, "abcdef");
    });

    it("is populated by getPropertiesFromCertificateBundle", function () {
      const bundle: CertificateBundle = {
        id: "https://myvault.vault.azure.net/certificates/certificateName/version",
        x509Thumbprint: new Uint8Array([0xab, 0xcd, 0xef]),
      };
      const result = getPropertiesFromCertificateBundle(bundle);
      assert.equal(result.x509ThumbprintString, "abcdef");
    });
  });
});

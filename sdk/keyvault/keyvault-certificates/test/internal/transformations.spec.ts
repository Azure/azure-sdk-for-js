// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type {
  CertificateBundle,
  CertificateOperation as CoreCertificateOperation,
  CertificatePolicy as CoreCertificatePolicy,
  DeletedCertificateItem,
} from "../../src/models/models.ts";
import {
  getCertificateFromCertificateBundle,
  getCertificateOperationFromCoreOperation,
  getCertificateWithPolicyFromCertificateBundle,
  getDeletedCertificateFromItem,
  getPropertiesFromCertificateBundle,
  toCorePolicy,
  toPublicPolicy,
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

  describe("SubjectAlternativeNames round-trip", function () {
    describe("ipAddresses", function () {
      it("toCorePolicy maps ipAddresses to the core model", () => {
        const corePolicy = toCorePolicy(undefined, {
          issuerName: "Self",
          subject: "cn=Test",
          subjectAlternativeNames: {
            ipAddresses: ["10.0.0.1", "192.168.1.1"],
          },
        });
        const sans = corePolicy.x509CertificateProperties!.subjectAlternativeNames!;
        assert.deepEqual(sans.ipAddresses, ["10.0.0.1", "192.168.1.1"]);
      });

      it("toPublicPolicy maps ipAddresses back from the core model", () => {
        const corePolicy: CoreCertificatePolicy = {
          x509CertificateProperties: {
            subjectAlternativeNames: {
              ipAddresses: ["10.0.0.1", "::1"],
            },
          },
        };
        const publicPolicy = toPublicPolicy(corePolicy);
        assert.deepEqual(publicPolicy.subjectAlternativeNames!.ipAddresses, ["10.0.0.1", "::1"]);
      });

      it("round-trips ipAddresses through toCorePolicy and toPublicPolicy", () => {
        const ips: [string, ...string[]] = ["10.0.0.1", "192.168.1.1", "::1"];
        const corePolicy = toCorePolicy(undefined, {
          issuerName: "Self",
          subject: "cn=Test",
          subjectAlternativeNames: { ipAddresses: ips },
        });
        const publicPolicy = toPublicPolicy(corePolicy);
        assert.deepEqual(publicPolicy.subjectAlternativeNames!.ipAddresses, ips);
      });

      it("toPublicPolicy omits ipAddresses when empty or absent", () => {
        const corePolicy: CoreCertificatePolicy = {
          x509CertificateProperties: {},
        };
        const publicPolicy = toPublicPolicy(corePolicy);
        assert.isUndefined(publicPolicy.subjectAlternativeNames);
      });
    });

    describe("uniformResourceIdentifiers", function () {
      it("toCorePolicy maps uniformResourceIdentifiers to the core model", () => {
        const corePolicy = toCorePolicy(undefined, {
          issuerName: "Self",
          subject: "cn=Test",
          subjectAlternativeNames: {
            uniformResourceIdentifiers: ["https://example.com", "https://contoso.com"],
          },
        });
        const sans = corePolicy.x509CertificateProperties!.subjectAlternativeNames!;
        assert.deepEqual(sans.uniformResourceIdentifiers, [
          "https://example.com",
          "https://contoso.com",
        ]);
      });

      it("toPublicPolicy maps uniformResourceIdentifiers back from the core model", () => {
        const corePolicy: CoreCertificatePolicy = {
          x509CertificateProperties: {
            subjectAlternativeNames: {
              uniformResourceIdentifiers: ["https://example.com"],
            },
          },
        };
        const publicPolicy = toPublicPolicy(corePolicy);
        assert.deepEqual(publicPolicy.subjectAlternativeNames!.uniformResourceIdentifiers, [
          "https://example.com",
        ]);
      });

      it("round-trips uniformResourceIdentifiers through toCorePolicy and toPublicPolicy", () => {
        const uris: [string, ...string[]] = ["https://example.com", "https://contoso.com"];
        const corePolicy = toCorePolicy(undefined, {
          issuerName: "Self",
          subject: "cn=Test",
          subjectAlternativeNames: { uniformResourceIdentifiers: uris },
        });
        const publicPolicy = toPublicPolicy(corePolicy);
        assert.deepEqual(publicPolicy.subjectAlternativeNames!.uniformResourceIdentifiers, uris);
      });

      it("toPublicPolicy omits uniformResourceIdentifiers when empty or absent", () => {
        const corePolicy: CoreCertificatePolicy = {
          x509CertificateProperties: {
            subjectAlternativeNames: {
              emails: ["test@example.com"],
            },
          },
        };
        const publicPolicy = toPublicPolicy(corePolicy);
        assert.isUndefined(publicPolicy.subjectAlternativeNames!.uniformResourceIdentifiers);
      });
    });

    describe("combined SAN fields", function () {
      it("round-trips all SAN fields together", () => {
        const corePolicy = toCorePolicy(undefined, {
          issuerName: "Self",
          subject: "cn=Test",
          subjectAlternativeNames: {
            emails: ["test@example.com"],
            dnsNames: ["example.com"],
            userPrincipalNames: ["user@example.com"],
            uniformResourceIdentifiers: ["https://example.com"],
            ipAddresses: ["10.0.0.1"],
          },
        });
        const publicPolicy = toPublicPolicy(corePolicy);
        const san = publicPolicy.subjectAlternativeNames!;
        assert.deepEqual(san.emails, ["test@example.com"]);
        assert.deepEqual(san.dnsNames, ["example.com"]);
        assert.deepEqual(san.userPrincipalNames, ["user@example.com"]);
        assert.deepEqual(san.uniformResourceIdentifiers, ["https://example.com"]);
        assert.deepEqual(san.ipAddresses, ["10.0.0.1"]);
      });

      it("getCertificateWithPolicyFromCertificateBundle preserves SAN ipAddresses and URIs", () => {
        const bundle: CertificateBundle = {
          id: "https://myvault.vault.azure.net/certificates/certificateName/version",
          policy: {
            x509CertificateProperties: {
              subjectAlternativeNames: {
                ipAddresses: ["10.0.0.1"],
                uniformResourceIdentifiers: ["https://example.com"],
              },
            },
          },
        };
        const result = getCertificateWithPolicyFromCertificateBundle(bundle);
        const san = result.policy!.subjectAlternativeNames!;
        assert.deepEqual(san.ipAddresses, ["10.0.0.1"]);
        assert.deepEqual(san.uniformResourceIdentifiers, ["https://example.com"]);
      });
    });
  });
});

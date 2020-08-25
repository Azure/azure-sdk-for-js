// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyVaultCertificatesIdentifier } from "../../src";
import * as assert from "assert";

describe("Key Vault Certificates Identifier", () => {
  it("It should work with a URI of a certificate before it gets a version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/certificates/certificate-name/pending";
    const identifier = parseKeyVaultCertificatesIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/certificates/certificate-name/pending",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "certificates",
      name: "certificate-name",
      version: "pending"
    });
  });

  it("It should work with a URI of a certificate with a specific version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/certificates/certificate-name/version";
    const identifier = parseKeyVaultCertificatesIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/certificates/certificate-name/version",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "certificates",
      name: "certificate-name",
      version: "version"
    });
  });

  it("It should work with a deleted certificate recovery ID", async function() {
    const uri = "https://keyvault-name.vault.azure.net/deletedcertificates/deleted-certificate";
    const identifier = parseKeyVaultCertificatesIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/deletedcertificates/deleted-certificate",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "deletedcertificates",
      name: "deleted-certificate",
      version: undefined
    });
  });

  it("It throws if an invalid collection is specified", async function() {
    const uri = "https://keyvault-name.vault.azure.net/bad-name/bad-name";
    assert.throws(() => parseKeyVaultCertificatesIdentifier(uri));
  });
});

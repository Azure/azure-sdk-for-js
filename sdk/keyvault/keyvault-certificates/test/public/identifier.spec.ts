// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { KeyVaultCertificatesIdentifier } from "../../src";

describe("KeyVault Certificates Identifier", () => {
  it("It should work with a URI of a certificate before it gets a version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/certificates/certificate-name/pending";
    const identifier = new KeyVaultCertificatesIdentifier(uri);

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
    const identifier = new KeyVaultCertificatesIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/certificates/certificate-name/version",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "certificates",
      name: "certificate-name",
      version: "version"
    });
  });

  it("It should work with the URI of a certificate's issuer", async function() {
    const uri =
      "https://keyvault-name.vault.azure.net/certificates/issuers/certificate-issuer-name";
    const identifier = new KeyVaultCertificatesIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/certificates/issuers/certificate-issuer-name",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "certificates",
      name: "issuers",
      version: "certificate-issuer-name"
    });
  });
});

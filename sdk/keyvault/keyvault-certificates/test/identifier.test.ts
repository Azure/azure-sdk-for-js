// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { KeyVaultCertificatesIdentifier } from '../src';

describe.only("KeyVault Certificates Identifier", () => {
  it("It should work with a URI of a certificate before it gets a version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/certificates/certificate-name/pending"
    const identifier = new KeyVaultCertificatesIdentifier(uri);

    assert.deepEqual(identifier, {
      collection: 'certificates',
      id: 'https://keyvault-name.vault.azure.net/certificates/certificate-name/pending',
      vaultUrl: 'https://keyvault-name.vault.azure.net',
      version: 'pending',
      name: 'certificate-name'
    });
  });

  it("It should work with a URI of a certificate with a specific version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/certificates/certificate-name/version"
    const identifier = new KeyVaultCertificatesIdentifier(uri);

    assert.deepEqual(identifier, {
      collection: 'certificates',
      id: 'https://keyvault-name.vault.azure.net/certificates/certificate-name/version',
      vaultUrl: 'https://keyvault-name.vault.azure.net',
      version: 'version',
      name: 'certificate-name'
    });
  });

  it("It should work with a URI of a certificate's issuer", async function() {
    const uri = "https://keyvault-name.vault.azure.net/certificates/issuers/certificate-issuer-name"
    const identifier = new KeyVaultCertificatesIdentifier(uri);

    assert.deepEqual(identifier, {
      collection: 'certificates',
      id: 'https://keyvault-name.vault.azure.net/certificates/issuers/certificate-issuer-name',
      vaultUrl: 'https://keyvault-name.vault.azure.net',
      version: 'certificate-issuer-name',
      name: 'issuers'
    });
  });
});

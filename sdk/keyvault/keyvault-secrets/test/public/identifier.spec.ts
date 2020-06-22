// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { KeyVaultSecretsIdentifier } from "../../src";

describe("Key Vault Secrets Identifier", () => {
  it("It should work with a URI of a secret before it gets a version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/secrets/secret-name/pending";
    const identifier = new KeyVaultSecretsIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/secrets/secret-name/pending",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "secrets",
      name: "secret-name",
      version: "pending"
    });
  });

  it("It should work with a URI of a secret with a specific version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/secrets/secret-name/version";
    const identifier = new KeyVaultSecretsIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/secrets/secret-name/version",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "secrets",
      name: "secret-name",
      version: "version"
    });
  });
});

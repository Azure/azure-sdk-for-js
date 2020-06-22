// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { KeyVaultKeysIdentifier } from "../../src/identifier";

describe("KeyVault Keys Identifier", () => {
  it("It should work with a URI of a key before it gets a version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/keys/key-name/pending";
    const identifier = new KeyVaultKeysIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/keys/key-name/pending",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "keys",
      version: "pending",
      name: "key-name"
    });
  });

  it("It should work with a URI of a key with a specific version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/keys/key-name/version";
    const identifier = new KeyVaultKeysIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/keys/key-name/version",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "keys",
      version: "version",
      name: "key-name"
    });
  });
});

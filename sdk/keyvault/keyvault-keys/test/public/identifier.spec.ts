// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyVaultKeysIdentifier } from "../../src/identifier";
import * as assert from "assert";

describe("Key Vault Keys Identifier", () => {
  it("It should work with a URI of a key before it gets a version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/keys/key-name/pending";
    const identifier = parseKeyVaultKeysIdentifier(uri);

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
    const identifier = parseKeyVaultKeysIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/keys/key-name/version",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "keys",
      version: "version",
      name: "key-name"
    });
  });

  it("It should work with a deleted key recovery ID", async function() {
    const uri = "https://keyvault-name.vault.azure.net/deletedkeys/deleted-key";
    const identifier = parseKeyVaultKeysIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/deletedkeys/deleted-key",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "deletedkeys",
      name: "deleted-key",
      version: undefined
    });
  });

  it("It throws if an invalid collection is specified", async function() {
    const uri = "https://keyvault-name.vault.azure.net/bad-name/bad-name";
    assert.throws(() => parseKeyVaultKeysIdentifier(uri));
  });
});

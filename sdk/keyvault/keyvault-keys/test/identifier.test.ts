// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { KeyVaultKeysIdentifier } from "../src/identifier";

describe("KeyVault Keys Identifier", () => {
  it("It should work with a URI of a key before it gets a version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/keys/key-name/pending";
    const identifier = new KeyVaultKeysIdentifier(uri);

    // Assert doesn't have deepEqual on the browser.
    assert.equal(
      JSON.stringify(identifier),
      JSON.stringify({
        collection: "keys",
        id: "https://keyvault-name.vault.azure.net/keys/key-name/pending",
        vaultUrl: "https://keyvault-name.vault.azure.net",
        version: "pending",
        name: "key-name"
      })
    );
  });

  it("It should work with a URI of a key with a specific version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/keys/key-name/version";
    const identifier = new KeyVaultKeysIdentifier(uri);

    // Assert doesn't have deepEqual on the browser.
    assert.equal(
      JSON.stringify(identifier),
      JSON.stringify({
        collection: "keys",
        id: "https://keyvault-name.vault.azure.net/keys/key-name/version",
        vaultUrl: "https://keyvault-name.vault.azure.net",
        version: "version",
        name: "key-name"
      })
    );
  });

  it("It should work with a URI of a key's issuer", async function() {
    const uri = "https://keyvault-name.vault.azure.net/keys/issuers/key-issuer-name";
    const identifier = new KeyVaultKeysIdentifier(uri);

    // Assert doesn't have deepEqual on the browser.
    assert.equal(
      JSON.stringify(identifier),
      JSON.stringify({
        collection: "keys",
        id: "https://keyvault-name.vault.azure.net/keys/issuers/key-issuer-name",
        vaultUrl: "https://keyvault-name.vault.azure.net",
        version: "key-issuer-name",
        name: "issuers"
      })
    );
  });
});

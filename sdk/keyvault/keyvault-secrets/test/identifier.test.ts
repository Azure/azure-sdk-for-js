// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { KeyVaultSecretsIdentifier } from "../src";

describe("KeyVault Secrets Identifier", () => {
  it("It should work with a URI of a secret before it gets a version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/secrets/secret-name/pending";
    const identifier = new KeyVaultSecretsIdentifier(uri);

    // Assert doesn't have deepEqual on the browser.
    assert.equal(
      JSON.stringify(identifier),
      JSON.stringify({
        collection: "secrets",
        id: "https://keyvault-name.vault.azure.net/secrets/secret-name/pending",
        vaultUrl: "https://keyvault-name.vault.azure.net",
        version: "pending",
        name: "secret-name"
      })
    );
  });

  it("It should work with a URI of a secret with a specific version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/secrets/secret-name/version";
    const identifier = new KeyVaultSecretsIdentifier(uri);

    // Assert doesn't have deepEqual on the browser.
    assert.equal(
      JSON.stringify(identifier),
      JSON.stringify({
        collection: "secrets",
        id: "https://keyvault-name.vault.azure.net/secrets/secret-name/version",
        vaultUrl: "https://keyvault-name.vault.azure.net",
        version: "version",
        name: "secret-name"
      })
    );
  });

  it("It should work with a URI of a secret's issuer", async function() {
    const uri = "https://keyvault-name.vault.azure.net/secrets/issuers/secret-issuer-name";
    const identifier = new KeyVaultSecretsIdentifier(uri);

    // Assert doesn't have deepEqual on the browser.
    assert.equal(
      JSON.stringify(identifier),
      JSON.stringify({
        collection: "secrets",
        id: "https://keyvault-name.vault.azure.net/secrets/issuers/secret-issuer-name",
        vaultUrl: "https://keyvault-name.vault.azure.net",
        version: "secret-issuer-name",
        name: "issuers"
      })
    );
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyVaultSecretsIdentifier } from "../../src";
import * as assert from "assert";

describe("Key Vault Secrets Identifier", () => {
  it("It should work with a URI of a secret before it gets a version", async function() {
    const uri = "https://keyvault-name.vault.azure.net/secrets/secret-name/pending";
    const identifier = parseKeyVaultSecretsIdentifier(uri);

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
    const identifier = parseKeyVaultSecretsIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/secrets/secret-name/version",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "secrets",
      name: "secret-name",
      version: "version"
    });
  });

  it("It should work with a deleted secret recovery ID", async function() {
    const uri = "https://keyvault-name.vault.azure.net/deletedsecrets/deleted-secret";
    const identifier = parseKeyVaultSecretsIdentifier(uri);

    assert.deepEqual(identifier, {
      id: "https://keyvault-name.vault.azure.net/deletedsecrets/deleted-secret",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      collection: "deletedsecrets",
      name: "deleted-secret",
      version: undefined
    });
  });

  it("It throws if an invalid collection is specified", async function() {
    const uri = "https://keyvault-name.vault.azure.net/bad-name/bad-name";
    assert.throws(() => parseKeyVaultSecretsIdentifier(uri));
  });
});

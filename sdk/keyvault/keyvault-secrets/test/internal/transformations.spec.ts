// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DeletedSecret, KeyVaultSecret } from "../../src/index.js";
import type { DeletedSecretBundle, SecretBundle } from "../../src/models/models.js";
import { secretBundleDeserializer, deletedSecretBundleDeserializer } from "../../src/models/models.js";
import { getSecretFromSecretBundle } from "../../src/transformations.js";
import { describe, it, assert } from "vitest";

describe("Transformations", () => {
  it("correctly assigns all properties for a secret", () => {
    const date = new Date();
    const bundle: SecretBundle = {
      attributes: {
        created: date,
        enabled: true,
        expires: date,
        notBefore: date,
        recoverableDays: 7,
        recoveryLevel: "Purgable",
        updated: date,
      },
      contentType: "content_type",
      id: "https://azure_keyvault.vault.azure.net/keys/abc123/1",
      kid: "test_kid",
      managed: true,
      tags: {
        tag1: "value1",
        tag2: "value2",
      },
      value: "my secret value",
    };

    const expectedResult: KeyVaultSecret = {
      value: bundle.value,
      name: "abc123",
      properties: {
        expiresOn: date,
        createdOn: date,
        updatedOn: date,
        enabled: true,
        notBefore: date,
        recoverableDays: 7,
        recoveryLevel: "Purgable",
        id: "https://azure_keyvault.vault.azure.net/keys/abc123/1",
        contentType: "content_type",
        tags: {
          tag1: "value1",
          tag2: "value2",
        },
        managed: true,
        vaultUrl: "https://azure_keyvault.vault.azure.net",
        version: "1",
        name: "abc123",
        certificateKeyId: "test_kid",
        previousVersion: undefined,
      },
    };

    const secret: KeyVaultSecret = getSecretFromSecretBundle(bundle);
    assert.deepEqual(secret, expectedResult);
  });

  it("correctly assigns all properties for a deleted secret", () => {
    const date = new Date();
    const bundle: DeletedSecretBundle = {
      id: "https://azure_keyvault.vault.azure.net/keys/abc123/1",
      recoveryId: "recovery_id",
      scheduledPurgeDate: date,
      deletedDate: date,
    };

    const secret: DeletedSecret = getSecretFromSecretBundle(bundle);
    assert.equal(secret.properties.recoveryId, "recovery_id");
    assert.equal(secret.properties.deletedOn, date);
    assert.equal(secret.properties.scheduledPurgeDate, date);
    assert.equal(secret.recoveryId, "recovery_id");
    assert.equal(secret.deletedOn, date);
    assert.equal(secret.scheduledPurgeDate, date);
  });

  it("correctly maps previousVersion from SecretBundle to SecretProperties", () => {
    const bundle: SecretBundle = {
      id: "https://azure_keyvault.vault.azure.net/secrets/mySecret/2",
      value: "secret-value",
      previousVersion: "1",
    };

    const secret: KeyVaultSecret = getSecretFromSecretBundle(bundle);
    assert.equal(secret.properties.previousVersion, "1");
  });

  it("previousVersion is undefined when not present in SecretBundle", () => {
    const bundle: SecretBundle = {
      id: "https://azure_keyvault.vault.azure.net/secrets/mySecret/2",
      value: "secret-value",
    };

    const secret: KeyVaultSecret = getSecretFromSecretBundle(bundle);
    assert.isUndefined(secret.properties.previousVersion);
  });

  it("correctly maps previousVersion from DeletedSecretBundle", () => {
    const date = new Date();
    const bundle: DeletedSecretBundle = {
      id: "https://azure_keyvault.vault.azure.net/secrets/mySecret/2",
      recoveryId: "recovery_id",
      scheduledPurgeDate: date,
      deletedDate: date,
      previousVersion: "1",
    };

    const secret: DeletedSecret = getSecretFromSecretBundle(bundle);
    assert.equal(secret.properties.previousVersion, "1");
  });

  it("secretBundleDeserializer correctly deserializes previousVersion", () => {
    const json = {
      id: "https://azure_keyvault.vault.azure.net/secrets/mySecret/2",
      value: "secret-value",
      previousVersion: "1",
    };

    const bundle = secretBundleDeserializer(json);
    assert.equal(bundle.previousVersion, "1");
  });

  it("deletedSecretBundleDeserializer correctly deserializes previousVersion", () => {
    const json = {
      id: "https://azure_keyvault.vault.azure.net/secrets/mySecret/2",
      value: "secret-value",
      previousVersion: "1",
      recoveryId: "recovery_id",
    };

    const bundle = deletedSecretBundleDeserializer(json);
    assert.equal(bundle.previousVersion, "1");
  });

  it("secretBundleDeserializer returns undefined previousVersion when not in JSON", () => {
    const json = {
      id: "https://azure_keyvault.vault.azure.net/secrets/mySecret/2",
      value: "secret-value",
    };

    const bundle = secretBundleDeserializer(json);
    assert.isUndefined(bundle.previousVersion);
  });
});

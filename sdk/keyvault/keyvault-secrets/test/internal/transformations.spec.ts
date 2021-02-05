// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { DeletedSecret, KeyVaultSecret } from "../../src";
import { DeletedSecretBundle, SecretBundle } from "../../src/generated";
import { getSecretFromSecretBundle } from "../../src/transformations";

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
        updated: date
      },
      contentType: "content_type",
      id: "https://azure_keyvault.vault.azure.net/keys/abc123/1",
      kid: "test_kid",
      managed: true,
      tags: {
        tag1: "value1",
        tag2: "value2"
      },
      value: "my secret value"
    };

    const secret: KeyVaultSecret = getSecretFromSecretBundle(bundle);
    assert.equal(secret.value, bundle.value);
    assert.equal("abc123", secret.name);
    assert.equal(secret.properties.expiresOn, date);
    assert.equal(secret.properties.createdOn, date);
    assert.equal(secret.properties.updatedOn, date);
    assert.isTrue(secret.properties.enabled);
    assert.equal(secret.properties.notBefore, date);
    assert.equal(secret.properties.recoverableDays, 7);
    assert.equal(secret.properties.recoveryLevel, "Purgable");
    assert.equal(secret.properties.updatedOn, date);
    assert.equal(secret.properties.id, bundle.id);
    assert.equal(secret.properties.contentType, "content_type");
    assert.deepEqual(secret.properties.tags, bundle.tags);
    assert.isTrue(secret.properties.managed);
    assert.equal("https://azure_keyvault.vault.azure.net", secret.properties.vaultUrl);
    assert.equal("1", secret.properties.version);
    assert.exists(secret.properties.name);
  });

  it("correctly assigns all properties for a deleted secret", () => {
    const date = new Date();
    const bundle: DeletedSecretBundle = {
      id: "https://azure_keyvault.vault.azure.net/keys/abc123/1",
      recoveryId: "recovery_id",
      scheduledPurgeDate: date,
      deletedDate: date
    };

    const secret: DeletedSecret = getSecretFromSecretBundle(bundle);
    assert.equal(secret.properties.recoveryId, "recovery_id");
    assert.equal(secret.properties.deletedOn, date);
    assert.equal(secret.properties.scheduledPurgeDate, date);
  });
});

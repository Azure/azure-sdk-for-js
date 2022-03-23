// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
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
});

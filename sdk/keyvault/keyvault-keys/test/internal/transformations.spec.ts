// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { KeyBundle } from "../../src/generated";
import { KeyVaultKey } from "../../src/keysModels";
import { getKeyFromKeyBundle } from "../../src/transformations";

describe("Transformations", () => {
  it("Key Bundle to KeyVaultKey", () => {
    const date = new Date();
    const bundle: KeyBundle = {
      key: {
        kid:
          "https://azure_managedhsm.managedhsm.azure.net/keys/transformations/f03e8b3d76554e8b9749994bcf72fc61",
        kty: "oct-HSM",
        keyOps: ["encrypt", "decrypt"]
      },
      attributes: {
        recoverableDays: 1,
        recoveryLevel: "Recoverable",
        enabled: true,
        notBefore: date,
        expires: date,
        created: date,
        updated: date
      },
      tags: {
        tag_name: "tag_value"
      },
      managed: false
    };

    const expectedResult: KeyVaultKey = {
      key: {
        kid:
          "https://azure_managedhsm.managedhsm.azure.net/keys/transformations/f03e8b3d76554e8b9749994bcf72fc61",
        kty: "oct-HSM",
        keyOps: ["encrypt", "decrypt"]
      },
      name: "transformations",
      id:
        "https://azure_managedhsm.managedhsm.azure.net/keys/transformations/f03e8b3d76554e8b9749994bcf72fc61",
      keyType: "oct-HSM",
      keyOperations: ["encrypt", "decrypt"],
      properties: {
        id:
          "https://azure_managedhsm.managedhsm.azure.net/keys/transformations/f03e8b3d76554e8b9749994bcf72fc61",
        name: "transformations",
        vaultUrl: "https://azure_managedhsm.managedhsm.azure.net",
        version: "f03e8b3d76554e8b9749994bcf72fc61",
        enabled: true,
        notBefore: date,
        expiresOn: date,
        tags: {
          tag_name: "tag_value"
        },
        createdOn: date,
        updatedOn: date,
        recoveryLevel: "Recoverable",
        recoverableDays: 1,
        managed: false
      }
    };

    const key: KeyVaultKey = getKeyFromKeyBundle(bundle);
    assert.deepEqual(key, expectedResult);
  });
});

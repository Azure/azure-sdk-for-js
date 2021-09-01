// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { DeletedKeyBundle, DeletedKeyItem, KeyBundle } from "../../src/generated";
import { DeletedKey, KeyProperties, KeyVaultKey } from "../../src/keysModels";
import {
  getDeletedKeyFromDeletedKeyItem,
  getKeyFromKeyBundle,
  getKeyPropertiesFromKeyItem
} from "../../src/transformations";
import { stringToUint8Array } from "../utils/crypto";

describe("Transformations", () => {
  const releasePolicy = {
    contentType: "content type",
    data: stringToUint8Array("release policy")
  };
  it("KeyBundle to KeyVaultKey", () => {
    const date = new Date();
    const bundle: KeyBundle = {
      key: {
        kid:
          "https://azure_managedhsm.managedhsm.azure.net/keys/transformations/f03e8b3d76554e8b9749994bcf72fc61",
        kty: "oct-HSM",
        keyOps: ["encrypt", "decrypt"]
      },
      attributes: {
        exportable: true,
        recoverableDays: 1,
        recoveryLevel: "Recoverable",
        enabled: true,
        notBefore: date,
        expires: date,
        created: date,
        updated: date
      },
      releasePolicy,
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
        exportable: true,
        releasePolicy,
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

  it("KeyBundle to DeletedKey", () => {
    const date = new Date();
    const bundle: DeletedKeyBundle = {
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
        updated: date,
        exportable: false
      },
      tags: {
        tag_name: "tag_value"
      },
      managed: false,
      recoveryId: "recovery-id",
      releasePolicy,
      scheduledPurgeDate: date,
      deletedDate: date
    };

    const expectedResult: DeletedKey = {
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
        releasePolicy,
        exportable: false,
        createdOn: date,
        updatedOn: date,
        recoveryLevel: "Recoverable",
        recoverableDays: 1,
        managed: false,
        recoveryId: "recovery-id",
        scheduledPurgeDate: date,
        deletedOn: date
      }
    };

    const key: DeletedKey = getKeyFromKeyBundle(bundle);
    assert.deepEqual(key, expectedResult);
  });

  it("DeletedKeyItem to DeletedKey", () => {
    const date = new Date();
    const item: DeletedKeyItem = {
      kid:
        "https://azure_managedhsm.managedhsm.azure.net/keys/transformations/f03e8b3d76554e8b9749994bcf72fc61",
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
      managed: false,
      recoveryId: "recovery-id",
      scheduledPurgeDate: date,
      deletedDate: date
    };

    const expectedResult: DeletedKey = {
      key: {
        kid:
          "https://azure_managedhsm.managedhsm.azure.net/keys/transformations/f03e8b3d76554e8b9749994bcf72fc61"
      },
      name: "transformations",
      id:
        "https://azure_managedhsm.managedhsm.azure.net/keys/transformations/f03e8b3d76554e8b9749994bcf72fc61",
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
        managed: false,
        recoveryId: "recovery-id",
        scheduledPurgeDate: date,
        deletedOn: date
      }
    };

    const key: DeletedKey = getDeletedKeyFromDeletedKeyItem(item);
    assert.deepEqual(key, expectedResult);
  });

  it("KeyItem to KeyProperties", () => {
    const date = new Date();
    const item: DeletedKeyItem = {
      kid:
        "https://azure_managedhsm.managedhsm.azure.net/keys/transformations/f03e8b3d76554e8b9749994bcf72fc61",
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
      managed: false,
      recoveryId: "recovery-id",
      scheduledPurgeDate: date,
      deletedDate: date
    };

    const expectedResult: KeyProperties = {
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
    };

    const key: KeyProperties = getKeyPropertiesFromKeyItem(item);
    assert.deepEqual(key, expectedResult);
  });
});

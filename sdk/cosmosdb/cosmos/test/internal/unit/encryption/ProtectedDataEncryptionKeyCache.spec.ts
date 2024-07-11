// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import {
  EncryptionKeyResolver,
  EncryptionKeyStoreProvider,
  KeyEncryptionKey,
  ProtectedDataEncryptionKey,
} from "../../../../src/encryption";
import { ProtectedDataEncryptionKeyCache } from "../../../../src/encryption/Cache/ProtectedDataEncryptionKeyCache";
import { ErrorResponse, StatusCodes } from "../../../../src";

export class MockKeyVaultEncryptionKeyResolver implements EncryptionKeyResolver {
  private keyInfo: { [key: string]: number } = {
    tempmetadata1: 1,
    tempmetadata2: 2,
    "revokedKek-metadata": 3,
    mymetadata1: 4,
    mymetadata2: 5,
    testmetadata1: 6,
    metadataupdatedmetadata: 7,
    metadataPath: 8,
  };
  revokeAccessSet = false;
  constructor() {
    this.revokeAccessSet = false;
  }
  async unwrapKey(encryptionKeyId: string, algorithm: string, key: Buffer): Promise<Buffer> {
    console.log(algorithm);
    if (encryptionKeyId === "revokedKek-metadata" && this.revokeAccessSet) {
      const errorResponse = new ErrorResponse("Forbidden");
      errorResponse.statusCode = StatusCodes.Forbidden;
      throw errorResponse;
    }
    const moveBy = this.keyInfo[encryptionKeyId];
    const plainKey = Buffer.alloc(key.length);
    for (let i = 0; i < key.length; i++) {
      plainKey[i] = key[i] - moveBy;
    }
    return plainKey;
  }

  async wrapKey(encryptionKeyId: string, algorithm: string, wrappedKey: Buffer): Promise<Buffer> {
    console.log(algorithm);
    const moveBy = this.keyInfo[encryptionKeyId];
    const encryptedKey = Buffer.alloc(wrappedKey.length);
    for (let i = 0; i < wrappedKey.length; i++) {
      encryptedKey[i] = wrappedKey[i] + moveBy;
    }
    return encryptedKey;
  }
}

describe("ProtectedDataEncryptionKeyCache", function () {
  let keyEncryptionKey: KeyEncryptionKey;
  let protectedDataEncryptionKeyCache: ProtectedDataEncryptionKeyCache;
  let key: string;
  let protectedDataEncryptionKey: ProtectedDataEncryptionKey;

  beforeEach(async function () {
    const resolver = new MockKeyVaultEncryptionKeyResolver();
    const keyStoreProvider = new EncryptionKeyStoreProvider(resolver, "keyStoreProvider", 0);
    keyEncryptionKey = new KeyEncryptionKey("metadataName", "metadataPath", keyStoreProvider);
    const cacheTTL = 5000;
    protectedDataEncryptionKeyCache = new ProtectedDataEncryptionKeyCache(cacheTTL);
    const encryptedKey = Buffer.alloc(32);
    key = JSON.stringify([
      "encryptionKeyId",
      keyEncryptionKey.name,
      keyEncryptionKey.path,
      encryptedKey.toString("hex"),
    ]);
    protectedDataEncryptionKey =
      await protectedDataEncryptionKeyCache.getOrCreateProtectedDataEncryptionKey(
        "encryptionKeyId",
        keyEncryptionKey,
        encryptedKey,
      );
  });

  it("should create and cache a protected data encryption key", async function () {
    const result = protectedDataEncryptionKeyCache.getProtectedDataEncryptionKey(key);
    assert.equal(result, protectedDataEncryptionKey, "Key should be in cache");
    const newEncryptedKey = Buffer.alloc(32);
    const newKey = JSON.stringify([
      "newEncryptionKeyId",
      keyEncryptionKey.name,
      keyEncryptionKey.path,
      newEncryptedKey.toString("hex"),
    ]);
    assert.equal(
      protectedDataEncryptionKeyCache.getProtectedDataEncryptionKey(newKey),
      undefined,
      "new Protected data encryption key should not be in cache.",
    );
    const newProtectedDataEncryptionKey =
      await protectedDataEncryptionKeyCache.getOrCreateProtectedDataEncryptionKey(
        "newEncryptionKeyId",
        keyEncryptionKey,
        newEncryptedKey,
      );
    assert.ok(newProtectedDataEncryptionKey instanceof ProtectedDataEncryptionKey);
    assert.equal(
      protectedDataEncryptionKeyCache.getProtectedDataEncryptionKey(newKey),
      newProtectedDataEncryptionKey,
    );
  });

  it("should not store keys in cache when ttl is 0", async function () {
    const cacheWithZeroTTL = new ProtectedDataEncryptionKeyCache(0);
    const newEncryptedKey = Buffer.alloc(32);
    const newKey = JSON.stringify([
      "newEncryptionKeyId",
      keyEncryptionKey.name,
      keyEncryptionKey.path,
      newEncryptedKey.toString("hex"),
    ]);
    await cacheWithZeroTTL.getOrCreateProtectedDataEncryptionKey(
      "newEncryptionKeyId",
      keyEncryptionKey,
      newEncryptedKey,
    );
    assert.equal(
      cacheWithZeroTTL.getProtectedDataEncryptionKey(newKey),
      undefined,
      "The key should not get stored in cache as ttl is 0",
    );
  });
});

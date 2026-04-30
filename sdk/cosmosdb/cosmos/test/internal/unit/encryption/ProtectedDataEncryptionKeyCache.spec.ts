// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionKeyResolver } from "../../../../src/encryption/index.js";
import {
  EncryptionKeyResolverName,
  EncryptionKeyStoreProvider,
  KeyEncryptionKey,
  ProtectedDataEncryptionKey,
} from "../../../../src/encryption/index.js";
import { ProtectedDataEncryptionKeyCache } from "../../../../src/encryption/Cache/ProtectedDataEncryptionKeyCache.js";
import { ErrorResponse, StatusCodes } from "../../../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { uint8ArrayToString } from "@azure/core-util";

export class MockKeyVaultEncryptionKeyResolver implements EncryptionKeyResolver {
  encryptionKeyResolverName = EncryptionKeyResolverName.AzureKeyVault;
  private keyInfo: { [key: string]: number } = {
    tempmetadata1: 1,
    tempmetadata2: 2,
    revokedcmkpath: 3,
    cmkpath3: 4,
    cmkpath4: 5,
    cmkpath5: 6,
    cmkpath6: 7,
    metadataPath: 8,
  };
  revokeAccessSet = false;
  constructor() {
    this.revokeAccessSet = false;
  }
  async unwrapKey(
    encryptionKeyId: string,
    algorithm: string,
    key: Uint8Array,
  ): Promise<Uint8Array> {
    algorithm;
    if (encryptionKeyId === "revokedcmkpath" && this.revokeAccessSet) {
      const errorResponse = new ErrorResponse("Forbidden");
      errorResponse.statusCode = StatusCodes.Forbidden;
      throw errorResponse;
    }
    const moveBy = this.keyInfo[encryptionKeyId];
    const plainKey = new Uint8Array(key.length);
    for (let i = 0; i < key.length; i++) {
      plainKey[i] = key[i] - moveBy;
    }
    return plainKey;
  }

  async wrapKey(
    encryptionKeyId: string,
    algorithm: string,
    wrappedKey: Uint8Array,
  ): Promise<Uint8Array> {
    algorithm;
    const moveBy = this.keyInfo[encryptionKeyId];
    const encryptedKey = new Uint8Array(wrappedKey.length);
    for (let i = 0; i < wrappedKey.length; i++) {
      encryptedKey[i] = wrappedKey[i] + moveBy;
    }
    return encryptedKey;
  }
}

describe("ProtectedDataEncryptionKeyCache", () => {
  let keyEncryptionKey: KeyEncryptionKey;
  let protectedDataEncryptionKeyCache: ProtectedDataEncryptionKeyCache;
  let key: string;
  let keyStoreProvider: EncryptionKeyStoreProvider;
  let protectedDataEncryptionKey: ProtectedDataEncryptionKey;

  beforeEach(async () => {
    const resolver = new MockKeyVaultEncryptionKeyResolver();
    keyStoreProvider = new EncryptionKeyStoreProvider(resolver, 0);
    keyEncryptionKey = new KeyEncryptionKey("metadataName", "metadataPath", keyStoreProvider);
    const cacheTTL = 5000;
    protectedDataEncryptionKeyCache = new ProtectedDataEncryptionKeyCache(cacheTTL);
    const encryptedKey = new Uint8Array(32);
    key = JSON.stringify([
      "encryptionKeyId",
      keyEncryptionKey.name,
      keyEncryptionKey.path,
      uint8ArrayToString(encryptedKey, "hex"),
    ]);
    protectedDataEncryptionKey = await protectedDataEncryptionKeyCache.getOrCreate(
      "encryptionKeyId",
      keyEncryptionKey,
      encryptedKey,
    );
  });

  it("should create and cache a protected data encryption key", async () => {
    const result = protectedDataEncryptionKeyCache.get(key);
    assert.equal(result, protectedDataEncryptionKey, "Key should be in cache");
    const newEncryptedKey = new Uint8Array(32);
    const newKey = JSON.stringify([
      "newEncryptionKeyId",
      keyEncryptionKey.name,
      keyEncryptionKey.path,
      uint8ArrayToString(newEncryptedKey, "hex"),
    ]);
    assert.equal(
      protectedDataEncryptionKeyCache.get(newKey),
      undefined,
      "new Protected data encryption key should not be in cache.",
    );
    const newProtectedDataEncryptionKey = await protectedDataEncryptionKeyCache.getOrCreate(
      "newEncryptionKeyId",
      keyEncryptionKey,
      newEncryptedKey,
    );
    assert.ok(newProtectedDataEncryptionKey instanceof ProtectedDataEncryptionKey);
    assert.equal(protectedDataEncryptionKeyCache.get(newKey), newProtectedDataEncryptionKey);
  });

  it("should not store keys in cache when ttl is 0", async () => {
    const cacheWithZeroTTL = new ProtectedDataEncryptionKeyCache(0);
    const newEncryptedKey = new Uint8Array(32);
    const newKey = JSON.stringify([
      "newEncryptionKeyId",
      keyEncryptionKey.name,
      keyEncryptionKey.path,
      uint8ArrayToString(newEncryptedKey, "hex"),
    ]);
    await cacheWithZeroTTL.getOrCreate("newEncryptionKeyId", keyEncryptionKey, newEncryptedKey);
    assert.equal(
      cacheWithZeroTTL.get(newKey),
      undefined,
      "The key should not get stored in cache as ttl is 0",
    );
    cacheWithZeroTTL.cacheRefresher?.();
  });

  afterEach(async () => {
    protectedDataEncryptionKeyCache.cacheRefresher?.();
    keyStoreProvider.cacheRefresher?.();
  });
});

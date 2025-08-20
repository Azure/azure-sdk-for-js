// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyEncryptionKeyCache } from "$internal/encryption/Cache/KeyEncryptionKeyCache.js";
import { describe, it, assert } from "vitest";

describe("KeyEncryptionKeyCache", () => {
  it("should create and cache a new KeyEncryptionKey if not exists", () => {
    const name = "metadataName";
    const path = "metadataPath";
    const keyStoreProvider = {} as any;

    const keyEncryptionKeyCache = new KeyEncryptionKeyCache();
    const keyEncryptionKey = keyEncryptionKeyCache.getOrCreate(name, path, keyStoreProvider);

    assert.equal(keyEncryptionKey.name, name);
    assert.equal(keyEncryptionKey.path, path);
    assert.equal(keyEncryptionKey.keyStoreProvider, keyStoreProvider);
    assert.equal(keyEncryptionKeyCache.cache.size, 1);
    assert.equal(keyEncryptionKeyCache.cache.get(JSON.stringify([name, path])), keyEncryptionKey);
  });

  it("should get the existing KeyEncryptionKey from cache", () => {
    const name = "metadataName";
    const path = "metadataPath";
    const keyStoreProvider = {} as any;

    const keyEncryptionKeyCache = new KeyEncryptionKeyCache();

    const keyEncryptionKey = keyEncryptionKeyCache.getOrCreate(name, path, keyStoreProvider);

    assert.equal(keyEncryptionKeyCache.cache.size, 1);

    const keyEncryptionKeyFromCache = keyEncryptionKeyCache.getOrCreate(
      name,
      path,
      keyStoreProvider,
    );
    assert.equal(keyEncryptionKeyCache.cache.size, 1);
    assert.equal(keyEncryptionKey, keyEncryptionKeyFromCache);
  });
});

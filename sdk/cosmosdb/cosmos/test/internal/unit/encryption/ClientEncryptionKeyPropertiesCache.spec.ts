// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { ClientEncryptionKeyPropertiesCache } from "../../../../src/encryption/Cache/ClientEncryptionKeyPropertiesCache";
import {
  ClientEncryptionKeyProperties,
  EncryptionKeyResolverName,
  EncryptionKeyWrapMetadata,
  KeyEncryptionAlgorithm,
} from "../../../../src";

describe("ClientEncryptionKeyPropertiesCache", () => {
  it("should create an instance of ClientEncryptionKeyPropertiesCache", () => {
    const cache = new ClientEncryptionKeyPropertiesCache();
    assert.ok(cache);
  });

  it("should set and get a ClientEncryptionKeyProperties object in the cache", () => {
    const id = "testId";
    const encryptionAlgorithm = "testEncryptionAlgorithm";
    const etag = "testEtag";
    const wrappedDataEncryptionKey = Buffer.from("testWrappedDataEncryptionKey");
    const encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata = {
      type: EncryptionKeyResolverName.AzureKeyVault,
      name: "testName",
      value: "testValue",
      algorithm: KeyEncryptionAlgorithm.RSA_OAEP,
    };
    const clientEncryptionKeyProperties: ClientEncryptionKeyProperties = {
      id: id,
      encryptionAlgorithm,
      wrappedDataEncryptionKey,
      encryptionKeyWrapMetadata,
      etag,
    };
    const cache = new ClientEncryptionKeyPropertiesCache();
    const key = "databaseId/clientEncryptionKeyId";

    cache.set(key, clientEncryptionKeyProperties);
    const retrievedProperties = cache.get(key);

    assert.strictEqual(retrievedProperties, clientEncryptionKeyProperties);
  });

  it("should return undefined for a key that does not exist in the cache", () => {
    const cache = new ClientEncryptionKeyPropertiesCache();
    const key = "nonExistentKey";

    const retrievedProperties = cache.get(key);

    assert.strictEqual(retrievedProperties, undefined);
  });
});

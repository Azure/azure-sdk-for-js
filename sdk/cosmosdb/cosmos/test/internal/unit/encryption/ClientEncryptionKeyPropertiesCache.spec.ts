// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { ClientEncryptionKeyPropertiesCache } from "../../../../src/encryption/Cache/ClientEncryptionKeyPropertiesCache";
import {
  ClientEncryptionKeyProperties,
  EncryptionKeyResolverName,
  EncryptionKeyWrapMetadata,
  KeyEncryptionKeyAlgorithm,
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
    const encryptionKeyWrapMetadata = new EncryptionKeyWrapMetadata(
      EncryptionKeyResolverName.AzureKeyVault,
      "testName",
      "testValue",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    const clientEncryptionKeyProperties = new ClientEncryptionKeyProperties(
      id,
      encryptionAlgorithm,
      etag,
      wrappedDataEncryptionKey,
      encryptionKeyWrapMetadata,
    );
    const cache = new ClientEncryptionKeyPropertiesCache();
    const key = "databaseId/clientEncryptionKeyId";

    cache.setClientEncryptionKeyProperties(key, clientEncryptionKeyProperties);
    const retrievedProperties = cache.getClientEncryptionKeyProperties(key);

    assert.strictEqual(retrievedProperties, clientEncryptionKeyProperties);
  });

  it("should return undefined for a key that does not exist in the cache", () => {
    const cache = new ClientEncryptionKeyPropertiesCache();
    const key = "nonExistentKey";

    const retrievedProperties = cache.getClientEncryptionKeyProperties(key);

    assert.strictEqual(retrievedProperties, undefined);
  });
});

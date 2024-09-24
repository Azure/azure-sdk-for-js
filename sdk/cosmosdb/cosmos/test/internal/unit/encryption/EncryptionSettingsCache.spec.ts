// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { ClientEncryptionPolicy, EncryptionAlgorithm, EncryptionType } from "../../../../src";
import { ClientEncryptionIncludedPath, EncryptionSettings } from "../../../../src/encryption";
import { EncryptionSettingsCache } from "../../../../src/encryption/Cache/EncryptionSettingsCache";

describe("EncryptionSettingsCache", function () {
  it("should create and set encryption settings", async function () {
    const id = "databaseId/containerId";
    const containerRid = "mockContainerRid";
    const partitionKeyPaths = ["/mockPath"];

    const path = new ClientEncryptionIncludedPath(
      "/mockPath",
      "key1",
      EncryptionType.DETERMINISTIC,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );

    const clientEncryptionPolicy = new ClientEncryptionPolicy([path], 2);
    const encryptionSettingsCache = new EncryptionSettingsCache();
    const encryptionSettings = await encryptionSettingsCache.createAndSetEncryptionSettings(
      id,
      containerRid,
      partitionKeyPaths,
      clientEncryptionPolicy,
    );

    assert.equal(encryptionSettings.id, id);
    assert.equal(encryptionSettings.containerRid, containerRid);
    assert.equal(encryptionSettings.partitionKeyPaths, partitionKeyPaths);
    assert.equal(encryptionSettings.pathsToEncrypt.length, 1);
    assert.equal(encryptionSettings.pathsToEncrypt[0], "/mockPath");
    assert.equal(encryptionSettingsCache.getEncryptionSettings(id), encryptionSettings);
  });

  it("should return null when client encryption policy is not provided", async function () {
    const id = "databaseId/containerId";
    const containerRid = "mockContainerRid";
    const partitionKeyPaths = ["/mockPath"];
    const encryptionSettingsCache = new EncryptionSettingsCache();

    const encryptionSettings = await encryptionSettingsCache.createAndSetEncryptionSettings(
      id,
      containerRid,
      partitionKeyPaths,
      null,
    );

    assert.strictEqual(encryptionSettings, null);
  });

  it("should set and get encryption settings", function () {
    const key = "databaseId/containerId";
    const mockEncryptionSettings = new EncryptionSettings("mockId", "mockContainerRid", [
      "/mockPath",
    ]);
    const encryptionSettingsCache = new EncryptionSettingsCache();
    encryptionSettingsCache.setEncryptionSettings(key, mockEncryptionSettings);
    const retrievedSettings = encryptionSettingsCache.getEncryptionSettings(key);
    assert.equal(retrievedSettings, mockEncryptionSettings);
  });
});

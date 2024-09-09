// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

  it("should validate policy format version correctly", async function () {
    const key = "databaseId/containerId";
    const mockClientEncryptionPolicy = new ClientEncryptionPolicy([
      new ClientEncryptionIncludedPath(
        "/mockPath",
        "key1",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
    ]);

    const encryptionSettingsCache = new EncryptionSettingsCache();

    // Test invalid policy format version 0
    try {
      mockClientEncryptionPolicy.policyFormatVersion = 0;
      await encryptionSettingsCache.createAndSetEncryptionSettings(
        key,
        "mockContainerRid",
        ["/mockPath"],
        mockClientEncryptionPolicy,
      );
      assert.fail("Expected an error to be thrown");
    } catch (err) {
      assert.equal(
        err.message,
        "Invalid policy format version. Only versions 1 and 2 are supported.",
      );
    }
    // test policy format version 1 with encryption of partition key
    try {
      mockClientEncryptionPolicy.policyFormatVersion = 1;
      await encryptionSettingsCache.createAndSetEncryptionSettings(
        key,
        "mockContainerRid",
        ["/mockPath"],
        mockClientEncryptionPolicy,
      );
      assert.fail("Expected an error to be thrown");
    } catch (err) {
      assert.equal(
        err.message,
        "Encryption of partition key or id is only supported with policy format version 2.",
      );
    }
    // Test encryption type with encryption of partitionKey
    try {
      mockClientEncryptionPolicy.policyFormatVersion = 2;
      mockClientEncryptionPolicy.includedPaths[0].encryptionType = EncryptionType.RANDOMIZED;
      await encryptionSettingsCache.createAndSetEncryptionSettings(
        key,
        "mockContainerRid",
        ["/mockPath"],
        mockClientEncryptionPolicy,
      );
      assert.fail("Expected an error to be thrown");
    } catch (err) {
      assert.equal(
        err.message,
        "Encryption Type must be deterministic for encryption of partition key/id",
      );
    }
  });
});

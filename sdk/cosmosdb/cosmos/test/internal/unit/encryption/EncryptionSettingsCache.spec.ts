// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientEncryptionPolicy } from "@azure/cosmos";
import { EncryptionAlgorithm, EncryptionType } from "@azure/cosmos";
import type { ClientEncryptionIncludedPath } from "$internal/encryption/index.js";
import { EncryptionSettings } from "$internal/encryption/index.js";
import { EncryptionSettingsCache } from "$internal/encryption/Cache/EncryptionSettingsCache.js";
import { describe, it, assert } from "vitest";

describe("EncryptionSettingsCache", () => {
  it("should create and set encryption settings", async () => {
    const id = "databaseId/containerId";
    const containerRid = "mockContainerRid";
    const partitionKeyPaths = ["/mockPath"];

    const path: ClientEncryptionIncludedPath = {
      path: "/mockPath",
      clientEncryptionKeyId: "key1",
      encryptionType: EncryptionType.DETERMINISTIC,
      encryptionAlgorithm: EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    };

    const clientEncryptionPolicy: ClientEncryptionPolicy = {
      includedPaths: [path],
      policyFormatVersion: 2,
    };
    const encryptionSettingsCache = new EncryptionSettingsCache();
    const encryptionSettings = await encryptionSettingsCache.create(
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
    assert.equal(encryptionSettingsCache.get(id), encryptionSettings);
  });

  it("should return undefined when client encryption policy is not provided", async () => {
    const id = "databaseId/containerId";
    const containerRid = "mockContainerRid";
    const partitionKeyPaths = ["/mockPath"];
    const encryptionSettingsCache = new EncryptionSettingsCache();

    const encryptionSettings = await encryptionSettingsCache.create(
      id,
      containerRid,
      partitionKeyPaths,
      null,
    );

    assert.strictEqual(encryptionSettings, undefined);
  });

  it("should set and get encryption settings", () => {
    const key = "databaseId/containerId";
    const mockEncryptionSettings = new EncryptionSettings("mockId", "mockContainerRid", [
      "/mockPath",
    ]);
    const encryptionSettingsCache = new EncryptionSettingsCache();
    encryptionSettingsCache.set(key, mockEncryptionSettings);
    const retrievedSettings = encryptionSettingsCache.get(key);
    assert.equal(retrievedSettings, mockEncryptionSettings);
  });
});

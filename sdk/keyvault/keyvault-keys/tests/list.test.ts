// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { getKeyvaultName } from "./utils/utils.common";
import { KeysClient } from "../src";
import { TokenCredential } from "@azure/core-http";
import { EnvironmentCredential } from "@azure/identity";
import { record, setReplaceableVariables, delay, setReplacements, env } from "./utils/recorder";

describe("Keys client - list keys in various ways", () => {
  let credential: TokenCredential;
  let keyVaultName: string;
  let keyVaultUrl: string;
  let client: KeysClient;
  let recorder: any;

  // NOTES:
  // - To allow multiple integraton runs at the same time,
  //   we might need to factor in more environment variables.
  // - Another way to improve this is to add a specfic key per test.
  // - The environment variable is probably better named like PREFIX_KEY_NAME.
  const keyName = `list${env.KEY_NAME || "KeyName"}`;

  // NOTES:
  // - These functions are probably better moved to a common utility file.
  //   However, to do that we'll have to create a class or closure to maintain
  //   the instance of the KeyClient available.
  async function purgeKey(): Promise<void> {
    await client.purgeDeletedKey(keyName);
    await delay(60000);
  }
  async function flushKey(): Promise<void> {
    await client.deleteKey(keyName);
    await delay(60000);
    await purgeKey();
  }
  async function maybeFlushKey(): Promise<void> {
    try {
      await client.deleteKey(keyName);
      await delay(60000);
    } catch (e) {
      // It will fail if the key doesn't exist. This expected.
    }
    try {
      await client.purgeDeletedKey(keyName);
      await delay(60000);
    } catch (e) {
      // It will fail if the key doesn't exist. This expected.
    }
  }

  before(async function() {
    // NOTE:
    // setReplaceableVariables and setReplacements are reused just to put their ussage in the open,
    // to avoid having them obscured into a generic utility file. Once the recording tool is centralized
    // we can move these somewhere else!
    setReplaceableVariables({
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      KEYVAULT_NAME: "keyvault_name"
    });
    setReplacements([
      (recording) => recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
    ]);

    recorder = record(this); // eslint-disable-line no-invalid-this
    credential = await new EnvironmentCredential();
    keyVaultName = getKeyvaultName();
    keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    client = new KeysClient(keyVaultUrl, credential);

    await maybeFlushKey();

    recorder.stop();
  });

  beforeEach(async function() {
    recorder = record(this); // eslint-disable-line no-invalid-this
  });

  afterEach(async () => {
    recorder.stop();
  });

  // The tests follow

  it("can get the versions of a key", async () => {
    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (const version of client.listKeyVersions(keyName)) {
      assert.equal(version.name, keyName, "Unexpected key name in result from listKeyVersions().");
      totalVersions += 1;
    }

    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
    await flushKey();
  });

  it("can get the versions of a key (paged)", async () => {
    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (const page of client.listKeyVersions(keyName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.name,
          keyName,
          "Unexpected key name in result from listKeyVersions()."
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
    await flushKey();
  });

  it("list 0 versions of a non-existing key", async () => {
    let totalVersions = 0;
    for await (const version of client.listKeyVersions(keyName)) {
      assert.equal(version.name, keyName, "Unexpected key name in result from listKeyVersions().");
      totalVersions += 1;
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("list 0 versions of a non-existing key (paged)", async () => {
    let totalVersions = 0;
    for await (const page of client.listKeyVersions(keyName).byPage()) {
      for (const version of page) {
        assert.equal(
          version.name,
          keyName,
          "Unexpected key name in result from listKeyVersions()."
        );
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("can get several inserted keys", async () => {
    const keyNames = [`${keyName}-inserted-0`, `${keyName}-inserted-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const key of client.listKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by getKeys.");

    for (const name of keyNames) {
      await client.deleteKey(name);
      await delay(60000);
      await client.purgeDeletedKey(name);
    }
  });

  it("can get several inserted keys (paged)", async () => {
    const keyNames = [`${keyName}-inserted-paged-0`, `${keyName}-inserted-paged-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const page of client.listKeys().byPage()) {
      for (const key of page) {
        // The vault might contain more keys than the ones we inserted.
        if (!keyNames.includes(key.name)) continue;
        found += 1;
      }
    }

    assert.equal(found, 2, "Unexpected number of keys found by getKeys.");

    for (const name of keyNames) {
      await client.deleteKey(name);
      await delay(60000);
      await client.purgeDeletedKey(name);
    }
  });

  it("list deleted keys", async () => {
    const keyNames = [`${keyName}-deleted-0`, `${keyName}-deleted-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (const name of keyNames) {
      await client.deleteKey(name);
    }

    await delay(60000);

    let found = 0;
    for await (const key of client.listDeletedKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by listDeletedKeys.");

    for (const name of keyNames) {
      await client.purgeDeletedKey(name);
    }
  });

  it("list deleted keys (paged)", async () => {
    const keyNames = [`${keyName}-deleted-paged-0`, `${keyName}-deleted-paged-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (const name of keyNames) {
      await client.deleteKey(name);
    }

    await delay(60000);

    let found = 0;
    for await (const page of client.listDeletedKeys().byPage()) {
      for (const key of page) {
        // The vault might contain more keys than the ones we inserted.
        if (!keyNames.includes(key.name)) continue;
        found += 1;
      }
    }

    assert.equal(found, 2, "Unexpected number of keys found by listDeletedKeys.");

    for (const name of keyNames) {
      await client.purgeDeletedKey(name);
    }
  });
});

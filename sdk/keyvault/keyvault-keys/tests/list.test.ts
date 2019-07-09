// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { getKeyvaultName } from "./utils/utils.common";
import { KeysClient } from "../src";
import { TokenCredential } from "@azure/core-http";
import { EnvironmentCredential } from "@azure/identity";
import {
  record,
  setReplaceableVariables,
  retry,
  setReplacements,
  env,
  uniqueString
} from "./utils/recorder";
import TestClient from "./utils/testClient";

describe("Keys client - list keys in various ways", () => {
  let credential: TokenCredential;
  let keyVaultName: string;
  let keyVaultUrl: string;
  let client: KeysClient;
  let testClient: TestClient;
  let recorder: any;

  const keyPrefix = `list${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;

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

    keySuffix = uniqueString();
    setReplacements([
      (recording) => recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording) =>
        keySuffix === "" ? recording : recording.replace(new RegExp(keySuffix, "g"), "")
    ]);

    recorder = record(this); // eslint-disable-line no-invalid-this
    credential = await new EnvironmentCredential();
    keyVaultName = getKeyvaultName();
    keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    client = new KeysClient(keyVaultUrl, credential);
    testClient = new TestClient(client);
  });

  after(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can get the versions of a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (const version of client.listKeyVersions(keyName)) {
      assert.equal(version.name, keyName, "Unexpected key name in result from listKeyVersions().");
      totalVersions += 1;
    }
    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
    await testClient.flushKey(keyName);
  });

  it("can get the versions of a key (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
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
    await testClient.flushKey(keyName);
  });

  it("list 0 versions of a non-existing key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    let totalVersions = 0;
    for await (const version of client.listKeyVersions(keyName)) {
      assert.equal(version.name, keyName, "Unexpected key name in result from listKeyVersions().");
      totalVersions += 1;
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("list 0 versions of a non-existing key (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
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

  it("can get several inserted keys", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
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
      await testClient.flushKey(name);
    }
  });

  it("can get several inserted keys (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
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
      await testClient.flushKey(name);
    }
  });

  it("list deleted keys", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (const name of keyNames) {
      await client.deleteKey(name);
    }

    // Waiting until the key is deleted
    await retry(async () => client.getDeletedKey(keyNames[0]));

    let found = 0;
    for await (const key of client.listDeletedKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by listDeletedKeys.");

    for (const name of keyNames) {
      await testClient.purgeKey(name);
    }
  });

  it("list deleted keys (paged)", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];
    for (const name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (const name of keyNames) {
      await client.deleteKey(name);
    }

    // Waiting until the key is deleted
    await retry(async () => client.getDeletedKey(keyNames[0]));

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
      await testClient.purgeKey(name);
    }
  });
});

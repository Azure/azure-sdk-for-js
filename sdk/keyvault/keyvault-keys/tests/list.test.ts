import * as assert from "assert";
import { expect } from "chai";
import { getKeyvaultName, getUniqueName } from "./utils/utils.common";
import { KeysClient } from "../src";
import { TokenCredential } from "@azure/core-http";
import { EnvironmentCredential } from "@azure/identity";
import { record, setReplaceableVariables, delay, setReplacements, env } from "./utils/recorder";

describe("Keys client - list keys in various ways", () => {
  let credential: TokenCredential;
  let keyVaultName: string;
  let keyVaultUrl: string;
  let client: KeysClient;

  // NOTES:
  // - To allow multiple integraton runs at the same time,
  //   we might need to factor in more environment variables.
  // - Another way to improve this is to add a specfic key per test.
  // - The environment variable is probably better named like PREFIX_KEY_NAME.
  const keyName = `CRUD${env.KEY_NAME || "KeyName"}`;

  // NOTES:
  // - These functions are probably better moved to a common utility file.
  //   However, to do that we'll have to create a class or closure to maintain
  //   the instance of the KeyClient available.
  async function purgeKey() {
    await client.purgeDeletedKey(keyName);
    await delay(30000);
  }

  async function flushKey() {
    await client.deleteKey(keyName);
    await delay(30000);
    await purgeKey();
  }

  async function maybeFlushKey() {
    try {
      await client.deleteKey(keyName);
      await delay(30000);
    } catch (e) {
      // It will fail if the key doesn't exist. This expected.
    }
    try {
      await client.purgeDeletedKey(keyName);
      await delay(30000);
    } catch (e) {
      // It will fail if the key doesn't exist. This expected.
    }
  }

  before(async function() {
    setReplaceableVariables({
      AAD_CLIENT_ID: "aad_client_id",
      AAD_CLIENT_SECRET: "aad_client_secret",
      AAD_TENANT_ID: "aad_tenant_id",
      KEYVAULT_NAME: "keyvault_name"
    });

    setReplacements([
      (recording) => recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
    ]);

    recorder = record(this);
    credential = new EnvironmentCredential();
    keyVaultName = getKeyvaultName();
    keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    client = new KeysClient(keyVaultUrl, credential);

    await maybeFlushKey();

    recorder.stop();
  });

  let recorder: any;
  beforeEach(async function() {
    recorder = record(this);
  });

  afterEach(async () => {
    recorder.stop();
  });

  // The tests follow

  it("can get the versions of a key", async () => {
    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (let version of client.listKeyVersions(keyName)) {
      assert.equal(version.name, keyName, "Unexpected key name in result from listKeyVersions().");
      totalVersions += 1;
    }

    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
    await flushKey();
  });

  it("can get the versions of a key (paged)", async () => {
    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (let page of client.listKeyVersions(keyName).byPage()) {
      for (let version of page) {
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
    for await (let version of client.listKeyVersions(keyName)) {
      totalVersions += 1;
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("list 0 versions of a non-existing key (paged)", async () => {
    let totalVersions = 0;
    for await (let page of client.listKeyVersions(keyName).byPage()) {
      for (let version of page) {
        totalVersions += 1;
      }
    }
    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("can get several inserted keys", async () => {
    const keyNames = [`${keyName}-inserted-0`, `${keyName}-inserted-1`];
    for (let name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const key of client.listKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by getKeys.");

    for (let name of keyNames) {
      await client.deleteKey(name);
      await delay(30000);
      await client.purgeDeletedKey(name);
    }
  });

  it("can get several inserted keys (paged)", async () => {
    const keyNames = [`${keyName}-inserted-paged-0`, `${keyName}-inserted-paged-1`];
    for (let name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const page of client.listKeys().byPage()) {
      for (let key of page) {
        // The vault might contain more keys than the ones we inserted.
        if (!keyNames.includes(key.name)) continue;
        found += 1;
      }
    }

    assert.equal(found, 2, "Unexpected number of keys found by getKeys.");

    for (let name of keyNames) {
      await client.deleteKey(name);
      await delay(30000);
      await client.purgeDeletedKey(name);
    }
  });

  it("list deleted keys", async () => {
    const keyNames = [`${keyName}-deleted-0`, `${keyName}-deleted-1`];
    for (let name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (let name of keyNames) {
      await client.deleteKey(name);
    }

    await delay(30000);

    let found = 0;
    for await (const key of client.listDeletedKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by listDeletedKeys.");

    for (let name of keyNames) {
      await client.purgeDeletedKey(name);
    }
  });

  it("list deleted keys (paged)", async () => {
    const keyNames = [`${keyName}-deleted-paged-0`, `${keyName}-deleted-paged-1`];
    for (let name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (let name of keyNames) {
      await client.deleteKey(name);
    }

    await delay(30000);

    let found = 0;
    for await (const page of client.listDeletedKeys().byPage()) {
      for (let key of page) {
        // The vault might contain more keys than the ones we inserted.
        if (!keyNames.includes(key.name)) continue;
        found += 1;
      }
    }

    assert.equal(found, 2, "Unexpected number of keys found by listDeletedKeys.");

    for (let name of keyNames) {
      await client.purgeDeletedKey(name);
    }
  });
});

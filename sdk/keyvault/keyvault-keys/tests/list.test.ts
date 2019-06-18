import * as assert from "assert";
import { expect } from "chai";
import { getKeyvaultName, getUniqueName } from "./utils/utils.common";
import { KeysClient } from "../src";
import { TokenCredential, delay } from "@azure/core-http";
import { EnvironmentCredential } from "@azure/identity";

describe("Keys client - list keys in various ways", () => {
  let credential: TokenCredential;
  let keyVaultName: string;
  let keyVaultUrl: string;
  let client: KeysClient;
  let version: string;

  const deleteKeyAfter = (name) => async () => {
    await client.deleteKey(name);
    await delay(30000);
    await client.purgeDeletedKey(name);
  };

  before(async () => {
    credential = new EnvironmentCredential();
    keyVaultName = getKeyvaultName();
    keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    client = new KeysClient(keyVaultUrl, credential);
    version = "";
  });

  it("can get the versions of a key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));

    await client.createKey(keyName, "RSA");
    let totalVersions = 0;
    for await (let version of client.listKeyVersions(keyName)) {
      assert.equal(version.name, keyName, "Unexpected key name in result from listKeyVersions().");
      totalVersions += 1;
    }

    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
  });

  it("can get the versions of a key (paged)", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));

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
  });

  it("list 0 versions of a non-existing key", async () => {
    const keyName = getUniqueName("key");
    let totalVersions = 0;
    for await (let version of client.listKeyVersions(keyName)) {
      totalVersions += 1;
    }

    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("list 0 versions of a non-existing key (paged)", async () => {
    const keyName = getUniqueName("key");
    let totalVersions = 0;
    for await (let page of client.listKeyVersions(keyName).byPage()) {
      for (let version of page) {
        totalVersions += 1;
      }
    }

    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("can get several inserted keys", async () => {
    const keyNames = [getUniqueName("keys"), getUniqueName("keys")];

    after(async () => {
      for (let name of keyNames) {
        await client.deleteKey(name);
        await delay(30000);
        await client.purgeDeletedKey(name);
      }
    });

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
  });

  it("can get several inserted keys (paged)", async () => {
    const keyNames = [getUniqueName("keys"), getUniqueName("keys")];

    after(async () => {
      for (let name of keyNames) {
        await client.deleteKey(name);
        await delay(30000);
        await client.purgeDeletedKey(name);
      }
    });

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
  });

  it("list deleted keys", async () => {
    const keyNames = [getUniqueName("keys"), getUniqueName("keys")];

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

  it("list deleted keys", async () => {
    const keyNames = [getUniqueName("keys"), getUniqueName("keys")];

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

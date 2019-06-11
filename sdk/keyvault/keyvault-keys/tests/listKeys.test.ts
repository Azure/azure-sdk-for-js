import * as assert from "assert";
import { expect } from "chai";
import {
  getKeyvaultName,
  getCredentialWithServicePrincipalSecret,
  getUniqueName
} from "./utils/utils.common";
import { KeysClient } from "../src";
import { ServiceClientCredentials, delay } from "@azure/ms-rest-js";

describe("Keys client - list keys in various ways", () => {
  let credential: ServiceClientCredentials;
  let keyVaultName: string;
  let keyVaultUrl: string;
  let client: KeysClient;
  let version: string;

  const deleteKeyAfter = (name) => async () => {
    await client.deleteKey(name);
    await delay(10000);
    await client.purgeDeletedKey(name);
  };

  before(async () => {
    credential = await getCredentialWithServicePrincipalSecret();
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
    for await (let version of client.getKeyVersions(keyName)) {
      assert.equal(
        version.name,
        keyName,
        "Unexpected key name in result from createKeygetKeyVersions()."
      );
      totalVersions += 1;
    }

    assert.equal(totalVersions, 1, `Unexpected total versions for key ${keyName}`);
  });

  it("list 0 versions of a non-existing key", async () => {
    const keyName = getUniqueName("key");
    let totalVersions = 0;
    for await (let version of client.getKeyVersions(keyName)) {
      totalVersions += 1;
    }

    assert.equal(totalVersions, 0, `Unexpected total versions for key ${keyName}`);
  });

  it("can get several inserted keys", async () => {
    const keyNames = [getUniqueName("keys"), getUniqueName("keys")];

    after(async () => {
      for (let name of keyNames) {
        await client.deleteKey(name);
        await delay(2000);
        await client.purgeDeletedKey(name);
      }
    });

    for (let name of keyNames) {
      await client.createKey(name, "RSA");
    }

    let found = 0;
    for await (const key of client.getKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by getAllSecrets.");
  });

  it("list deleted keys", async () => {
    const keyNames = [getUniqueName("keys"), getUniqueName("keys")];

    for (let name of keyNames) {
      await client.createKey(name, "RSA");
    }
    for (let name of keyNames) {
      await client.deleteKey(name);
    }

    let found = 0;
    for await (const key of client.getDeletedKeys()) {
      // The vault might contain more keys than the ones we inserted.
      if (!keyNames.includes(key.name)) continue;
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of keys found by getAllSecrets.");

    for (let name of keyNames) {
      await client.purgeDeletedKey(name);
    }
  });
});

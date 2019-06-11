import * as assert from "assert";
import { expect } from "chai";
import {
  getKeyvaultName,
  getCredentialWithServicePrincipalSecret,
  getUniqueName
} from "./utils/utils.common";
import { KeysClient } from "../src";
import { ServiceClientCredentials, delay } from "@azure/ms-rest-js";

describe("Keys client - restore keys and recover backups", () => {
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

  it("can recover a deleted key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    await client.createKey(keyName, "RSA");
    await client.deleteKey(keyName);
    await delay(15000);
    const getDeletedResult = await client.getDeletedKey(keyName);
    assert.equal(getDeletedResult.name, keyName, "Unexpected key name in result from getKey().");
    await client.recoverDeletedKey(keyName);
    await delay(15000);
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
  });

  it("fails if one tries to recover a non-existing deleted key", async () => {
    const keyName = getUniqueName("key");
    let error;
    try {
      await client.recoverDeletedKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Key not found: ${keyName}`);
  });

  it("can generate a backup of a key", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    await client.createKey(keyName, "RSA");
    const result = await client.backupKey(keyName);
    assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupKey()");
    assert.equal(result.length, 8693, "Unexpected length of buffer from backupKey()");
  });

  it("fails to generate a backup of a non-existing key", async () => {
    const keyName = getUniqueName("key");
    let error;
    try {
      await client.backupKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Key not found: ${keyName}`);
  });

  it("can restore a key with a given backup", async () => {
    const keyName = getUniqueName("key");
    after(deleteKeyAfter(keyName));
    await client.createKey(keyName, "RSA");
    const backup = await client.backupKey(keyName);
    await client.deleteKey(keyName);
    await delay(15000);
    await client.purgeDeletedKey(keyName);
    await delay(15000);
    await client.restoreKey(backup);
    await delay(15000);
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
  });

  it("fails to restore a key with a malformed backup", async () => {
    const backup = new Buffer(8693);
    let error;
    try {
      await client.restoreKey(backup);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "Backup blob contains invalid or corrupt version.",
      "Unexpected error from restoreKey()"
    );
  });
});

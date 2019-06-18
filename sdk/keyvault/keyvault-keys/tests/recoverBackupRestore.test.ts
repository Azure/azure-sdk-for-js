import * as assert from "assert";
import { getKeyvaultName } from "./utils/utils.common";
import { KeysClient, CreateEcKeyOptions, UpdateKeyOptions, GetKeyOptions } from "../src";
import { TokenCredential, RestError } from "@azure/core-http";
import { EnvironmentCredential } from "@azure/identity";
import { record, setReplaceableVariables, delay, setReplacements, env } from "./utils/recorder";

describe("Keys client - restore keys and recover backups", () => {
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
  const keyName = `recover${env.KEY_NAME || "KeyName"}`;

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

    recorder = record(this);
    credential = await new EnvironmentCredential();
    keyVaultName = getKeyvaultName();
    keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    client = new KeysClient(keyVaultUrl, credential);

    await maybeFlushKey();

    recorder.stop();
  });

  beforeEach(async function() {
    recorder = record(this);
  });

  afterEach(async () => {
    recorder.stop();
  });

  // The tests follow

  it("can recover a deleted key", async () => {
    await client.createKey(keyName, "RSA");
    await client.deleteKey(keyName);
    await delay(30000);
    const getDeletedResult = await client.getDeletedKey(keyName);
    assert.equal(getDeletedResult.name, keyName, "Unexpected key name in result from getKey().");
    await client.recoverDeletedKey(keyName);
    await delay(30000);
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await flushKey();
  });

  it("fails if one tries to recover a non-existing deleted key", async () => {
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
    await client.createKey(keyName, "RSA");
    const result = await client.backupKey(keyName);
    assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupKey()");
    assert.ok(result.length > 8300, "Unexpected length of buffer from backupKey()");
    await flushKey();
  });

  it("fails to generate a backup of a non-existing key", async () => {
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
    await client.createKey(keyName, "RSA");
    const backup = await client.backupKey(keyName);
    await client.deleteKey(keyName);
    await delay(30000);
    await client.purgeDeletedKey(keyName);
    await delay(30000);
    await client.restoreKey(backup);
    await delay(30000);
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await flushKey();
  });

  it("fails to restore a key with a malformed backup", async () => {
    const backup = Buffer.alloc(8693);
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

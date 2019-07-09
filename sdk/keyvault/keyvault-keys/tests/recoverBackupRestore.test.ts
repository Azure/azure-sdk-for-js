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

describe("Keys client - restore keys and recover backups", () => {
  let credential: TokenCredential;
  let keyVaultName: string;
  let keyVaultUrl: string;
  let client: KeysClient;
  let testClient: TestClient;
  let recorder: any;

  const keyPrefix = `recover${env.KEY_NAME || "KeyName"}`;
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

  it("can recover a deleted key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    await client.deleteKey(keyName);
    const getDeletedResult = await retry(async () => client.getDeletedKey(keyName));
    assert.equal(getDeletedResult.name, keyName, "Unexpected key name in result from getKey().");
    await client.recoverDeletedKey(keyName);
    const getResult = await retry(async () => client.getKey(keyName));
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  it("fails if one tries to recover a non-existing deleted key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    let error;
    try {
      await client.recoverDeletedKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Key not found: ${keyName}`);
  });

  it("can generate a backup of a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const result = await client.backupKey(keyName);
    assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupKey()");
    assert.ok(result.length > 8300, "Unexpected length of buffer from backupKey()");
    await testClient.flushKey(keyName);
  });

  it("fails to generate a backup of a non-existing key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    let error;
    try {
      await client.backupKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Key not found: ${keyName}`);
  });

  it("can restore a key with a given backup", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this.test.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const backup = await client.backupKey(keyName);
    await testClient.flushKey(keyName);
    await retry(async () => client.restoreKey(backup));
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  it("fails to restore a key with a malformed backup", async function() {
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

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as assert from "assert";
import { getKeyvaultName } from "./utils/utils.common";
import { KeysClient, CreateEcKeyOptions, UpdateKeyOptions, GetKeyOptions } from "../src";
import { TokenCredential, RestError } from "@azure/core-http";
import { EnvironmentCredential } from "@azure/identity";
import { record, setReplaceableVariables, delay, setReplacements, env } from "./utils/recorder";

describe("Keys client - create, read, update and delete operations", () => {
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

  it("can create a key while giving a manual type", async () => {
    const result = await client.createKey(keyName, "RSA");
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await flushKey();
  });

  it("cannot create a key with an empty name", async () => {
    const keyName = "";
    let error;
    try {
      await client.createKey(keyName, "RSA");
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `"keyName" with value "" should satisfy the constraint "Pattern": /^[0-9a-zA-Z-]+$/.`,
      "Unexpected error while running createKey with an empty string as the name."
    );
  });

  it("cannot create a key with a null name", async () => {
    const keyName = null;
    let error;
    try {
      await client.createKey(keyName, "RSA");
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "keyName cannot be null or undefined.",
      "Unexpected error while running createKey with an empty string as the name."
    );
  });

  it("can create a RSA key", async () => {
    const result = await client.createRsaKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await flushKey();
  });

  it("can create a RSA key with size", async () => {
    let options = {
      keySize: 2048
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await flushKey();
  });

  it("can create an EC key", async () => {
    const result = await client.createEcKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await flushKey();
  });

  it("can create an EC key with curve", async () => {
    let options: CreateEcKeyOptions = {
      curve: "P-256"
    };
    const result = await client.createEcKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await flushKey();
  });

  it("can create a disabled key", async () => {
    let options = {
      enabled: false
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.enabled, false, "Unexpected enabled value from createKey().");
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await flushKey();
  });

  it("can create a key with notBefore", async () => {
    let date = new Date("2019-01-01");
    let notBefore = new Date(date.getTime() + 5000); // 5 seconds later
    notBefore.setMilliseconds(0);

    let options = { notBefore };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result.notBefore.getTime(),
      notBefore.getTime(),
      "Unexpected notBefore value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await flushKey();
  });

  it("can create a key with expires", async () => {
    let date = new Date("2019-01-01");
    let expires = new Date(date.getTime() + 5000); // 5 seconds later
    expires.setMilliseconds(0);

    let options = { expires };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result.expires.getTime(),
      expires.getTime(),
      "Unexpected expires value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await flushKey();
  });

  it("can update key", async () => {
    const { version } = await client.createRsaKey(keyName);
    let options: UpdateKeyOptions = { enabled: false };
    const result = await client.updateKey(keyName, version, options);
    assert.equal(result.enabled, false, "Unexpected enabled value from updateKey().");
    await flushKey();
  });

  it("can update a disabled key", async () => {
    const createOptions = {
      enabled: false
    };
    const { version } = await client.createRsaKey(keyName, createOptions);
    const expires = new Date("2019-01-01");
    expires.setMilliseconds(0);
    const updateOptions: UpdateKeyOptions = { expires };
    const result = await client.updateKey(keyName, version, updateOptions);
    assert.equal(
      result.expires.getTime(),
      expires.getTime(),
      "Unexpected expires value after attempting to update a disabled key"
    );
    await flushKey();
  });

  it("can delete a key", async () => {
    const result = await client.createKey(keyName, "RSA");
    await client.deleteKey(keyName);

    try {
      await client.getKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e instanceof RestError) {
        assert.equal(e.message, `Key not found: ${keyName}`);
      } else {
        throw e;
      }
    }
    await delay(30000);
    await purgeKey();
  });

  it("delete nonexisting key", async () => {
    try {
      await client.getKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e instanceof RestError) {
        assert.equal(e.message, `Key not found: ${keyName}`);
      } else {
        throw e;
      }
    }
  });

  it("can get a key", async () => {
    const result = await client.createKey(keyName, "RSA");
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await flushKey();
  });

  it("can get a specific version of a key", async () => {
    const { version } = await client.createKey(keyName, "RSA");
    const options: GetKeyOptions = { version };
    const getResult = await client.getKey(keyName, options);
    assert.equal(getResult.version, version, "Unexpected key name in result from getKey().");
    await flushKey();
  });

  it("can get a deleted key", async () => {
    await client.createKey(keyName, "RSA");
    await client.deleteKey(keyName);
    await delay(30000);
    const getResult = await client.getDeletedKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await purgeKey();
  });

  it("can't get a deleted key that doesn't exist", async () => {
    let error;
    try {
      await client.deleteKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `Key not found: ${keyName}`,
      "Unexpected key name in result from getKey()."
    );
  });
});

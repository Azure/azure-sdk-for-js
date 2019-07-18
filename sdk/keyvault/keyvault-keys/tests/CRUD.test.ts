// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { KeysClient, CreateEcKeyOptions, UpdateKeyOptions, GetKeyOptions } from "../src";
import { RestError } from "@azure/core-http";
import { isNode, retry, env } from "./utils/recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { AbortController } from "@azure/abort-controller";

describe("Keys client - create, read, update and delete operations", () => {
  const keyPrefix = `recover${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeysClient;
  let testClient: TestClient;
  let recorder: any;

  before(async function() {
    const authentication = await authenticate(this);
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  after(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can create a key while giving a manual type", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const result = await client.createKey(keyName, "RSA");
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can abort creating a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const controller = new AbortController();
    const resultPromise = client.createKey(keyName, "RSA", {
      abortSignal: controller.signal
    });
    controller.abort();
    let error;
    try {
      await resultPromise;
    } catch (e) {
      error = e;
    }
		if (isNode) {
      assert.equal(error.message, "The request was aborted");
		} else {
      assert.equal(error.message, "Failed to send the request.");
		}
  });

  it("cannot create a key with an empty name", async function() {
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

  it("can create a RSA key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const result = await client.createRsaKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a RSA key with size", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const options = {
      keySize: 2048
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create an EC key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const result = await client.createEcKey(keyName);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create an EC key with curve", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const options: CreateEcKeyOptions = {
      curve: "P-256"
    };
    const result = await client.createEcKey(keyName, options);
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a disabled key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const options = {
      enabled: false
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.enabled, false, "Unexpected enabled value from createKey().");
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a key with notBefore", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const date = new Date("2019-01-01");
    const notBefore = new Date(date.getTime() + 5000); // 5 seconds later
    notBefore.setMilliseconds(0);

    const options = { notBefore };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result!.notBefore!.getTime(),
      notBefore.getTime(),
      "Unexpected notBefore value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a key with expires", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const date = new Date("2019-01-01");
    const expires = new Date(date.getTime() + 5000); // 5 seconds later
    expires.setMilliseconds(0);

    const options = { expires };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result!.expires!.getTime(),
      expires.getTime(),
      "Unexpected expires value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can update key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const { version } = await client.createRsaKey(keyName);
    const options: UpdateKeyOptions = { enabled: false };
    const result = await client.updateKey(keyName, version || "", options);
    assert.equal(result.enabled, false, "Unexpected enabled value from updateKey().");
    await testClient.flushKey(keyName);
  });

  it("can update a disabled key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const createOptions = {
      enabled: false
    };
    const { version } = await client.createRsaKey(keyName, createOptions);
    const expires = new Date("2019-01-01");
    expires.setMilliseconds(0);
    const updateOptions: UpdateKeyOptions = { expires };
    const result = await client.updateKey(keyName, version || "", updateOptions);
    assert.equal(
      result!.expires!.getTime(),
      expires.getTime(),
      "Unexpected expires value after attempting to update a disabled key"
    );
    await testClient.flushKey(keyName);
  });

  it("can delete a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
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
    await testClient.purgeKey(keyName);
  });

  it("delete nonexisting key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
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

  it("can get a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  it("can get a specific version of a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const { version } = await client.createKey(keyName, "RSA");
    const options: GetKeyOptions = { version };
    const getResult = await client.getKey(keyName, options);
    assert.equal(getResult.version, version, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  it("can get a deleted key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    await client.deleteKey(keyName);
    const getResult = await retry(async () => client.getDeletedKey(keyName));
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.purgeKey(keyName);
  });

  it("can't get a deleted key that doesn't exist", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { RestError } from "@azure/core-http";
import { AbortController } from "@azure/abort-controller";
import { env, Recorder } from "@azure/test-utils-recorder";

import {
  KeyClient,
  CreateEcKeyOptions,
  UpdateKeyPropertiesOptions,
  GetKeyOptions
} from "../../src";
import { assertThrowsAbortError } from "../utils/utils.common";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Keys client - create, read, update and delete operations", () => {
  const keyPrefix = `CRUD${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // The tests follow

  it("can create a key while giving a manual type", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const result = await client.createKey(keyName, "RSA");
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can abort creating a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const controller = new AbortController();

    await assertThrowsAbortError(async () => {
      const resultPromise = client.createKey(keyName, "RSA", {
        abortSignal: controller.signal
      });
      controller.abort();
      await resultPromise;
    });
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can create a key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await assertThrowsAbortError(async () => {
      await client.createKey(keyName, "RSA", {
        requestOptions: {
          timeout: 1
        }
      });
    });
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

  // On playback mode, the tests happen too fast for the timeout to work
  it("can create a RSA key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);

    await assertThrowsAbortError(async () => {
      await client.createRsaKey(keyName, {
        requestOptions: {
          timeout: 1
        }
      });
    });
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

  // On playback mode, the tests happen too fast for the timeout to work
  it("can create an EC key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await assertThrowsAbortError(async () => {
      await client.createEcKey(keyName, {
        requestOptions: {
          timeout: 1
        }
      });
    });
  });

  it("can create a disabled key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const options = {
      enabled: false
    };
    const result = await client.createRsaKey(keyName, options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from createKey().");
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
      result!.properties.notBefore!.getTime(),
      notBefore.getTime(),
      "Unexpected notBefore value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can create a key with expires", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const date = new Date("2019-01-01");
    const expiresOn = new Date(date.getTime() + 5000); // 5 seconds later
    expiresOn.setMilliseconds(0);

    const options = { expiresOn };
    const result = await client.createRsaKey(keyName, options);

    assert.equal(
      result!.properties.expiresOn!.getTime(),
      expiresOn.getTime(),
      "Unexpected expires value from createKey()."
    );
    assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
    await testClient.flushKey(keyName);
  });

  it("can update key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const { version } = (await client.createRsaKey(keyName)).properties;
    const options: UpdateKeyPropertiesOptions = { enabled: false };
    const result = await client.updateKeyProperties(keyName, version || "", options);
    assert.equal(result.properties.enabled, false, "Unexpected enabled value from updateKey().");
    await testClient.flushKey(keyName);
  });

  it("can update a disabled key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const createOptions = {
      enabled: false
    };
    const { version } = (await client.createRsaKey(keyName, createOptions)).properties;
    const expiresOn = new Date("2019-01-01");
    expiresOn.setMilliseconds(0);
    const updateOptions: UpdateKeyPropertiesOptions = { expiresOn };
    const result = await client.updateKeyProperties(keyName, version || "", updateOptions);
    assert.equal(
      result!.properties.expiresOn!.getTime(),
      expiresOn.getTime(),
      "Unexpected expires value after attempting to update a disabled key"
    );
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can update key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const { version } = (await client.createRsaKey(keyName)).properties;
    const options: UpdateKeyPropertiesOptions = {
      enabled: false,
      requestOptions: { timeout: 1 }
    };
    await assertThrowsAbortError(async () => {
      await client.updateKeyProperties(keyName, version || "", options);
    });
  });

  it("can delete a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    await poller.pollUntilDone();

    try {
      await client.getKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e instanceof RestError) {
        assert.equal(e.code, "KeyNotFound");
        assert.equal(e.statusCode, 404);
      } else {
        throw e;
      }
    }
    await testClient.purgeKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can delete a key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    await assertThrowsAbortError(async () => {
      await client.beginDeleteKey(keyName, {
        ...testPollerProperties,
        requestOptions: {
          timeout: 1
        }
      });
    });
  });

  it("delete nonexisting key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    try {
      await client.getKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e instanceof RestError) {
        assert.equal(e.code, "KeyNotFound");
        assert.equal(e.statusCode, 404);
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

  // On playback mode, the tests happen too fast for the timeout to work
  it("can get a key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    await assertThrowsAbortError(async () => {
      await client.getKey(keyName, { requestOptions: { timeout: 1 } });
    });
  });

  it("can get a specific version of a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const { version } = (await client.createKey(keyName, "RSA")).properties;
    const options: GetKeyOptions = { version };
    const getResult = await client.getKey(keyName, options);
    assert.equal(
      getResult.properties.version,
      version,
      "Unexpected key name in result from getKey()."
    );
    await testClient.flushKey(keyName);
  });

  it("can get a deleted key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    assert.equal(
      poller.getResult()!.name,
      keyName,
      "Unexpected key name in result from beginDeleteKey()."
    );
    await poller.pollUntilDone();
    let getResult = await poller.getResult();
    assert.equal(
      getResult!.name,
      keyName,
      "Unexpected key name in result from poller.getResult()."
    );
    getResult = await client.getDeletedKey(keyName);
    assert.equal(getResult!.name, keyName, "Unexpected key name in result from getDeletedKey().");
    await testClient.purgeKey(keyName);
  });

  it("can't get a deleted key that doesn't exist", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    let error;
    try {
      const poller = await client.beginDeleteKey(keyName, testPollerProperties);
      await poller.pollUntilDone();
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.code, "KeyNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("can purge a deleted key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    await poller.pollUntilDone();
    await client.purgeDeletedKey(keyName);
  });
});

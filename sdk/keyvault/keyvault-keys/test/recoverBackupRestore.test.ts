// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { KeyClient } from "../src";
import { isNode } from "@azure/core-http";
import { retry, testPollerProperties, assertThrowsAbortError } from "../../keyvault-common/src";
import { env, Recorder } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";

describe("Keys client - restore keys and recover backups", () => {
  const keyPrefix = `recover${env.KEY_NAME || "KeyName"}`;
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
    recorder.stop();
  });

  // The tests follow

  it("can recover a deleted key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const deletePoller = await client.beginDeleteKey(keyName, testPollerProperties);
    assert.equal(
      deletePoller.getResult()!.name,
      keyName,
      "Unexpected key name in result from deletePoller.getResult()."
    );
    await deletePoller.pollUntilDone();

    const getDeletedResult = await deletePoller.getResult();
    assert.equal(getDeletedResult!.name, keyName, "Unexpected key name in result from getKey().");

    const recoverPoller = await client.beginRecoverDeletedKey(keyName, testPollerProperties);
    await recoverPoller.pollUntilDone();
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  it("fails if one tries to recover a non-existing deleted key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    let error;
    try {
      const recoverPoller = await client.beginRecoverDeletedKey(keyName, testPollerProperties);
      await recoverPoller.pollUntilDone();
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Key not found: ${keyName}`);
  });

  it("can generate a backup of a key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const result = await client.backupKey(keyName);
    if (isNode) {
      assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupKey()");
    } else {
      assert.equal(result!.constructor, Uint8Array, "Unexpected return value from backupKey()");
    }
    assert.ok(result!.length > 0, "Unexpected length of buffer from backupKey()");
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can generate a backup of a key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    await assertThrowsAbortError(async () => {
      await client.backupKey("doesntmatter", { requestOptions: { timeout: 1 } });
    });
  });

  it("fails to generate a backup of a non-existing key", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
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
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const backup = await client.backupKey(keyName);
    await testClient.flushKey(keyName);
    await retry(async () => client.restoreKeyBackup(backup as Uint8Array));
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can restore a key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const backup = await client.backupKey(keyName);
    await testClient.flushKey(keyName);

    await assertThrowsAbortError(async () => {
      await client.restoreKeyBackup(backup!, { requestOptions: { timeout: 1 } });
    });
  });

  it("fails to restore a key with a malformed backup", async function() {
    const backup = new Uint8Array(8693);
    let error;
    try {
      await client.restoreKeyBackup(backup);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "Backup blob contains invalid or corrupt version.",
      "Unexpected error from restoreKeyBackup()"
    );
  });
});

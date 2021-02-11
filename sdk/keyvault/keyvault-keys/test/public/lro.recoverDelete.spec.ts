// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { env, Recorder } from "@azure/test-utils-recorder";
import { PollerStoppedError } from "@azure/core-lro";

import { KeyClient, DeletedKey } from "../../src";
import { assertThrowsAbortError } from "../utils/utils.common";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Keys client - Long Running Operations - recoverDelete", () => {
  const keyPrefix = `lroRecoverDelete${env.CERTIFICATE_NAME || "KeyName"}`;
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

  it("can wait until a key is recovered", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");

    const deletePoller = await client.beginDeleteKey(keyName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedKey(keyName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    // The pending key can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, keyName);

    const deletedKey: DeletedKey = await poller.pollUntilDone();
    assert.equal(deletedKey.name, keyName);
    assert.ok(poller.getOperationState().isCompleted);

    // The final key can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, keyName);

    await testClient.flushKey(keyName);
  });

  it("can resume from a stopped poller", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const deletePoller = await client.beginDeleteKey(keyName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedKey(keyName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    poller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await poller.poll(); // Making sure it has some data

    poller.stopPolling();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().isCompleted);

    const serialized = poller.toString();

    const resumePoller = await client.beginRecoverDeletedKey(keyName, {
      resumeFrom: serialized,
      ...testPollerProperties
    });

    assert.ok(poller.getOperationState().isStarted);
    const deletedKey: DeletedKey = await resumePoller.pollUntilDone();
    assert.equal(deletedKey.name, keyName);
    assert.ok(resumePoller.getOperationState().isCompleted);

    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can recover a deleted key with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const deletePoller = await client.beginDeleteKey(keyName, testPollerProperties);
    await deletePoller.pollUntilDone();
    await assertThrowsAbortError(async () => {
      await client.beginRecoverDeletedKey(keyName, {
        requestOptions: { timeout: 1 },
        ...testPollerProperties
      });
    });
  });
});

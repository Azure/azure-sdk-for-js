// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { KeyClient, DeletedKey } from "../src";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerStoppedError } from "@azure/core-lro";

describe("Keys client - Long Running Operations - recoverDelete", () => {
  const keyPrefix = `recover${env.CERTIFICATE_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: any;

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

  it("can wait until a key is recovered", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");

    const deletePoller = await client.beginDeleteKey(keyName);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedKey(keyName);
    assert.ok(poller.getOperationState().started);

    const deletedKey: DeletedKey = await poller.pollUntilDone();
    assert.equal(deletedKey.properties.name, keyName);
    assert.ok(poller.getOperationState().completed);

    // The final key can also be obtained this way:
    assert.equal(poller.getOperationState().result!.properties.name, keyName);

    await testClient.flushKey(keyName);
  });

  it("can resume from a stopped poller", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const deletePoller = await client.beginDeleteKey(keyName);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedKey(keyName);
    assert.ok(poller.getOperationState().started);

    poller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await poller.poll(); // Making sure it has some data

    poller.stopPolling();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().completed);

    const serialized = poller.toString();

    const resumePoller = await client.beginRecoverDeletedKey(keyName, {
      resumeFrom: serialized
    });

    assert.ok(poller.getOperationState().started);
    const deletedKey: DeletedKey = await resumePoller.pollUntilDone();
    assert.equal(deletedKey.properties.name, keyName);
    assert.ok(resumePoller.getOperationState().completed);

    await testClient.flushKey(keyName);
  });
});

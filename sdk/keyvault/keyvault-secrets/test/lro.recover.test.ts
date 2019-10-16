// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { SecretsClient, DeletedSecret } from "../src";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerStoppedError } from "@azure/core-lro";

describe.only("Secrets client - Long Running Operations - recoverDelete", () => {
  const keyPrefix = `recover${env.CERTIFICATE_NAME || "SecretName"}`;
  let keySuffix: string;
  let client: SecretsClient;
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
    await client.setSecret(keyName, "value");

    const deletePoller = await client.beginDeleteSecret(keyName);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedSecret(keyName);
    assert.ok(poller.getOperationState().started);

    const deletedSecret: DeletedSecret = await poller.pollUntilDone();
    assert.equal(deletedSecret.properties.name, keyName);
    assert.ok(poller.getOperationState().completed);

    // The final key can also be obtained this way:
    assert.equal(poller.getOperationState().result!.properties.name, keyName);

    await testClient.flushSecret(keyName);
  });

  it("can resume from a stopped poller", async function() {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.setSecret(keyName, "value");
    const deletePoller = await client.beginDeleteSecret(keyName);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedSecret(keyName);
    assert.ok(poller.getOperationState().started);

    poller.pollUntilDone().catch((e: PollerStoppedError | Error) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await poller.poll(); // Making sure it has some data

    poller.stop();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().completed);

    const serialized = poller.toString();

    const resumePoller = await client.beginRecoverDeletedSecret(keyName, {
      resumeFrom: serialized
    });

    assert.ok(poller.getOperationState().started);
    const deletedSecret: DeletedSecret = await resumePoller.pollUntilDone();
    assert.equal(deletedSecret.properties.name, keyName);
    assert.ok(resumePoller.getOperationState().completed);

    await testClient.flushSecret(keyName);
  });
});

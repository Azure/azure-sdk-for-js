// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { SecretClient, SecretProperties } from "../src";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerStoppedError } from "@azure/core-lro";

describe("Secrets client - Long Running Operations - recoverDelete", () => {
  const secretPrefix = `recover${env.CERTIFICATE_NAME || "SecretName"}`;
  let secretSuffix: string;
  let client: SecretClient;
  let testClient: TestClient;
  let recorder: any;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    secretSuffix = authentication.secretSuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can wait until a secret is recovered", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "value");

    const deletePoller = await client.beginDeleteSecret(secretName);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedSecret(secretName);
    assert.ok(poller.getOperationState().started);

    // The pending secret properties can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, secretName);

    const secretProperties: SecretProperties = await poller.pollUntilDone();
    assert.equal(secretProperties.name, secretName);
    assert.ok(poller.getOperationState().completed);

    // The final secret can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, secretName);

    await testClient.flushSecret(secretName);
  });

  it("can resume from a stopped poller", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "value");
    const deletePoller = await client.beginDeleteSecret(secretName);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedSecret(secretName);
    assert.ok(poller.getOperationState().started);

    poller.pollUntilDone().catch((e: PollerStoppedError | Error) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await poller.poll(); // Making sure it has some data

    poller.stopPolling();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().completed);

    const serialized = poller.toString();

    const resumePoller = await client.beginRecoverDeletedSecret(secretName, {
      resumeFrom: serialized
    });

    assert.ok(poller.getOperationState().started);
    const secretProperties: SecretProperties = await resumePoller.pollUntilDone();
    assert.equal(secretProperties.name, secretName);
    assert.ok(resumePoller.getOperationState().completed);

    await testClient.flushSecret(secretName);
  });
});

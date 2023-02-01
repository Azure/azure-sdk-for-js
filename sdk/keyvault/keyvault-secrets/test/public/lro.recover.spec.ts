// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { Context } from "mocha";
import { Recorder, env, isLiveMode } from "@azure-tools/test-recorder";
import { PollerStoppedError } from "@azure/core-lro";

import { SecretClient, SecretProperties } from "../../src";
import { assertThrowsAbortError, getServiceVersion } from "./utils/common";
import { testPollerProperties } from "./utils/recorderUtils";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";

describe("Secrets client - Long Running Operations - recoverDelete", () => {
  const secretPrefix = `lroRecover${env.CERTIFICATE_NAME || "SecretName"}`;
  let secretSuffix: string;
  let client: SecretClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const authentication = await authenticate(this, getServiceVersion());
    secretSuffix = authentication.secretSuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can wait until a secret is recovered", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "value");

    const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedSecret(secretName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    // The pending secret properties can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, secretName);

    const secretProperties: SecretProperties = await poller.pollUntilDone();
    assert.equal(secretProperties.name, secretName);
    assert.ok(poller.getOperationState().isCompleted);

    // The final secret can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, secretName);
  });

  it("can resume from a stopped poller", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "value");
    const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedSecret(secretName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    poller.pollUntilDone().catch((e: PollerStoppedError | Error) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await poller.poll(); // Making sure it has some data

    poller.stopPolling();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().isCompleted);

    const serialized = poller.toString();

    const resumePoller = await client.beginRecoverDeletedSecret(secretName, {
      resumeFrom: serialized,
      ...testPollerProperties,
    });

    assert.ok(poller.getOperationState().isStarted);
    const secretProperties: SecretProperties = await resumePoller.pollUntilDone();
    assert.equal(secretProperties.name, secretName);
    assert.ok(resumePoller.getOperationState().isCompleted);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can attempt to recover a deleted secret with requestOptions timeout", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }

    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "value");
    const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);
    await deletePoller.pollUntilDone();
    await assertThrowsAbortError(async () => {
      await client.beginRecoverDeletedSecret(secretName, {
        requestOptions: { timeout: 1 },
        ...testPollerProperties,
      });
    });
  });
});

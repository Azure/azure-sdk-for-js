// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { SecretClient, DeletedSecret } from "../src";
import { isNode } from "@azure/core-http";
import { testPollerProperties } from "./utils/recorderUtils";
import { env, isPlaybackMode } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerStoppedError } from "@azure/core-lro";
import { assertThrowsAbortError } from "./utils/utils.common";

describe("Secrets client - Long Running Operations - delete", () => {
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

  it("can wait until a secret is deleted", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "value");
    const poller = await client.beginDeleteSecret(secretName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    // The pending deleted secret can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, secretName);

    const deletedSecret: DeletedSecret = await poller.pollUntilDone();
    assert.equal(deletedSecret.name, secretName);
    assert.ok(poller.getOperationState().isCompleted);

    // The final secret can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, secretName);

    await testClient.purgeSecret(secretName);
  });

  it("can resume from a stopped poller", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "value");
    const poller = await client.beginDeleteSecret(secretName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    poller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    poller.stopPolling();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().isCompleted);

    const serialized = poller.toString();

    const resumePoller = await client.beginDeleteSecret(secretName, {
      resumeFrom: serialized,
      ...testPollerProperties
    });

    assert.ok(resumePoller.getOperationState().isStarted);
    const deletedSecret: DeletedSecret = await resumePoller.pollUntilDone();
    assert.equal(deletedSecret.name, secretName);
    assert.ok(resumePoller.getOperationState().isCompleted);

    await testClient.purgeSecret(secretName);
  });

  if (isNode && !isPlaybackMode()) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can attempt to delete a secret with requestOptions timeout", async function() {
      const secretName = testClient.formatName(
        `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
      );
      await client.setSecret(secretName, "value");
      await assertThrowsAbortError(async () => {
        await client.beginDeleteSecret(secretName, { requestOptions: { timeout: 1 } });
      });
    });
  }
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { PollerStoppedError } from "@azure/core-lro";

import { afterEach, assert, beforeEach, describe, it, expect } from "vitest";
import type { DeletedSecret, SecretClient } from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import type TestClient from "./utils/testClient.js";

describe("Secrets client - Long Running Operations - delete", () => {
  const secretPrefix = `lroDelete${env.CERTIFICATE_NAME || "SecretName"}`;
  let secretSuffix: string;
  let client: SecretClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    secretSuffix = authentication.secretSuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can wait until a secret is deleted", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    await client.setSecret(secretName, "value");
    const poller = await client.beginDeleteSecret(secretName, testPollerProperties);
    assert.isTrue(poller.getOperationState().isStarted);

    // The pending deleted secret can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, secretName);

    const deletedSecret: DeletedSecret = await poller.pollUntilDone();
    assert.equal(deletedSecret.name, secretName);
    assert.isTrue(poller.getOperationState().isCompleted);

    // The final secret can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, secretName);
  });

  it("can resume from a stopped poller", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    await client.setSecret(secretName, "value");
    const poller = await client.beginDeleteSecret(secretName, testPollerProperties);
    assert.isTrue(poller.getOperationState().isStarted);

    poller.pollUntilDone().catch((e) => {
      assert.instanceOf(e, PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    poller.stopPolling();
    assert.isTrue(poller.isStopped());
    expect(poller.getOperationState().isCompleted).toBeFalsy();

    const serialized = poller.toString();

    const resumePoller = await client.beginDeleteSecret(secretName, {
      resumeFrom: serialized,
      ...testPollerProperties,
    });

    assert.isTrue(resumePoller.getOperationState().isStarted);
    const deletedSecret: DeletedSecret = await resumePoller.pollUntilDone();
    assert.equal(deletedSecret.name, secretName);
    assert.isTrue(resumePoller.getOperationState().isCompleted);
  });
});

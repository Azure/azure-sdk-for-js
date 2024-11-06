// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Recorder, env } from "@azure-tools/test-recorder";

import type { DeletedKey, KeyClient } from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate, envSetupForPlayback } from "./utils/testAuthentication.js";
import type TestClient from "./utils/testClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("Keys client - Long Running Operations - delete", () => {
  const keyPrefix = `lroDelete${env.CERTIFICATE_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    await recorder.start(envSetupForPlayback);

    const authentication = await authenticate(recorder);
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can wait until a key is deleted", async function (ctx) {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    // The pending deleted can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, keyName);

    const deletedKey: DeletedKey = await poller.pollUntilDone();
    assert.equal(deletedKey.name, keyName);
    assert.ok(poller.getOperationState().isCompleted);

    // The final key can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, keyName);

    await testClient.purgeKey(keyName);
  });

  it("can resume from a stopped poller", async function (ctx) {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const poller = await client.beginDeleteKey(keyName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    poller.pollUntilDone().catch((e) => {
      assert.ok(e.name === "PollerStoppedError");
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await poller.poll(); // Making sure it has some data

    poller.stopPolling();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().isCompleted);

    const serialized = poller.toString();

    const resumePoller = await client.beginDeleteKey(keyName, {
      resumeFrom: serialized,
      ...testPollerProperties,
    });

    assert.ok(resumePoller.getOperationState().isStarted);
    const deletedKey: DeletedKey = await resumePoller.pollUntilDone();
    assert.equal(deletedKey.name, keyName);
    assert.ok(resumePoller.getOperationState().isCompleted);

    await testClient.purgeKey(keyName);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { SecretClient, DeletedSecret } from "../src";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerStoppedError } from "@azure/core-lro";

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
    const poller = await client.beginDeleteSecret(secretName);
    assert.ok(poller.getOperationState().started);

    const deletedSecret: DeletedSecret = await poller.pollUntilDone();
    assert.equal(deletedSecret.properties.name, secretName);
    assert.ok(poller.getOperationState().completed);

    // The final secret can also be obtained this way:
    assert.equal(poller.getOperationState().result!.properties.name, secretName);

    await testClient.purgeSecret(secretName);
  });

  it("can resume from a stopped poller", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "value");
    const poller = await client.beginDeleteSecret(secretName);
    assert.ok(poller.getOperationState().started);

    poller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    poller.stop();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().completed);

    const serialized = poller.toString();

    const resumePoller = await client.beginDeleteSecret(secretName, {
      resumeFrom: serialized
    });

    assert.ok(resumePoller.getOperationState().started);
    const deletedSecret: DeletedSecret = await resumePoller.pollUntilDone();
    assert.equal(deletedSecret.properties.name, secretName);
    assert.ok(resumePoller.getOperationState().completed);

    await testClient.purgeSecret(secretName);
  });
});

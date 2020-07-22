// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { env, Recorder } from "@azure/test-utils-recorder";
import { createSandbox } from "sinon";

import { SecretClient } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";
import { URLBuilder } from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";

describe("The Secrets client should set the apiVersion", () => {
  const secretPrefix = `apiVersion${env.KEY_NAME || "SecretName"}`;
  let secretSuffix: string;
  let recorder: Recorder;
  let testClient: TestClient;
  let keyVaultUrl: string;
  let credential: ClientSecretCredential;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    secretSuffix = authentication.secretSuffix;
    recorder = authentication.recorder;
    testClient = authentication.testClient;
    keyVaultUrl = authentication.keyVaultUrl;
    credential = authentication.credential;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // The tests follow

  it("it should default to the latest API version", async function() {
    const sandbox = createSandbox();
    const spy = sandbox.spy(URLBuilder.prototype, "toString");
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );

    const client = new SecretClient(keyVaultUrl, credential);
    await client.setSecret(secretName, "value");

    const calls = spy.getCalls();
    assert.equal(calls.length, 1);
    assert.equal(calls[0].thisValue._query._rawQuery["api-version"], "7.1-preview");

    sandbox.restore();

    const deletePoller = await client.beginDeleteSecret(secretName);
    await deletePoller.pollUntilDone();
    await client.purgeDeletedSecret(secretName);
  });

  it("it should allow us to specify an API version", async function() {
    const sandbox = createSandbox();
    const spy = sandbox.spy(URLBuilder.prototype, "toString");
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );

    const client = new SecretClient(keyVaultUrl, credential, {
      apiVersion: "7.0"
    });
    await client.setSecret(secretName, "value");

    const calls = spy.getCalls();
    assert.equal(calls.length, 1);
    assert.equal(calls[0].thisValue._query._rawQuery["api-version"], "7.0");

    sandbox.restore();

    const deletePoller = await client.beginDeleteSecret(secretName);
    await deletePoller.pollUntilDone();
    await client.purgeDeletedSecret(secretName);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { env, Recorder } from "@azure/test-utils-recorder";
import { AbortController } from "@azure/abort-controller";

import { SecretClient } from "../../src";
import { assertThrowsAbortError } from "../utils/utils.common";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Secret client - create, read, update and delete operations", () => {
  const secretValue = "SECRET_VALUE";
  const secretPrefix = `CRUD${env.SECRET_NAME || "SecretName"}`;
  let secretSuffix: string;
  let client: SecretClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    secretSuffix = authentication.secretSuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // The tests follow

  it("can add a secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const result = await client.setSecret(secretName, secretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await testClient.flushSecret(secretName);
  });

  // If this test is not skipped in the browser's playback, no other test will be played back.
  // This is a bug related to the browser features of the recorder.
  it("can abort adding a secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const controller = new AbortController();
    controller.abort();
    await assertThrowsAbortError(async () => {
      await client.setSecret(secretName, secretValue, {
        abortSignal: controller.signal
      });
    });
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can timeout adding a secret", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await assertThrowsAbortError(async () => {
      await client.setSecret(secretName, secretValue, {
        requestOptions: {
          timeout: 1
        }
      });
    });
  });

  it("cannot create a secret with an empty name", async function() {
    const secretName = "";
    let error;
    try {
      await client.setSecret(secretName, secretValue);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      `"secretName" with value "" should satisfy the constraint "Pattern": /^[0-9a-zA-Z-]+$/.`,
      "Unexpected error while running setSecret with an empty string as the name."
    );
  });

  it("can set a secret with Empty Value", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const secretValue = "";
    const result = await client.setSecret(secretName, secretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await testClient.flushSecret(secretName);
  });

  it("can set a secret with attributes", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);
    await client.setSecret(secretName, secretValue, { expiresOn: expiryDate });
    const updated = await client.getSecret(secretName);
    assert.equal(
      expiryDate.getDate(),
      updated!.properties.expiresOn!.getDate(),
      "Expect attribute 'expiresOn' to be defined."
    );
    await testClient.flushSecret(secretName);
  });

  it("can update a secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue);
    await client.updateSecretProperties(secretName, "", {
      expiresOn: expiryDate
    });

    const updated = await client.getSecret(secretName);
    assert.equal(
      updated!.properties.expiresOn!.getDate(),
      expiryDate.getDate(),
      "Expect attribute 'expiresOn' to be updated."
    );
    await testClient.flushSecret(secretName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can timeout updating a secret", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue);
    await assertThrowsAbortError(async () => {
      await client.updateSecretProperties(secretName, "", {
        expiresOn: expiryDate,
        requestOptions: {
          timeout: 1
        }
      });
    });
  });

  it("can update a disabled secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue, {
      enabled: false
    });
    const updatedProperties = await client.updateSecretProperties(secretName, "", {
      expiresOn: expiryDate
    });
    assert.equal(
      updatedProperties!.expiresOn!.getDate(),
      expiryDate.getDate(),
      "Expect attribute 'expiresOn' to be updated."
    );
    await testClient.flushSecret(secretName);
  });

  it("can get a secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);
    const result = await client.getSecret(secretName);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await testClient.flushSecret(secretName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can timeout getting a secret", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);
    await assertThrowsAbortError(async () => {
      await client.getSecret(secretName, {
        requestOptions: {
          timeout: 1
        }
      });
    });
  });

  it("can't get a disabled secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue, {
      enabled: false
    });
    let error;
    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "Operation get is not allowed on a disabled secret.",
      "Unexpected error after trying to get a disabled secret"
    );
    await testClient.flushSecret(secretName);
  });

  it("can retrieve the latest version of a secret value", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);

    const result = await client.getSecret(secretName);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
    await testClient.flushSecret(secretName);
  });

  it("can get a secret (Non Existing)", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    let error;
    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.code, "SecretNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("can delete a secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);
    const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);

    let deletedSecret = deletePoller.getResult();
    assert.equal(typeof deletedSecret!.properties.recoveryId, "string");
    assert.ok(deletedSecret!.properties.deletedOn instanceof Date);
    assert.ok(deletedSecret!.properties.scheduledPurgeDate instanceof Date);

    deletedSecret = await deletePoller.pollUntilDone();
    assert.equal(typeof deletedSecret.properties.recoveryId, "string");
    assert.ok(deletedSecret.properties.deletedOn instanceof Date);
    assert.ok(deletedSecret.properties.scheduledPurgeDate instanceof Date);

    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e.statusCode === 404) {
        assert.equal(e.code, "SecretNotFound");
      } else {
        throw e;
      }
    }
    await testClient.purgeSecret(secretName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can timeout deleting a secret", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);
    await assertThrowsAbortError(async () => {
      await client.beginDeleteSecret(secretName, {
        requestOptions: {
          timeout: 1
        },
        ...testPollerProperties
      });
    });
  });

  it("can delete a secret (Non Existing)", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    let error;
    try {
      await client.beginDeleteSecret(secretName, testPollerProperties);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.code, "SecretNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("can get a deleted secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "RSA");
    const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);

    let deletedSecret = deletePoller.getResult();
    assert.equal(
      deletedSecret!.name,
      secretName,
      "Unexpected secret name in result from getSecret()."
    );

    await deletePoller.pollUntilDone();
    deletedSecret = deletePoller.getResult();
    assert.equal(
      deletedSecret!.name,
      secretName,
      "Unexpected secret name in result from getSecret()."
    );

    const getResult = await client.getDeletedSecret(secretName);
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await testClient.purgeSecret(secretName);
  });

  it("can get a deleted secret (Non Existing)", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    let error;
    try {
      const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);
      await deletePoller.pollUntilDone();
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.code, "SecretNotFound");
    assert.equal(error.statusCode, 404);
  });
});

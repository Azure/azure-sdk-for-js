// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { assert } from "@azure/test-utils";
import { Recorder, env } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";

import { SecretClient } from "../../src";
import { assertThrowsAbortError, getServiceVersion } from "./utils/common";
import { testPollerProperties } from "./utils/recorderUtils";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";

describe("Secret client - create, read, update and delete operations", () => {
  const secretValue = "SECRET_VALUE";
  const secretPrefix = `CRUD${env.SECRET_NAME || "SecretName"}`;
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

  it("can add a secret", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const result = await client.setSecret(secretName, secretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  // If this test is not skipped in the browser's playback, no other test will be played back.
  // This is a bug related to the browser features of the recorder.
  it("can abort adding a secret", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const controller = new AbortController();
    controller.abort();
    await assertThrowsAbortError(async () => {
      await client.setSecret(secretName, secretValue, {
        abortSignal: controller.signal,
      });
    });
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can timeout adding a secret", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await assertThrowsAbortError(async () => {
      await client.setSecret(secretName, secretValue, {
        requestOptions: {
          timeout: 1,
        },
      });
    });
  });

  it("cannot create a secret with an empty name", async function () {
    const secretName = "";
    try {
      await client.setSecret(secretName, secretValue);
      assert.fail("Expected an error");
    } catch (e) {
      // Ignore expected error
    }
  });

  it("can set a secret with Empty Value", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const emptySecretValue = "";
    const result = await client.setSecret(secretName, emptySecretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(
      result.value,
      emptySecretValue,
      "Unexpected secret value in result from setSecret()."
    );
  });

  it("can set a secret with attributes", async function (this: Context) {
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
  });

  it("can update a secret", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue);
    await client.updateSecretProperties(secretName, "", {
      expiresOn: expiryDate,
    });

    const updated = await client.getSecret(secretName);
    assert.equal(
      updated!.properties.expiresOn!.getDate(),
      expiryDate.getDate(),
      "Expect attribute 'expiresOn' to be updated."
    );
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can timeout updating a secret", async function (this: Context) {
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
          timeout: 1,
        },
      });
    });
  });

  it("can update a disabled secret", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue, {
      enabled: false,
    });
    const updatedProperties = await client.updateSecretProperties(secretName, "", {
      expiresOn: expiryDate,
    });
    assert.equal(
      updatedProperties!.expiresOn!.getDate(),
      expiryDate.getDate(),
      "Expect attribute 'expiresOn' to be updated."
    );
  });

  it("can get a secret", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);
    const result = await client.getSecret(secretName);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can timeout getting a secret", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);
    await assertThrowsAbortError(async () => {
      await client.getSecret(secretName, {
        requestOptions: {
          timeout: 1,
        },
      });
    });
  });

  it("can't get a disabled secret", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const expiryDate = new Date("3000-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue, {
      enabled: false,
    });
    await assert.isRejected(client.getSecret(secretName), /not allowed on a disabled secret/);
  });

  it("can retrieve the latest version of a secret value", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);

    const result = await client.getSecret(secretName);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  it("can get a secret (Non Existing)", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    let error;
    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.code, "SecretNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("can delete a secret", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);
    const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);

    let deletedSecret = deletePoller.getResult();
    assert.equal(typeof deletedSecret!.properties.recoveryId, "string");
    assert.ok(deletedSecret!.properties.deletedOn instanceof Date);
    assert.ok(deletedSecret!.properties.scheduledPurgeDate instanceof Date);

    assert.equal(typeof deletedSecret!.recoveryId, "string");
    assert.ok(deletedSecret!.deletedOn instanceof Date);
    assert.ok(deletedSecret!.scheduledPurgeDate instanceof Date);

    deletedSecret = await deletePoller.pollUntilDone();
    assert.equal(typeof deletedSecret.properties.recoveryId, "string");
    assert.ok(deletedSecret.properties.deletedOn instanceof Date);
    assert.ok(deletedSecret.properties.scheduledPurgeDate instanceof Date);

    assert.equal(typeof deletedSecret!.recoveryId, "string");
    assert.ok(deletedSecret!.deletedOn instanceof Date);
    assert.ok(deletedSecret!.scheduledPurgeDate instanceof Date);

    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      if (e.statusCode === 404) {
        assert.equal(e.code, "SecretNotFound");
      } else {
        throw e;
      }
    }
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can timeout deleting a secret", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, secretValue);
    await assertThrowsAbortError(async () => {
      await client.beginDeleteSecret(secretName, {
        requestOptions: {
          timeout: 1,
        },
        ...testPollerProperties,
      });
    });
  });

  it("can delete a secret (Non Existing)", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    let error;
    try {
      await client.beginDeleteSecret(secretName, testPollerProperties);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.code, "SecretNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("can get a deleted secret", async function (this: Context) {
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
  });

  it("can get a deleted secret (Non Existing)", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    let error;
    try {
      const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);
      await deletePoller.pollUntilDone();
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.code, "SecretNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("traces through the various operations", async () => {
    const secretName = recorder.getUniqueName("secrettrace");

    await assert.supportsTracing(
      async (options) => {
        const secret = await client.setSecret(secretName, "someValue", options);
        await client.getSecret(secretName, options);
        await client.updateSecretProperties(secretName, secret.properties.version!, options);
        await client.backupSecret(secretName, options);
        const poller = await client.beginDeleteSecret(secretName, {
          ...options,
          ...testPollerProperties,
        });
        await poller.pollUntilDone();
        await client.purgeDeletedSecret(secretName, options);
      },
      [
        "SecretClient.setSecret",
        "SecretClient.getSecret",
        "SecretClient.updateSecretProperties",
        "SecretClient.backupSecret",
        "DeleteSecretPoller.deleteSecret",
        "DeleteSecretPoller.getDeletedSecret",
        "SecretClient.purgeDeletedSecret",
      ]
    );
  });
});

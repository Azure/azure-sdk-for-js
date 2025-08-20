// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import { afterEach, assert, beforeEach, describe, expect, it } from "vitest";
import type { SecretClient } from "@azure/keyvault-secrets";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import type TestClient from "./utils/testClient.js";
expect.extend({ toSupportTracing });

describe("Secret client - create, read, update and delete operations", () => {
  const secretValue = "SECRET_VALUE";
  const secretPrefix = `CRUD${env.SECRET_NAME || "SecretName"}`;
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

  it("can add a secret", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const result = await client.setSecret(secretName, secretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  // If this test is not skipped in the browser's playback, no other test will be played back.
  // This is a bug related to the browser features of the recorder.
  it("can abort adding a secret", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const controller = new AbortController();
    controller.abort();
    await expect(client.getSecret(secretName, { abortSignal: controller.signal })).rejects.toThrow(
      /The operation was aborted/,
    );
  });

  it("cannot create a secret with an empty name", async () => {
    await expect(client.setSecret("", secretValue)).rejects.toThrowError();
  });

  it("can set a secret with Empty Value", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const emptySecretValue = "";
    const result = await client.setSecret(secretName, emptySecretValue);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(
      result.value,
      emptySecretValue,
      "Unexpected secret value in result from setSecret().",
    );
  });

  it("can set a secret with attributes", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const expiryDate = new Date("2027-01-01");
    expiryDate.setMilliseconds(0);
    await client.setSecret(secretName, secretValue, { expiresOn: expiryDate });
    const updated = await client.getSecret(secretName);
    assert.equal(
      expiryDate.getDate(),
      updated!.properties.expiresOn!.getDate(),
      "Expect attribute 'expiresOn' to be defined.",
    );
  });

  it("can update a secret", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const expiryDate = new Date("2027-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue);
    await client.updateSecretProperties(secretName, "", {
      expiresOn: expiryDate,
    });

    const updated = await client.getSecret(secretName);
    assert.equal(
      updated!.properties.expiresOn!.getDate(),
      expiryDate.getDate(),
      "Expect attribute 'expiresOn' to be updated.",
    );
  });

  it("can update a disabled secret", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const expiryDate = new Date("2027-01-01");
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
      "Expect attribute 'expiresOn' to be updated.",
    );
  });

  it("can get a secret", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    await client.setSecret(secretName, secretValue);
    const result = await client.getSecret(secretName);
    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  it("can't get a disabled secret", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    const expiryDate = new Date("2027-01-01");
    expiryDate.setMilliseconds(0);

    await client.setSecret(secretName, secretValue, {
      enabled: false,
    });
    await expect(client.getSecret(secretName)).rejects.toThrow(/not allowed on a disabled secret/);
  });

  it("can retrieve the latest version of a secret value", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    await client.setSecret(secretName, secretValue);

    const result = await client.getSecret(secretName);

    assert.equal(result.name, secretName, "Unexpected secret name in result from setSecret().");
    assert.equal(result.value, secretValue, "Unexpected secret value in result from setSecret().");
  });

  it("can get a secret (Non Existing)", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
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

  it("can delete a secret", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
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

  it("can delete a secret (Non Existing)", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
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

  it("can get a deleted secret", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    await client.setSecret(secretName, "RSA");
    const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);

    let deletedSecret = deletePoller.getResult();
    assert.equal(
      deletedSecret!.name,
      secretName,
      "Unexpected secret name in result from getSecret().",
    );

    await deletePoller.pollUntilDone();
    deletedSecret = deletePoller.getResult();
    assert.equal(
      deletedSecret!.name,
      secretName,
      "Unexpected secret name in result from getSecret().",
    );

    const getResult = await client.getDeletedSecret(secretName);
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
  });

  it("can get a deleted secret (Non Existing)", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
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
    const secretName = recorder.variable(
      "secrettrace",
      `secrettrace${Math.floor(Math.random() * 1000)}`,
    );
    await expect(async (options: any) => {
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
    }).toSupportTracing([
      "SecretClient.setSecret",
      "SecretClient.getSecret",
      "SecretClient.updateSecretProperties",
      "SecretClient.backupSecret",
      "DeleteSecretPoller.deleteSecret",
      "DeleteSecretPoller.getDeletedSecret",
      "SecretClient.purgeDeletedSecret",
    ]);
  });
});

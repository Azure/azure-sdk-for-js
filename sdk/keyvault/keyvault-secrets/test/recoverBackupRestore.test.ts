// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { SecretClient } from "../src";
import { isNode } from "@azure/core-http";
import { isPlayingBack, testPollerProperties } from "./utils/recorderUtils";
import { retry } from "./utils/recorderUtils";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { assertThrowsAbortError } from "./utils/utils.common";

describe("Secret client - restore secrets and recover backups", () => {
  const secretPrefix = `CRUD${env.SECRET_NAME || "SecretName"}`;
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

  it("can recover a deleted secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "RSA");
    const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);
    assert.equal(
      deletePoller.getResult()!.name,
      secretName,
      "Unexpected secret name in result from deletePoller.getResult()."
    );

    await deletePoller.pollUntilDone();
    const getDeletedResult = await client.getDeletedSecret(secretName);
    assert.equal(
      getDeletedResult.name,
      secretName,
      "Unexpected secret name in result from getSecret()."
    );

    const recoverPoller = await client.beginRecoverDeletedSecret(secretName, testPollerProperties);
    const secretProperties = await recoverPoller.pollUntilDone();
    assert.equal(
      secretProperties.name,
      secretName,
      "Unexpected secret name in result from getSecret()."
    );
    await testClient.flushSecret(secretName);
  });

  it("can recover a deleted secret (non existing)", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    let error;
    try {
      const recoverPoller = await client.beginRecoverDeletedSecret(
        secretName,
        testPollerProperties
      );
      await recoverPoller.pollUntilDone();
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message.split(".")[0],
      `A secret with (name/id) ${secretName} was not found in this key vault`
    );
  });

  if (isNode && !isPlayingBack) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can recover a deleted a secret with requestOptions timeout", async function() {
      const secretName = testClient.formatName(
        `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
      );
      await client.setSecret(secretName, "RSA");
      const deletePoller = await client.beginDeleteSecret(secretName, testPollerProperties);
      await deletePoller.pollUntilDone();
      await assertThrowsAbortError(async () => {
        await client.beginRecoverDeletedSecret(secretName, {
          requestOptions: {
            timeout: 1
          },
          ...testPollerProperties
        });
      });
    });
  }

  it("can backup a secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "RSA");
    const result = await client.backupSecret(secretName);
    if (isNode) {
      assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupKey()");
    } else {
      assert.equal(result!.constructor, Uint8Array, "Unexpected return value from backupKey()");
    }
    assert.ok(
      result!.length > 0,
      `Unexpected length (${result!.length}) of buffer from backupSecret()`
    );
    await testClient.flushSecret(secretName);
  });

  it("can backup a secret (non existing)", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    let error;
    try {
      await client.backupSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message.split(".")[0],
      `A secret with (name/id) ${secretName} was not found in this key vault`
    );
  });

  it("can restore a secret", async function() {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    await client.setSecret(secretName, "RSA");
    const backup = await client.backupSecret(secretName);
    await testClient.flushSecret(secretName);
    await retry(async () => client.restoreSecretBackup(backup as Uint8Array));
    const getResult = await client.getSecret(secretName);
    assert.equal(getResult.name, secretName, "Unexpected secret name in result from getSecret().");
    await testClient.flushSecret(secretName);
  });

  it("can restore a secret (Malformed Backup Bytes)", async function() {
    const backup = new Uint8Array(4728);
    let error;
    try {
      await client.restoreSecretBackup(backup);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "Backup blob contains invalid or corrupt version.",
      "Unexpected error from restoreSecretBackup()"
    );
  });

  if (isNode && !isPlayingBack) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can timeout deleting a secret", async function() {
      const secretName = testClient.formatName(
        `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
      );
      await client.setSecret(secretName, "RSA");
      const backup = await client.backupSecret(secretName);
      await testClient.flushSecret(secretName);
      await assertThrowsAbortError(async () => {
        await client.restoreSecretBackup(backup as Uint8Array, {
          requestOptions: {
            timeout: 1
          }
        });
      });
    });
  }
});

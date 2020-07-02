// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { isNode } from "@azure/core-http";
import { env, isPlaybackMode, Recorder, delay, isRecordMode } from "@azure/test-utils-recorder";

import { SecretClient } from "../../src";
import { assertThrowsAbortError } from "../utils/utils.common";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Secret client - restore secrets and recover backups", () => {
  const secretPrefix = `backupRestore${env.SECRET_NAME || "SecretName"}`;
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
    assert.equal(error.code, "SecretNotFound");
    assert.equal(error.statusCode, 404);
  });

  if (isNode && !isPlaybackMode()) {
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
    assert.equal(error.code, "SecretNotFound");
    assert.equal(error.statusCode, 404);
  });

  if (isRecordMode() || isPlaybackMode()) {
    // This test can't run live,
    // since the purge operation currently can't be expected to finish anytime soon.
    it("can restore a secret", async function() {
      const secretName = testClient.formatName(
        `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
      );
      await client.setSecret(secretName, "RSA");
      const backup = await client.backupSecret(secretName);
      await testClient.flushSecret(secretName);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          await client.restoreSecretBackup(backup as Uint8Array);
          break;
        } catch (e) {
          console.log("Can't restore the secret since it's not fully deleted:", e.message);
          console.log("Retrying in one second...");
          await delay(1000);
        }
      }
      const getResult = await client.getSecret(secretName);
      assert.equal(
        getResult.name,
        secretName,
        "Unexpected secret name in result from getSecret()."
      );
      await testClient.flushSecret(secretName);
    });
  }

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

  if (isNode && !isPlaybackMode()) {
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { isNode, operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { KeyClient, KeyVaultKey, PollerLike, PollOperationState } from "../../src";
import { assertThrowsAbortError, getServiceVersion } from "../public/utils/common";
import { testPollerProperties } from "../public/utils/recorderUtils";
import { env, Recorder, isRecordMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { authenticate } from "../public/utils/testAuthentication";
import TestClient from "../public/utils/testClient";
import { BeginRestoreKeyBackupOptions } from "../public/utils/lro/restore/operation";
import { RestoreKeyBackupPoller } from "../public/utils/lro/restore/poller";

class InternalTestClient extends TestClient {
  public async beginRestoreKeyBackup(
    backup: Uint8Array,
    options: BeginRestoreKeyBackupOptions = {}
  ): Promise<PollerLike<PollOperationState<KeyVaultKey>, KeyVaultKey>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new RestoreKeyBackupPoller({
      backup,
      client: this.client,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions,
    });

    // This will initialize the poller's operation (the recovery of the backup).
    await poller.poll();

    return poller;
  }
}

describe("Keys client - restore keys and recover backups", () => {
  const keyPrefix = `backupRestore${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: InternalTestClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const authentication = await authenticate(
      this,
      getServiceVersion(),
      (keyClient) => new InternalTestClient(keyClient)
    );
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can recover a deleted key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const deletePoller = await client.beginDeleteKey(keyName, testPollerProperties);
    assert.equal(
      deletePoller.getResult()!.name,
      keyName,
      "Unexpected key name in result from deletePoller.getResult()."
    );
    await deletePoller.pollUntilDone();

    const getDeletedResult = await deletePoller.getResult();
    assert.equal(getDeletedResult!.name, keyName, "Unexpected key name in result from getKey().");

    const recoverPoller = await client.beginRecoverDeletedKey(keyName, testPollerProperties);
    await recoverPoller.pollUntilDone();
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  it("fails if one tries to recover a non-existing deleted key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    let error;
    try {
      const recoverPoller = await client.beginRecoverDeletedKey(keyName, testPollerProperties);
      await recoverPoller.pollUntilDone();
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.code, "KeyNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("can generate a backup of a key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const result = await client.backupKey(keyName);
    if (isNode) {
      assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupKey()");
    } else {
      assert.equal(result!.constructor, Uint8Array, "Unexpected return value from backupKey()");
    }
    assert.ok(result!.length > 0, "Unexpected length of buffer from backupKey()");
    await testClient.flushKey(keyName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can generate a backup of a key with requestOptions timeout", async function () {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    await assertThrowsAbortError(async () => {
      await client.backupKey("doesntmatter", { requestOptions: { timeout: 1 } });
    });
  });

  it("fails to generate a backup of a non-existing key", async function (this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    let error;
    try {
      await client.backupKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.code, "KeyNotFound");
    assert.equal(error.statusCode, 404);
  });

  if (isRecordMode() || isPlaybackMode()) {
    // This test can't run live,
    // since the purge operation currently can't be expected to finish anytime soon.
    it("can restore a key with a given backup", async function (this: Context) {
      const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
      await client.createKey(keyName, "RSA");
      const backup = await client.backupKey(keyName);
      const deletePoller = await client.beginDeleteKey(keyName, testPollerProperties);
      await deletePoller.pollUntilDone();
      await client.purgeDeletedKey(keyName);

      // One would normally do this, but this can't immediately happen after the resource is purged:
      // await client.restoreKeyBackup(backup as Uint8Array);

      // This test implementation of a restore poller only applies for backups that have been recently deleted.
      // Backups might not be ready to be restored in an unknown amount of time.
      // If this is useful to you, please open an issue at: https://github.com/Azure/azure-sdk-for-js/issues
      const restorePoller = await testClient.beginRestoreKeyBackup(
        backup as Uint8Array,
        testPollerProperties
      );
      const restoredKey = await restorePoller.pollUntilDone();

      assert.equal(restoredKey.name, keyName);
      await testClient.flushKey(keyName);
    });
  }

  // On playback mode, the tests happen too fast for the timeout to work
  it("can restore a key with requestOptions timeout", async function (this: Context) {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const backup = await client.backupKey(keyName);
    await testClient.flushKey(keyName);

    await assertThrowsAbortError(async () => {
      await client.restoreKeyBackup(backup!, { requestOptions: { timeout: 1 } });
    });
  });

  it("fails to restore a key with a malformed backup", async function () {
    const backup = new Uint8Array(8693);
    let error;
    try {
      await client.restoreKeyBackup(backup);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "Backup blob contains invalid or corrupt version.",
      "Unexpected error from restoreKeyBackup()"
    );
  });
});

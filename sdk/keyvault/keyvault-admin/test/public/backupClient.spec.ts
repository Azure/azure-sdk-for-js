// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";

import type { KeyVaultBackupClient } from "../../src/index.js";
import { authenticate } from "./utils/authentication.js";
import { testPollerProperties } from "./utils/recorder.js";
import { delay } from "@azure/core-util";
import type { KeyClient } from "@azure/keyvault-keys";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getEnvironmentVariable } from "./utils/common.js";

describe("KeyVaultBackupClient", () => {
  let client: KeyVaultBackupClient;
  let keyClient: KeyClient;

  let recorder: Recorder;
  let blobStorageUri: string;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    client = authentication.backupClient;
    keyClient = authentication.keyClient;
    recorder = authentication.recorder;
    blobStorageUri = new URL(
      getEnvironmentVariable("BLOB_CONTAINER_NAME"),
      getEnvironmentVariable("BLOB_STORAGE_URI"),
    ).href;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  describe("beginPreBackup", function () {
    it("returns the correct backup result when successful", async function () {
      const backupPoller = await client.beginPreBackup(blobStorageUri, testPollerProperties);
      await backupPoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginPreBackup(blobStorageUri, {
        resumeFrom: backupPoller.toString(),
        ...testPollerProperties,
      });

      expect(resumedPoller.getOperationState().isStarted).toEqual(true); // without polling
      expect(resumedPoller.getOperationState().jobId).toEqual(
        backupPoller.getOperationState().jobId,
      );

      const backupResult = await backupPoller.pollUntilDone();
      expect(backupPoller.getOperationState().error).toBeUndefined();
      expect(backupResult.folderUri).toBeUndefined(); // there are no results for pre-backup
      expect(backupResult.startTime).toEqual(backupPoller.getOperationState().startTime);
      expect(backupResult.endTime).toEqual(backupPoller.getOperationState().endTime);
    });

    it("throws when polling errors", async function () {
      const backupPoller = await client.beginPreBackup(
        blobStorageUri,
        "invalid_sas_token",
        testPollerProperties,
      );
      await expect(backupPoller.pollUntilDone()).rejects.toThrow(/SAS token/);
    });
  });

  describe("beginBackup", function () {
    it("returns the correct backup result when successful", async () => {
      const backupPoller = await client.beginBackup(blobStorageUri, testPollerProperties);
      await backupPoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginBackup(blobStorageUri, {
        resumeFrom: backupPoller.toString(),
        ...testPollerProperties,
      });

      expect(resumedPoller.getOperationState().isStarted).toEqual(true); // without polling
      expect(resumedPoller.getOperationState().jobId).toEqual(
        backupPoller.getOperationState().jobId,
      );

      const backupResult = await backupPoller.pollUntilDone();
      expect(backupPoller.getOperationState().error).toBeUndefined();
      expect(backupResult.folderUri).toBeDefined();
      expect(backupResult.startTime).toEqual(backupPoller.getOperationState().startTime);
      expect(backupResult.endTime).toEqual(backupPoller.getOperationState().endTime);
      expect(backupResult.folderUri!).toMatch(new RegExp(blobStorageUri));
    });

    it("throws when polling errors", async () => {
      await expect(
        client.beginBackup(blobStorageUri, "invalid_sas_token", testPollerProperties),
      ).rejects.toThrow(/SAS token/);
    });
  });

  describe("beginPreRestore", function () {
    it("full restore completes successfully", async function () {
      const backupPoller = await client.beginBackup(blobStorageUri, testPollerProperties);
      const backupResult = await backupPoller.pollUntilDone();
      expect(backupResult.folderUri).toBeDefined();

      const restorePoller = await client.beginPreRestore(
        backupResult.folderUri!,
        testPollerProperties,
      );
      await restorePoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginPreRestore(backupResult.folderUri!, {
        ...testPollerProperties,
        resumeFrom: restorePoller.toString(),
      });
      expect(resumedPoller.getOperationState().isStarted).toEqual(true); // without polling
      expect(resumedPoller.getOperationState().jobId).toEqual(
        restorePoller.getOperationState().jobId,
      );

      const restoreResult = await restorePoller.pollUntilDone();
      const operationState = restorePoller.getOperationState();
      expect(restoreResult.startTime).toEqual(operationState.startTime);
      expect(restoreResult.endTime).toEqual(operationState.endTime);
      expect(operationState.isCompleted).toEqual(true);
      expect(operationState.error).toBeUndefined();
    });

    it("throws when polling errors", async function () {
      const poller = await client.beginPreRestore(
        blobStorageUri,
        "bad_token",
        testPollerProperties,
      );

      await expect(poller.pollUntilDone()).rejects.toThrow(/SAS token is malformed/);
    });
  });

  describe("beginRestore", function () {
    it("full restore completes successfully", async () => {
      const backupPoller = await client.beginBackup(blobStorageUri, testPollerProperties);
      const backupResult = await backupPoller.pollUntilDone();
      expect(backupResult.folderUri).toBeDefined();

      const restorePoller = await client.beginRestore(
        backupResult.folderUri!,
        testPollerProperties,
      );
      await restorePoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginRestore(backupResult.folderUri!, {
        ...testPollerProperties,
        resumeFrom: restorePoller.toString(),
      });
      expect(resumedPoller.getOperationState().isStarted).toEqual(true); // without polling
      expect(resumedPoller.getOperationState().jobId).toEqual(
        restorePoller.getOperationState().jobId,
      );

      const restoreResult = await restorePoller.pollUntilDone();
      const operationState = restorePoller.getOperationState();
      expect(restoreResult.startTime).toEqual(operationState.startTime);
      expect(restoreResult.endTime).toEqual(operationState.endTime);
      expect(operationState.isCompleted).toEqual(true);
      expect(operationState.error).toBeUndefined();
      // Restore is eventually consistent so while we work
      // through the retry operations adding a delay here allows
      // tests to pass the 5s polling delay.
      if (!isPlaybackMode()) {
        await delay(5000);
      }
    });

    it("selectiveKeyRestore completes successfully", async () => {
      const keyName = "rsa1";
      await keyClient.createRsaKey(keyName);
      const backupPoller = await client.beginBackup(blobStorageUri, testPollerProperties);
      const backupURI = await backupPoller.pollUntilDone();
      expect(backupURI.folderUri).toBeDefined();

      // Delete the key (purging it is required), then restore and ensure it's restored
      await (await keyClient.beginDeleteKey(keyName, testPollerProperties)).pollUntilDone();
      await keyClient.purgeDeletedKey(keyName);

      const selectiveKeyRestorePoller = await client.beginSelectiveKeyRestore(
        keyName,
        backupURI.folderUri!,
        testPollerProperties,
      );
      await selectiveKeyRestorePoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginSelectiveKeyRestore(keyName, blobStorageUri, {
        ...testPollerProperties,
        resumeFrom: selectiveKeyRestorePoller.toString(),
      });
      expect(resumedPoller.getOperationState().isStarted).toEqual(true); // without polling
      expect(resumedPoller.getOperationState().jobId).toEqual(
        selectiveKeyRestorePoller.getOperationState().jobId,
      );

      await selectiveKeyRestorePoller.pollUntilDone();
      const operationState = selectiveKeyRestorePoller.getOperationState();
      expect(operationState.isCompleted).toEqual(true);

      // Restore is eventually consistent so while we work
      // through the retry operations adding a delay here allows
      // tests to pass the 5s polling delay.
      if (!isPlaybackMode()) {
        await delay(5000);
      }
      await keyClient.getKey(keyName);
    });

    it("throws when polling errors", async () => {
      await expect(
        client.beginRestore(blobStorageUri, "bad_token", testPollerProperties),
      ).rejects.toThrow(/SAS token is malformed/);
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DeviceRegistrySoftwareUpdateClient,
  ImportUpdateRequest,
} from "../../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { RestError } from "@azure/core-rest-pipeline";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import {
  createClient,
  createRecorder,
  testEnvironmentVariable,
  testPollingOptions,
} from "../utils/recordedClient.js";

const updateId = {
  // This identity is reserved for lifecycle tests in the fixed test instance and may be deleted.
  provider: "Contoso",
  name: "Toaster",
  version: "1.0",
};

describe("Device Registry Software Update recorded tests", () => {
  let recorder: Recorder;
  let client: DeviceRegistrySoftwareUpdateClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("imports, gets, and deletes an update", async () => {
    let sentEnableScan: unknown;
    client.pipeline.addPolicy(
      {
        name: "capture-import-enable-scan",
        async sendRequest(request, next) {
          if (
            request.method === "POST" &&
            new URL(request.url).pathname.endsWith("/updates:import")
          ) {
            const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
            if (body && typeof body === "object" && "enableScan" in body) {
              sentEnableScan = body.enableScan;
            }
          }
          return next(request);
        },
      },
      { afterPhase: "Serialize" },
    );

    const importRequest: ImportUpdateRequest = {
      importUpdateInput: [
        {
          importManifest: {
            url: testEnvironmentVariable("DEVICE_REGISTRY_SOFTWARE_UPDATE_MANIFEST_URL"),
            sizeInBytes: 712,
            hashes: { SHA256: "PHuSWFOX73yLXeaIrSo9gtsiGGKOKY6fw5n6/6rFFh4=" },
          },
          files: [
            {
              fileName: "README.md",
              url: testEnvironmentVariable("DEVICE_REGISTRY_SOFTWARE_UPDATE_PAYLOAD_URL"),
            },
          ],
        },
      ],
      enableScan: false,
    };

    assert.isFalse(importRequest.enableScan, "The import request must disable scanning");

    let importedByThisTest = false;
    let originalError: unknown;
    let testFailed = false;
    let cleanupError: unknown;
    try {
      await assertUpdateDoesNotExist(client);

      const importPoller = client.softwareUpdate.importUpdate(importRequest, testPollingOptions);
      await importPoller.pollUntilDone();
      importedByThisTest = true;

      assert.isFalse(sentEnableScan, "The serialized request must send enableScan as false");
      assert.isTrue(importPoller.isDone);
      assert.strictEqual(importPoller.operationState?.status, "succeeded");

      const update = await client.softwareUpdate.getUpdate(
        updateId.provider,
        updateId.name,
        updateId.version,
      );
      assert.deepEqual(update.updateId, updateId);
      assert.strictEqual(update.manifestVersion, "4.0");
      assert.instanceOf(update.createdDateTime, Date);
      assert.instanceOf(update.importedDateTime, Date);
      assert.isFalse(Number.isNaN(update.createdDateTime.valueOf()));
      assert.isFalse(Number.isNaN(update.importedDateTime.valueOf()));
    } catch (error) {
      testFailed = true;
      originalError = error;
    } finally {
      // Only delete after this test has completed the import successfully. In particular,
      // an import conflict must not delete an update created by another concurrent run.
      if (importedByThisTest) {
        try {
          const deletePoller = client.softwareUpdate.deleteUpdate(
            updateId.provider,
            updateId.name,
            updateId.version,
            testPollingOptions,
          );
          await deletePoller.pollUntilDone();
          assert.isTrue(deletePoller.isDone);
          assert.strictEqual(deletePoller.operationState?.status, "succeeded");
        } catch (error) {
          cleanupError = error;
        }
      }
    }

    if (testFailed) {
      throw originalError;
    }
    if (cleanupError !== undefined) {
      throw cleanupError;
    }
  });

  it("lists device classes", async () => {
    const pages = client.deviceClasses.list().byPage();
    const firstPage = await pages.next();

    assert.isFalse(firstPage.done, "The service should return a valid first page");
    assert.isArray(firstPage.value);
    if (firstPage.value.length > 0) {
      assert.isNotEmpty(firstPage.value[0].deviceClassId);
      assert.isObject(firstPage.value[0].deviceClassProperties);
    }
  });

  it("lists updates", async () => {
    const pages = client.softwareUpdate.listUpdates().byPage();
    const firstPage = await pages.next();

    assert.isFalse(firstPage.done, "The service should return a valid first page");
    assert.isArray(firstPage.value);
    if (firstPage.value.length > 0) {
      const firstUpdateId = firstPage.value[0].updateId;
      assert.isNotEmpty(firstUpdateId.provider);
      assert.isNotEmpty(firstUpdateId.name);
      assert.isNotEmpty(firstUpdateId.version);
    }
  });

  it("lists providers", async () => {
    const pages = client.softwareUpdate.listProviders().byPage();
    const firstPage = await pages.next();

    assert.isFalse(firstPage.done, "The service should return a valid first page");
    assert.isArray(firstPage.value);
    if (firstPage.value.length > 0) {
      assert.isNotEmpty(firstPage.value[0]);
    }
  });
});

async function assertUpdateDoesNotExist(client: DeviceRegistrySoftwareUpdateClient): Promise<void> {
  try {
    await client.softwareUpdate.getUpdate(updateId.provider, updateId.name, updateId.version);
  } catch (error) {
    if (error instanceof RestError && error.statusCode === 404) {
      return;
    }
    throw error;
  }

  assert.fail(
    "Contoso/Toaster/1.0 already exists in the supplied instance; refusing to import or delete potentially shared data",
  );
}

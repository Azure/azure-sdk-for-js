// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRecordedDeidentificationClient, createRecorder } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { DeidentificationClient } from "../../src/clientDefinitions.js";
import { createTestCredential } from "@azure-tools/test-credential";
import type { DeidentificationJob } from "../../src/models.js";
import type {
  DeidentificationJobOutput,
  DeidentificationDocumentDetailsOutput,
} from "../../src/outputModels.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import type { ErrorResponse } from "@azure-rest/core-client";
import { getLongRunningPoller } from "../../src/pollingHelper.js";
import { paginate } from "../../src/paginateHelper.js";
import { isUnexpected } from "../../src/isUnexpected.js";

const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

const TEST_TIMEOUT_MS: number = 200000;
const NUMBER_OF_DOCUMENTS = 3;
const OUTPUT_FOLDER = "_output";
const INPUT_PREFIX = "example_patient_1";
let jobName: string;

describe("Batch", () => {
  let recorder: Recorder;
  let client: DeidentificationClient;
  let storageAccountLocation: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    jobName = recorder.variable("jobName", "js-sdk-job-" + Date.now());
    storageAccountLocation = env["HEALTHDATAAISERVICES_STORAGE_ACCOUNT_LOCATION"] as string;
    const credential = createTestCredential();
    client = await createRecordedDeidentificationClient(recorder, credential);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // Note: When your re-run recording you need to update jobName to avoid conflict with existing job "environment" is either node or browser depending on the test mode
  it(
    "CreateJob returns expected",
    async function () {
      const job: DeidentificationJob = {
        operation: "Surrogate",
        sourceLocation: {
          location: storageAccountLocation,
          prefix: INPUT_PREFIX,
          extensions: ["*"],
        },
        targetLocation: {
          location: storageAccountLocation,
          prefix: OUTPUT_FOLDER,
          overwrite: true,
        },
      };

      const jobOutput = await client.path("/jobs/{name}", jobName).put({ body: job });

      if (isUnexpected(jobOutput)) {
        console.log(JSON.stringify(jobOutput.body));
        throw new Error("Unexpected job result");
      }

      assert.isNotNull(jobOutput);
      assert.equal(jobName, jobOutput.body.name, "Job name should match");
      assert.isNotNull(jobOutput.body.createdAt, "Job should have createdAt");
      assert.isNotNull(jobOutput.body.lastUpdatedAt, "Job should have lastUpdatedAt");
      assert.isUndefined(jobOutput.body.startedAt, "Job should not have startedAt");
      assert.equal("NotStarted", jobOutput.body.status, "Job status should be NotStarted");
      assert.isUndefined(jobOutput.body.error, "Job should not have error");
      assert.isUndefined(
        jobOutput.body.customizations?.redactionFormat,
        "Job should not have redactionFormat",
      );
      assert.isUndefined(jobOutput.body.summary, "Job should not have summary");
      assert.equal(
        INPUT_PREFIX,
        jobOutput.body.sourceLocation.prefix,
        "Job sourceLocation prefix should match",
      );
      assert.isTrue(
        storageAccountLocation.includes("blob.core.windows.net"),
        "Storage account location should contain 'blob.core.windows.net'",
      );
      assert.equal(
        OUTPUT_FOLDER,
        jobOutput.body.targetLocation.prefix,
        "Job targetLocation prefix should match",
      );
      assert.isTrue(
        storageAccountLocation.includes("blob.core.windows.net"),
        "Storage account location should contain 'blob.core.windows.net'",
      );
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "CreateThenList returns expected",
    async function () {
      const job: DeidentificationJob = {
        operation: "Surrogate",
        sourceLocation: {
          location: storageAccountLocation,
          prefix: INPUT_PREFIX,
          extensions: ["*"],
        },
        targetLocation: {
          location: storageAccountLocation,
          prefix: OUTPUT_FOLDER,
          overwrite: true,
        },
      };

      const initialResponse = await client.path("/jobs/{name}", jobName).put({ body: job });
      const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      await poller.poll();
      assert.equal(poller.getOperationState().status, "running");

      // Test list jobs with pagination
      const jobs = await client.path("/jobs").get({ queryParameters: { maxpagesize: 2 } });
      const items = [];
      const iter = paginate(client, jobs);
      for await (const item of iter) {
        items.push(item);
      }
      const foundJob = (items as DeidentificationJobOutput[]).find((j) => j.name === jobName);

      assert.isTrue(foundJob !== undefined, "Job should be found");
      assert.isNotNull(foundJob!.createdAt, "Job should have createdAt");
      assert.isNotNull(foundJob!.lastUpdatedAt, "Job should have lastUpdatedAt");
      assert.isNotNull(foundJob!.startedAt, "Job should have startedAt");
      assert.equal("NotStarted", foundJob!.status, "Job status should be NotStarted");
      assert.isUndefined(foundJob!.error, "Job should not have error");
      assert.isUndefined(
        foundJob!.customizations?.redactionFormat,
        "Job should not have redactionFormat",
      );
      assert.isUndefined(foundJob!.summary, "Job should not have summary");
      assert.equal(
        INPUT_PREFIX,
        foundJob!.sourceLocation.prefix,
        "Job sourceLocation prefix should match",
      );
      assert.isTrue(
        storageAccountLocation.includes("blob.core.windows.net"),
        "Storage account location should contain 'blob.core.windows.net'",
      );
      assert.equal(
        OUTPUT_FOLDER,
        foundJob!.targetLocation.prefix,
        "Job targetLocation prefix should match",
      );
      assert.isTrue(
        storageAccountLocation.includes("blob.core.windows.net"),
        "Storage account location should contain 'blob.core.windows.net",
      );
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "JobE2E wait until success",
    async function () {
      const job: DeidentificationJob = {
        operation: "Surrogate",
        sourceLocation: {
          location: storageAccountLocation,
          prefix: INPUT_PREFIX,
          extensions: ["*"],
        },
        targetLocation: {
          location: storageAccountLocation,
          prefix: OUTPUT_FOLDER,
          overwrite: true,
        },
      };

      const initialResponse = await client.path("/jobs/{name}", jobName).put({ body: job });

      const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const finalJobOutput = await poller.pollUntilDone();
      assert.equal(poller.getOperationState().status, "succeeded");

      if (isUnexpected(finalJobOutput)) {
        throw new Error("Unexpected error occurred");
      }

      assert.equal(finalJobOutput.body.status, "Succeeded", "Job status should be Succeeded");
      assert.notEqual(finalJobOutput.body.startedAt, null, "Job should have startedAt");
      assert.notEqual(finalJobOutput.body.summary, null, "Job should have summary");
      assert.equal(
        finalJobOutput.body.summary!.total,
        NUMBER_OF_DOCUMENTS,
        `Job should have processed ${NUMBER_OF_DOCUMENTS} documents`,
      );
      assert.equal(
        finalJobOutput.body.summary!.successful,
        NUMBER_OF_DOCUMENTS,
        `Job should have succeeded ${NUMBER_OF_DOCUMENTS} documents`,
      );

      const reports = await client.path("/jobs/{name}/documents", jobName).get({
        queryParameters: {
          maxpagesize: 2,
        },
      });

      if (isUnexpected(reports)) {
        throw new Error("Unexpected error occurred");
      }

      const items = [];
      const iter = paginate(client, reports);

      for await (const item of iter) {
        items.push(item);
      }

      assert.isTrue(
        (items as unknown[] as DeidentificationDocumentDetailsOutput[]).length ===
          NUMBER_OF_DOCUMENTS,
        `Should have ${NUMBER_OF_DOCUMENTS} documents`,
      );
      assert.isTrue(
        (items as unknown[] as DeidentificationDocumentDetailsOutput[]).every(
          (obj) => obj.status === "Succeeded",
        ),
        "All documents should have succeeded",
      );
      assert.isTrue(
        (items as unknown[] as DeidentificationDocumentDetailsOutput[]).every((obj) =>
          obj.output!.location.includes(OUTPUT_FOLDER),
        ),
        "Output path location should contain the output folder",
      );
      assert.isTrue(
        (items as unknown[] as DeidentificationDocumentDetailsOutput[]).every(
          (obj) => obj.id.length === 36,
        ),
        "Document id should be a GUID",
      );
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "JobE2E cancel job then delete it deletes job",
    async function () {
      const job: DeidentificationJob = {
        operation: "Surrogate",
        sourceLocation: {
          location: storageAccountLocation,
          prefix: INPUT_PREFIX,
          extensions: ["*"],
        },
        targetLocation: {
          location: storageAccountLocation,
          prefix: OUTPUT_FOLDER,
          overwrite: true,
        },
      };

      const initialResponse = await client.path("/jobs/{name}", jobName).put({ body: job });
      const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      await poller.poll();
      assert.equal(poller.getOperationState().status, "running", "Job should be running");

      const cancelledJob = await client.path("/jobs/{name}:cancel", jobName).post();
      assert.equal(cancelledJob.status, "200", "Job should be canceled");

      const cancelledJobOutput = cancelledJob.body as DeidentificationJobOutput;
      assert.equal("Canceled", cancelledJobOutput.status, "Job status should be Canceled");

      const deleteRequest = await client.path("/jobs/{name}", jobName).delete();
      assert.equal(deleteRequest.status, "204", "Job should be deleted");

      const deletedJob = await client.path("/jobs/{name}", jobName).get();
      assert.equal(deletedJob.status, "404", "Job should not be found");
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "JobE2E cannot access storage create job returns 404",
    async function () {
      const badStorageAccountLocation = "FAKE_STORAGE_ACCOUNT";

      const job: DeidentificationJob = {
        operation: "Surrogate",
        sourceLocation: {
          location: badStorageAccountLocation,
          prefix: INPUT_PREFIX,
          extensions: ["*"],
        },
        targetLocation: { location: badStorageAccountLocation, prefix: OUTPUT_FOLDER },
      };

      const initialResponse = await client.path("/jobs/{name}", jobName).put({ body: job });

      const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);

      await poller.poll();
      assert.equal(poller.getOperationState().status, "failed", "Job should fail");

      const createdJob = await client.path("/jobs/{name}", jobName).get();
      assert.equal(createdJob.status, "404", "Job should not be found");
      const createdJobOutput = createdJob.body as ErrorResponse;
      assert.isNotNull(createdJobOutput.error, "Job should have error");
      assert.equal("JobNotFound", createdJobOutput.error.code, "Error code should be JobNotFound");
      assert.isTrue(
        createdJobOutput.error!.message.length > 10,
        "Error message should be descriptive",
      );
    },
    TEST_TIMEOUT_MS,
  );
});

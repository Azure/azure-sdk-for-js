// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedDeidentificationClient, createRecorder } from "./utils/recordedClient.js";
import { beforeEach, afterEach, it, describe } from "vitest";
import { DeidServicesClient } from "../../src/clientDefinitions.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { DeidentificationJob } from "../../src/models.js";
import { DeidentificationJobOutput, DocumentDetailsOutput } from "../../src/outputModels.js";
import { assert } from "@azure-tools/test-utils";
import {
  Recorder,
  assertEnvironmentVariable,
  isPlaybackMode,
  isRecordMode,
} from "@azure-tools/test-recorder";
import { ErrorResponse } from "@azure-rest/core-client";
import { getLongRunningPoller } from "../../src/pollingHelper.js";
import { paginate } from "../../src/paginateHelper.js";
import { isUnexpected } from "../../src/isUnexpected.js";

const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

const TEST_TIMEOUT_MS: number = 200000;

const fakeServiceEndpoint = "example.com";
const replaceableVariables: Record<string, string> = {
  DEID_SERVICE_ENDPOINT: fakeServiceEndpoint,
  STORAGE_ACCOUNT_SAS_URI: "https://fake_storage_account_sas_uri.blob.core.windows.net/container-sdk-dev-fakeid",
};

const generateJobName = (testName?: string): string => {
  let jobName = "js-sdk-job-" + Date.now();
  if (isPlaybackMode() || isRecordMode()) {
    jobName = `js-sdk-job-recorded-${testName}`;
  }
  return jobName;
};

const OUTPUT_FOLDER = "_output";

// Note: To ensure playback mode functions correctly, it's essential that both `rushx test:node` and `rushx test:browser` utilize identical recordings.
// Follow these steps to achieve consistent recordings across tests:
// 1. Update all instances of `jobName`.
// 2. Execute `rushx test:node` in record mode to capture the new test recording.
// 3. Once again, update all instances of `jobName`.
// 4. Execute `rushx test:browser` in record mode to align the browser test recordings with those of the node.
// 5. Ensure the same `jobId` is used in both browser and node recordings, identifiable by the string pattern `js-sdk-job-recorded-**`.
//    To accomplish this, you may need to edit the files located at `sdk\healthdataaiservices\azure-health-deidentification\recordings\browsers\batch\recording_*.json`.

describe("Batch", () => {
  let recorder: Recorder;
  let client: DeidServicesClient;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    await recorder.start({
      envSetupForPlayback: replaceableVariables,
      sanitizerOptions: {
        bodyKeySanitizers: [
          {
            value: replaceableVariables.STORAGE_ACCOUNT_SAS_URI,
            jsonPath: "$..location",
            regex: "^(?!.*FAKE_STORAGE_ACCOUNT).*",
          }
        ],
      },
      removeCentralSanitizers: ["AZSDK4001", "AZSDK2030", "AZSDK3430","AZSDK3493"],
    });
    const credential = createTestCredential();
    if (process.env.DEID_SERVICE_ENDPOINT) {
      client = await createRecordedDeidentificationClient(recorder, credential);
    } else {
      throw new Error("DEID_SERVICE_ENDPOINT is not set");
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // Note: When your re-run recording you need to update jobName to avoid conflict with existing job
  it(
    "CreateJob returns expected",
    async function () {
      const jobName = generateJobName("001g");
      const inputPrefix = "example_patient_1";
      const storageAccountSASUri = isPlaybackMode() ? replaceableVariables.STORAGE_ACCOUNT_SAS_URI : assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");
      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
      };

      const jobOutput = await client.path("/jobs/{name}", jobName).put({ body: job });

      if (isUnexpected(jobOutput)) {
        throw new Error("Unexpected job result");
      }

      assert.isNotNull(jobOutput);
      assert.equal(jobName, jobOutput.body.name, "Job name should match");
      assert.isNotNull(jobOutput.body.createdAt, "Job should have createdAt");
      assert.isNotNull(jobOutput.body.lastUpdatedAt, "Job should have lastUpdatedAt");
      assert.isUndefined(jobOutput.body.startedAt, "Job should not have startedAt");
      assert.equal("NotStarted", jobOutput.body.status, "Job status should be NotStarted");
      assert.isUndefined(jobOutput.body.error, "Job should not have error");
      assert.isUndefined(jobOutput.body.redactionFormat, "Job should not have redactionFormat");
      assert.isUndefined(jobOutput.body.summary, "Job should not have summary");
      assert.equal(inputPrefix, jobOutput.body.sourceLocation.prefix, "Job sourceLocation prefix should match");
      assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"), "Storage account SAS URI should contain 'blob.core.windows.net'");
      assert.equal(OUTPUT_FOLDER, jobOutput.body.targetLocation.prefix, "Job targetLocation prefix should match");
      assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"), "Storage account SAS URI should contain 'blob.core.windows.net'");
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "CreateThenList returns expected",
    async function () {
      const jobName = generateJobName("002g");
      const inputPrefix = "example_patient_1"; 
      const storageAccountSASUri = isPlaybackMode() ? replaceableVariables.STORAGE_ACCOUNT_SAS_URI : assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");

      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
      };

      const initialResponse = await client.path("/jobs/{name}", jobName).put({ body: job });
      const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      await poller.poll();
      assert.equal(poller.getOperationState().status, "running");

      // Test list jobs with pagination
      const jobs = await client.path("/jobs").get();
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
      assert.isUndefined(foundJob!.redactionFormat, "Job should not have redactionFormat");
      assert.isUndefined(foundJob!.summary, "Job should not have summary");
      assert.equal(inputPrefix, foundJob!.sourceLocation.prefix, "Job sourceLocation prefix should match");
      assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"), "Storage account SAS URI should contain 'blob.core.windows.net'");
      assert.equal(OUTPUT_FOLDER, foundJob!.targetLocation.prefix, "Job targetLocation prefix should match");
      assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"), "Storage account SAS URI should contain 'blob.core.windows.net");
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "JobE2E wait until success",
    async function () {
      const jobName = generateJobName("003g");
      const inputPrefix = "example_patient_1";
      const storageAccountSASUri = isPlaybackMode() ? replaceableVariables.STORAGE_ACCOUNT_SAS_URI : assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");
      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
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
      assert.equal(finalJobOutput.body.summary!.total, 2, "Job should have processed 2 documents");
      assert.equal(finalJobOutput.body.summary!.successful, 2, "Job should have succeeded 2 documents");

      const reports = await client.path("/jobs/{name}/documents", jobName).get();

      if (isUnexpected(reports)) {
        throw new Error("Unexpected error occurred");
      }

      const items = [];
      const iter = paginate(client, reports);

      for await (const item of iter) {
        items.push(item);
      }

      assert.isTrue((items as unknown[] as DocumentDetailsOutput[]).length === 2, "Should have 2 documents");
      assert.isTrue(
        (items as unknown[] as DocumentDetailsOutput[]).every(
          (obj) => obj.status === "Succeeded",
        ),
        "All documents should have succeeded",
      );
      assert.isTrue(
        (items as unknown[] as DocumentDetailsOutput[]).every((obj) =>
          obj.output!.path.startsWith(OUTPUT_FOLDER),
        ),
       "Output path should start with the output folder",
      );
      assert.isTrue(
        (items as unknown[] as DocumentDetailsOutput[]).every((obj) => obj.id.length === 36),
        "Document id should be a GUID",
      );
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "JobE2E cancel job then delete it deletes job",
    async function () {
      const jobName = generateJobName("004g");
      const inputPrefix = "example_patient_1";
      const storageAccountSASUri = isPlaybackMode() ? replaceableVariables.STORAGE_ACCOUNT_SAS_URI : assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");
      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
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
      const jobName = generateJobName("005g");
      const inputPrefix = "example_patient_1";
      const storageAccountSASUri = "FAKE_STORAGE_ACCOUNT";

      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
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
      assert.isTrue(createdJobOutput.error!.message.length > 10, "Error message should be descriptive");
    },
    TEST_TIMEOUT_MS,
  );
});

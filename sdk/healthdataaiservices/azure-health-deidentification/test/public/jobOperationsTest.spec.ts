// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedDeidentificationClient, createRecorder } from "./utils/recordedClient.js";
import { beforeEach, afterEach, it, describe } from "vitest";
import { DeidentificationClient } from "../../src/clientDefinitions.js";
import { createTestCredential } from "@azure-tools/test-credential";

import { DeidentificationJob } from "../../src/models.js";
import {
  DeidentificationJobOutput,
  HealthFileDetailsOutput,
  JobStatusOutput,
  PagedDeidentificationJobOutput,
  PagedHealthFileDetailsOutput,
} from "../../src/outputModels.js";
import { assert } from "@azure-tools/test-utils";
import { Recorder, assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import { ErrorResponse } from "@azure-rest/core-client";
import { getLongRunningPoller } from "../../src/pollingHelper.js";
import { paginate } from "../../src/paginateHelper.js";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { CreateJobDefaultResponse, CreateJobLogicalResponse, GetJob200Response, GetJobDefaultResponse } from "../../src/responses.js";

const testPollingOptions = {
  intervalInMs: 2000,
};

const fakeServiceEndpoint = "fakeserviceId.deid.azure.com";
const replaceableVariables: Record<string, string> = {
  DEID_SERVICE_ENDPOINT: fakeServiceEndpoint,
  STORAGE_ACCOUNT_SAS_URI:
    "https://fake_storage_account_sas_uri.blob.core.windows.net/container-sdk-dev-fakeid",
  FAKE_NEXT_LINK:`${fakeServiceEndpoint}/jobs?api-version=2024-01-16-preview&continuationToken=1234`
};

const generateJobName = (): string => {
  const jobName = "js-sdk-job-" + Date.now();
  return jobName;
};

const pollJobStatus = async (
  client: DeidentificationClient,
  jobName: string,
  statusToWait: string,
  intervalInMS = 2000,
): Promise<DeidentificationJobOutput> => {
  
  let jobOutput = await client.path("/jobs/{name}", jobName).get();

  while ((jobOutput.body as DeidentificationJobOutput).status !== statusToWait) {
    await new Promise((resolve) => setTimeout(resolve, intervalInMS));
    jobOutput = await client.path("/jobs/{name}", jobName).get();
    if ((jobOutput.body as DeidentificationJobOutput).error !== undefined) {
      console.log(`Job error: ${(jobOutput.body as DeidentificationJobOutput).error}`);
    }
  }
  return jobOutput.body as DeidentificationJobOutput;
};

const OUTPUT_FOLDER = "_output";

describe("Batch", () => {
  let recorder: Recorder;
  let client: DeidentificationClient;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    await recorder.start({
      envSetupForPlayback: replaceableVariables,
      sanitizerOptions: {
        bodyKeySanitizers: [
          {
            value: replaceableVariables.STORAGE_ACCOUNT_SAS_URI,
            jsonPath: "$..location",
          },
          {
            value: replaceableVariables.FAKE_NEXT_LINK,
            jsonPath: "$..nextLink",
          }
        ],
      },
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

  it("CreateJob returns expected", async function () {
    const jobName = generateJobName();
    const inputPrefix = "example_patient_1";
    const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");

    const job: DeidentificationJob = {
      dataType: "Plaintext",
      operation: "Surrogate",
      sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
      targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
    };

    const response = await client.path("/jobs/{name}", jobName).put({ body: job });
    
    const jobOutput = response.body as DeidentificationJobOutput;

    assert.isNotNull(jobOutput);
    assert.equal(jobName, jobOutput.name);
    assert.isNotNull(jobOutput.createdAt);
    assert.isNotNull(jobOutput.lastUpdatedAt);
    assert.isUndefined(jobOutput.startedAt);
    assert.equal("NotStarted", jobOutput.status);
    assert.isUndefined(jobOutput.error);
    assert.isUndefined(jobOutput.redactionFormat);
    assert.isUndefined(jobOutput.summary);
    assert.equal(inputPrefix, jobOutput.sourceLocation.prefix);
    assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"));
    assert.equal(OUTPUT_FOLDER, jobOutput.targetLocation.prefix);
    assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"));
  }, 10000);

  it("CreateThenList returns expected", async function () {
    const jobName = generateJobName();
    const inputPrefix = "example_patient_1";
    const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");

    const job: DeidentificationJob = {
      dataType: "Plaintext",
      operation: "Surrogate",
      sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
      targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
    };

    await client.path("/jobs/{name}", jobName).put({ body: job });

    // Test list jobs with pagination
    const jobs = await client.path("/jobs").get();

    const items = [];

    const iter = paginate(client, jobs);

    for await (const item of iter) {
      items.push(item);
    }
    
    const foundJob = (items as DeidentificationJobOutput[]).find((j) => j.name === jobName);

    assert.isTrue(foundJob !== undefined);
    assert.isNotNull(foundJob!.createdAt);
    assert.isNotNull(foundJob!.lastUpdatedAt);
    assert.isUndefined(foundJob!.startedAt);
    assert.equal("NotStarted", foundJob!.status);
    assert.isUndefined(foundJob!.error);
    assert.isUndefined(foundJob!.redactionFormat);
    assert.isUndefined(foundJob!.summary);
    assert.equal(inputPrefix, foundJob!.sourceLocation.prefix);
    assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"));
    assert.equal(OUTPUT_FOLDER, foundJob!.targetLocation.prefix);
    assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"));
  }, 20000);

  it("JobE2E wait until success", async function () {
    const jobName = generateJobName();
    const inputPrefix = "example_patient_1";
    const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");

    const job: DeidentificationJob = {
      dataType: "Plaintext",
      operation: "Surrogate",
      sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
      targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
    };

    const initialResponse = await client.path("/jobs/{name}", jobName).put({ body: job });

    const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    poller.onProgress((state) => {
       // There should be polling state logged in everey 2 seconds
      //  "NotStarted"
      //  "Running"
      //  "Succeeded"
      //  "PartialFailed"
      //  "Failed"
      //  "Canceled"
        console.log("POLLER_STATE", state);
    });
    const donePolling = await poller.pollUntilDone();
    console.log(donePolling);

  }, 40000);

  it("JobE2E cancel job then delete it deletes job", async function () {
    const jobName = generateJobName();
    const inputPrefix = "example_patient_1";
    const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");

    const job: DeidentificationJob = {
      dataType: "Plaintext",
      operation: "Surrogate",
      sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
      targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
    };

    await client.path("/jobs/{name}", jobName).put({ body: job });
    await pollJobStatus(client, jobName, "NotStarted");

    const cancelledJob = await client.path("/jobs/{name}:cancel", jobName).post();
    const cancelledJobOutput = cancelledJob.body as DeidentificationJobOutput;
    assert.equal("Canceled", cancelledJobOutput.status);

    await client.path("/jobs/{name}", jobName).delete();

    const deletedJob = await client.path("/jobs/{name}", jobName).get();
    assert.equal(deletedJob.status, "404");
  }, 20000);

  it("JobE2E cannot access storage create job returns 404", async function () {
    const jobName = generateJobName();
    const inputPrefix = "example_patient_1";
    const storageAccountSASUri = "INVALID_STORAGE_ACCOUNT_SAS_URI";

    const job: DeidentificationJob = {
      dataType: "Plaintext",
      operation: "Surrogate",
      sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
      targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
    };

    await client.path("/jobs/{name}", jobName).put({ body: job });

    const createdJob = await client.path("/jobs/{name}", jobName).get();
    assert.equal(createdJob.status, "404");
    const createdJobOutput = createdJob.body as ErrorResponse;
    assert.isNotNull(createdJobOutput.error);
    assert.equal("JobNotFound", createdJobOutput.error.code);
    assert.isTrue(createdJobOutput.error!.message.length > 10);
  }, 20000);
});

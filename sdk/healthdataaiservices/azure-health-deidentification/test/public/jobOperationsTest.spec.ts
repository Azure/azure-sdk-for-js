// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedDeidentificationClient, createRecorder } from "./utils/recordedClient.js";
import { beforeEach, afterEach, it, describe } from "vitest";
import { DeidentificationClient } from "../../src/clientDefinitions.js";
import { createTestCredential } from "@azure-tools/test-credential";

import { DeidentificationJob } from "../../src/models.js";
import { DeidentificationJobOutput } from "../../src/outputModels.js";
import { assert } from "@azure-tools/test-utils";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";

const replaceableVariables: Record<string, string> = {
  DEID_SERVICE_ENDPOINT: "https://myappconfig.azconfig.io",
  APPCONFIG_TEST_SETTING_KEY: "test-key",
  APPCONFIG_TEST_SETTING_EXPECTED_VALUE: "test-value",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
};

const generateJobName = () => {
  const jobName = "js-sdk-job-" + Date.now();
  return jobName;
}

const OUTPUT_FOLDER = "_output";

describe("Batch", () => {
  let recorder: Recorder;
  let client: DeidentificationClient;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    await recorder.start({ envSetupForPlayback: replaceableVariables });
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
    const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI")

    const job: DeidentificationJob = {
      dataType: "Plaintext",
      operation: "Surrogate",
      sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
      targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
    }

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
    const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI")
    
    const job: DeidentificationJob = {
      dataType: "Plaintext",
      operation: "Surrogate",
      sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
      targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
    }

    const response = await client.path("/jobs/{name}", jobName).put({ body: job });

    const jobOutput = response.body as DeidentificationJobOutput;

    // Test list jobs
            var jobs = client.path("/jobs").get({ body: job });

            bool jobFound = false;
            int jobsToLookThrough = 10;

  }, 10000);

  it("JobE2E wait until success", async function () {


  }, 10000);

  it("JobE2E cancel delete flow deletes job", async function () {


  }, 10000);

  it("JobE2E cannot access storage throws exception", async function () {


  }, 10000);

});

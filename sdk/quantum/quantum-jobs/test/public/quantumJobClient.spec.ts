// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ContainerClient, BlockBlobClient } from "@azure/storage-blob";
import { QuantumJobClient } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import { Recorder } from "@azure-tools/test-recorder";
import chai from "chai";
import * as fs from "fs";
import { TokenCredential } from "@azure/identity";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { replaceStorageAccountInfo } from "../utils/recorderUtils";

const assert = chai.assert;

describe("Quantum job lifecycle", () => {
  let client: QuantumJobClient;
  let recorder: Recorder;
  let credentials: TokenCredential;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
    credentials = authentication.credentials;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("Test Get Providers Status", async function() {
    let index = 0;
    for await (const status of client.providers.listStatus()) {
      assert.isNotEmpty(status.id);
      assert.isNotNull(status.targets);
      assert.isNotNull(status.currentAvailability);
      ++index;
    }
    // Should have at least one in the list.
    assert.isTrue(index >= 1);
  });

  it("Test Get Quotas", async function() {
    let index = 0;
    for await (const quota of client.quotas.list()) {
      assert.isNotEmpty(quota.dimension);
      assert.isNotNull(quota.scope);
      assert.isNotEmpty(quota.providerId);
      assert.isNotNull(quota.utilization);
      assert.isNotNull(quota.holds);
      assert.isNotNull(quota.period);
      ++index;
    }
    // Should have at least one in the list.
    assert.isTrue(index >= 1);
  });

  it("Test Quantum Job Lifecycle", async function() {
    // Get container Uri with SAS key
    const containerName = "testcontainer";
    let containerUri =
      (
        await client.storage.sasUri({
          containerName: containerName
        })
      ).sasUri ?? "";

    if (isPlaybackMode()) {
      containerUri = replaceStorageAccountInfo(containerUri);
    }

    // Create container if not exists (if not in Playback mode)
    if (!isPlaybackMode()) {
      const containerClient = new ContainerClient(containerUri, credentials);
      await containerClient.createIfNotExists();
    }

    // Get input data blob Uri with SAS key
    const blobName = `${recorder.getUniqueName("input-")}.json`;
    let inputDataUri =
      (
        await client.storage.sasUri({
          containerName: containerName,
          blobName: blobName
        })
      ).sasUri ?? "";

    if (isPlaybackMode()) {
      inputDataUri = replaceStorageAccountInfo(inputDataUri);
    }

    // Upload input data to blob (if not in Playback mode)
    if (!isPlaybackMode()) {
      const blobClient = new BlockBlobClient(inputDataUri, credentials);
      const problemFilename = "./test/problem.json";
      const fileContent = fs.readFileSync(problemFilename, "utf8");
      await blobClient.upload(fileContent, Buffer.byteLength(fileContent));
    }

    // Submit job
    const jobId = recorder.getUniqueName("job-");
    const jobName = recorder.getUniqueName("jobname-");
    const inputDataFormat = "microsoft.qio.v2";
    const outputDataFormat = "microsoft.qio-results.v2";
    const providerId = "microsoft";
    const target = "microsoft.paralleltempering-parameterfree.cpu";
    const createJobDetails = {
      containerUri: containerUri,
      inputDataFormat: inputDataFormat,
      providerId: providerId,
      target: target,
      id: jobId,
      inputDataUri: inputDataUri,
      name: jobName,
      outputDataFormat: outputDataFormat
    };
    const jobDetails = await client.jobs.create(jobId, createJobDetails);

    // Check if job was created correctly
    assert.equal(inputDataFormat, jobDetails.inputDataFormat);
    assert.equal(outputDataFormat, jobDetails.outputDataFormat);
    assert.equal(providerId, jobDetails.providerId);
    assert.equal(target, jobDetails.target);
    assert.isNotEmpty(jobDetails.id);
    assert.isNotEmpty(jobDetails.name);
    assert.isNotEmpty(jobDetails.inputDataUri);
    assert.equal(jobId, jobDetails.id);
    assert.equal(jobName, jobDetails.name);
    if (!isPlaybackMode()) {
      assert.equal(inputDataUri, jobDetails.inputDataUri);
    } else {
      assert.equal(inputDataUri, replaceStorageAccountInfo(jobDetails.inputDataUri as string));
    }

    // Get the job that we've just created based on the jobId
    const gotJob = await client.jobs.get(jobId);
    assert.equal(jobDetails.inputDataFormat, gotJob.inputDataFormat);
    assert.equal(jobDetails.outputDataFormat, gotJob.outputDataFormat);
    assert.equal(jobDetails.providerId, gotJob.providerId);
    assert.equal(jobDetails.target, gotJob.target);
    assert.equal(jobDetails.id, gotJob.id);
    assert.equal(jobDetails.name, gotJob.name);

    // Get all jobs and look for the job that we've just created
    let jobFound = false;
    const jobs = client.jobs.list();
    for await (const job of jobs) {
      if (job.id == jobDetails.id) {
        jobFound = true;
        assert.equal(jobDetails.inputDataFormat, gotJob.inputDataFormat);
        assert.equal(jobDetails.outputDataFormat, gotJob.outputDataFormat);
        assert.equal(jobDetails.providerId, gotJob.providerId);
        assert.equal(jobDetails.target, gotJob.target);
        assert.equal(jobDetails.name, gotJob.name);
      }
    }
    assert.isTrue(jobFound);
  });
});

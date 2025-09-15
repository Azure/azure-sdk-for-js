// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerClient, BlockBlobClient } from "@azure/storage-blob";
import type { QuantumJobClient } from "../../src/index.js";
import { authenticate } from "../utils/testAuthentication.js";
import type { Recorder } from "@azure-tools/test-recorder";
import fs from "node:fs";
import type { TokenCredential } from "@azure/identity";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { getRecorderUniqueVariable } from "../utils/recorderUtils.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Quantum job lifecycle", () => {
  let client: QuantumJobClient;
  let recorder: Recorder;
  let credentials: TokenCredential;

  beforeEach(async (ctx) => {
    const authentication = await authenticate(ctx);
    client = authentication.client;
    recorder = authentication.recorder;
    credentials = authentication.credentials;
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Test Get Providers Status", async () => {
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

  it("Test Get Quotas", async () => {
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

  it("Test Quantum Job Lifecycle", async () => {
    // Get container Uri with SAS key
    const containerName = "testcontainer";
    const containerUri =
      (
        await client.storage.sasUri({
          containerName: containerName,
        })
      ).sasUri ?? "";

    // Create container if not exists (if not in Playback mode)
    if (!isPlaybackMode()) {
      const containerClient = new ContainerClient(containerUri, credentials);
      await containerClient.createIfNotExists();
    }

    // Get input data blob Uri with SAS key
    const blobName = `${getRecorderUniqueVariable(recorder, "input-")}.bc`;
    const inputDataUri =
      (
        await client.storage.sasUri({
          containerName: containerName,
          blobName: blobName,
        })
      ).sasUri ?? "";

    // Upload input data to blob (if not in Playback mode)
    if (!isPlaybackMode()) {
      const blobClient = new BlockBlobClient(inputDataUri, credentials);
      const qirFilename = "./test/BellState.bc";
      const fileContent = fs.readFileSync(qirFilename, "utf8");
      const blobOptions = {
        blobHTTPHeaders: {
          blobContentType: "qir.v1",
        },
      };
      await blobClient.upload(fileContent, Buffer.byteLength(fileContent), blobOptions);
    }

    // Submit job
    const jobId = getRecorderUniqueVariable(recorder, "job-");
    const jobName = getRecorderUniqueVariable(recorder, "jobname-");
    const inputDataFormat = "qir.v1";
    const outputDataFormat = "microsoft.quantum-results.v1";
    const providerId = "quantinuum";
    const target = "quantinuum.sim.h1-1e";
    const inputParams = {
      entryPoint: "ENTRYPOINT__BellState",
      arguments: <string[]>[],
      targetCapability: "AdaptiveExecution",
    };
    const createJobDetails = {
      containerUri: containerUri,
      inputDataFormat: inputDataFormat,
      providerId: providerId,
      target: target,
      id: jobId,
      inputDataUri: inputDataUri,
      name: jobName,
      outputDataFormat: outputDataFormat,
      inputParams: inputParams,
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
    assert.equal(inputDataUri, jobDetails.inputDataUri);

    // Get all jobs and look for the job that we've just created
    let jobFound = false;
    const jobs = client.jobs.list();
    for await (const job of jobs) {
      if (job.id === jobDetails.id) {
        jobFound = true;
        assert.equal(job.inputDataFormat, jobDetails.inputDataFormat);
        assert.equal(job.outputDataFormat, jobDetails.outputDataFormat);
        assert.equal(job.providerId, jobDetails.providerId);
        assert.equal(job.target, jobDetails.target);
        assert.equal(job.name, jobDetails.name);
      }
    }
    assert.isTrue(jobFound);
  });
});

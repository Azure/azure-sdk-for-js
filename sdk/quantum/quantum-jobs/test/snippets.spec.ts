// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QuantumJobClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { BlockBlobClient, ContainerClient } from "@azure/storage-blob";
import { describe, it } from "vitest";
import { readFileSync } from "node:fs";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create a QuantumJobClient
    const subscriptionId = "your_subscription_id";
    const resourceGroupName = "your_resource_group_name";
    const workspaceName = "your_quantum_workspace_name";
    const location = "westus";
    const endpoint = `https://${location}.quantum.azure.com`;

    const quantumJobClient = new QuantumJobClient(
      credential,
      subscriptionId,
      resourceGroupName,
      workspaceName,
      {
        endpoint: endpoint,
        credentialScopes: "https://quantum.microsoft.com/.default",
      },
    );
  });

  it("ReadmeSampleCreateContainer", async () => {
    const credential = new DefaultAzureCredential();
    const subscriptionId = "your_subscription_id";
    const resourceGroupName = "your_resource_group_name";
    const workspaceName = "your_quantum_workspace_name";
    const storageContainerName = "containername";
    const location = "westus";
    const endpoint = `https://${location}.quantum.azure.com`;
    // @ts-preserve-whitespace
    const quantumJobClient = new QuantumJobClient(
      credential,
      subscriptionId,
      resourceGroupName,
      workspaceName,
      {
        endpoint: endpoint,
        credentialScopes: "https://quantum.microsoft.com/.default",
      },
    );
    // @ts-preserve-whitespace
    // Get container Uri with SAS key
    const containerUri = (
      await quantumJobClient.storage.sasUri({
        containerName: storageContainerName,
      })
    ).sasUri;
    // @ts-preserve-whitespace
    // Create container if not exists
    const containerClient = new ContainerClient(containerUri);
    await containerClient.createIfNotExists();
  });

  it("ReadmeSampleUploadInputData", async () => {
    const credential = new DefaultAzureCredential();
    const subscriptionId = "your_subscription_id";
    const resourceGroupName = "your_resource_group_name";
    const workspaceName = "your_quantum_workspace_name";
    const storageContainerName = "containername";
    const location = "westus";
    const endpoint = `https://${location}.quantum.azure.com`;
    // @ts-preserve-whitespace
    const quantumJobClient = new QuantumJobClient(
      credential,
      subscriptionId,
      resourceGroupName,
      workspaceName,
      {
        endpoint: endpoint,
        credentialScopes: "https://quantum.microsoft.com/.default",
      },
    );
    // @ts-preserve-whitespace
    // Get input data blob Uri with SAS key
    const blobName = "myjobinput.bc";
    const inputDataUri = (
      await quantumJobClient.storage.sasUri({
        containerName: storageContainerName,
        blobName: blobName,
      })
    ).sasUri;
    // @ts-preserve-whitespace
    // Upload input data to blob
    const blobClient = new BlockBlobClient(inputDataUri);
    const problemFilename = "BellState.bc";
    const fileContent = readFileSync(problemFilename, "utf8");
    const blobOptions = {
      blobHTTPHeaders: {
        blobContentType: "qir.v1",
      },
    };
    await blobClient.upload(fileContent, Buffer.byteLength(fileContent), blobOptions);
  });

  it("ReadmeSampleCreateJob", async () => {
    const credential = new DefaultAzureCredential();
    const subscriptionId = "your_subscription_id";
    const resourceGroupName = "your_resource_group_name";
    const workspaceName = "your_quantum_workspace_name";
    const location = "westus";
    const endpoint = `https://${location}.quantum.azure.com`;
    // @ts-preserve-whitespace
    const quantumJobClient = new QuantumJobClient(
      credential,
      subscriptionId,
      resourceGroupName,
      workspaceName,
      {
        endpoint: endpoint,
        credentialScopes: "https://quantum.microsoft.com/.default",
      },
    );
    // @ts-preserve-whitespace
    const randomId = `${Math.floor(Math.random() * 10000 + 1)}`;
    // @ts-preserve-whitespace
    // Submit job
    const jobId = `job-${randomId}`;
    const jobName = `jobName-${randomId}`;
    const inputDataFormat = "qir.v1";
    const outputDataFormat = "microsoft.quantum-results.v1";
    const providerId = "quantinuum";
    const target = "quantinuum.sim.h1-1e";
    const inputParams = {
      entryPoint: "ENTRYPOINT__BellState",
      arguments: [],
      targetCapability: "AdaptiveExecution",
    };
    const createJobDetails = {
      containerUri: "https://<container-uri>",
      inputDataFormat: inputDataFormat,
      providerId: providerId,
      target: target,
      id: jobId,
      inputDataUri: "https://<input-data-url>",
      name: jobName,
      outputDataFormat: outputDataFormat,
      inputParams: inputParams,
    };
    const createdJob = await quantumJobClient.jobs.create(jobId, createJobDetails);
  });

  it("ReadmeSampleGetJob", async () => {
    const credential = new DefaultAzureCredential();
    const subscriptionId = "your_subscription_id";
    const resourceGroupName = "your_resource_group_name";
    const workspaceName = "your_quantum_workspace_name";
    const location = "westus";
    const endpoint = `https://${location}.quantum.azure.com`;
    // @ts-preserve-whitespace
    const quantumJobClient = new QuantumJobClient(
      credential,
      subscriptionId,
      resourceGroupName,
      workspaceName,
      {
        endpoint: endpoint,
        credentialScopes: "https://quantum.microsoft.com/.default",
      },
    );
    // @ts-preserve-whitespace
    // Get the job that we've just created based on its jobId
    const myJob = await quantumJobClient.jobs.get("job-1234");
  });

  it("ReadmeSampleListJobs", async () => {
    const credential = new DefaultAzureCredential();
    const subscriptionId = "your_subscription_id";
    const resourceGroupName = "your_resource_group_name";
    const workspaceName = "your_quantum_workspace_name";
    const location = "westus";
    const endpoint = `https://${location}.quantum.azure.com`;
    // @ts-preserve-whitespace
    const quantumJobClient = new QuantumJobClient(
      credential,
      subscriptionId,
      resourceGroupName,
      workspaceName,
      {
        endpoint: endpoint,
        credentialScopes: "https://quantum.microsoft.com/.default",
      },
    );
    // @ts-preserve-whitespace
    const jobListResult = quantumJobClient.jobs.list();
    for await (const job of jobListResult) {
      console.log(`Job Id: ${job.id} and Job Name: ${job.name}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});

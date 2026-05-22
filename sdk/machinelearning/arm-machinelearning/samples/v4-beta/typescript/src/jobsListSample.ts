// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Jobs in the workspace.
 *
 * @summary lists Jobs in the workspace.
 * x-ms-original-file: 2025-12-01/Job/AutoMLJob/list.json
 */
async function listAutoMLJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.list("test-rg", "my-aml-workspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists Jobs in the workspace.
 *
 * @summary lists Jobs in the workspace.
 * x-ms-original-file: 2025-12-01/Job/CommandJob/list.json
 */
async function listCommandJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.list("test-rg", "my-aml-workspace", {
    jobType: "string",
    tag: "string",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists Jobs in the workspace.
 *
 * @summary lists Jobs in the workspace.
 * x-ms-original-file: 2025-12-01/Job/PipelineJob/list.json
 */
async function listPipelineJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.list("test-rg", "my-aml-workspace", {
    jobType: "string",
    tag: "string",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists Jobs in the workspace.
 *
 * @summary lists Jobs in the workspace.
 * x-ms-original-file: 2025-12-01/Job/SweepJob/list.json
 */
async function listSweepJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.list("test-rg", "my-aml-workspace", {
    jobType: "string",
    tag: "string",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAutoMLJob();
  await listCommandJob();
  await listPipelineJob();
  await listSweepJob();
}

main().catch(console.error);

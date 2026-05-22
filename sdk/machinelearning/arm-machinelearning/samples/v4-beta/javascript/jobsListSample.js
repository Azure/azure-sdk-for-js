// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Jobs in the workspace.
 *
 * @summary lists Jobs in the workspace.
 * x-ms-original-file: 2025-12-01/Job/AutoMLJob/list.json
 */
async function listAutoMLJob() {
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
async function listCommandJob() {
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
async function listPipelineJob() {
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
async function listSweepJob() {
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

async function main() {
  await listAutoMLJob();
  await listCommandJob();
  await listPipelineJob();
  await listSweepJob();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Job by name/id.
 *
 * @summary gets a Job by name/id.
 * x-ms-original-file: 2025-12-01/Job/AutoMLJob/get.json
 */
async function getAutoMLJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("test-rg", "my-aml-workspace", "string");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Job by name/id.
 *
 * @summary gets a Job by name/id.
 * x-ms-original-file: 2025-12-01/Job/CommandJob/get.json
 */
async function getCommandJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("test-rg", "my-aml-workspace", "string");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Job by name/id.
 *
 * @summary gets a Job by name/id.
 * x-ms-original-file: 2025-12-01/Job/PipelineJob/get.json
 */
async function getPipelineJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("test-rg", "my-aml-workspace", "string");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Job by name/id.
 *
 * @summary gets a Job by name/id.
 * x-ms-original-file: 2025-12-01/Job/SweepJob/get.json
 */
async function getSweepJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("test-rg", "my-aml-workspace", "string");
  console.log(result);
}

async function main() {
  await getAutoMLJob();
  await getCommandJob();
  await getPipelineJob();
  await getSweepJob();
}

main().catch(console.error);

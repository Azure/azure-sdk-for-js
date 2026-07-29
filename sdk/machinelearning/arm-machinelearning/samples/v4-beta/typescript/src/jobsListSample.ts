// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Jobs in the workspace.
 *
 * @summary lists Jobs in the workspace.
 * x-ms-original-file: 2026-03-15-preview/Job/AutoMLJob/list.json
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
 * x-ms-original-file: 2026-03-15-preview/Job/CommandJob/list.json
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
 * x-ms-original-file: 2026-03-15-preview/Job/DistillationJob/list.json
 */
async function listDistillationJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.list("test-rg", "my-aml-workspace", {
    jobType: "string",
    tag: "string",
    listViewType: "All",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists Jobs in the workspace.
 *
 * @summary lists Jobs in the workspace.
 * x-ms-original-file: 2026-03-15-preview/Job/FineTuningJob/list.json
 */
async function listFineTuningJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.list("test-rg", "my-aml-workspace", {
    jobType: "string",
    tag: "string",
    listViewType: "All",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists Jobs in the workspace.
 *
 * @summary lists Jobs in the workspace.
 * x-ms-original-file: 2026-03-15-preview/Job/PipelineJob/list.json
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
 * x-ms-original-file: 2026-03-15-preview/Job/SweepJob/list.json
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
  await listDistillationJob();
  await listFineTuningJob();
  await listPipelineJob();
  await listSweepJob();
}

main().catch(console.error);

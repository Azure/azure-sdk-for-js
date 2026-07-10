// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes.
 *
 * @summary gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes.
 * x-ms-original-file: 2026-07-01/ContainerGroupsGetPriority.json
 */
async function containerGroupsGetWithPriority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.get("demo", "demo1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes.
 *
 * @summary gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes.
 * x-ms-original-file: 2026-07-01/ContainerGroupsGet_Failed.json
 */
async function containerGroupsGetFailed() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.get("demo", "demo1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes.
 *
 * @summary gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes.
 * x-ms-original-file: 2026-07-01/ContainerGroupsGet_Succeeded.json
 */
async function containerGroupsGetSucceeded() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.get("demo", "demo1");
  console.log(result);
}

async function main() {
  await containerGroupsGetWithPriority();
  await containerGroupsGetFailed();
  await containerGroupsGetSucceeded();
}

main().catch(console.error);

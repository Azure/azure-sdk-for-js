// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them.
 *
 * @summary gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them.
 * x-ms-original-file: 2025-12-01/Compute/get/AKSCompute.json
 */
async function getAAKSCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.get("testrg123", "workspaces123", "compute123");
  console.log(result);
}

/**
 * This sample demonstrates how to gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them.
 *
 * @summary gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them.
 * x-ms-original-file: 2025-12-01/Compute/get/AmlCompute.json
 */
async function getAAMLCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.get("testrg123", "workspaces123", "compute123");
  console.log(result);
}

/**
 * This sample demonstrates how to gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them.
 *
 * @summary gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them.
 * x-ms-original-file: 2025-12-01/Compute/get/ComputeInstance.json
 */
async function getAnComputeInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.get("testrg123", "workspaces123", "compute123");
  console.log(result);
}

/**
 * This sample demonstrates how to gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them.
 *
 * @summary gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them.
 * x-ms-original-file: 2025-12-01/Compute/get/KubernetesCompute.json
 */
async function getAKubernetesCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.get("testrg123", "workspaces123", "compute123");
  console.log(result);
}

async function main() {
  await getAAKSCompute();
  await getAAMLCompute();
  await getAnComputeInstance();
  await getAKubernetesCompute();
}

main().catch(console.error);

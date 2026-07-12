// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specified managed compute deployment associated with the Cognitive Services account.
 *
 * @summary updates the specified managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/UpdateManagedComputeDeployment.json
 */
async function updateManagedComputeDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedComputeDeployments.update(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-gpu",
    { sku: { name: "GlobalManagedCompute", capacity: 2 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates the specified managed compute deployment associated with the Cognitive Services account.
 *
 * @summary updates the specified managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/UpdateVmManagedComputeDeployment.json
 */
async function updateVmManagedComputeDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedComputeDeployments.update(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-byoc",
    { sku: { name: "VmManagedCompute", capacity: 2 } },
  );
  console.log(result);
}

async function main() {
  await updateManagedComputeDeployment();
  await updateVmManagedComputeDeployment();
}

main().catch(console.error);

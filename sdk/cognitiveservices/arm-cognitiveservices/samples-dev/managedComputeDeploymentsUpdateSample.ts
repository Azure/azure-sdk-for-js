// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specified managed compute deployment associated with the Cognitive Services account.
 *
 * @summary updates the specified managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-03-15-preview/UpdateManagedComputeDeployment.json
 */
async function updateManagedComputeDeployment(): Promise<void> {
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
 * x-ms-original-file: 2026-03-15-preview/UpdateVmManagedComputeDeployment.json
 */
async function updateVmManagedComputeDeployment(): Promise<void> {
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

async function main(): Promise<void> {
  await updateManagedComputeDeployment();
  await updateVmManagedComputeDeployment();
}

main().catch(console.error);

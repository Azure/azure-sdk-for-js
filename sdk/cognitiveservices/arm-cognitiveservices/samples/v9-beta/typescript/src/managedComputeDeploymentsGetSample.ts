// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified managed compute deployment associated with the Cognitive Services account.
 *
 * @summary gets the specified managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/GetManagedComputeDeployment.json
 */
async function getManagedComputeDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedComputeDeployments.get(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-gpu",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified managed compute deployment associated with the Cognitive Services account.
 *
 * @summary gets the specified managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/GetVmManagedComputeDeployment.json
 */
async function getVmManagedComputeDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedComputeDeployments.get(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-byoc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedComputeDeployment();
  await getVmManagedComputeDeployment();
}

main().catch(console.error);

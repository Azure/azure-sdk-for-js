// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified managed compute deployment associated with the Cognitive Services account.
 *
 * @summary deletes the specified managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/DeleteManagedComputeDeployment.json
 */
async function deleteManagedComputeDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.managedComputeDeployments.delete(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-gpu",
  );
}

async function main(): Promise<void> {
  await deleteManagedComputeDeployment();
}

main().catch(console.error);

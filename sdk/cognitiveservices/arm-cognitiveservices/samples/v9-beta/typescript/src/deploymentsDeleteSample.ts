// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified deployment associated with the Cognitive Services account.
 *
 * @summary deletes the specified deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/DeleteDeployment.json
 */
async function deleteDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.deployments.delete("resourceGroupName", "accountName", "deploymentName");
}

async function main(): Promise<void> {
  await deleteDeployment();
}

main().catch(console.error);

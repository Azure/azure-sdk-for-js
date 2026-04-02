// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update specified deployments associated with the Cognitive Services account.
 *
 * @summary update specified deployments associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/UpdateDeployment.json
 */
async function updateDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.deployments.update(
    "resourceGroupName",
    "accountName",
    "deploymentName",
    { sku: { name: "Standard", capacity: 1 } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDeployment();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Arc deployment associated with the Cognitive Services account.
 *
 * @summary deletes the specified Arc deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-11-15-preview/DeleteArcDeployment.json
 */
async function deleteArcDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.arcDeployments.delete("resourceGroupName", "accountName", "phi-3-arc");
}

/**
 * This sample demonstrates how to deletes the specified Arc deployment associated with the Cognitive Services account.
 *
 * @summary deletes the specified Arc deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-11-15-preview/DeleteArcDeploymentWithForce.json
 */
async function deleteArcDeploymentWithForce(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.arcDeployments.delete("resourceGroupName", "accountName", "phi-3-arc", {
    force: true,
  });
}

async function main(): Promise<void> {
  await deleteArcDeployment();
  await deleteArcDeploymentWithForce();
}

main().catch(console.error);

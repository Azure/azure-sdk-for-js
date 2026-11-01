// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an adapter deployment by name.
 *
 * @summary gets an adapter deployment by name.
 * x-ms-original-file: 2026-09-15-preview/GetAdapterDeployment.json
 */
async function getAdapterDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.adapterDeployments.get(
    "resourceGroupName",
    "accountName",
    "adapterDeploymentName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAdapterDeployment();
}

main().catch(console.error);

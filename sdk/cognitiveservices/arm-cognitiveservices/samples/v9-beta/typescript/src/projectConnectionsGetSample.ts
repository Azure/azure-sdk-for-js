// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Cognitive Services project connection by name.
 *
 * @summary lists Cognitive Services project connection by name.
 * x-ms-original-file: 2026-01-15-preview/ProjectConnection/get.json
 */
async function getProjectConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projectConnections.get(
    "resourceGroup-1",
    "account-1",
    "project-1",
    "connection-1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getProjectConnection();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the available Cognitive Services project connections under the specified project.
 *
 * @summary lists all the available Cognitive Services project connections under the specified project.
 * x-ms-original-file: 2026-01-15-preview/ProjectConnection/list.json
 */
async function listProjectConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projectConnections.list(
    "resourceGroup-1",
    "account-1",
    "project-1",
    { target: "[target url]", category: "ContainerRegistry" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listProjectConnection();
}

main().catch(console.error);

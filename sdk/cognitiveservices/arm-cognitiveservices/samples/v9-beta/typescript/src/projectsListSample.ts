// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns all the projects in a Cognitive Services account.
 *
 * @summary returns all the projects in a Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/ListProjects.json
 */
async function listProject(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.list("myResourceGroup", "myAccount")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listProject();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the workbenches associated with the project.
 *
 * @summary gets the workbenches associated with the project.
 * x-ms-original-file: 2026-05-15-preview/ListWorkbenches.json
 */
async function listWorkbenches(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workbenches.list(
    "rgcognitiveservices",
    "myAccount",
    "myProject",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkbenches();
}

main().catch(console.error);

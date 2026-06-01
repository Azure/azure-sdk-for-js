// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the computes associated with the Cognitive Services account.
 *
 * @summary gets the computes associated with the Cognitive Services account.
 * x-ms-original-file: 2026-03-15-preview/ListComputes.json
 */
async function listComputes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.computes.list("rgcognitiveservices", "myAccount")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listComputes();
}

main().catch(console.error);

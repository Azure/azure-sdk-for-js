// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Location Based ModelCapacities.
 *
 * @summary list Location Based ModelCapacities.
 * x-ms-original-file: 2026-03-01/ListLocationBasedModelCapacities.json
 */
async function listLocationBasedModelCapacities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.locationBasedModelCapacities.list(
    "WestUS",
    "OpenAI",
    "ada",
    "1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listLocationBasedModelCapacities();
}

main().catch(console.error);

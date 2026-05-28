// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the blocklist items associated with the custom blocklist.
 *
 * @summary gets the blocklist items associated with the custom blocklist.
 * x-ms-original-file: 2026-01-15-preview/ListBlocklistItems.json
 */
async function listBlocklistItems(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiBlocklistItems.list(
    "resourceGroupName",
    "accountName",
    "raiBlocklistName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBlocklistItems();
}

main().catch(console.error);

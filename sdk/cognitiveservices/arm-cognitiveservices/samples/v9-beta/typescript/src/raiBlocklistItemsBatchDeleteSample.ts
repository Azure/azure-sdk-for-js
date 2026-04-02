// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to batch operation to delete blocklist items.
 *
 * @summary batch operation to delete blocklist items.
 * x-ms-original-file: 2026-01-15-preview/DeleteRaiBlocklistItems.json
 */
async function deleteRaiBlocklistItems(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiBlocklistItems.batchDelete(
    "resourceGroupName",
    "accountName",
    "raiBlocklistName",
    ["myblocklistitem1", "myblocklistitem2"],
  );
}

async function main(): Promise<void> {
  await deleteRaiBlocklistItems();
}

main().catch(console.error);

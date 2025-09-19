// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RaiBlocklistItemBulkRequest,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Batch operation to add blocklist items.
 *
 * @summary Batch operation to add blocklist items.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/AddRaiBlocklistItems.json
 */
async function addRaiBlocklistItems(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiBlocklistName = "myblocklist";
  const raiBlocklistItems: RaiBlocklistItemBulkRequest[] = [
    {
      name: "myblocklistitem1",
      properties: { isRegex: true, pattern: "^[a-z0-9_-]{2,16}$" },
    },
    {
      name: "myblocklistitem2",
      properties: { isRegex: false, pattern: "blockwords" },
    },
  ];
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.raiBlocklistItems.batchAdd(
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklistItems,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await addRaiBlocklistItems();
}

main().catch(console.error);

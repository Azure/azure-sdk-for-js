// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified custom blocklist Item associated with the custom blocklist.
 *
 * @summary Gets the specified custom blocklist Item associated with the custom blocklist.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetRaiBlocklistItem.json
 */
async function getRaiBlocklistItem(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiBlocklistName = "raiBlocklistName";
  const raiBlocklistItemName = "raiBlocklistItemName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.raiBlocklistItems.get(
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklistItemName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRaiBlocklistItem();
}

main().catch(console.error);

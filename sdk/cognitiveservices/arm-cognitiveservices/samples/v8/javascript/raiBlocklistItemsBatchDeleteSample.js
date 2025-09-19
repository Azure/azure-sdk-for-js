// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Batch operation to delete blocklist items.
 *
 * @summary Batch operation to delete blocklist items.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/DeleteRaiBlocklistItems.json
 */
async function deleteRaiBlocklistItems() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiBlocklistName = "raiBlocklistName";
  const raiBlocklistItemsNames = ["myblocklistitem1", "myblocklistitem2"];
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBlocklistItems.batchDelete(
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklistItemsNames,
  );
  console.log(result);
}

async function main() {
  await deleteRaiBlocklistItems();
}

main().catch(console.error);

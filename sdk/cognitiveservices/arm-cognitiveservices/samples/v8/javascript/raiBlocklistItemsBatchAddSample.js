// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Batch operation to add blocklist items.
 *
 * @summary Batch operation to add blocklist items.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/AddRaiBlocklistItems.json
 */
async function addRaiBlocklistItems() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiBlocklistName = "myblocklist";
  const raiBlocklistItems = [
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
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBlocklistItems.batchAdd(
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklistItems,
  );
  console.log(result);
}

async function main() {
  await addRaiBlocklistItems();
}

main().catch(console.error);

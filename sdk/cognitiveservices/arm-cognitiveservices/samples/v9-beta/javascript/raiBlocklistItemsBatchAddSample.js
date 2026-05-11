// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to batch operation to add blocklist items.
 *
 * @summary batch operation to add blocklist items.
 * x-ms-original-file: 2026-01-15-preview/AddRaiBlocklistItems.json
 */
async function addRaiBlocklistItems() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBlocklistItems.batchAdd(
    "resourceGroupName",
    "accountName",
    "myblocklist",
    [
      { name: "myblocklistitem1", properties: { isRegex: true, pattern: "^[a-z0-9_-]{2,16}$" } },
      { name: "myblocklistitem2", properties: { isRegex: false, pattern: "blockwords" } },
    ],
  );
  console.log(result);
}

async function main() {
  await addRaiBlocklistItems();
}

main().catch(console.error);

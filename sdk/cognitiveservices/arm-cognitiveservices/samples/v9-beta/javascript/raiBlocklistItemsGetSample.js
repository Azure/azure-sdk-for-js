// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified custom blocklist Item associated with the custom blocklist.
 *
 * @summary gets the specified custom blocklist Item associated with the custom blocklist.
 * x-ms-original-file: 2026-01-15-preview/GetRaiBlocklistItem.json
 */
async function getRaiBlocklistItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBlocklistItems.get(
    "resourceGroupName",
    "accountName",
    "raiBlocklistName",
    "raiBlocklistItemName",
  );
  console.log(result);
}

async function main() {
  await getRaiBlocklistItem();
}

main().catch(console.error);

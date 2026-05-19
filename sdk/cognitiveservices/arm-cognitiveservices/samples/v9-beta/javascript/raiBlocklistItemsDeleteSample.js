// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified blocklist Item associated with the custom blocklist.
 *
 * @summary deletes the specified blocklist Item associated with the custom blocklist.
 * x-ms-original-file: 2026-01-15-preview/DeleteRaiBlocklistItem.json
 */
async function deleteRaiBlocklistItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiBlocklistItems.delete(
    "resourceGroupName",
    "accountName",
    "raiBlocklistName",
    "raiBlocklistItemName",
  );
}

async function main() {
  await deleteRaiBlocklistItem();
}

main().catch(console.error);

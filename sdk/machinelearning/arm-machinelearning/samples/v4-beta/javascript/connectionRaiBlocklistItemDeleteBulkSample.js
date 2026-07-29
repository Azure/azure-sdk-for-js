// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete multiple blocklist items from the specified blocklist associated with the Azure OpenAI connection.
 *
 * @summary delete multiple blocklist items from the specified blocklist associated with the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/RaiBlocklistItem/deleteBulk.json
 */
async function deleteBulkRaiBlocklistItems() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.connectionRaiBlocklistItem.deleteBulk(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
    "raiBlocklistName",
    ["myblocklistitem1", "myblocklistitem2"],
  );
}

async function main() {
  await deleteBulkRaiBlocklistItems();
}

main().catch(console.error);

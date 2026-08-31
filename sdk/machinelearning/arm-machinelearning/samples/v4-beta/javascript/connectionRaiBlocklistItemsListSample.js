// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the custom blocklist items associated with the Azure OpenAI connection.
 *
 * @summary gets the custom blocklist items associated with the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/RaiBlocklistItem/list.json
 */
async function listRaiBlocklistItems() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectionRaiBlocklistItems.list(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
    "raiBlocklistName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRaiBlocklistItems();
}

main().catch(console.error);

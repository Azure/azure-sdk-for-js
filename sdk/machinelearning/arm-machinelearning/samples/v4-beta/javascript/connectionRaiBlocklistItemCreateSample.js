// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified blocklist item associated with the Azure OpenAI connection.
 *
 * @summary update the state of specified blocklist item associated with the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/RaiBlocklistItem/create.json
 */
async function createRaiBlocklistItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.connectionRaiBlocklistItem.create(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
    "raiBlocklistName",
    "raiBlocklistItemName",
    { properties: { isRegex: false, pattern: "Pattern To Block" } },
  );
  console.log(result);
}

async function main() {
  await createRaiBlocklistItem();
}

main().catch(console.error);

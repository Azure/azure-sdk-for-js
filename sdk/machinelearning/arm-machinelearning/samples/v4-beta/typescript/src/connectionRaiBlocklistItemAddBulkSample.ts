// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add multiple blocklist items to the specified blocklist associated with the Azure OpenAI connection.
 *
 * @summary add multiple blocklist items to the specified blocklist associated with the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/RaiBlocklistItem/addBulk.json
 */
async function createBulkRaiBlocklistItems(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.connectionRaiBlocklistItem.addBulk(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
    "raiBlocklistName",
    [
      { name: "myblocklistitem1", properties: { isRegex: true, pattern: "^[a-z0-9_-]{2,16}$" } },
      { name: "myblocklistitem2", properties: { isRegex: false, pattern: "blockwords" } },
    ],
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createBulkRaiBlocklistItems();
}

main().catch(console.error);

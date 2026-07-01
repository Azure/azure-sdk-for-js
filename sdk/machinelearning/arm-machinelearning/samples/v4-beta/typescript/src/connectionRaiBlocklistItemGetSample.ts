// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified custom blocklist item associated with the Azure OpenAI connection.
 *
 * @summary gets the specified custom blocklist item associated with the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/RaiBlocklistItem/get.json
 */
async function getRaiRaiBlocklistItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.connectionRaiBlocklistItem.get(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
    "raiBlocklistName",
    "raiBlocklistItemName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRaiRaiBlocklistItem();
}

main().catch(console.error);

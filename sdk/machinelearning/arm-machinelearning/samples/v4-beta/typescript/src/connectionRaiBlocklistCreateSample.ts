// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified blocklist associated with the Azure OpenAI connection.
 *
 * @summary update the state of specified blocklist associated with the Azure OpenAI connection.
 * x-ms-original-file: 2026-03-15-preview/WorkspaceConnection/RaiBlocklist/create.json
 */
async function createRaiBlocklist(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.connectionRaiBlocklist.create(
    "test-rg",
    "aml-workspace-name",
    "testConnection",
    "raiBlocklistName",
    { properties: { description: "Basic blocklist description" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createRaiBlocklist();
}

main().catch(console.error);

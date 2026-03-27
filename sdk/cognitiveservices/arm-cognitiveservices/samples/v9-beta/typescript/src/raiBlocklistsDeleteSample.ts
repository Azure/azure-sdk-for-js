// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified custom blocklist associated with the Azure OpenAI account.
 *
 * @summary deletes the specified custom blocklist associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/DeleteRaiBlocklist.json
 */
async function deleteRaiBlocklist(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiBlocklists.delete("resourceGroupName", "accountName", "raiBlocklistName");
}

async function main(): Promise<void> {
  await deleteRaiBlocklist();
}

main().catch(console.error);

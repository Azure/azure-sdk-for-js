// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified blocklist item associated with the Azure OpenAI account.
 *
 * @summary update the state of specified blocklist item associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/PutRaiBlocklistItem.json
 */
async function putRaiBlocklistItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBlocklistItems.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "raiBlocklistName",
    "raiBlocklistItemName",
    { properties: { isRegex: false, pattern: "Pattern To Block" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putRaiBlocklistItem();
}

main().catch(console.error);

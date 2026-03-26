// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified blocklist associated with the Azure OpenAI account.
 *
 * @summary update the state of specified blocklist associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/PutRaiBlocklist.json
 */
async function putRaiBlocklist(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBlocklists.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "raiBlocklistName",
    { properties: { description: "Basic blocklist description" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putRaiBlocklist();
}

main().catch(console.error);

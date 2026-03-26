// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the account keys for the specified Cognitive Services account.
 *
 * @summary lists the account keys for the specified Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/ListKeys.json
 */
async function listKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.listKeys("myResourceGroup", "myAccount");
  console.log(result);
}

async function main(): Promise<void> {
  await listKeys();
}

main().catch(console.error);

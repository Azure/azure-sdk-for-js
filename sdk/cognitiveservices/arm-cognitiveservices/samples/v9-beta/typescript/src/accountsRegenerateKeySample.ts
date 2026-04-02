// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates the specified account key for the specified Cognitive Services account.
 *
 * @summary regenerates the specified account key for the specified Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/RegenerateKey.json
 */
async function regenerateKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.regenerateKey("myResourceGroup", "myAccount", {
    keyName: "Key2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await regenerateKeys();
}

main().catch(console.error);

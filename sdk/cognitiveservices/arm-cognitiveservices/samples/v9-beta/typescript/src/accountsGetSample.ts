// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a Cognitive Services account specified by the parameters.
 *
 * @summary returns a Cognitive Services account specified by the parameters.
 * x-ms-original-file: 2026-01-15-preview/GetAccount.json
 */
async function getAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.get("myResourceGroup", "myAccount");
  console.log(result);
}

async function main(): Promise<void> {
  await getAccount();
}

main().catch(console.error);

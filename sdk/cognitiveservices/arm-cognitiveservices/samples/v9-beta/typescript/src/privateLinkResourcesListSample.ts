// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a Cognitive Services account.
 *
 * @summary gets the private link resources that need to be created for a Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/ListPrivateLinkResources.json
 */
async function listPrivateLinkResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.list("res6977", "sto2527");
  console.log(result);
}

async function main(): Promise<void> {
  await listPrivateLinkResources();
}

main().catch(console.error);

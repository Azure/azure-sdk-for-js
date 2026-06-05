// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the default rollout details.
 *
 * @summary gets the default rollout details.
 * x-ms-original-file: 2024-09-01/DefaultRollouts_Get.json
 */
async function defaultRolloutsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.defaultRollouts.get("Microsoft.Contoso", "2020week10");
  console.log(result);
}

async function main(): Promise<void> {
  await defaultRolloutsGet();
}

main().catch(console.error);

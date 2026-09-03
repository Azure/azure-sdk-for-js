// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the custom rollout details.
 *
 * @summary gets the custom rollout details.
 * x-ms-original-file: 2024-09-01/CustomRollouts_Get.json
 */
async function customRolloutsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.customRollouts.get("Microsoft.Contoso", "canaryTesting99");
  console.log(result);
}

async function main(): Promise<void> {
  await customRolloutsGet();
}

main().catch(console.error);

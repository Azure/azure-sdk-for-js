// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the custom rollout resource. Custom rollout must be in terminal state.
 *
 * @summary deletes the custom rollout resource. Custom rollout must be in terminal state.
 * x-ms-original-file: 2024-09-01/CustomRollouts_Delete.json
 */
async function providerReleasesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.customRollouts.delete("Microsoft.Contoso", "2020week10");
}

async function main(): Promise<void> {
  await providerReleasesDelete();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops or cancels the rollout, if in progress.
 *
 * @summary stops or cancels the rollout, if in progress.
 * x-ms-original-file: 2024-09-01/DefaultRollouts_Stop.json
 */
async function defaultRolloutsStop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.defaultRollouts.stop("Microsoft.Contoso", "2020week10");
}

async function main(): Promise<void> {
  await defaultRolloutsStop();
}

main().catch(console.error);

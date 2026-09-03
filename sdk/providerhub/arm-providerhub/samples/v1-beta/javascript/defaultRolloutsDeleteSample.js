// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the rollout resource. Rollout must be in terminal state.
 *
 * @summary deletes the rollout resource. Rollout must be in terminal state.
 * x-ms-original-file: 2024-09-01/DefaultRollouts_Delete.json
 */
async function defaultRolloutsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.defaultRollouts.delete("Microsoft.Contoso", "2020week10");
}

async function main() {
  await defaultRolloutsDelete();
}

main().catch(console.error);

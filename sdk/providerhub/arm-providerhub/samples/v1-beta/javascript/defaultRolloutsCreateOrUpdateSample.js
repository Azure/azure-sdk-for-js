// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the rollout details.
 *
 * @summary creates or updates the rollout details.
 * x-ms-original-file: 2024-09-01/DefaultRollouts_CreateOrUpdate.json
 */
async function defaultRolloutsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.defaultRollouts.createOrUpdate("Microsoft.Contoso", "2020week10", {
    properties: {
      specification: {
        canary: { skipRegions: ["eastus2euap"] },
        expeditedRollout: { enabled: true },
        restOfTheWorldGroupTwo: { waitDuration: "PT4H" },
      },
    },
  });
  console.log(result);
}

async function main() {
  await defaultRolloutsCreateOrUpdate();
}

main().catch(console.error);

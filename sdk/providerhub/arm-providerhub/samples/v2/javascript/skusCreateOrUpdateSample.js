// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the resource type skus in the given resource type.
 *
 * @summary creates or updates the resource type skus in the given resource type.
 * x-ms-original-file: 2025-10-01/Skus_CreateOrUpdate.json
 */
async function skusCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.skus.createOrUpdate(
    "Microsoft.Contoso",
    "testResourceType",
    "testSku",
    {
      properties: {
        skuSettings: [
          { name: "freeSku", tier: "Tier1", kind: "Standard" },
          { name: "premiumSku", tier: "Tier2", kind: "Premium", costs: [{ meterId: "xxx" }] },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await skusCreateOrUpdate();
}

main().catch(console.error);

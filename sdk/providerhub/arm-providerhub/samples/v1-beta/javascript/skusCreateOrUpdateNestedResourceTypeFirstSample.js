// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the resource type skus in the given resource type.
 *
 * @summary creates or updates the resource type skus in the given resource type.
 * x-ms-original-file: 2024-09-01/Skus_CreateOrUpdateNestedResourceTypeFirst.json
 */
async function skusCreateOrUpdateNestedResourceTypeFirst() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.skus.createOrUpdateNestedResourceTypeFirst(
    "Microsoft.Contoso",
    "testResourceType",
    "nestedResourceTypeFirst",
    "testSku",
    {
      properties: {
        skuSettings: [
          { name: "freeSku", kind: "Standard", tier: "Tier1" },
          { name: "premiumSku", costs: [{ meterId: "xxx" }], kind: "Premium", tier: "Tier2" },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await skusCreateOrUpdateNestedResourceTypeFirst();
}

main().catch(console.error);

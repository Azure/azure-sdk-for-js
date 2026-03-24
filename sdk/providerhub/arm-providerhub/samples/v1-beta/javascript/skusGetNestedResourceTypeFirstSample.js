// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the sku details for the given resource type and sku name.
 *
 * @summary gets the sku details for the given resource type and sku name.
 * x-ms-original-file: 2024-09-01/Skus_GetNestedResourceTypeFirst.json
 */
async function skusGetNestedResourceTypeFirst() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.skus.getNestedResourceTypeFirst(
    "Microsoft.Contoso",
    "testResourceType",
    "nestedResourceTypeFirst",
    "testSku",
  );
  console.log(result);
}

async function main() {
  await skusGetNestedResourceTypeFirst();
}

main().catch(console.error);

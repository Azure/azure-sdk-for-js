// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a resource type sku.
 *
 * @summary deletes a resource type sku.
 * x-ms-original-file: 2024-09-01/Skus_DeleteNestedResourceTypeThird.json
 */
async function skusDeleteNestedResourceTypeThird() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.skus.deleteNestedResourceTypeThird(
    "Microsoft.Contoso",
    "testResourceType",
    "nestedResourceTypeFirst",
    "nestedResourceTypeSecond",
    "nestedResourceTypeThird",
    "testSku",
  );
}

async function main() {
  await skusDeleteNestedResourceTypeThird();
}

main().catch(console.error);

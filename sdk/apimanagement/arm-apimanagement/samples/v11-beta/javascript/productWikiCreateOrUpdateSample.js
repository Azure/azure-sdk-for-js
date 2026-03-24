// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Wiki for a Product or updates an existing one.
 *
 * @summary creates a new Wiki for a Product or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateProductWiki.json
 */
async function apiManagementCreateProductWiki() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.productWiki.createOrUpdate(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    { documents: [{ documentationId: "docId1" }, { documentationId: "docId2" }] },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateProductWiki();
}

main().catch(console.error);

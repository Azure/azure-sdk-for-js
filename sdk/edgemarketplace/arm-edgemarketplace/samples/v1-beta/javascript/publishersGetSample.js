// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeMarketplaceClient } = require("@azure/arm-edgemarketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Publisher
 *
 * @summary get a Publisher
 * x-ms-original-file: 2025-10-01-preview/GetPublisher.json
 */
async function publishersGet() {
  const credential = new DefaultAzureCredential();
  const client = new EdgeMarketplaceClient(credential);
  const result = await client.publishers.get(
    "subscriptions/4bed37fd-19a1-4d31-8b44-40267555bec5/resourceGroups/edgemarketplace-rg/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/edgemarketplace-demo",
    "canonical",
  );
  console.log(result);
}

async function main() {
  await publishersGet();
}

main().catch(console.error);

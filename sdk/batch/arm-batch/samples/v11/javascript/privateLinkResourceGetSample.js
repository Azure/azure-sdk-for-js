// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified private link resource.
 *
 * @summary gets information about the specified private link resource.
 * x-ms-original-file: 2025-06-01/PrivateLinkResourceGet.json
 */
async function getPrivateLinkResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResource.get(
    "default-azurebatch-japaneast",
    "sampleacct",
    "batchAccount",
  );
  console.log(result);
}

async function main() {
  await getPrivateLinkResource();
}

main().catch(console.error);

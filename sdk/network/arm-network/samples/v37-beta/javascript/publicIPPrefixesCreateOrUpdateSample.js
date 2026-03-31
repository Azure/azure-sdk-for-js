// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP prefix.
 *
 * @summary creates or updates a static or dynamic public IP prefix.
 * x-ms-original-file: 2025-05-01/PublicIpPrefixCreateCustomizedValues.json
 */
async function createPublicIPPrefixAllocationMethod() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.createOrUpdate("rg1", "test-ipprefix", {
    location: "westus",
    prefixLength: 30,
    publicIPAddressVersion: "IPv4",
    sku: { name: "Standard", tier: "Regional" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP prefix.
 *
 * @summary creates or updates a static or dynamic public IP prefix.
 * x-ms-original-file: 2025-05-01/PublicIpPrefixCreateDefaults.json
 */
async function createPublicIPPrefixDefaults() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.createOrUpdate("rg1", "test-ipprefix", {
    location: "westus",
    prefixLength: 30,
    sku: { name: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a static or dynamic public IP prefix.
 *
 * @summary creates or updates a static or dynamic public IP prefix.
 * x-ms-original-file: 2025-05-01/PublicIpPrefixCreateDefaultsStandardV2Sku.json
 */
async function createPublicIPPrefixDefaultsWithStandardV2Sku() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.createOrUpdate("rg1", "test-ipprefix", {
    location: "westus",
    prefixLength: 30,
    sku: { name: "StandardV2" },
  });
  console.log(result);
}

async function main() {
  await createPublicIPPrefixAllocationMethod();
  await createPublicIPPrefixDefaults();
  await createPublicIPPrefixDefaultsWithStandardV2Sku();
}

main().catch(console.error);

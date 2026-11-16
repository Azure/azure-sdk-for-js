// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a PrivateLinkResource
 *
 * @summary get a PrivateLinkResource
 * x-ms-original-file: 2026-03-01/PrivateLinkResourceGet.json
 */
async function getPrivateLinkResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResourcesInterface.get("rg1", "tc1", "fe1");
  console.log(result);
}

async function main() {
  await getPrivateLinkResource();
}

main().catch(console.error);

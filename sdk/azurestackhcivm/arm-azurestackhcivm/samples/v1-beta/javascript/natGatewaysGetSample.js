// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get a natGateway.
 *
 * @summary the operation to get a natGateway.
 * x-ms-original-file: 2026-04-01-preview/NatGateways_Get.json
 */
async function getNatGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.natGateways.get("test-rg", "test-nat-gw");
  console.log(result);
}

async function main() {
  await getNatGateway();
}

main().catch(console.error);

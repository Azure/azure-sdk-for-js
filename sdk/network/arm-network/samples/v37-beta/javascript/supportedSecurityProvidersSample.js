// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gives the supported security providers for the virtual wan.
 *
 * @summary gives the supported security providers for the virtual wan.
 * x-ms-original-file: 2025-05-01/VirtualWanSupportedSecurityProviders.json
 */
async function supportedSecurityProviders() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.supportedSecurityProviders("rg1", "wan1");
  console.log(result);
}

async function main() {
  await supportedSecurityProviders();
}

main().catch(console.error);

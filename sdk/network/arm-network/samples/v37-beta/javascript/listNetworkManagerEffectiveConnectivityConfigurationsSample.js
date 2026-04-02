// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all effective connectivity configurations applied on a virtual network.
 *
 * @summary list all effective connectivity configurations applied on a virtual network.
 * x-ms-original-file: 2025-05-01/NetworkManagerEffectiveConnectivityConfigurationsList.json
 */
async function listEffectiveConnectivityConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.listNetworkManagerEffectiveConnectivityConfigurations(
    "myResourceGroup",
    "testVirtualNetwork",
    { skipToken: "FakeSkipTokenCode" },
  );
  console.log(result);
}

async function main() {
  await listEffectiveConnectivityConfiguration();
}

main().catch(console.error);

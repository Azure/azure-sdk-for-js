// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Tap configuration in the specified NetworkInterface.
 *
 * @summary creates or updates a Tap configuration in the specified NetworkInterface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceTapConfigurationCreate.json
 */
async function createNetworkInterfaceTapConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaceTapConfigurations.createOrUpdate(
    "testrg",
    "mynic",
    "tapconfiguration1",
    {
      virtualNetworkTap: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworkTaps/testvtap",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createNetworkInterfaceTapConfigurations();
}

main().catch(console.error);

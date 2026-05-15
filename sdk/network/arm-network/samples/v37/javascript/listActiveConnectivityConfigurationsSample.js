// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists active connectivity configurations in a network manager.
 *
 * @summary lists active connectivity configurations in a network manager.
 * x-ms-original-file: 2025-05-01/NetworkManagerActiveConnectivityConfigurationsList.json
 */
async function listActiveConnectivityConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.listActiveConnectivityConfigurations(
    "myResourceGroup",
    "testNetworkManager",
    { regions: ["westus"], skipToken: "fakeSkipTokenCode" },
  );
  console.log(result);
}

async function main() {
  await listActiveConnectivityConfigurations();
}

main().catch(console.error);

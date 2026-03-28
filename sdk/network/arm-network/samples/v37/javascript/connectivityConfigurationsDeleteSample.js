// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a network manager connectivity configuration, specified by the resource group, network manager name, and connectivity configuration name
 *
 * @summary deletes a network manager connectivity configuration, specified by the resource group, network manager name, and connectivity configuration name
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectivityConfigurationDelete.json
 */
async function connectivityConfigurationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.connectivityConfigurations.delete(
    "myResourceGroup",
    "testNetworkManager",
    "myTestConnectivityConfig",
    { force: false },
  );
}

async function main() {
  await connectivityConfigurationsDelete();
}

main().catch(console.error);

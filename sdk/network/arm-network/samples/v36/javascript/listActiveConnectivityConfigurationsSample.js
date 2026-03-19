// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists active connectivity configurations in a network manager.
 *
 * @summary Lists active connectivity configurations in a network manager.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerActiveConnectivityConfigurationsList.json
 */
async function listActiveConnectivityConfigurations() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "myResourceGroup";
  const networkManagerName = "testNetworkManager";
  const parameters = {
    regions: ["westus"],
    skipToken: "fakeSkipTokenCode",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.listActiveConnectivityConfigurations(
    resourceGroupName,
    networkManagerName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await listActiveConnectivityConfigurations();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves a network manager routing configuration.
 *
 * @summary retrieves a network manager routing configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingConfigurationGet.json
 */
async function getRoutingConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagerRoutingConfigurations.get(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
  );
  console.log(result);
}

async function main() {
  await getRoutingConfigurations();
}

main().catch(console.error);

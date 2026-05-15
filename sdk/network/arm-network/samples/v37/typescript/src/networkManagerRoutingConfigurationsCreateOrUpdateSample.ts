// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a network manager routing configuration.
 *
 * @summary creates or updates a network manager routing configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingConfigurationPut.json
 */
async function createNetworkManagerRoutingConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagerRoutingConfigurations.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
    { description: "A sample policy", routeTableUsageMode: "ManagedOnly" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkManagerRoutingConfiguration();
}

main().catch(console.error);

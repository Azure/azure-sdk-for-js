// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a network manager routing configuration.
 *
 * @summary deletes a network manager routing configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingConfigurationDelete.json
 */
async function deleteNetworkManagerRoutingConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkManagerRoutingConfigurations.delete(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
  );
}

async function main(): Promise<void> {
  await deleteNetworkManagerRoutingConfiguration();
}

main().catch(console.error);

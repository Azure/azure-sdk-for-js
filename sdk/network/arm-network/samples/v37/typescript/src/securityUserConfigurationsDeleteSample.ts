// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a network manager security user configuration.
 *
 * @summary deletes a network manager security user configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserConfigurationDelete.json
 */
async function deleteNetworkManagerSecurityUserConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.securityUserConfigurations.delete(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    { force: false },
  );
}

async function main(): Promise<void> {
  await deleteNetworkManagerSecurityUserConfiguration();
}

main().catch(console.error);

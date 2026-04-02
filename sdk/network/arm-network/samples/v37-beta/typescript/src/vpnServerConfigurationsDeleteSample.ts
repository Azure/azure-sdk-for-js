// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a VpnServerConfiguration.
 *
 * @summary deletes a VpnServerConfiguration.
 * x-ms-original-file: 2025-05-01/VpnServerConfigurationDelete.json
 */
async function vpnServerConfigurationDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.vpnServerConfigurations.delete("rg1", "vpnServerConfiguration1");
}

async function main(): Promise<void> {
  await vpnServerConfigurationDelete();
}

main().catch(console.error);

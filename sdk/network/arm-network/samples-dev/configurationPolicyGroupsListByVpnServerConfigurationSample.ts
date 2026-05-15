// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration.
 *
 * @summary lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration.
 * x-ms-original-file: 2025-05-01/ConfigurationPolicyGroupListByVpnServerConfiguration.json
 */
async function configurationPolicyGroupListByVpnServerConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationPolicyGroups.listByVpnServerConfiguration(
    "rg1",
    "vpnServerConfiguration1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await configurationPolicyGroupListByVpnServerConfiguration();
}

main().catch(console.error);

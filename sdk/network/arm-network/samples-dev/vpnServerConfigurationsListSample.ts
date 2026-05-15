// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the VpnServerConfigurations in a subscription.
 *
 * @summary lists all the VpnServerConfigurations in a subscription.
 * x-ms-original-file: 2025-05-01/VpnServerConfigurationList.json
 */
async function vpnServerConfigurationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnServerConfigurations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await vpnServerConfigurationList();
}

main().catch(console.error);

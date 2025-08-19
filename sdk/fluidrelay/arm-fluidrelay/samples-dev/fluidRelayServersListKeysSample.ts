// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FluidRelayManagementClient } from "@azure/arm-fluidrelay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get primary and secondary key for this server.
 *
 * @summary Get primary and secondary key for this server.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_ListKeys.json
 */
async function getKeysForAFluidRelayServer(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const resourceGroup = "myResourceGroup";
  const fluidRelayServerName = "myFluidRelayServer";
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const result = await client.fluidRelayServers.listKeys(resourceGroup, fluidRelayServerName);
  console.log(result);
}

async function main(): Promise<void> {
  await getKeysForAFluidRelayServer();
}

main().catch(console.error);

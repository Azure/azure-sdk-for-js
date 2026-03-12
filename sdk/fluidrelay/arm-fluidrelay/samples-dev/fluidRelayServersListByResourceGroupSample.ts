// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all Fluid Relay servers in a resource group.
 *
 * @summary List all Fluid Relay servers in a resource group.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_ListByResourceGroup.json
 */

import { FluidRelayManagementClient } from "@azure/arm-fluidrelay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllFluidRelayServersInAResourceGroup(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const resourceGroup = "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fluidRelayServers.listByResourceGroup(resourceGroup)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllFluidRelayServersInAResourceGroup();
}

main().catch(console.error);

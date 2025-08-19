// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all Fluid Relay servers in a subscription.
 *
 * @summary List all Fluid Relay servers in a subscription.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_ListBySubscription.json
 */

import { FluidRelayManagementClient } from "@azure/arm-fluidrelay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllFluidRelayServersInASubscription(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fluidRelayServers.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllFluidRelayServersInASubscription();
}

main().catch(console.error);

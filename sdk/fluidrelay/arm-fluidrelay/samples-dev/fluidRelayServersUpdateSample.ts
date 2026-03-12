// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a Fluid Relay server.
 *
 * @summary Update a Fluid Relay server.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_Update.json
 */

import type { FluidRelayServerUpdate } from "@azure/arm-fluidrelay";
import { FluidRelayManagementClient } from "@azure/arm-fluidrelay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAFluidRelayServer(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const resourceGroup = "myResourceGroup";
  const fluidRelayServerName = "myFluidRelayServer";
  const resource: FluidRelayServerUpdate = { tags: { category: "sales" } };
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const result = await client.fluidRelayServers.update(
    resourceGroup,
    fluidRelayServerName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAFluidRelayServer();
}

main().catch(console.error);

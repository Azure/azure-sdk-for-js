// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a Fluid Relay container.
 *
 * @summary Delete a Fluid Relay container.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayContainers_Delete.json
 */

import { FluidRelayManagementClient } from "@azure/arm-fluidrelay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAFluidRelayContainer(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const resourceGroup = "myResourceGroup";
  const fluidRelayServerName = "myFluidRelayServer";
  const fluidRelayContainerName = "myFluidRelayContainer";
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const result = await client.fluidRelayContainers.delete(
    resourceGroup,
    fluidRelayServerName,
    fluidRelayContainerName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAFluidRelayContainer();
}

main().catch(console.error);

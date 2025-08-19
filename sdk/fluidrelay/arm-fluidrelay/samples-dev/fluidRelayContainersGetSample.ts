// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a Fluid Relay container.
 *
 * @summary Get a Fluid Relay container.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayContainers_Get.json
 */

import { FluidRelayManagementClient } from "@azure/arm-fluidrelay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getFluidRelayContainerDetails(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const resourceGroup = "myResourceGroup";
  const fluidRelayServerName = "myFluidRelayServer";
  const fluidRelayContainerName = "myFluidRelayContainer";
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const result = await client.fluidRelayContainers.get(
    resourceGroup,
    fluidRelayServerName,
    fluidRelayContainerName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFluidRelayContainerDetails();
}

main().catch(console.error);

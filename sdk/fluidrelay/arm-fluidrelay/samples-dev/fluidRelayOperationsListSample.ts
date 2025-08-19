// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FluidRelayManagementClient } from "@azure/arm-fluidrelay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all operations provided by Microsoft.FluidRelay.
 *
 * @summary List all operations provided by Microsoft.FluidRelay.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServerOperations.json
 */
async function listFluidRelayServerOperations(): Promise<void> {
  const subscriptionId =
    process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fluidRelayOperations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listFluidRelayServerOperations();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to run looking glass functionality
 *
 * @summary run looking glass functionality
 * x-ms-original-file: 2025-05-01/LookingGlassInvokeCommand.json
 */
async function callLookingGlassToExecuteACommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.lookingGlass.invoke(
    "Traceroute",
    "AzureRegion",
    "West US",
    "0.0.0.0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await callLookingGlassToExecuteACommand();
}

main().catch(console.error);

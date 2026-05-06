// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restart the provided bare metal machine.
 *
 * @summary restart the provided bare metal machine.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Restart.json
 */
async function restartBareMetalMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bareMetalMachines.restart(
    "resourceGroupName",
    "bareMetalMachineName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await restartBareMetalMachine();
}

main().catch(console.error);

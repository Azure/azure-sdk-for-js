// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the provided bare metal machine. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @summary delete the provided bare metal machine. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Delete.json
 */
async function deleteBareMetalMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bareMetalMachines.delete("resourceGroupName", "bareMetalMachineName");
  console.log(result);
}

async function main(): Promise<void> {
  await deleteBareMetalMachine();
}

main().catch(console.error);

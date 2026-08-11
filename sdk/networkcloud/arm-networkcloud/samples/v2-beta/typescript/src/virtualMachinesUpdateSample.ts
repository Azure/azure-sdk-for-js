// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch the properties of the provided virtual machine, or update the tags associated with the virtual machine. Properties and tag updates can be done independently.
 *
 * @summary patch the properties of the provided virtual machine, or update the tags associated with the virtual machine. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/VirtualMachines_Patch.json
 */
async function patchVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.virtualMachines.update("resourceGroupName", "virtualMachineName", {
    virtualMachineUpdateParameters: {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1":
            {},
        },
      },
      vmImageRepositoryCredentials: {
        password: "{password}",
        registryUrl: "myacr.azurecr.io",
        username: "myuser",
      },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchVirtualMachine();
}

main().catch(console.error);

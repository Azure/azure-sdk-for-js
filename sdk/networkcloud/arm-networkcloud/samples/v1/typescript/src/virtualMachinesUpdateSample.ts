// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualMachinePatchParameters,
  VirtualMachinesUpdateOptionalParams} from "@azure/arm-networkcloud";
import {
  NetworkCloud,
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patch the properties of the provided virtual machine, or update the tags associated with the virtual machine. Properties and tag updates can be done independently.
 *
 * @summary Patch the properties of the provided virtual machine, or update the tags associated with the virtual machine. Properties and tag updates can be done independently.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-09-01/examples/VirtualMachines_Patch.json
 */
async function patchVirtualMachine(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const virtualMachineName = "virtualMachineName";
  const virtualMachineUpdateParameters: VirtualMachinePatchParameters = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/123e4567E89b12d3A456426655440000/resourceGroups/resourceGroupName/providers/MicrosoftManagedIdentity/userAssignedIdentities/userIdentity1":
          {},
      },
    },
    tags: { key1: "myvalue1", key2: "myvalue2" },
    vmImageRepositoryCredentials: {
      password: "{password}",
      registryUrl: "myacr.azurecr.io",
      username: "myuser",
    },
  };
  const options: VirtualMachinesUpdateOptionalParams = {
    virtualMachineUpdateParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.virtualMachines.beginUpdateAndWait(
    resourceGroupName,
    virtualMachineName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchVirtualMachine();
}

main().catch(console.error);

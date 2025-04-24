// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a StandbyVirtualMachinePoolResource
 *
 * @summary create a StandbyVirtualMachinePoolResource
 * x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_CreateOrUpdate.json
 */
async function standbyVirtualMachinePoolsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyVirtualMachinePools.createOrUpdate("rgstandbypool", "pool", {
    properties: {
      elasticityProfile: { maxReadyCapacity: 304, minReadyCapacity: 300 },
      virtualMachineState: "Running",
      attachedVirtualMachineScaleSetId:
        "/subscriptions/00000000-0000-0000-0000-000000000009/resourceGroups/rgstandbypool/providers/Microsoft.Compute/virtualMachineScaleSets/myVmss",
    },
    tags: {},
    location: "West US",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await standbyVirtualMachinePoolsCreateOrUpdate();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a checkpoint in virtual machine instance.
 *
 * @summary Deletes a checkpoint in virtual machine instance.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineInstances_DeleteCheckpoint_MaximumSet_Gen.json
 */

import type { VirtualMachineDeleteCheckpoint } from "@azure/arm-scvmm";
import { ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualMachineInstancesDeleteCheckpointMaximumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const body: VirtualMachineDeleteCheckpoint = {
    id: "eenfflimcbgqfsebdusophahjpk",
  };
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.virtualMachineInstances.beginDeleteCheckpointAndWait(
    resourceUri,
    body,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deletes a checkpoint in virtual machine instance.
 *
 * @summary Deletes a checkpoint in virtual machine instance.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineInstances_DeleteCheckpoint_MinimumSet_Gen.json
 */
async function virtualMachineInstancesDeleteCheckpointMinimumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const body: VirtualMachineDeleteCheckpoint = {};
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.virtualMachineInstances.beginDeleteCheckpointAndWait(
    resourceUri,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineInstancesDeleteCheckpointMaximumSet();
  await virtualMachineInstancesDeleteCheckpointMinimumSet();
}

main().catch(console.error);

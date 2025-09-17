// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Restores to a checkpoint in virtual machine instance.
 *
 * @summary Restores to a checkpoint in virtual machine instance.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineInstances_RestoreCheckpoint_MaximumSet_Gen.json
 */

import type { VirtualMachineRestoreCheckpoint } from "@azure/arm-scvmm";
import { ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualMachineInstancesRestoreCheckpointMaximumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const body: VirtualMachineRestoreCheckpoint = { id: "rweqduwzsn" };
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.virtualMachineInstances.beginRestoreCheckpointAndWait(
    resourceUri,
    body,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Restores to a checkpoint in virtual machine instance.
 *
 * @summary Restores to a checkpoint in virtual machine instance.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineInstances_RestoreCheckpoint_MinimumSet_Gen.json
 */
async function virtualMachineInstancesRestoreCheckpointMinimumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const body: VirtualMachineRestoreCheckpoint = {};
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.virtualMachineInstances.beginRestoreCheckpointAndWait(
    resourceUri,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineInstancesRestoreCheckpointMaximumSet();
  await virtualMachineInstancesRestoreCheckpointMinimumSet();
}

main().catch(console.error);

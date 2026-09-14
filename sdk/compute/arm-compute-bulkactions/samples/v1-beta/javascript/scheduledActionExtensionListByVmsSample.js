// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists scheduled actions associated with the specified VM.
 *
 * @summary lists scheduled actions associated with the specified VM.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActionExtension_ListByVms_MaximumSet_Gen.json
 */
async function listScheduledActionsForAComputeResource() {
  const credential = new DefaultAzureCredential();
  const client = new ComputeClient(credential);
  const resArray = new Array();
  for await (const item of client.scheduledActionExtension.listByVms(
    "subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVm",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listScheduledActionsForAComputeResource();
}

main().catch(console.error);

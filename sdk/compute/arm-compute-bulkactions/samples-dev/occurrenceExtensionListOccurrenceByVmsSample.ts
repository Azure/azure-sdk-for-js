// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists recurring bulk action occurrences associated with the specified VM.
 *
 * @summary lists recurring bulk action occurrences associated with the specified VM.
 * x-ms-original-file: 2026-10-06-preview/OccurrenceExtension_ListOccurrenceByVms_BasicSuccess.json
 */
async function listRecurringBulkActionOccurrencesForAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ComputeClient(credential);
  const resArray = new Array();
  for await (const item of client.occurrenceExtension.listOccurrenceByVms(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRecurringBulkActionOccurrencesForAVirtualMachine();
}

main().catch(console.error);

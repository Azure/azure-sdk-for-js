// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list OccurrenceExtensionResource resources by parent
 *
 * @summary list OccurrenceExtensionResource resources by parent
 * x-ms-original-file: 2026-07-06-preview/OccurrenceExtension_ListOccurrenceByVms_MaximumSet_Gen.json
 */
async function occurrenceExtensionListOccurrenceByVmsMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ComputeClient(credential);
  const resArray = new Array();
  for await (const item of client.occurrenceExtension.listOccurrenceByVms(
    "subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVm",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await occurrenceExtensionListOccurrenceByVmsMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);

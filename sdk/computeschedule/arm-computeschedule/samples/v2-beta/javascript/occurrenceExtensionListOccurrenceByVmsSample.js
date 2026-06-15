// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list OccurrenceExtensionResource resources by parent
 *
 * @summary list OccurrenceExtensionResource resources by parent
 * x-ms-original-file: 2026-04-15-preview/OccurrenceExtension_ListOccurrenceByVms_MaximumSet_Gen.json
 */
async function occurrenceExtensionListOccurrenceByVmsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new ComputeScheduleClient(credential);
  const resArray = new Array();
  for await (const item of client.occurrenceExtension.listOccurrenceByVms(
    "subscriptions/732116BD-AF31-4E74-9283-B387C44B4A44/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/myVm",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list OccurrenceExtensionResource resources by parent
 *
 * @summary list OccurrenceExtensionResource resources by parent
 * x-ms-original-file: 2026-04-15-preview/OccurrenceExtension_ListOccurrenceByVms_MinimumSet_Gen.json
 */
async function occurrenceExtensionListOccurrenceByVmsMinimumSet() {
  const credential = new DefaultAzureCredential();
  const client = new ComputeScheduleClient(credential);
  const resArray = new Array();
  for await (const item of client.occurrenceExtension.listOccurrenceByVms(
    "subscriptions/732116BD-AF31-4E74-9283-B387C44B4A44/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/myVm",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await occurrenceExtensionListOccurrenceByVmsMaximumSet();
  await occurrenceExtensionListOccurrenceByVmsMinimumSet();
}

main().catch(console.error);

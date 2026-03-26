// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list OccurrenceExtensionResource resources by parent
 *
 * @summary list OccurrenceExtensionResource resources by parent
 * x-ms-original-file: 2026-03-01-preview/OccurrenceExtension_ListOccurrenceByVms_MaximumSet_Gen.json
 */
async function occurrenceExtensionListOccurrenceByVmsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new ComputeScheduleClient(credential);
  const resArray = new Array();
  for await (const item of client.occurrenceExtension.listOccurrenceByVms("rgdhjh")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await occurrenceExtensionListOccurrenceByVmsMaximumSet();
}

main().catch(console.error);

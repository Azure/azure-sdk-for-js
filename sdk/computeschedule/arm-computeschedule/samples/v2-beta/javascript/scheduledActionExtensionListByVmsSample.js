// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ScheduledActionResources resources by parent
 *
 * @summary list ScheduledActionResources resources by parent
 * x-ms-original-file: 2026-03-01-preview/ScheduledActionExtension_ListByVms_MaximumSet_Gen.json
 */
async function scheduledActionExtensionListByVmsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new ComputeScheduleClient(credential);
  const resArray = new Array();
  for await (const item of client.scheduledActionExtension.listByVms("rgdhjh")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await scheduledActionExtensionListByVmsMaximumSet();
}

main().catch(console.error);

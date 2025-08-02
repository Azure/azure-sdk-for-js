// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ScheduledActionResources resources by parent
 *
 * @summary list ScheduledActionResources resources by parent
 * x-ms-original-file: 2025-04-15-preview/ScheduledActionExtension_ListByVms_MaximumSet_Gen.json
 */
async function scheduledActionExtensionListByVmsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActionExtension.listByVms("sazvpabfud")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list ScheduledActionResources resources by parent
 *
 * @summary list ScheduledActionResources resources by parent
 * x-ms-original-file: 2025-04-15-preview/ScheduledActionExtension_ListByVms_MinimumSet_Gen.json
 */
async function scheduledActionExtensionListByVmsMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActionExtension.listByVms("sazvpabfud")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await scheduledActionExtensionListByVmsMaximumSet();
  await scheduledActionExtensionListByVmsMinimumSet();
}

main().catch(console.error);

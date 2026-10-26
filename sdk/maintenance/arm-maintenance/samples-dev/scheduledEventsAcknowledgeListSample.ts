// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post List of ScheduledEvents Acknowledgement
 *
 * @summary post List of ScheduledEvents Acknowledgement
 * x-ms-original-file: 2025-10-01-preview/ScheduledEvents_AcknowledgeList.json
 */
async function postScheduledEventsListAcknowledgement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.scheduledEvents.acknowledgeList(
    "resource-group1",
    "resource-type1",
    "resource-name1",
    { value: ["00000000-0000-0000-0000-000000000000", "11111111-1111-1111-1111-111111111111"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await postScheduledEventsListAcknowledgement();
}

main().catch(console.error);

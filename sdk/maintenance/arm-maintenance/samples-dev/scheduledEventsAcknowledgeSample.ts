// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post ScheduledEvents Acknowledgement
 *
 * @summary post ScheduledEvents Acknowledgement
 * x-ms-original-file: 2023-10-01-preview/ScheduledEvents_Acknowledge.json
 */
async function postScheduledEventsAcknowledgement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.scheduledEvents.acknowledge(
    "resource-group1",
    "resource-type1",
    "resource-name1",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await postScheduledEventsAcknowledgement();
}

main().catch(console.error);

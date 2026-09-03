// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post Scheduled Event Acknowledgement
 *
 * @summary post Scheduled Event Acknowledgement
 * x-ms-original-file: 2023-10-01-preview/ScheduledEvents_Acknowledge.json
 */
async function scheduledEventsAcknowledge(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.scheduledEvent.acknowledge(
    "examplerg",
    "virtualMachines",
    "configuration1",
    "ad6d85cf-2c9e-4eec-9a1e-af3213cc0486",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledEventsAcknowledge();
}

main().catch(console.error);

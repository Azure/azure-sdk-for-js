// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a monitor and stops sending Azure logs to its configured Confluent
 * topic.
 *
 * @summary deletes a monitor and stops sending Azure logs to its configured Confluent
 * topic.
 * x-ms-original-file: 2026-10-21-preview/MonitorResources_Delete_MaximumSet_Gen.json
 */
async function monitorResourcesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.monitorResources.delete("rgconfluent", "myOrganization", "productionLogs");
}

async function main(): Promise<void> {
  await monitorResourcesDeleteMaximumSet();
}

main().catch(console.error);

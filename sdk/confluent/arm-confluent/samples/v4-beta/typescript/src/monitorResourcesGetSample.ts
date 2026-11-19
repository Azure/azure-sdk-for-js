// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a monitor and its configured Confluent log destination.
 *
 * @summary gets a monitor and its configured Confluent log destination.
 * x-ms-original-file: 2026-10-21-preview/MonitorResources_Get_MaximumSet_Gen.json
 */
async function monitorResourcesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.monitorResources.get(
    "rgconfluent",
    "myOrganization",
    "productionLogs",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorResourcesGetMaximumSet();
}

main().catch(console.error);

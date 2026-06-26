// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DrillResource
 *
 * @summary get a DrillResource
 * x-ms-original-file: 2026-04-01-preview/DrillResources_Get_MaximumSet_Gen.json
 */
async function drillResourcesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.drillResources.get(
    "sampleServiceGroupName",
    "drill1",
    "b6378181-9dc0-4a43-8e09-97a8b08aabaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await drillResourcesGetMaximumSet();
}

main().catch(console.error);

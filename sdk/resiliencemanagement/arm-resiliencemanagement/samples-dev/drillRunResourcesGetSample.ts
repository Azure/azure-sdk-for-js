// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DrillRunResource
 *
 * @summary get a DrillRunResource
 * x-ms-original-file: 2026-04-01-preview/DrillRunResources_Get_MaximumSet_Gen.json
 */
async function drillRunResourcesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.drillRunResources.get(
    "sampleServiceGroupName",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
    "56f942da-a30e-43c0-b5f0-1c22e44f2d94",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await drillRunResourcesGetMaximumSet();
}

main().catch(console.error);

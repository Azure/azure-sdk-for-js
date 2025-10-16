// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a WorkloadResource
 *
 * @summary create a WorkloadResource
 * x-ms-original-file: 2025-05-01-preview/Workload_CreateOrUpdate.json
 */
async function workloadCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.workload.createOrUpdate(
    "rgopenapi",
    "TestMyEnclave",
    "TestMyWorkload",
    {
      properties: { resourceGroupCollection: [] },
      tags: { TestKey: "TestValue" },
      location: "westcentralus",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workloadCreateOrUpdate();
}

main().catch(console.error);

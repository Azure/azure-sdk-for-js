// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a WorkloadResource
 *
 * @summary update a WorkloadResource
 * x-ms-original-file: 2025-05-01-preview/Workload_Update.json
 */
async function workloadUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.workload.update("rgopenapi", "TestMyEnclave", "TestMyWorkload", {
    tags: { key9465: "cylmdprdhhwpcdxpynwostvzytkryj" },
    properties: { resourceGroupCollection: ["g"] },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workloadUpdate();
}

main().catch(console.error);

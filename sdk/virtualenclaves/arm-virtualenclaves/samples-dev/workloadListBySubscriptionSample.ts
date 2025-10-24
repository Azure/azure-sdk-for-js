// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list WorkloadResource resources by subscription ID
 *
 * @summary list WorkloadResource resources by subscription ID
 * x-ms-original-file: 2025-05-01-preview/Workload_ListBySubscription.json
 */
async function workloadListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workload.listBySubscription("TestMyEnclave")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workloadListBySubscription();
}

main().catch(console.error);

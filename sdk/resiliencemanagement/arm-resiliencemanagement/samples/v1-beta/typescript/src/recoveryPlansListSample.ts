// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list RecoveryPlan resources by tenant
 *
 * @summary list RecoveryPlan resources by tenant
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlans_List_MaximumSet_Gen.json
 */
async function recoveryPlansListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recoveryPlans.list("sampleServiceGroupName", {
    skipToken: "jfpmvvhtt",
    top: 44,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await recoveryPlansListMaximumSet();
}

main().catch(console.error);

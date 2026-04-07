// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all instance pool usage metrics
 *
 * @summary gets all instance pool usage metrics
 * x-ms-original-file: 2025-02-01-preview/ListInstancePoolUsage.json
 */
async function listInstancePoolUsages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByInstancePool("group1", "testIP")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all instance pool usage metrics
 *
 * @summary gets all instance pool usage metrics
 * x-ms-original-file: 2025-02-01-preview/ListInstancePoolUsageExpanded.json
 */
async function listInstancePoolUsagesExpandedWithChildren(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByInstancePool("group1", "testIP", {
    expandChildren: true,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listInstancePoolUsages();
  await listInstancePoolUsagesExpandedWithChildren();
}

main().catch(console.error);

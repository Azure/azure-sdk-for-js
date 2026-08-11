// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list GoalTemplate resources by tenant
 *
 * @summary list GoalTemplate resources by tenant
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_List_MaximumSet_Gen.json
 */
async function goalTemplatesListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.goalTemplates.list("vmmacokmkuxzy", {
    skipToken: "xntbyoswztnmvitj",
    top: 69,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list GoalTemplate resources by tenant
 *
 * @summary list GoalTemplate resources by tenant
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_List_MinimumSet_Gen.json
 */
async function goalTemplatesListMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.goalTemplates.list("sg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await goalTemplatesListMaximumSet();
  await goalTemplatesListMinimumSet();
}

main().catch(console.error);

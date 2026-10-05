// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists goal assignments in a service group.
 *
 * @summary lists goal assignments in a service group.
 * x-ms-original-file: 2026-10-31-preview/GoalAssignments_List_MaximumSet_Gen.json
 */
async function goalAssignmentsListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.goalAssignments.list("zldmpkvqzifygkqau", {
    skipToken: "xntbyoswztnmvitj",
    top: 69,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists goal assignments in a service group.
 *
 * @summary lists goal assignments in a service group.
 * x-ms-original-file: 2026-10-31-preview/GoalAssignments_List_MinimumSet_Gen.json
 */
async function goalAssignmentsListMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.goalAssignments.list("sg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await goalAssignmentsListMaximumSet();
  await goalAssignmentsListMinimumSet();
}

main().catch(console.error);

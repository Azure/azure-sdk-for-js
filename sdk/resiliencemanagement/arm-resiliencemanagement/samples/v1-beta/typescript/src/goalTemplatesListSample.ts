// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the goal templates of a service group. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead.
 *
 * @summary lists the goal templates of a service group. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead.
 * x-ms-original-file: 2026-08-31-preview/GoalTemplates_List_MaximumSet_Gen.json
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
 * This sample demonstrates how to lists the goal templates of a service group. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead.
 *
 * @summary lists the goal templates of a service group. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead.
 * x-ms-original-file: 2026-08-31-preview/GoalTemplates_List_MinimumSet_Gen.json
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

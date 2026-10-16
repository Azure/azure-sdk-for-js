// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Validation test execution plan runs for an execution plan
 *
 * @summary list Validation test execution plan runs for an execution plan
 * x-ms-original-file: 2026-08-01-preview/ExecutionPlanRuns_ListByExecutionPlan_MaximumSet_Gen.json
 */
async function executionPlanRunsListByExecutionPlanMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.executionPlanRuns.listByExecutionPlan(
    "rgvalidate",
    "cvtest01",
    "contoso-linux-cert",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await executionPlanRunsListByExecutionPlanMaximumSet();
}

main().catch(console.error);

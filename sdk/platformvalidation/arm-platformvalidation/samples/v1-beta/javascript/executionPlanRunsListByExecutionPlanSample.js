// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Validation test execution plan runs for an execution plan
 *
 * @summary list Validation test execution plan runs for an execution plan
 * x-ms-original-file: 2026-08-01-preview/ExecutionPlanRuns_ListByExecutionPlan_MaximumSet_Gen.json
 */
async function executionPlanRunsListByExecutionPlanMaximumSet() {
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

async function main() {
  await executionPlanRunsListByExecutionPlanMaximumSet();
}

main().catch(console.error);

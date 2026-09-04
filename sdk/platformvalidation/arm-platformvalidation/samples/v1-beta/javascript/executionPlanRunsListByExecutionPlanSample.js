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
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.executionPlanRuns.listByExecutionPlan(
    "rgvalidate",
    "cvtest01",
    "veptest01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await executionPlanRunsListByExecutionPlanMaximumSet();
}

main().catch(console.error);

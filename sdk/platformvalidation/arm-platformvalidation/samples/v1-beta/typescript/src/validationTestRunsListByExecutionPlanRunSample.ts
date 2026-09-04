// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list validation test runs for an execution plan run
 *
 * @summary list validation test runs for an execution plan run
 * x-ms-original-file: 2026-08-01-preview/ValidationTestRuns_ListByExecutionPlanRun_MaximumSet_Gen.json
 */
async function validationTestRunsListByExecutionPlanRunMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validationTestRuns.listByExecutionPlanRun(
    "rgvalidate",
    "cvtest01",
    "veptest01",
    "veprun01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await validationTestRunsListByExecutionPlanRunMaximumSet();
}

main().catch(console.error);

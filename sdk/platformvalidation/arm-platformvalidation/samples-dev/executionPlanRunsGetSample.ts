// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Validation test execution plan run details
 *
 * @summary get a Validation test execution plan run details
 * x-ms-original-file: 2026-08-01-preview/ExecutionPlanRuns_Get_MaximumSet_Gen.json
 */
async function executionPlanRunsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.executionPlanRuns.get(
    "rgvalidate",
    "cvtest01",
    "veptest01",
    "veprun01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executionPlanRunsGetMaximumSet();
}

main().catch(console.error);

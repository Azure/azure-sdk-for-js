// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a validation test execution plan
 *
 * @summary create or update a validation test execution plan
 * x-ms-original-file: 2026-08-01-preview/ExecutionPlanRuns_CreateOrUpdate_MaximumSet_Gen.json
 */
async function executionPlanRunsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.executionPlanRuns.createOrUpdate(
    "rgvalidate",
    "cvtest01",
    "veptest01",
    "veprun01",
    { properties: { description: "zwakqazgtploz" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executionPlanRunsCreateOrUpdateMaximumSet();
}

main().catch(console.error);

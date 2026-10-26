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
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.executionPlanRuns.createOrUpdate(
    "rgvalidate",
    "cvtest01",
    "contoso-linux-cert",
    "run-001",
    { properties: { description: "Run the Contoso Linux image certification plan." } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executionPlanRunsCreateOrUpdateMaximumSet();
}

main().catch(console.error);

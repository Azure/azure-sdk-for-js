// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Validation test execution plan run details
 *
 * @summary get a Validation test execution plan run details
 * x-ms-original-file: 2026-08-01-preview/ExecutionPlanRuns_Get_MaximumSet_Gen.json
 */
async function executionPlanRunsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.executionPlanRuns.get(
    "rgvalidate",
    "cvtest01",
    "contoso-linux-cert",
    "run-001",
  );
  console.log(result);
}

async function main() {
  await executionPlanRunsGetMaximumSet();
}

main().catch(console.error);

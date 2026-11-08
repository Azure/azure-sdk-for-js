// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a validation test run details
 *
 * @summary get a validation test run details
 * x-ms-original-file: 2026-08-01-preview/ValidationTestRuns_Get_MaximumSet_Gen.json
 */
async function validationTestRunsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationTestRuns.get(
    "rgvalidate",
    "cvtest01",
    "contoso-linux-cert",
    "run-001",
    "linux-quality-run",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validationTestRunsGetMaximumSet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a validation test run
 *
 * @summary delete a validation test run
 * x-ms-original-file: 2026-07-01-preview/ValidationTestRuns_Delete_MaximumSet_Gen.json
 */
async function validationTestRunsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  await client.validationTestRuns.delete(
    "rgvalidate",
    "cvtest01",
    "veptest01",
    "veprun01",
    "vtrun01",
  );
}

async function main(): Promise<void> {
  await validationTestRunsDeleteMaximumSet();
}

main().catch(console.error);

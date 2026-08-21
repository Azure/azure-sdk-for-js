// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a validation test execution plan
 *
 * @summary get a validation test execution plan
 * x-ms-original-file: 2026-07-01-preview/ValidationExecutionPlans_Get_MaximumSet_Gen.json
 */
async function validationExecutionPlansGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationExecutionPlans.get("rgvalidate", "cvtest01", "veptest01");
  console.log(result);
}

async function main(): Promise<void> {
  await validationExecutionPlansGetMaximumSet();
}

main().catch(console.error);

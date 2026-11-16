// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a validation test execution plan
 *
 * @summary get a validation test execution plan
 * x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_Get_MaximumSet_Gen.json
 */
async function validationExecutionPlansGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationExecutionPlans.get(
    "rgvalidate",
    "cvtest01",
    "contoso-linux-cert",
  );
  console.log(result);
}

async function main() {
  await validationExecutionPlansGetMaximumSet();
}

main().catch(console.error);

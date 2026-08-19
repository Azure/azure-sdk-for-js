// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a validation test execution plan
 *
 * @summary delete a validation test execution plan
 * x-ms-original-file: 2026-07-01-preview/ValidationExecutionPlans_Delete_MaximumSet_Gen.json
 */
async function validationExecutionPlansDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  await client.validationExecutionPlans.delete("rgvalidate", "cvtest01", "veptest01");
}

async function main() {
  await validationExecutionPlansDeleteMaximumSet();
}

main().catch(console.error);

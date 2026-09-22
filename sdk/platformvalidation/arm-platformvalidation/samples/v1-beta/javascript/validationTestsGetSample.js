// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a validation test catalog entry
 *
 * @summary get a validation test catalog entry
 * x-ms-original-file: 2026-08-01-preview/ValidationTests_Get_MaximumSet_Gen.json
 */
async function validationTestsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationTests.get("linux-quality-validation");
  console.log(result);
}

async function main() {
  await validationTestsGetMaximumSet();
}

main().catch(console.error);

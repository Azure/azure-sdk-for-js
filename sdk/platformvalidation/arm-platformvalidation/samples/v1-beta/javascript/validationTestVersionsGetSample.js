// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a validation test version catalog entry
 *
 * @summary get a validation test version catalog entry
 * x-ms-original-file: 2026-08-01-preview/ValidationTestVersions_Get_MaximumSet_Gen.json
 */
async function validationTestVersionsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationTestVersions.get("linux-quality-validation", "1.0.0");
  console.log(result);
}

async function main() {
  await validationTestVersionsGetMaximumSet();
}

main().catch(console.error);

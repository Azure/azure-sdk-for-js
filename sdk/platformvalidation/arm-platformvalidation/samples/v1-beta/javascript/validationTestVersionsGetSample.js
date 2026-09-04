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
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationTestVersions.get("test1", "1.0.0");
  console.log(result);
}

async function main() {
  await validationTestVersionsGetMaximumSet();
}

main().catch(console.error);

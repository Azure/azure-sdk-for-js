// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a cloud validation
 *
 * @summary get a cloud validation
 * x-ms-original-file: 2026-08-01-preview/CloudValidations_Get_MaximumSet_Gen.json
 */
async function cloudValidationsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.cloudValidations.get("rgvalidate", "cvtest01");
  console.log(result);
}

async function main() {
  await cloudValidationsGetMaximumSet();
}

main().catch(console.error);

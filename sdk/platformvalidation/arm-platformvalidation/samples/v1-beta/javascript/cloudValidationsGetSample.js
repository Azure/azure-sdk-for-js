// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a cloud validation
 *
 * @summary get a cloud validation
 * x-ms-original-file: 2026-07-01-preview/CloudValidations_Get_MaximumSet_Gen.json
 */
async function cloudValidationsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.cloudValidations.get("rgvalidate", "cvtest01");
  console.log(result);
}

async function main() {
  await cloudValidationsGetMaximumSet();
}

main().catch(console.error);

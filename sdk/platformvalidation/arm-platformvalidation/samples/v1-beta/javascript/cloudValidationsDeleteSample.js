// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a cloud validation
 *
 * @summary delete a cloud validation
 * x-ms-original-file: 2026-08-01-preview/CloudValidations_Delete_MaximumSet_Gen.json
 */
async function cloudValidationsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  await client.cloudValidations.delete("rgvalidate", "cvtest01");
}

async function main() {
  await cloudValidationsDeleteMaximumSet();
}

main().catch(console.error);

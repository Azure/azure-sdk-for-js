// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a cloud validation
 *
 * @summary update a cloud validation
 * x-ms-original-file: 2026-08-01-preview/CloudValidations_Update_MaximumSet_Gen.json
 */
async function cloudValidationsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.cloudValidations.update("rgvalidate", "cvtest01", {
    properties: { description: "ezutdlxrzaemjqpqpandwfixfkfk", overallState: "Enabled" },
    tags: { key3330: "hklihtouujxhnfrm" },
  });
  console.log(result);
}

async function main() {
  await cloudValidationsUpdateMaximumSet();
}

main().catch(console.error);

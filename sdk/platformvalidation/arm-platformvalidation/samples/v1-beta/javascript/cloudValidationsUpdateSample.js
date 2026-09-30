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
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.cloudValidations.update("rgvalidate", "cvtest01", {
    properties: {
      description:
        "Cloud validation that groups platform validation execution plans for the target subscription.",
    },
    tags: { "cost-center": "platform-validation" },
  });
  console.log(result);
}

async function main() {
  await cloudValidationsUpdateMaximumSet();
}

main().catch(console.error);

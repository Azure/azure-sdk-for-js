// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a cloud validation
 *
 * @summary create or update a cloud validation
 * x-ms-original-file: 2026-08-01-preview/CloudValidations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function cloudValidationsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.cloudValidations.createOrUpdate("rgvalidate", "cvtest01", {
    properties: {
      description:
        "Cloud validation that groups platform validation execution plans for the target subscription.",
    },
    tags: { environment: "production" },
    location: "southcentralus",
  });
  console.log(result);
}

async function main() {
  await cloudValidationsCreateOrUpdateMaximumSet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a validation test run
 *
 * @summary create or update a validation test run
 * x-ms-original-file: 2026-07-01-preview/ValidationTestRuns_CreateOrUpdate_MaximumSet_Gen.json
 */
async function validationTestRunsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationTestRuns.createOrUpdate(
    "rgvalidate",
    "cvtest01",
    "veptest01",
    "veprun01",
    "vtrun01",
    {
      properties: {
        testId: "validation-test-001",
        testCategoryIds: ["cat-network", "cat-security"],
        inputsJson: '{"region":"eastus","sku":"standard"}',
      },
    },
  );
  console.log(result);
}

async function main() {
  await validationTestRunsCreateOrUpdateMaximumSet();
}

main().catch(console.error);

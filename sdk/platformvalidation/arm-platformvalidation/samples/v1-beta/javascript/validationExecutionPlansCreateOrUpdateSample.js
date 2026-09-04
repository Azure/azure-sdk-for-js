// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a validation test execution plan
 *
 * @summary create or update a validation test execution plan
 * x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_CreateOrUpdate_MaximumSet_Gen.json
 */
async function validationExecutionPlansCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationExecutionPlans.createOrUpdate(
    "rgvalidate",
    "cvtest01",
    "veptest01",
    {
      properties: {
        description: "ortzzlmaoxmwtcjkjkvuxx",
        planConfigurationUri: "xsouolufo",
        planConfigurationJson: "vmqqmcdpvhgu",
        overallState: "Enabled",
      },
      tags: { key3482: "px" },
      location: "cqqovjagjsndikbdlpltbtxisptjh",
    },
  );
  console.log(result);
}

async function main() {
  await validationExecutionPlansCreateOrUpdateMaximumSet();
}

main().catch(console.error);

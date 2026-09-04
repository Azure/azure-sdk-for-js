// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a validation test execution plan
 *
 * @summary update a validation test execution plan
 * x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_Update_MaximumSet_Gen.json
 */
async function validationExecutionPlansUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationExecutionPlans.update(
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
      tags: { key145: "grepfloxy" },
    },
  );
  console.log(result);
}

async function main() {
  await validationExecutionPlansUpdateMaximumSet();
}

main().catch(console.error);

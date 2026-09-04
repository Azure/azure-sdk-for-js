// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list validation test execution plans by resource group
 *
 * @summary list validation test execution plans by resource group
 * x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_ListByResourceGroup_MaximumSet_Gen.json
 */
async function validationExecutionPlansListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validationExecutionPlans.listByResourceGroup(
    "rgvalidate",
    "cvtest01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await validationExecutionPlansListByResourceGroupMaximumSet();
}

main().catch(console.error);

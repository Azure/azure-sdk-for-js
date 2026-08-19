// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list validation test version catalog entries
 *
 * @summary list validation test version catalog entries
 * x-ms-original-file: 2026-07-01-preview/ValidationTestVersions_List_MaximumSet_Gen.json
 */
async function validationTestVersionsListMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validationTestVersions.list("test1", {
    filter: "yolfvidccdfa",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await validationTestVersionsListMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);

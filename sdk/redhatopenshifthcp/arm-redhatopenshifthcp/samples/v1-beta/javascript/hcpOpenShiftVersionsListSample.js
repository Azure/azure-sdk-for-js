// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list HcpOpenShiftVersion resources by SubscriptionLocationResource
 *
 * @summary list HcpOpenShiftVersion resources by SubscriptionLocationResource
 * x-ms-original-file: 2026-09-01-preview/HcpOpenShiftVersions_List_MaximumSet_Gen.json
 */
async function hcpOpenShiftVersionsListMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hcpOpenShiftVersions.list("uksouth")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await hcpOpenShiftVersionsListMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);

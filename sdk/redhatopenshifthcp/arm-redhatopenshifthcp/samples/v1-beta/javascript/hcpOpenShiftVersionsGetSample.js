// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a HcpOpenShiftVersion
 *
 * @summary get a HcpOpenShiftVersion
 * x-ms-original-file: 2026-06-30-preview/HcpOpenShiftVersions_Get_MaximumSet_Gen.json
 */
async function hcpOpenShiftVersionsGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.hcpOpenShiftVersions.get("uksouth", "4.18.1");
  console.log(result);
}

async function main() {
  await hcpOpenShiftVersionsGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);

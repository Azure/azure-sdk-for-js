// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a HcpOperatorIdentityRoleSet
 *
 * @summary get a HcpOperatorIdentityRoleSet
 * x-ms-original-file: 2026-09-01-preview/HcpOperatorIdentityRoleSets_Get_MaximumSet_Gen.json
 */
async function hcpOperatorIdentityRoleSetsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.hcpOperatorIdentityRoleSets.get("uksouth", "hcp-example-role-set");
  console.log(result);
}

async function main() {
  await hcpOperatorIdentityRoleSetsGetMaximumSet();
}

main().catch(console.error);

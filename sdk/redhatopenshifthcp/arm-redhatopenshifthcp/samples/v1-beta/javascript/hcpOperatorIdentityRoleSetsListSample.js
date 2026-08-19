// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list HcpOperatorIdentityRoleSet resources by SubscriptionLocationResource
 *
 * @summary list HcpOperatorIdentityRoleSet resources by SubscriptionLocationResource
 * x-ms-original-file: 2026-06-30-preview/HcpOperatorIdentityRoleSets_List_MaximumSet_Gen.json
 */
async function hcpOperatorIdentityRoleSetsListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hcpOperatorIdentityRoleSets.list("uksouth")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await hcpOperatorIdentityRoleSetsListMaximumSet();
}

main().catch(console.error);

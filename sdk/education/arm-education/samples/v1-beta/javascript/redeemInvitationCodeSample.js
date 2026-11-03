// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to redeem invite code to join a redeemable lab
 *
 * @summary redeem invite code to join a redeemable lab
 * x-ms-original-file: 2021-12-01-preview/RedeemCode.json
 */
async function redeemCode() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  await client.redeemInvitationCode({
    firstName: "test",
    lastName: "user",
    redeemCode: "exampleRedeemCode",
  });
}

async function main() {
  await redeemCode();
}

main().catch(console.error);

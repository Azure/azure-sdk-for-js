// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to redeem invite code to join a redeemable lab
 *
 * @summary redeem invite code to join a redeemable lab
 * x-ms-original-file: 2021-12-01-preview/RedeemCode.json
 */
async function redeemCode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  await client.redeemInvitationCode({
    firstName: "test",
    lastName: "user",
    redeemCode: "exampleRedeemCode",
  });
}

async function main(): Promise<void> {
  await redeemCode();
}

main().catch(console.error);

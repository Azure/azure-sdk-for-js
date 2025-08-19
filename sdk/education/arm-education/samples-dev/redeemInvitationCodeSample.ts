// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedeemRequest } from "@azure/arm-education";
import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Redeem invite code to join a redeemable lab
 *
 * @summary Redeem invite code to join a redeemable lab
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/RedeemCode.json
 */
async function redeemCode(): Promise<void> {
  const parameters: RedeemRequest = {
    firstName: "test",
    lastName: "user",
    redeemCode: "exampleRedeemCode",
  };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.redeemInvitationCode(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await redeemCode();
}

main().catch(console.error);

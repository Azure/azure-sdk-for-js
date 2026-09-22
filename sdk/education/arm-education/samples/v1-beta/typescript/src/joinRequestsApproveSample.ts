// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approve student joining the redeemable lab
 *
 * @summary approve student joining the redeemable lab
 * x-ms-original-file: 2021-12-01-preview/JoinRequestApproveAndDenyForApprove.json
 */
async function joinRequestApprove(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  await client.joinRequests.approve(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    "{joinRequestName}",
  );
}

async function main(): Promise<void> {
  await joinRequestApprove();
}

main().catch(console.error);

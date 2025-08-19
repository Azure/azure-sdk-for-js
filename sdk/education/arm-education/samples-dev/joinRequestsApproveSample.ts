// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Approve student joining the redeemable lab
 *
 * @summary Approve student joining the redeemable lab
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json
 */

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function joinRequestApprove(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const invoiceSectionName = "{invoiceSectionName}";
  const joinRequestName = "{joinRequestName}";
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.joinRequests.approve(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    joinRequestName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await joinRequestApprove();
}

main().catch(console.error);

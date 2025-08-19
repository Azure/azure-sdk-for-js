// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deny student joining the redeemable lab
 *
 * @summary Deny student joining the redeemable lab
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json
 */

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function joinRequestDeny(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const invoiceSectionName = "{invoiceSectionName}";
  const joinRequestName = "{joinRequestName}";
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.joinRequests.deny(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    joinRequestName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await joinRequestDeny();
}

main().catch(console.error);

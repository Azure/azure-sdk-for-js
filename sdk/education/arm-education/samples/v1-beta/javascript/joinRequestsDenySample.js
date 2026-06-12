// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deny student joining the redeemable lab
 *
 * @summary deny student joining the redeemable lab
 * x-ms-original-file: 2021-12-01-preview/JoinRequestApproveAndDeny.json
 */
async function joinRequestDeny() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  await client.joinRequests.deny(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    "{joinRequestName}",
  );
}

async function main() {
  await joinRequestDeny();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a billing request.
 *
 * @summary create or update a billing request.
 * x-ms-original-file: 2024-04-01/billingRequestsCreateOrUpdate.json
 */
async function billingRequestsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRequests.createOrUpdate(
    "00000000-0000-0000-0000-000000000000",
    {
      properties: {
        type: "RoleAssignment",
        additionalInformation: { RoleId: "40000000-aaaa-bbbb-cccc-200000000006" },
        decisionReason: "New team member",
        requestScope:
          "/providers/Microsoft.Billing/billingAccounts/00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31/billingProfiles/xxxx-xxxx-xxx-xxx",
        status: "Pending",
      },
    },
  );
  console.log(result);
}

async function main() {
  await billingRequestsCreateOrUpdate();
}

main().catch(console.error);

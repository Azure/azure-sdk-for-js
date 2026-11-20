// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the credit summary by billingAccountId and billingProfileId.
 *
 * @summary the credit summary by billingAccountId and billingProfileId.
 * x-ms-original-file: 2026-06-01/CreditSummaryByBillingProfile.json
 */
async function creditSummaryByBillingProfile() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.credits.get("1234:5678", "2468");
  console.log(result);
}

async function main() {
  await creditSummaryByBillingProfile();
}

main().catch(console.error);

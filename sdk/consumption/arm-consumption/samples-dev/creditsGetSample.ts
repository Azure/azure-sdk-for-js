// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the credit summary by billingAccountId and billingProfileId.
 *
 * @summary the credit summary by billingAccountId and billingProfileId.
 * x-ms-original-file: 2024-08-01/CreditSummaryByBillingProfile.json
 */
async function creditSummaryByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.credits.get("1234:5678", "2468");
  console.log(result);
}

async function main(): Promise<void> {
  await creditSummaryByBillingProfile();
}

main().catch(console.error);

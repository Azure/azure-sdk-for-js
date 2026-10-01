// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete MACC.
 *
 * @summary delete MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccDelete.json
 */
async function serviceSpecificIncentivesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  await client.maccs.delete("resource_group_name_01", "macc_20230614");
}

async function main(): Promise<void> {
  await serviceSpecificIncentivesDelete();
}

main().catch(console.error);

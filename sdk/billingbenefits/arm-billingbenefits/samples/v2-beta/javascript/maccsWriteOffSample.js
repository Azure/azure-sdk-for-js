// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to waive a customer's pending MACC balance (Shortfall) from their account, ensuring they are not charged for the outstanding amount.
 *
 * @summary operation to waive a customer's pending MACC balance (Shortfall) from their account, ensuring they are not charged for the outstanding amount.
 * x-ms-original-file: 2025-12-01-preview/MaccWithMilestonesWriteOff.json
 */
async function maccWithMilestonesWriteOff() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.writeOff("resource_group_name_01", "macc_20230614");
  console.log(result);
}

/**
 * This sample demonstrates how to operation to waive a customer's pending MACC balance (Shortfall) from their account, ensuring they are not charged for the outstanding amount.
 *
 * @summary operation to waive a customer's pending MACC balance (Shortfall) from their account, ensuring they are not charged for the outstanding amount.
 * x-ms-original-file: 2025-12-01-preview/MaccWriteOff.json
 */
async function maccWriteOff() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.writeOff("resource_group_name_01", "macc_20230614");
  console.log(result);
}

async function main() {
  await maccWithMilestonesWriteOff();
  await maccWriteOff();
}

main().catch(console.error);

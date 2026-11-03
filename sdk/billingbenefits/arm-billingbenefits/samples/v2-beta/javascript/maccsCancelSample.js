// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to represents an operation to cancel MACC contract. This operation does not indicate deletion of the MACC, but rather stops applying the benefit to the account.
 *
 * @summary represents an operation to cancel MACC contract. This operation does not indicate deletion of the MACC, but rather stops applying the benefit to the account.
 * x-ms-original-file: 2025-12-01-preview/MaccCancel.json
 */
async function maccCancel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.cancel("resource_group_name_01", "macc_20230614");
  console.log(result);
}

/**
 * This sample demonstrates how to represents an operation to cancel MACC contract. This operation does not indicate deletion of the MACC, but rather stops applying the benefit to the account.
 *
 * @summary represents an operation to cancel MACC contract. This operation does not indicate deletion of the MACC, but rather stops applying the benefit to the account.
 * x-ms-original-file: 2025-12-01-preview/MaccWithMilestonesCancel.json
 */
async function maccWithMilestonesCancel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.cancel("resource_group_name_01", "macc_20230614");
  console.log(result);
}

async function main() {
  await maccCancel();
  await maccWithMilestonesCancel();
}

main().catch(console.error);

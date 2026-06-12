// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list credit sources for a credit under a resource group from primary service admin.
 *
 * @summary list credit sources for a credit under a resource group from primary service admin.
 * x-ms-original-file: 2025-12-01-preview/CreditSourcesListByCredit.json
 */
async function creditSourcesListByCredit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sources.listByCredit(
    "resource_group_name_01",
    "credit_20231212",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await creditSourcesListByCredit();
}

main().catch(console.error);

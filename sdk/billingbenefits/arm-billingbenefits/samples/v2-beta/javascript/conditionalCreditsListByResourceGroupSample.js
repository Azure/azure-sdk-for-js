// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list conditional credits by resource group.
 *
 * @summary list conditional credits by resource group.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditsListByResourceGroup.json
 */
async function conditionalCreditsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.conditionalCredits.listByResourceGroup(
    "resource_group_name_01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await conditionalCreditsListByResourceGroup();
}

main().catch(console.error);

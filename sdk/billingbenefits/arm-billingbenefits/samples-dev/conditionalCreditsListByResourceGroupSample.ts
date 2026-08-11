// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list conditional credits by resource group.
 *
 * @summary list conditional credits by resource group.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditsListByResourceGroup.json
 */
async function conditionalCreditsListByResourceGroup(): Promise<void> {
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

async function main(): Promise<void> {
  await conditionalCreditsListByResourceGroup();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation lists free services that are available under the specified subscription.
 *
 * @summary this operation lists free services that are available under the specified subscription.
 * x-ms-original-file: 2025-12-01-preview/FreeServicesListBySubscription.json
 */
async function freeServicesListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.freeServices.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await freeServicesListBySubscription();
}

main().catch(console.error);

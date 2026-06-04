// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves properties for free services.
 *
 * @summary this operation retrieves properties for free services.
 * x-ms-original-file: 2025-12-01-preview/FreeServicesGet.json
 */
async function freeServicesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.freeServices.get("resource_group_name_01", "freeservice_20251001");
  console.log(result);
}

async function main(): Promise<void> {
  await freeServicesGet();
}

main().catch(console.error);

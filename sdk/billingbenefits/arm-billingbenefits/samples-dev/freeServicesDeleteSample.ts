// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation deletes free services from the subscription. Only free services that are in an expired or cancelled states can be deleted.
 *
 * @summary this operation deletes free services from the subscription. Only free services that are in an expired or cancelled states can be deleted.
 * x-ms-original-file: 2025-12-01-preview/FreeServicesDelete.json
 */
async function freeServicesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  await client.freeServices.delete("resource_group_name_01", "freeservice_20251001");
}

async function main(): Promise<void> {
  await freeServicesDelete();
}

main().catch(console.error);

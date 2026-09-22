// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation updates free services in Azure.
 *
 * @summary this operation updates free services in Azure.
 * x-ms-original-file: 2025-12-01-preview/FreeServicesUpdate.json
 */
async function freeServicesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.freeServices.update(
    "resource_group_name_01",
    "freeservice_20251001",
    { endAt: new Date("2026-12-01T00:00:00Z"), tags: { key1: "value1", key2: "value2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await freeServicesUpdate();
}

main().catch(console.error);

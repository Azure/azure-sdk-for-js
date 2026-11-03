// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates or updates free services in Azure
 *
 * @summary this operation creates or updates free services in Azure
 * x-ms-original-file: 2025-12-01-preview/FreeServicesCreate.json
 */
async function freeServicesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.freeServices.create(
    "resource_group_name_01",
    "freeservice_20251001",
    {
      location: "global",
      tags: { environment: "production" },
      productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
      startAt: new Date("2025-10-01T00:00:00Z"),
      endAt: new Date("2026-10-01T00:00:00Z"),
    },
  );
  console.log(result);
}

async function main() {
  await freeServicesCreate();
}

main().catch(console.error);

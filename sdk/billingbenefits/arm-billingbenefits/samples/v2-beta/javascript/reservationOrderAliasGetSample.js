// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a reservation order alias.
 *
 * @summary get a reservation order alias.
 * x-ms-original-file: 2025-12-01-preview/ReservationOrderAliasGet.json
 */
async function reservationOrderAliasGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.reservationOrderAlias.get("reservationOrderAlias123");
  console.log(result);
}

async function main() {
  await reservationOrderAliasGet();
}

main().catch(console.error);

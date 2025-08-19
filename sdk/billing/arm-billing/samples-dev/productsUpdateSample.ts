// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the properties of a Product. Currently, auto renew can be updated. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary Updates the properties of a Product. Currently, auto renew can be updated. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/productsUpdate.json
 */

import type { ProductPatch } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function productsUpdate(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const productName = "11111111-1111-1111-1111-111111111111";
  const parameters: ProductPatch = { properties: { autoRenew: "On" } };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.products.update(billingAccountName, productName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await productsUpdate();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get marketplace terms.
 *
 * @summary Get marketplace terms.
 * x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/GetMarketplaceTerms.json
 */

import { MarketplaceOrderingAgreements } from "@azure/arm-marketplaceordering";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getMarketplaceTerms(): Promise<void> {
  const subscriptionId = process.env["MARKETPLACEORDERING_SUBSCRIPTION_ID"] || "subid";
  const offerType = "virtualmachine";
  const publisherId = "pubid";
  const offerId = "offid";
  const planId = "planid";
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceOrderingAgreements(credential, subscriptionId);
  const result = await client.marketplaceAgreements.get(offerType, publisherId, offerId, planId);
  console.log(result);
}

async function main(): Promise<void> {
  await getMarketplaceTerms();
}

main().catch(console.error);

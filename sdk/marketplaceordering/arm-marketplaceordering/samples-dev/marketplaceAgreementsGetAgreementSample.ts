// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get marketplace agreement.
 *
 * @summary Get marketplace agreement.
 * x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/GetAgreementMarketplaceTerms.json
 */

import { MarketplaceOrderingAgreements } from "@azure/arm-marketplaceordering";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function setMarketplaceTerms(): Promise<void> {
  const subscriptionId = process.env["MARKETPLACEORDERING_SUBSCRIPTION_ID"] || "subid";
  const publisherId = "pubid";
  const offerId = "offid";
  const planId = "planid";
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceOrderingAgreements(credential, subscriptionId);
  const result = await client.marketplaceAgreements.getAgreement(publisherId, offerId, planId);
  console.log(result);
}

async function main(): Promise<void> {
  await setMarketplaceTerms();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Confluent marketplace agreements in the subscription.
 *
 * @summary list Confluent marketplace agreements in the subscription.
 * x-ms-original-file: 2025-08-18-preview/MarketplaceAgreements_List_MaximumSet_Gen.json
 */
async function listConfluentMarketplaceAgreementsInTheSubscriptionMaximumset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaceAgreements.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Confluent marketplace agreements in the subscription.
 *
 * @summary list Confluent marketplace agreements in the subscription.
 * x-ms-original-file: 2025-08-18-preview/MarketplaceAgreements_List_MinimumSet_Gen.json
 */
async function listConfluentMarketplaceAgreementsInTheSubscriptionMinimumset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaceAgreements.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConfluentMarketplaceAgreementsInTheSubscriptionMaximumset();
  await listConfluentMarketplaceAgreementsInTheSubscriptionMinimumset();
}

main().catch(console.error);

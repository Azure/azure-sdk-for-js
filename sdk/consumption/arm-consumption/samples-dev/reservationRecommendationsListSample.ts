// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of recommendations for purchasing reserved instances.
 *
 * @summary list of recommendations for purchasing reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationsByBillingAccount.json
 */
async function reservationRecommendationsByBillingAccountLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(
    "providers/Microsoft.Billing/billingAccounts/123456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of recommendations for purchasing reserved instances.
 *
 * @summary list of recommendations for purchasing reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationsByBillingAccountFilterByScope.json
 */
async function reservationRecommendationsByBillingAccountFilterForScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(
    "providers/Microsoft.Billing/billingAccounts/123456",
    { filter: "properties/scope eq 'Single'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of recommendations for purchasing reserved instances.
 *
 * @summary list of recommendations for purchasing reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationsByBillingProfile.json
 */
async function reservationRecommendationsByBillingProfileModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(
    "providers/Microsoft.Billing/billingAccounts/123456/billingProfiles/6420",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of recommendations for purchasing reserved instances.
 *
 * @summary list of recommendations for purchasing reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationsByResourceGroup.json
 */
async function reservationRecommendationsByResourceGroupLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of recommendations for purchasing reserved instances.
 *
 * @summary list of recommendations for purchasing reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationsBySubscription.json
 */
async function reservationRecommendationsBySubscriptionLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of recommendations for purchasing reserved instances.
 *
 * @summary list of recommendations for purchasing reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationsFilterBySubscriptionForScopeLookBackPeriod.json
 */
async function reservationRecommendationsFilterBySubscriptionForScopeLookBackPeriodLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { filter: "properties/scope eq 'Single' AND properties/lookBackPeriod eq 'Last7Days'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationRecommendationsByBillingAccountLegacy();
  await reservationRecommendationsByBillingAccountFilterForScope();
  await reservationRecommendationsByBillingProfileModern();
  await reservationRecommendationsByResourceGroupLegacy();
  await reservationRecommendationsBySubscriptionLegacy();
  await reservationRecommendationsFilterBySubscriptionForScopeLookBackPeriodLegacy();
}

main().catch(console.error);

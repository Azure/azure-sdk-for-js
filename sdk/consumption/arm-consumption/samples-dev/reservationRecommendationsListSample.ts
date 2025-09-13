// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List of recommendations for purchasing reserved instances.
 *
 * @summary List of recommendations for purchasing reserved instances.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationsByBillingAccount.json
 */

import type { ReservationRecommendationsListOptionalParams } from "@azure/arm-consumption";
import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reservationRecommendationsByBillingAccountLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/billingAccounts/123456";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List of recommendations for purchasing reserved instances.
 *
 * @summary List of recommendations for purchasing reserved instances.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationsByBillingProfile.json
 */
async function reservationRecommendationsByBillingProfileModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/billingAccounts/123456/billingProfiles/6420";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List of recommendations for purchasing reserved instances.
 *
 * @summary List of recommendations for purchasing reserved instances.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationsByResourceGroup.json
 */
async function reservationRecommendationsByResourceGroupLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testGroup";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List of recommendations for purchasing reserved instances.
 *
 * @summary List of recommendations for purchasing reserved instances.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationsBySubscription.json
 */
async function reservationRecommendationsBySubscriptionLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List of recommendations for purchasing reserved instances.
 *
 * @summary List of recommendations for purchasing reserved instances.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationsFilterBySubscriptionForScopeLookBackPeriod.json
 */
async function reservationRecommendationsFilterBySubscriptionForScopeLookBackPeriodLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const filter = "properties/scope eq 'Single' AND properties/lookBackPeriod eq 'Last7Days'";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const options: ReservationRecommendationsListOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reservationRecommendations.list(scope, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationRecommendationsByBillingAccountLegacy();
  await reservationRecommendationsByBillingProfileModern();
  await reservationRecommendationsByResourceGroupLegacy();
  await reservationRecommendationsBySubscriptionLegacy();
  await reservationRecommendationsFilterBySubscriptionForScopeLookBackPeriodLegacy();
}

main().catch(console.error);

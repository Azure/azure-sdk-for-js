// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary Details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationDetailsByBillingAccount.json
 */

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reservationRecommendationsByBillingAccountLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "Shared";
  const region = "eastus";
  const term = "P1Y";
  const lookBackPeriod = "Last60Days";
  const product = "Standard_DS14_v2";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.reservationRecommendationDetails.get(
    scope,
    region,
    term,
    lookBackPeriod,
    product,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary Details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationDetailsByBillingProfile.json
 */
async function reservationRecommendationsByBillingProfileModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "Shared";
  const region = "australiaeast";
  const term = "P1Y";
  const lookBackPeriod = "Last7Days";
  const product = "Standard_B2s";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.reservationRecommendationDetails.get(
    scope,
    region,
    term,
    lookBackPeriod,
    product,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary Details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationDetailsByResourceGroup.json
 */
async function reservationRecommendationsByResourceGroupLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "Single";
  const region = "westus";
  const term = "P3Y";
  const lookBackPeriod = "Last30Days";
  const product = "Standard_DS13_v2";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.reservationRecommendationDetails.get(
    scope,
    region,
    term,
    lookBackPeriod,
    product,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary Details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationRecommendationDetailsBySubscription.json
 */
async function reservationRecommendationsBySubscriptionLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "Single";
  const region = "westus";
  const term = "P3Y";
  const lookBackPeriod = "Last30Days";
  const product = "Standard_DS13_v2";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.reservationRecommendationDetails.get(
    scope,
    region,
    term,
    lookBackPeriod,
    product,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reservationRecommendationsByBillingAccountLegacy();
  await reservationRecommendationsByBillingProfileModern();
  await reservationRecommendationsByResourceGroupLegacy();
  await reservationRecommendationsBySubscriptionLegacy();
}

main().catch(console.error);

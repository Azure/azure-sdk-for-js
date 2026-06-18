// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationDetailsByBillingAccount.json
 */
async function reservationRecommendationsByBillingAccountLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.reservationRecommendationDetails.get(
    "providers/Microsoft.Billing/billingAccounts/00000000",
    "Shared",
    "eastus",
    "P1Y",
    "Last60Days",
    "Standard_DS14_v2",
    { filter: "properties/subscriptionId eq 00000000-0000-0000-0000-00000000" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationDetailsByBillingProfile.json
 */
async function reservationRecommendationsByBillingProfileModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.reservationRecommendationDetails.get(
    "providers/Microsoft.Billing/billingAccounts/00000000-0000-0000-0000-00000000:00000000-0000-0000-0000-00000000/billingProfiles/00000000-0000-0000-0000-00000000",
    "Shared",
    "australiaeast",
    "P1Y",
    "Last7Days",
    "Standard_B2s",
    { filter: "properties/subscriptionId eq 00000000-0000-0000-0000-00000000" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationDetailsByResourceGroup.json
 */
async function reservationRecommendationsByResourceGroupLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.reservationRecommendationDetails.get(
    "subscriptions/00000000-0000-0000-0000-00000000/resourceGroups/testGroup",
    "Single",
    "westus",
    "P3Y",
    "Last30Days",
    "Standard_DS13_v2",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: 2024-08-01/ReservationRecommendationDetailsBySubscription.json
 */
async function reservationRecommendationsBySubscriptionLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.reservationRecommendationDetails.get(
    "subscriptions/00000000-0000-0000-0000-00000000",
    "Single",
    "westus",
    "P3Y",
    "Last30Days",
    "Standard_DS13_v2",
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

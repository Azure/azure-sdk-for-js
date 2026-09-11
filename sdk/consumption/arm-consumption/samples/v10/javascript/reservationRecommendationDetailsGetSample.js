// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: 2026-06-01/ReservationRecommendationDetailsByBillingAccount.json
 */
async function reservationRecommendationsByBillingAccountLegacy() {
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
 * x-ms-original-file: 2026-06-01/ReservationRecommendationDetailsByBillingAccountForManagementGroup.json
 */
async function reservationRecommendationDetailsByBillingAccountForManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.reservationRecommendationDetails.get(
    "providers/Microsoft.Billing/billingAccounts/00000000",
    "ManagementGroup",
    "westus",
    "P3Y",
    "Last30Days",
    "Standard_DS13_v2",
    {
      managementGroupId:
        "/providers/Microsoft.Management/managementGroups/00000000-0000-0000-0000-000000000000",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: 2026-06-01/ReservationRecommendationDetailsByBillingProfile.json
 */
async function reservationRecommendationsByBillingProfileModern() {
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
 * x-ms-original-file: 2026-06-01/ReservationRecommendationDetailsByResourceGroup.json
 */
async function reservationRecommendationsByResourceGroupLegacy() {
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
 * x-ms-original-file: 2026-06-01/ReservationRecommendationDetailsBySubscription.json
 */
async function reservationRecommendationsBySubscriptionLegacy() {
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

/**
 * This sample demonstrates how to details of a reservation recommendation for what-if analysis of reserved instances.
 *
 * @summary details of a reservation recommendation for what-if analysis of reserved instances.
 * x-ms-original-file: 2026-06-01/ReservationRecommendationDetailsPrePurchasePlanBySubscription.json
 */
async function reservationRecommendationDetailsPrePurchasePlanBySubscription() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.reservationRecommendationDetails.get(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "Single",
    "westus",
    "P3Y",
    "Last30Days",
    "Standard_DS13_v2",
  );
  console.log(result);
}

async function main() {
  await reservationRecommendationsByBillingAccountLegacy();
  await reservationRecommendationDetailsByBillingAccountForManagementGroup();
  await reservationRecommendationsByBillingProfileModern();
  await reservationRecommendationsByResourceGroupLegacy();
  await reservationRecommendationsBySubscriptionLegacy();
  await reservationRecommendationDetailsPrePurchasePlanBySubscription();
}

main().catch(console.error);

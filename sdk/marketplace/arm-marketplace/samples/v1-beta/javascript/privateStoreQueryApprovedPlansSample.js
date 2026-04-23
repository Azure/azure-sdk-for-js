// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get map of plans and related approved subscriptions.
 *
 * @summary get map of plans and related approved subscriptions.
 * x-ms-original-file: 2025-01-01/QueryApprovedPlans.json
 */
async function queryApprovedPlans() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.queryApprovedPlans(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    {
      payload: {
        offerId: "marketplacetestthirdparty.md-test-third-party-2",
        planIds: ["testPlanA", "testPlanB", "testPlanC"],
        subscriptionIds: [
          "85e3e079-c718-4e4c-abbe-f72fceba8305",
          "7752d461-4bf1-4185-8b56-8a3f11486ac6",
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await queryApprovedPlans();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to withdraw a user request approval on specific plan
 *
 * @summary withdraw a user request approval on specific plan
 * x-ms-original-file: 2025-01-01/WithdrawPlan.json
 */
async function withdrawPlan() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  await client.privateStore.withdrawPlan(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "marketplacetestthirdparty.md-test-third-party-2",
    { payload: { planId: "*", publisherId: "marketplacetestthirdparty" } },
  );
}

async function main() {
  await withdrawPlan();
}

main().catch(console.error);

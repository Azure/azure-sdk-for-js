// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create approval request
 *
 * @summary create approval request
 * x-ms-original-file: 2025-01-01/CreateApprovalRequest.json
 */
async function createApprovalRequest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.createApprovalRequest(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "marketplacetestthirdparty.md-test-third-party-2",
    {
      plansDetails: [
        {
          justification: "Because I want to....",
          planId: "testPlanA",
          subscriptionId: "4ca4753c-5a1e-4913-b849-2c68880e03c2",
          subscriptionName: "Test subscription 2",
        },
        {
          justification: "try me :)",
          planId: "*",
          subscriptionId: "4ca4753c-5a1e-4913-b849-2c68880e03c2",
          subscriptionName: "Test subscription 2",
        },
      ],
      publisherId: "marketplacetestthirdparty",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createApprovalRequest();
}

main().catch(console.error);

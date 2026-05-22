// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Marketplace Subscription (asynchronous).
 *
 * @summary create or update Marketplace Subscription (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/MarketplaceSubscription/createOrUpdate.json
 */
async function createOrUpdateWorkspaceMarketplaceSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.marketplaceSubscriptions.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    { properties: { modelId: "string" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceMarketplaceSubscription();
}

main().catch(console.error);

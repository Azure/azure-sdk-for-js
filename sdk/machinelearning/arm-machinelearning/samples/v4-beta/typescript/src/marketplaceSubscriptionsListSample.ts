// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list containers.
 *
 * @summary list containers.
 * x-ms-original-file: 2025-12-01/Workspace/MarketplaceSubscription/list.json
 */
async function listWorkspaceMarketplaceSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaceSubscriptions.list("test-rg", "my-aml-workspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceMarketplaceSubscription();
}

main().catch(console.error);

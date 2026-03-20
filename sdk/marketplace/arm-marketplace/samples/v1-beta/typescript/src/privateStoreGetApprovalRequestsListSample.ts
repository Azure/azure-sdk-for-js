// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all open approval requests of current user
 *
 * @summary get all open approval requests of current user
 * x-ms-original-file: 2025-01-01/GetApprovalRequestsList.json
 */
async function getApprovalRequestsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.getApprovalRequestsList(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getApprovalRequestsList();
}

main().catch(console.error);

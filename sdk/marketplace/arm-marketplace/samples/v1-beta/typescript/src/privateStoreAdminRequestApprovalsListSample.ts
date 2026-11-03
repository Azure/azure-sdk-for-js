// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get list of admin request approvals
 *
 * @summary get list of admin request approvals
 * x-ms-original-file: 2025-01-01/AdminRequestApprovalsList.json
 */
async function adminRequestApprovalsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.adminRequestApprovalsList(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await adminRequestApprovalsList();
}

main().catch(console.error);

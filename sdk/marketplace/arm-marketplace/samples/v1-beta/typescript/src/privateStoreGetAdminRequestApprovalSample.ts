// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get open approval requests
 *
 * @summary get open approval requests
 * x-ms-original-file: 2025-01-01/GetAdminRequestApproval.json
 */
async function getAdminRequestApproval(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.getAdminRequestApproval(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "marketplacetestthirdparty.md-test-third-party-2",
    "marketplacetestthirdparty",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAdminRequestApproval();
}

main().catch(console.error);

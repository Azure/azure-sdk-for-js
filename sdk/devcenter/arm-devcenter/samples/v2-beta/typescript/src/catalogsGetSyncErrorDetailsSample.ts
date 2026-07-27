// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets catalog synchronization error details.
 *
 * @summary gets catalog synchronization error details.
 * x-ms-original-file: 2026-01-01-preview/Catalogs_GetSyncErrorDetails.json
 */
async function catalogsGetSyncErrorDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.catalogs.getSyncErrorDetails("rg1", "Contoso", "CentralCatalog");
  console.log(result);
}

async function main(): Promise<void> {
  await catalogsGetSyncErrorDetails();
}

main().catch(console.error);

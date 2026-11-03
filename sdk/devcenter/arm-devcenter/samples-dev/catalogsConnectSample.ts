// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to connects a catalog to enable syncing.
 *
 * @summary connects a catalog to enable syncing.
 * x-ms-original-file: 2026-01-01-preview/Catalogs_Connect.json
 */
async function catalogsConnect(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.catalogs.connect("rg1", "Contoso", "CentralCatalog");
}

async function main(): Promise<void> {
  await catalogsConnect();
}

main().catch(console.error);

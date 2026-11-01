// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified External Cache Connection
 *
 * @summary delete the specified External Cache Connection
 * x-ms-original-file: 2026-08-15-preview/ExternalCacheConnections_Delete.json
 */
async function externalCacheConnectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.externalCacheConnections.delete("contosoNetAppRg", "contosoCacheConnection");
}

async function main(): Promise<void> {
  await externalCacheConnectionsDelete();
}

main().catch(console.error);

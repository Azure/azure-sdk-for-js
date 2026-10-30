// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch the specified External Cache Connection
 *
 * @summary patch the specified External Cache Connection
 * x-ms-original-file: 2026-08-15-preview/ExternalCacheConnections_Update.json
 */
async function externalCacheConnectionsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.externalCacheConnections.update(
    "contosoNetAppRg",
    "contosoCacheConnection",
    { tags: { env: "prod" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await externalCacheConnectionsUpdate();
}

main().catch(console.error);

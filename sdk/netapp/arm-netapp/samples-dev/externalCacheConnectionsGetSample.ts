// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the External Cache Connection
 *
 * @summary get the External Cache Connection
 * x-ms-original-file: 2026-08-15-preview/ExternalCacheConnections_Get.json
 */
async function externalCacheConnectionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.externalCacheConnections.get(
    "contosoNetAppRg",
    "contosoCacheConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await externalCacheConnectionsGet();
}

main().catch(console.error);

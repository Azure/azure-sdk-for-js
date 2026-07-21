// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the number of available IP addresses needed for the AML file system information provided.
 *
 * @summary get the number of available IP addresses needed for the AML file system information provided.
 * x-ms-original-file: 2026-01-01/getRequiredAmlFSSubnetsSize.json
 */
async function getRequiredAmlFilesystemSubnetsSize(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.getRequiredAmlFSSubnetsSize();
  console.log(result);
}

async function main(): Promise<void> {
  await getRequiredAmlFilesystemSubnetsSize();
}

main().catch(console.error);

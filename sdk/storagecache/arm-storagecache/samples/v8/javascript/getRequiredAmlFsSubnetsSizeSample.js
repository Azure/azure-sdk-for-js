// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the number of available IP addresses needed for the AML file system information provided.
 *
 * @summary Get the number of available IP addresses needed for the AML file system information provided.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/getRequiredAmlFSSubnetsSize.json
 */
async function getRequiredAmlFilesystemSubnetsSize() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.getRequiredAmlFSSubnetsSize();
  console.log(result);
}

async function main() {
  await getRequiredAmlFilesystemSubnetsSize();
}

main().catch(console.error);

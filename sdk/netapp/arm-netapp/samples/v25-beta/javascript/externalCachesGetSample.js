// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the External Cache
 *
 * @summary get the External Cache
 * x-ms-original-file: 2026-08-15-preview/ExternalCaches_Get.json
 */
async function externalCachesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.externalCaches.get(
    "contosoNetAppRg",
    "contosoExternalCluster",
    "contosoExternalSvm",
    "contosoCache_AB12",
  );
  console.log(result);
}

async function main() {
  await externalCachesGet();
}

main().catch(console.error);

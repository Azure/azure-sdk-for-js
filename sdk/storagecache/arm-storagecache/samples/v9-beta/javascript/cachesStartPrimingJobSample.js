// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a priming job. This operation is only allowed when the cache is healthy.
 *
 * @summary create a priming job. This operation is only allowed when the cache is healthy.
 * x-ms-original-file: 2026-01-01/StartPrimingJob.json
 */
async function startPrimingJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.startPrimingJob("scgroup", "sc1", {
    primingjob: {
      primingJobName: "contosoJob",
      primingManifestUrl:
        "https://contosostorage.blob.core.windows.net/contosoblob/00000000_00000000000000000000000000000000.00000000000.FFFFFFFF.00000000?sp=r&st=2021-08-11T19:33:35Z&se=2021-08-12T03:33:35Z&spr=https&sv=2020-08-04&sr=b&sig=<secret-value-from-key>",
    },
  });
}

async function main() {
  await startPrimingJob();
}

main().catch(console.error);

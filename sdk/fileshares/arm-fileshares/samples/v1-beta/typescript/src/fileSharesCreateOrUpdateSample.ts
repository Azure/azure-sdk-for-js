// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a file share.
 *
 * @summary create or update a file share.
 * x-ms-original-file: 2026-06-01/FileShares_CreateOrUpdate_MaximumSet_Gen.json
 */
async function fileSharesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShares.createOrUpdate("rgfileshares", "fileshare", {
    properties: {
      mountName: "fileshare",
      mediaTier: "SSD",
      redundancy: "Local",
      protocol: "NFS",
      provisionedStorageGiB: 8,
      provisionedIOPerSec: 5,
      provisionedThroughputMiBPerSec: 22,
      nfsProtocolProperties: { rootSquash: "NoRootSquash", encryptionInTransitRequired: "Enabled" },
      publicAccessProperties: {
        allowedSubnets: [
          "/subscriptions/9760acf5-4638-11e7-9bdb-020073ca7778/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/testvnet3/subnets/testsubnet3",
        ],
      },
      publicNetworkAccess: "Enabled",
    },
    tags: { key9647: "xwokdvyoae" },
    location: "westus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await fileSharesCreateOrUpdateMaximumSet();
}

main().catch(console.error);

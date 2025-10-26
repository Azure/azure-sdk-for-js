// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a bucket for a volume. A bucket allows additional services, such as AI services, connect to the volume data contained in those buckets.
 *
 * @summary creates or updates a bucket for a volume. A bucket allows additional services, such as AI services, connect to the volume data contained in those buckets.
 * x-ms-original-file: 2025-07-01-preview/Buckets_CreateOrUpdate.json
 */
async function bucketsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.buckets.createOrUpdate(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "bucket1",
    {
      properties: {
        path: "/path",
        fileSystemUser: { nfsUser: { groupId: 1000, userId: 1001 } },
        permissions: "ReadOnly",
        server: {
          certificateObject: "<REDACTED>",
          fqdn: "fullyqualified.domainname.com",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bucketsCreateOrUpdate();
}

main().catch(console.error);

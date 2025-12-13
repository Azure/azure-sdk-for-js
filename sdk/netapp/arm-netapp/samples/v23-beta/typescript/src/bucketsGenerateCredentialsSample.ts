// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate the access key and secret key used for accessing the specified volume bucket. Also return expiry date and time of key pair (in UTC).
 *
 * @summary generate the access key and secret key used for accessing the specified volume bucket. Also return expiry date and time of key pair (in UTC).
 * x-ms-original-file: 2025-09-01-preview/Buckets_GenerateCredentials.json
 */
async function bucketsGenerateCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.buckets.generateCredentials(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "bucket1",
    { keyPairExpiryDays: 3 },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bucketsGenerateCredentials();
}

main().catch(console.error);

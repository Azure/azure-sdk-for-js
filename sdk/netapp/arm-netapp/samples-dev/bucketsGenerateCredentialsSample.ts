// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Generate the access key and secret key used for accessing the specified volume bucket. Also return expiry date and time of key pair (in UTC).
 *
 * @summary Generate the access key and secret key used for accessing the specified volume bucket. Also return expiry date and time of key pair (in UTC).
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/preview/2025-01-01-preview/examples/Buckets_GenerateCredentials.json
 */

import {
  BucketCredentialsExpiry,
  NetAppManagementClient,
} from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function bucketsGenerateCredentials(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "D633CC2E-722B-4AE1-B636-BBD9E4C60ED9";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const poolName = "pool1";
  const volumeName = "volume1";
  const bucketName = "bucket1";
  const body: BucketCredentialsExpiry = { keyPairExpiryDays: 3 };
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.buckets.generateCredentials(
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    bucketName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bucketsGenerateCredentials();
}

main().catch(console.error);

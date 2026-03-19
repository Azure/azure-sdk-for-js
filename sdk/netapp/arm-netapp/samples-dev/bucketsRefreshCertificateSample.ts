// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation will fetch the certificate from Azure Key Vault and install it on the bucket server.
 *
 * @summary this operation will fetch the certificate from Azure Key Vault and install it on the bucket server.
 * x-ms-original-file: 2025-12-15-preview/Buckets_RefreshCertificate.json
 */
async function bucketsRefreshCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.buckets.refreshCertificate("myRG", "account1", "pool1", "volume1", "bucket1");
}

async function main(): Promise<void> {
  await bucketsRefreshCertificate();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate the access key and secret key used for accessing the specified volume bucket and store in Azure Key Vault.
 *
 * @summary generate the access key and secret key used for accessing the specified volume bucket and store in Azure Key Vault.
 * x-ms-original-file: 2025-12-15-preview/Buckets_GenerateAkvCredentials.json
 */
async function bucketsGenerateAkvCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.buckets.generateAkvCredentials("myRG", "account1", "pool1", "volume1", "bucket1", {
    keyPairExpiryDays: 3,
  });
}

async function main(): Promise<void> {
  await bucketsGenerateAkvCredentials();
}

main().catch(console.error);

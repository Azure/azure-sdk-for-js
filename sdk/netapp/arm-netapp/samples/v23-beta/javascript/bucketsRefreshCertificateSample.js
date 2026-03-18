// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation will fetch the certificate from Azure Key Vault and install it on the bucket server.
 *
 * @summary this operation will fetch the certificate from Azure Key Vault and install it on the bucket server.
 * x-ms-original-file: 2025-12-15-preview/Buckets_RefreshCertificate.json
 */
async function bucketsRefreshCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.buckets.refreshCertificate("myRG", "account1", "pool1", "volume1", "bucket1");
}

async function main() {
  await bucketsRefreshCertificate();
}

main().catch(console.error);

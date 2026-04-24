// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the details of a volume bucket.
 *
 * @summary updates the details of a volume bucket.
 * x-ms-original-file: 2025-12-15-preview/Buckets_Update.json
 */
async function bucketsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.buckets.update("myRG", "account1", "pool1", "volume1", "bucket1", {
    properties: {
      server: {
        fqdn: "fullyqualified.domainname.com",
        certificateObject: "<REDACTED>",
        onCertificateConflictAction: "Update",
      },
      permissions: "ReadWrite",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the details of a volume bucket.
 *
 * @summary updates the details of a volume bucket.
 * x-ms-original-file: 2025-12-15-preview/Buckets_UpdateWithAkv.json
 */
async function bucketsUpdateWithAkv(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.buckets.update("myRG", "account1", "pool1", "volume1", "bucket1", {
    properties: {
      server: { fqdn: "fullyqualified.domainname.com", onCertificateConflictAction: "Fail" },
      akvDetails: {
        certificateAkvDetails: {
          certificateKeyVaultUri: "https://REDACTED.vault.azure.net/",
          certificateName: "my-certificate",
        },
        credentialsAkvDetails: {
          credentialsKeyVaultUri: "https://REDACTED.vault.azure.net/",
          secretName: "my-secret",
        },
      },
      permissions: "ReadOnly",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await bucketsUpdate();
  await bucketsUpdateWithAkv();
}

main().catch(console.error);

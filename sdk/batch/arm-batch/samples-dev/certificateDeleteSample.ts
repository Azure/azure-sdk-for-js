// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Warning: This operation is deprecated and will be removed after February, 2024. Please use the [Azure KeyVault Extension](https://learn.microsoft.com/azure/batch/batch-certificate-migration-guide) instead.
 *
 * @summary Warning: This operation is deprecated and will be removed after February, 2024. Please use the [Azure KeyVault Extension](https://learn.microsoft.com/azure/batch/batch-certificate-migration-guide) instead.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/CertificateDelete.json
 */

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function certificateDelete(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["BATCH_RESOURCE_GROUP"] || "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const certificateName = "sha1-0a0e4f50d51beadeac1d35afc5116098e7902e6e";
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.certificateOperations.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    certificateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificateDelete();
}

main().catch(console.error);

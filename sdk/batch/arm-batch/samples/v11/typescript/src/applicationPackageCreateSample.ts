// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an application package record. The record contains a storageUrl where the package should be uploaded to.  Once it is uploaded the `ApplicationPackage` needs to be activated using `ApplicationPackageActive` before it can be used. If the auto storage account was configured to use storage keys, the URL returned will contain a SAS.
 *
 * @summary creates an application package record. The record contains a storageUrl where the package should be uploaded to.  Once it is uploaded the `ApplicationPackage` needs to be activated using `ApplicationPackageActive` before it can be used. If the auto storage account was configured to use storage keys, the URL returned will contain a SAS.
 * x-ms-original-file: 2025-06-01/ApplicationPackageCreate.json
 */
async function applicationPackageCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.applicationPackage.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "app1",
    "1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applicationPackageCreate();
}

main().catch(console.error);

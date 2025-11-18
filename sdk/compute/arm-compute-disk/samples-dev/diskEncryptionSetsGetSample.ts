// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a disk encryption set.
 *
 * @summary gets information about a disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Get.json
 */
async function getInformationAboutADiskEncryptionSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskEncryptionSets.get("myResourceGroup", "myDiskEncryptionSet");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a disk encryption set.
 *
 * @summary gets information about a disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Get_WithAutoKeyRotationError.json
 */
async function getInformationAboutADiskEncryptionSetWhenAutoKeyRotationFailed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskEncryptionSets.get("myResourceGroup", "myDiskEncryptionSet");
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutADiskEncryptionSet();
  await getInformationAboutADiskEncryptionSetWhenAutoKeyRotationFailed();
}

main().catch(console.error);

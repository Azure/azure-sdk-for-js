// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets information about a disk encryption set.
 *
 * @summary Gets information about a disk encryption set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Get_WithAutoKeyRotationError.json
 */
async function getInformationAboutADiskEncryptionSetWhenAutoKeyRotationFailed() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskEncryptionSets.get(resourceGroupName, diskEncryptionSetName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets information about a disk encryption set.
 *
 * @summary Gets information about a disk encryption set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Get.json
 */
async function getInformationAboutADiskEncryptionSet() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskEncryptionSets.get(resourceGroupName, diskEncryptionSetName);
  console.log(result);
}

async function main() {
  await getInformationAboutADiskEncryptionSetWhenAutoKeyRotationFailed();
  await getInformationAboutADiskEncryptionSet();
}

main().catch(console.error);

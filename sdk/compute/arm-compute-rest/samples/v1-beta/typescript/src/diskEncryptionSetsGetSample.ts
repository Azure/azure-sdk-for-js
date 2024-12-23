// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  DiskEncryptionSetsGetParameters,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets information about a disk encryption set.
 *
 * @summary Gets information about a disk encryption set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Get_WithAutoKeyRotationError.json
 */
async function getInformationAboutADiskEncryptionSetWhenAutoKeyRotationFailed() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const options: DiskEncryptionSetsGetParameters = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
      subscriptionId,
      resourceGroupName,
      diskEncryptionSetName,
    )
    .get(options);
  console.log(result);
}

getInformationAboutADiskEncryptionSetWhenAutoKeyRotationFailed().catch(console.error);
/**
 * This sample demonstrates how to Gets information about a disk encryption set.
 *
 * @summary Gets information about a disk encryption set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskEncryptionSetExamples/DiskEncryptionSet_Get.json
 */
async function getInformationAboutADiskEncryptionSet() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskEncryptionSetName = "myDiskEncryptionSet";
  const options: DiskEncryptionSetsGetParameters = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
      subscriptionId,
      resourceGroupName,
      diskEncryptionSetName,
    )
    .get(options);
  console.log(result);
}

getInformationAboutADiskEncryptionSet().catch(console.error);

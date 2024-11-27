// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets information about a snapshot.
 *
 * @summary Gets information about a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/snapshotExamples/Snapshot_Get.json
 */
async function getInformationAboutASnapshot() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const snapshotName = "mySnapshot";
  const options = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
      subscriptionId,
      resourceGroupName,
      snapshotName
    )
    .get(options);
  console.log(result);
}

getInformationAboutASnapshot().catch(console.error);
/**
 * This sample demonstrates how to Gets information about a snapshot.
 *
 * @summary Gets information about a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/snapshotExamples/Snapshot_GetIncrementalSnapshot.json
 */
async function getInformationAboutAnIncrementalSnapshot() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const snapshotName = "myIncrementalSnapshot";
  const options = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
      subscriptionId,
      resourceGroupName,
      snapshotName
    )
    .get(options);
  console.log(result);
}

getInformationAboutAnIncrementalSnapshot().catch(console.error);

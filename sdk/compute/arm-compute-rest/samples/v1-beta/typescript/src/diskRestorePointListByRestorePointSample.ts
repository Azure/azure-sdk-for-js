// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  DiskRestorePointListByRestorePointParameters,
  paginate
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Lists diskRestorePoints under a vmRestorePoint.
 *
 * @summary Lists diskRestorePoints under a vmRestorePoint.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskRestorePointExamples/DiskRestorePoint_ListByVmRestorePoint.json
 */
async function getAnIncrementalDiskRestorePointResource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const restorePointCollectionName = "rpc";
  const vmRestorePointName = "vmrp";
  const options: DiskRestorePointListByRestorePointParameters = {
    queryParameters: { "api-version": "2022-07-02" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

getAnIncrementalDiskRestorePointResource().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  SnapshotsUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates (patches) a snapshot.
 *
 * @summary Updates (patches) a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/snapshotExamples/Snapshot_Update_WithAcceleratedNetwork.json
 */
async function updateASnapshotWithAcceleratedNetworking() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const snapshotName = "mySnapshot";
  const options: SnapshotsUpdateParameters = {
    body: {
      properties: {
        diskSizeGB: 20,
        supportedCapabilities: { acceleratedNetwork: false }
      },
      tags: { department: "Development", project: "UpdateSnapshots" }
    },
    queryParameters: { "api-version": "2022-07-02" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
      subscriptionId,
      resourceGroupName,
      snapshotName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateASnapshotWithAcceleratedNetworking().catch(console.error);
/**
 * This sample demonstrates how to Updates (patches) a snapshot.
 *
 * @summary Updates (patches) a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/snapshotExamples/Snapshot_Update.json
 */
async function updateASnapshot() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const snapshotName = "mySnapshot";
  const options: SnapshotsUpdateParameters = {
    body: {
      properties: { diskSizeGB: 20 },
      tags: { department: "Development", project: "UpdateSnapshots" }
    },
    queryParameters: { "api-version": "2022-07-02" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
      subscriptionId,
      resourceGroupName,
      snapshotName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateASnapshot().catch(console.error);

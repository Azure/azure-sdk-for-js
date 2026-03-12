// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Grants access to a snapshot.
 *
 * @summary Grants access to a snapshot.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/snapshotExamples/Snapshot_BeginGetAccess.json
 */

import type { SnapshotsGrantAccessParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getASasOnASnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const snapshotName = "mySnapshot";
  const options: SnapshotsGrantAccessParameters = {
    body: { access: "Read", durationInSeconds: 300 },
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/beginGetAccess",
      subscriptionId,
      resourceGroupName,
      snapshotName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

getASasOnASnapshot().catch(console.error);

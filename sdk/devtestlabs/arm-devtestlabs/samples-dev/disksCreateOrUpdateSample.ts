// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or replace an existing disk. This operation can take a while to complete.
 *
 * @summary Create or replace an existing disk. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Disks_CreateOrUpdate.json
 */

import type { Disk } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function disksCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "{userId}";
  const name = "{diskName}";
  const disk: Disk = {
    diskSizeGiB: 1023,
    diskType: "Standard",
    leasedByLabVmId:
      "/subscriptions/{subscriptionId}/resourcegroups/resourceGroupName/providers/microsoft.devtestlab/labs/{labName}/virtualmachines/vmName",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.disks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    labName,
    userName,
    name,
    disk,
  );
  console.log(result);
}

disksCreateOrUpdate().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Detach and break the lease of the disk attached to the virtual machine. This operation can take a while to complete.
 *
 * @summary Detach and break the lease of the disk attached to the virtual machine. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Disks_Detach.json
 */

import type { DetachDiskProperties } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function disksDetach(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "{userId}";
  const name = "{diskName}";
  const detachDiskProperties: DetachDiskProperties = {
    leasedByLabVmId:
      "/subscriptions/{subscriptionId}/resourcegroups/myResourceGroup/providers/microsoft.devtestlab/labs/{labName}/virtualmachines/{vmName}",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.disks.beginDetachAndWait(
    resourceGroupName,
    labName,
    userName,
    name,
    detachDiskProperties,
  );
  console.log(result);
}

disksDetach().catch(console.error);

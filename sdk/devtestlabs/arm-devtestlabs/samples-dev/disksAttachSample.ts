// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AttachDiskProperties } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Attach and create the lease of the disk to the virtual machine. This operation can take a while to complete.
 *
 * @summary Attach and create the lease of the disk to the virtual machine. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Disks_Attach.json
 */
async function disksAttach(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "{userId}";
  const name = "{diskName}";
  const attachDiskProperties: AttachDiskProperties = {
    leasedByLabVmId:
      "/subscriptions/{subscriptionId}/resourcegroups/resourceGroupName/providers/microsoft.devtestlab/labs/{labName}/virtualmachines/{vmName}",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.disks.beginAttachAndWait(
    resourceGroupName,
    labName,
    userName,
    name,
    attachDiskProperties,
  );
  console.log(result);
}

disksAttach().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Attach a new or existing data disk to virtual machine. This operation can take a while to complete.
 *
 * @summary Attach a new or existing data disk to virtual machine. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualMachines_AddDataDisk.json
 */

import type { DataDiskProperties } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function virtualMachinesAddDataDisk(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{virtualMachineName}";
  const dataDiskProperties: DataDiskProperties = {
    attachNewDataDiskOptions: {
      diskName: "{diskName}",
      diskSizeGiB: 127,
      diskType: "{diskType}",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginAddDataDiskAndWait(
    resourceGroupName,
    labName,
    name,
    dataDiskProperties,
  );
  console.log(result);
}

virtualMachinesAddDataDisk().catch(console.error);

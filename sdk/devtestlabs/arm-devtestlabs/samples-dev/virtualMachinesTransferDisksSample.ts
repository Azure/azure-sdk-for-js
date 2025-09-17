// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Transfers all data disks attached to the virtual machine to be owned by the current user. This operation can take a while to complete.
 *
 * @summary Transfers all data disks attached to the virtual machine to be owned by the current user. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualMachines_TransferDisks.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function virtualMachinesTransferDisks(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{virtualmachineName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginTransferDisksAndWait(
    resourceGroupName,
    labName,
    name,
  );
  console.log(result);
}

virtualMachinesTransferDisks().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineRunCommandsGetByVirtualMachineParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to get the run command.
 *
 * @summary The operation to get the run command.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/runCommandExamples/VirtualMachineRunCommand_Get.json
 */
async function getARunCommand() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const runCommandName = "myRunCommand";
  const options: VirtualMachineRunCommandsGetByVirtualMachineParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}",
      subscriptionId,
      resourceGroupName,
      vmName,
      runCommandName
    )
    .get(options);
  console.log(result);
}

getARunCommand().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetVMRunCommandsCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to create or update the VMSS VM run command.
 *
 * @summary The operation to create or update the VMSS VM run command.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/runCommandExamples/VirtualMachineScaleSetVMRunCommand_CreateOrUpdate.json
 */
async function createVirtualMachineScaleSetVMRunCommand() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const runCommandName = "myRunCommand";
  const options: VirtualMachineScaleSetVMRunCommandsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        asyncExecution: false,
        parameters: [
          { name: "param1", value: "value1" },
          { name: "param2", value: "value2" },
        ],
        runAsPassword: "<runAsPassword>",
        runAsUser: "user1",
        source: { script: "Write-Host Hello World!" },
        timeoutInSeconds: 3600,
      },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      runCommandName,
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualMachineScaleSetVMRunCommand().catch(console.error);

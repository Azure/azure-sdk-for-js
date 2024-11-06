// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineRunCommandsGetParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets specific run command for a subscription in a location.
 *
 * @summary Gets specific run command for a subscription in a location.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/runCommandExamples/RunCommand_Get.json
 */
async function virtualMachineRunCommandGet() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "SoutheastAsia";
  const commandId = "RunPowerShellScript";
  const options: VirtualMachineRunCommandsGetParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands/{commandId}",
      subscriptionId,
      location,
      commandId
    )
    .get(options);
  console.log(result);
}

virtualMachineRunCommandGet().catch(console.error);

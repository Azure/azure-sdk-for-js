// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set.
 *
 * @summary The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_RetrieveBootDiagnosticsData.json
 */
async function retrieveBootDiagnosticsDataOfAVirtualMachine() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "ResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const sasUriExpirationTimeInMinutes = 60;
  const options = { sasUriExpirationTimeInMinutes };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMs.retrieveBootDiagnosticsData(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    options,
  );
  console.log(result);
}

async function main() {
  await retrieveBootDiagnosticsDataOfAVirtualMachine();
}

main().catch(console.error);

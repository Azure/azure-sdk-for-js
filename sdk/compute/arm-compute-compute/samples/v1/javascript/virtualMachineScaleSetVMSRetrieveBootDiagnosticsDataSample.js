// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set.
 *
 * @summary the operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_RetrieveBootDiagnosticsData.json
 */
async function retrieveBootDiagnosticsDataOfAVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.retrieveBootDiagnosticsData(
    "ResourceGroup",
    "myvmScaleSet",
    "0",
    { sasUriExpirationTimeInMinutes: 60 },
  );
  console.log(result);
}

async function main() {
  await retrieveBootDiagnosticsDataOfAVirtualMachine();
}

main().catch(console.error);

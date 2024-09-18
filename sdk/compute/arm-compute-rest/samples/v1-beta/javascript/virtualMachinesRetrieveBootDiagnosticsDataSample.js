// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs.
 *
 * @summary The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_RetrieveBootDiagnosticsData.json
 */
async function retrieveBootDiagnosticsDataOfAVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ResourceGroup";
  const vmName = "VMName";
  const options = {
    queryParameters: {
      sasUriExpirationTimeInMinutes: 60,
      "api-version": "2022-08-01",
    },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/retrieveBootDiagnosticsData",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .post(options);
  console.log(result);
}

retrieveBootDiagnosticsDataOfAVirtualMachine().catch(console.error);

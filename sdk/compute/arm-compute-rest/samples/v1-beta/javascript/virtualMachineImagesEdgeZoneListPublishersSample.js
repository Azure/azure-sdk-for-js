// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets a list of virtual machine image publishers for the specified Azure location and edge zone.
 *
 * @summary Gets a list of virtual machine image publishers for the specified Azure location and edge zone.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListPublishers_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListPublishersMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaa";
  const edgeZone = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers",
      subscriptionId,
      location,
      edgeZone
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesEdgeZoneListPublishersMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of virtual machine image publishers for the specified Azure location and edge zone.
 *
 * @summary Gets a list of virtual machine image publishers for the specified Azure location and edge zone.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListPublishers_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListPublishersMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaa";
  const edgeZone = "aaaaaaaaaaaaaaaaaaaaaaa";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers",
      subscriptionId,
      location,
      edgeZone
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesEdgeZoneListPublishersMinimumSetGen().catch(console.error);

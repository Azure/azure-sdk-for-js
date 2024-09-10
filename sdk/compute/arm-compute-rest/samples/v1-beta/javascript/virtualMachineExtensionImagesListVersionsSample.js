// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets a list of virtual machine extension image versions.
 *
 * @summary Gets a list of virtual machine extension image versions.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExtensionImageExamples/VirtualMachineExtensionImages_ListVersions_MaximumSet_Gen.json
 */
async function virtualMachineExtensionImagesListVersionsMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaa";
  const type = "aaaaaaaaaaaaaaaaaa";
  const options = {
    queryParameters: {
      $filter: "aaaaaaaaaaaaaaaaaaaaaaaaa",
      $top: 22,
      $orderby: "a",
      "api-version": "2022-08-01",
    },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions",
      subscriptionId,
      location,
      publisherName,
      type
    )
    .get(options);
  console.log(result);
}

virtualMachineExtensionImagesListVersionsMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of virtual machine extension image versions.
 *
 * @summary Gets a list of virtual machine extension image versions.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExtensionImageExamples/VirtualMachineExtensionImages_ListVersions_MinimumSet_Gen.json
 */
async function virtualMachineExtensionImagesListVersionsMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const type = "aaaa";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions",
      subscriptionId,
      location,
      publisherName,
      type
    )
    .get(options);
  console.log(result);
}

virtualMachineExtensionImagesListVersionsMinimumSetGen().catch(console.error);

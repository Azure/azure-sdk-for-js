// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VirtualMachineImagesListParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU.
 *
 * @summary Gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_List_MaximumSet_Gen.json
 */
async function virtualMachineImagesListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaaaa";
  const publisherName = "aaaaaa";
  const offer = "aaaaaaaaaaaaaaaa";
  const skus = "aaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineImagesListParameters = {
    queryParameters: {
      $expand: "aaaaaaaaaaaaaaaaaaaaaaaa",
      $top: 18,
      $orderby: "aa",
      "api-version": "2022-08-01",
    },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions",
      subscriptionId,
      location,
      publisherName,
      offer,
      skus,
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesListMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU.
 *
 * @summary Gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_List_MinimumSet_Gen.json
 */
async function virtualMachineImagesListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaa";
  const publisherName = "aaaaaaaaaaa";
  const offer = "aaaaaaaaaa";
  const skus = "aaaaaa";
  const options: VirtualMachineImagesListParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions",
      subscriptionId,
      location,
      publisherName,
      offer,
      skus,
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesListMinimumSetGen().catch(console.error);

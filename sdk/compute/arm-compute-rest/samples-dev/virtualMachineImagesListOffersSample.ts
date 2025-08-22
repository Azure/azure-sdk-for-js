// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of virtual machine image offers for the specified location and publisher.
 *
 * @summary Gets a list of virtual machine image offers for the specified location and publisher.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_ListOffers_MaximumSet_Gen.json
 */

import type { VirtualMachineImagesListOffersParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualMachineImagesListOffersMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaa";
  const publisherName = "aaaaaaaa";
  const options: VirtualMachineImagesListOffersParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers",
      subscriptionId,
      location,
      publisherName,
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesListOffersMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of virtual machine image offers for the specified location and publisher.
 *
 * @summary Gets a list of virtual machine image offers for the specified location and publisher.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_ListOffers_MinimumSet_Gen.json
 */
async function virtualMachineImagesListOffersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaaaaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineImagesListOffersParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers",
      subscriptionId,
      location,
      publisherName,
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesListOffersMinimumSetGen().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineImagesListSkusParameters,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
 *
 * @summary Gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_ListSkus_MaximumSet_Gen.json
 */
async function virtualMachineImagesListSkusMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const offer = "aaaaaaa";
  const options: VirtualMachineImagesListSkusParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus",
      subscriptionId,
      location,
      publisherName,
      offer,
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesListSkusMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
 *
 * @summary Gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_ListSkus_MinimumSet_Gen.json
 */
async function virtualMachineImagesListSkusMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaa";
  const publisherName = "aaaaaaaaaaaaa";
  const offer = "aaaaaaa";
  const options: VirtualMachineImagesListSkusParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus",
      subscriptionId,
      location,
      publisherName,
      offer,
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesListSkusMinimumSetGen().catch(console.error);

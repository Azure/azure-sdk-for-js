// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineImagesGetParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a virtual machine image.
 *
 * @summary Gets a virtual machine image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_Get_MaximumSet_Gen.json
 */
async function virtualMachineImagesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaa";
  const publisherName = "aaa";
  const offer = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const skus = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const version = "aaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineImagesGetParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}",
      subscriptionId,
      location,
      publisherName,
      offer,
      skus,
      version
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesGetMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a virtual machine image.
 *
 * @summary Gets a virtual machine image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_Get_MinimumSet_Gen.json
 */
async function virtualMachineImagesGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaa";
  const publisherName = "aaaaaaaaaaa";
  const offer = "aa";
  const skus = "aaaaaaaaa";
  const version = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineImagesGetParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}",
      subscriptionId,
      location,
      publisherName,
      offer,
      skus,
      version
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesGetMinimumSetGen().catch(console.error);

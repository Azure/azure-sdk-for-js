// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineExtensionImagesGetParameters,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a virtual machine extension image.
 *
 * @summary Gets a virtual machine extension image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExtensionImageExamples/VirtualMachineExtensionImages_Get_MaximumSet_Gen.json
 */
async function virtualMachineExtensionImagesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaa";
  const type = "aaaaaaaaaaaaaaaaaa";
  const version = "aaaaaaaaaaaaaa";
  const options: VirtualMachineExtensionImagesGetParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions/{version}",
      subscriptionId,
      location,
      publisherName,
      type,
      version,
    )
    .get(options);
  console.log(result);
}

virtualMachineExtensionImagesGetMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a virtual machine extension image.
 *
 * @summary Gets a virtual machine extension image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExtensionImageExamples/VirtualMachineExtensionImages_Get_MinimumSet_Gen.json
 */
async function virtualMachineExtensionImagesGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
  const type = "aa";
  const version = "aaa";
  const options: VirtualMachineExtensionImagesGetParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions/{version}",
      subscriptionId,
      location,
      publisherName,
      type,
      version,
    )
    .get(options);
  console.log(result);
}

virtualMachineExtensionImagesGetMinimumSetGen().catch(console.error);

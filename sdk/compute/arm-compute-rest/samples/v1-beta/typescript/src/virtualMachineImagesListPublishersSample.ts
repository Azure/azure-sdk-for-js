// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineImagesListPublishersParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a list of virtual machine image publishers for the specified Azure location.
 *
 * @summary Gets a list of virtual machine image publishers for the specified Azure location.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_ListPublishers_MaximumSet_Gen.json
 */
async function virtualMachineImagesListPublishersMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaa";
  const options: VirtualMachineImagesListPublishersParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers",
      subscriptionId,
      location
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesListPublishersMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of virtual machine image publishers for the specified Azure location.
 *
 * @summary Gets a list of virtual machine image publishers for the specified Azure location.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImages_ListPublishers_MinimumSet_Gen.json
 */
async function virtualMachineImagesListPublishersMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineImagesListPublishersParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers",
      subscriptionId,
      location
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesListPublishersMinimumSetGen().catch(console.error);

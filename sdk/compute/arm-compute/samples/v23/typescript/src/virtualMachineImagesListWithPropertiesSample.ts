// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  VirtualMachineImagesListWithPropertiesOptionalParams,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineImageExamples/VirtualMachineImages_ListWithProperties_MaximumSet_Gen.json
 */
async function virtualMachineImagesListWithPropertiesMaximumSet(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "eastus";
  const publisherName = "MicrosoftWindowsServer";
  const offer = "WindowsServer";
  const skus = "2022-datacenter-azure-edition";
  const expand = "Properties";
  const top = 4;
  const orderby = "aa";
  const options: VirtualMachineImagesListWithPropertiesOptionalParams = {
    top,
    orderby,
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImages.listWithProperties(
    location,
    publisherName,
    offer,
    skus,
    expand,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineImageExamples/VirtualMachineImages_ListWithProperties_MinimumSet_Gen.json
 */
async function virtualMachineImagesListWithPropertiesMinimumSet(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "eastus";
  const publisherName = "MicrosoftWindowsServer";
  const offer = "WindowsServer";
  const skus = "2022-datacenter-azure-edition";
  const expand = "Properties";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImages.listWithProperties(
    location,
    publisherName,
    offer,
    skus,
    expand,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineImagesListWithPropertiesMaximumSet();
  await virtualMachineImagesListWithPropertiesMinimumSet();
}

main().catch(console.error);

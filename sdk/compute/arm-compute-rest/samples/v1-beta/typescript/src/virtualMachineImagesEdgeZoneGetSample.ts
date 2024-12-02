// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineImagesEdgeZoneGetParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a virtual machine image in an edge zone.
 *
 * @summary Gets a virtual machine image in an edge zone.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_Get_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const edgeZone = "aaaaaaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaaaaa";
  const offer = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const skus = "aaaaaaaaaa";
  const version = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineImagesEdgeZoneGetParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}",
      subscriptionId,
      location,
      edgeZone,
      publisherName,
      offer,
      skus,
      version
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesEdgeZoneGetMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a virtual machine image in an edge zone.
 *
 * @summary Gets a virtual machine image in an edge zone.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_Get_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaaaaaaaaaaaa";
  const edgeZone = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const offer = "aaaaaaaaaaa";
  const skus = "aaaaaaaaaaaaaaaaaa";
  const version = "aa";
  const options: VirtualMachineImagesEdgeZoneGetParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}",
      subscriptionId,
      location,
      edgeZone,
      publisherName,
      offer,
      skus,
      version
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesEdgeZoneGetMinimumSetGen().catch(console.error);

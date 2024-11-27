// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineImagesListByEdgeZoneParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a list of all virtual machine image versions for the specified edge zone
 *
 * @summary Gets a list of all virtual machine image versions for the specified edge zone
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListByEdgeZone_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListByEdgeZoneMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "WestUS";
  const edgeZone = "microsoftlosangeles1";
  const options: VirtualMachineImagesListByEdgeZoneParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/vmimages",
      subscriptionId,
      location,
      edgeZone
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesEdgeZoneListByEdgeZoneMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of all virtual machine image versions for the specified edge zone
 *
 * @summary Gets a list of all virtual machine image versions for the specified edge zone
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListByEdgeZone_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListByEdgeZoneMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "WestUS";
  const edgeZone = "microsoftlosangeles1";
  const options: VirtualMachineImagesListByEdgeZoneParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/vmimages",
      subscriptionId,
      location,
      edgeZone
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesEdgeZoneListByEdgeZoneMinimumSetGen().catch(console.error);

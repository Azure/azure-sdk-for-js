// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineImagesEdgeZoneListOffersParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a list of virtual machine image offers for the specified location, edge zone and publisher.
 *
 * @summary Gets a list of virtual machine image offers for the specified location, edge zone and publisher.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListOffers_MaximumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListOffersMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaaaaaaa";
  const edgeZone = "aaaaaaaaaaaaaaaaaaa";
  const publisherName = "aaaaaaaaaaaaa";
  const options: VirtualMachineImagesEdgeZoneListOffersParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers",
      subscriptionId,
      location,
      edgeZone,
      publisherName
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesEdgeZoneListOffersMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of virtual machine image offers for the specified location, edge zone and publisher.
 *
 * @summary Gets a list of virtual machine image offers for the specified location, edge zone and publisher.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineImageExamples/VirtualMachineImagesEdgeZone_ListOffers_MinimumSet_Gen.json
 */
async function virtualMachineImagesEdgeZoneListOffersMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "aaaaaaaaaaaaaa";
  const edgeZone = "aaaaaaaaaaaaaaaaaaaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineImagesEdgeZoneListOffersParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers",
      subscriptionId,
      location,
      edgeZone,
      publisherName
    )
    .get(options);
  console.log(result);
}

virtualMachineImagesEdgeZoneListOffersMinimumSetGen().catch(console.error);

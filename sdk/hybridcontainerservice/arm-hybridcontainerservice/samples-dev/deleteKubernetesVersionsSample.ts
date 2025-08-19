// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the default kubernetes versions resource type
 *
 * @summary Delete the default kubernetes versions resource type
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/DeleteKubernetesVersions.json
 */

import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteKubernetesVersions(): Promise<void> {
  const customLocationResourceUri =
    "subscriptions/a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b/resourceGroups/test-arcappliance-resgrp/providers/Microsoft.ExtendedLocation/customLocations/testcustomlocation";
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential);
  const result = await client.beginDeleteKubernetesVersionsAndWait(customLocationResourceUri);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteKubernetesVersions();
}

main().catch(console.error);

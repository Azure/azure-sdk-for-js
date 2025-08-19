// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the supported kubernetes versions for the specified custom location
 *
 * @summary Lists the supported kubernetes versions for the specified custom location
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ListKubernetesVersions.json
 */

import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listKubernetesVersions(): Promise<void> {
  const customLocationResourceUri =
    "subscriptions/a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b/resourceGroups/test-arcappliance-resgrp/providers/Microsoft.ExtendedLocation/customLocations/testcustomlocation";
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential);
  const resArray = new Array();
  for await (const item of client.kubernetesVersions.list(customLocationResourceUri)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listKubernetesVersions();
}

main().catch(console.error);

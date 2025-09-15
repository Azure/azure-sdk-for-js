// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Puts the default kubernetes version resource type (one time operation, before listing the kubernetes versions)
 *
 * @summary Puts the default kubernetes version resource type (one time operation, before listing the kubernetes versions)
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/PutKubernetesVersions.json
 */

import type { KubernetesVersionProfile } from "@azure/arm-hybridcontainerservice";
import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putKubernetesVersions(): Promise<void> {
  const customLocationResourceUri =
    "subscriptions/a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b/resourceGroups/test-arcappliance-resgrp/providers/Microsoft.ExtendedLocation/customLocations/testcustomlocation";
  const kubernetesVersions: KubernetesVersionProfile = {
    extendedLocation: {
      name: "/subscriptions/a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b/resourcegroups/test-arcappliance-resgrp/providers/microsoft.extendedlocation/customlocations/testcustomlocation",
      type: "CustomLocation",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential);
  const result = await client.beginPutKubernetesVersionsAndWait(
    customLocationResourceUri,
    kubernetesVersions,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putKubernetesVersions();
}

main().catch(console.error);

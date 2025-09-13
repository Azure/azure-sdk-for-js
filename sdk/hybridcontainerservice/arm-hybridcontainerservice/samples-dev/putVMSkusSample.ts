// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Puts the default VM skus resource type (one time operation, before listing the VM skus)
 *
 * @summary Puts the default VM skus resource type (one time operation, before listing the VM skus)
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/PutVmSkus.json
 */

import type { VmSkuProfile } from "@azure/arm-hybridcontainerservice";
import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putVMSkus(): Promise<void> {
  const customLocationResourceUri =
    "subscriptions/a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b/resourceGroups/test-arcappliance-resgrp/providers/Microsoft.ExtendedLocation/customLocations/testcustomlocation";
  const skus: VmSkuProfile = {
    extendedLocation: {
      name: "/subscriptions/a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b/resourcegroups/test-arcappliance-resgrp/providers/microsoft.extendedlocation/customlocations/testcustomlocation",
      type: "CustomLocation",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential);
  const result = await client.beginPutVMSkusAndWait(customLocationResourceUri, skus);
  console.log(result);
}

async function main(): Promise<void> {
  await putVMSkus();
}

main().catch(console.error);

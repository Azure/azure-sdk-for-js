// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to modifies a Data Box Edge/Data Box Gateway resource.
 *
 * @summary modifies a Data Box Edge/Data Box Gateway resource.
 * x-ms-original-file: 2023-12-01/DataBoxEdgeDevicePatch.json
 */
async function dataBoxEdgeDevicePatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.update("testedgedevice", "GroupForEdgeAutomation", {
    edgeProfile: {
      subscription: {
        id: "/subscriptions/0d44739e-0563-474f-97e7-24a0cdb23b29/resourceGroups/rapvs-rg/providers/Microsoft.AzureStack/linkedSubscriptions/ca014ddc-5cf2-45f8-b390-e901e4a0ae87",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dataBoxEdgeDevicePatch();
}

main().catch(console.error);

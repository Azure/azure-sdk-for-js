// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the addon on the device.
 *
 * @summary deletes the addon on the device.
 * x-ms-original-file: 2023-12-01/DeleteAddons.json
 */
async function deleteAddOns(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.addons.delete(
    "testedgedevice",
    "KubernetesRole",
    "arcName",
    "GroupForEdgeAutomation",
  );
}

async function main(): Promise<void> {
  await deleteAddOns();
}

main().catch(console.error);

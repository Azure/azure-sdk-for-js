// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a addon.
 *
 * @summary create or update a addon.
 * x-ms-original-file: 2023-12-01/PutAddons.json
 */
async function putAddOns(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.addons.createOrUpdate(
    "testedgedevice",
    "KubernetesRole",
    "arcName",
    "GroupForEdgeAutomation",
    {
      kind: "ArcForKubernetes",
      resourceGroupName: "GroupForEdgeAutomation",
      resourceLocation: "EastUS",
      resourceName: "testedgedevice",
      subscriptionId: "4385cf00-2d3a-425a-832f-f4285b1c9dce",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putAddOns();
}

main().catch(console.error);

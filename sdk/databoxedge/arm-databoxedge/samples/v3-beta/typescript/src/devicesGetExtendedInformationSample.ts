// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets additional information for the specified Azure Stack Edge/Data Box Gateway device.
 *
 * @summary gets additional information for the specified Azure Stack Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/ExtendedInfoPost.json
 */
async function extendedInfoPost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.getExtendedInformation(
    "testedgedevice",
    "GroupForEdgeAutomation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await extendedInfoPost();
}

main().catch(console.error);

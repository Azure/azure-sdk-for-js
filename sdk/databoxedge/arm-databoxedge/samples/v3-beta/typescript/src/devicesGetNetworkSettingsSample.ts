// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the network settings of the specified Data Box Edge/Data Box Gateway device.
 *
 * @summary gets the network settings of the specified Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/NetworkSettingsGet.json
 */
async function networkSettingsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.getNetworkSettings(
    "testedgedevice",
    "GroupForEdgeAutomation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkSettingsGet();
}

main().catch(console.error);

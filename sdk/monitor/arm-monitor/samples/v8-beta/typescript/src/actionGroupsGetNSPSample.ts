// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a specified NSP configuration for specified action group.
 *
 * @summary gets a specified NSP configuration for specified action group.
 * x-ms-original-file: 2021-10-01/NSPForActionGroups_Get.json
 */
async function getNSPConfigByNameForAnActionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.actionGroups.getNSP(
    "exampleRG",
    "someActionGroup",
    "somePerimeterConfiguration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNSPConfigByNameForAnActionGroup();
}

main().catch(console.error);

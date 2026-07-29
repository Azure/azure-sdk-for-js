// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a network security perimeter configuration.
 *
 * @summary gets a network security perimeter configuration.
 * x-ms-original-file: 2021-10-01/NSPForScheduledQueryRule_Get.json
 */
async function getNSPConfigByNameForScheduledQueryRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.scheduledQueryRule.getNSP(
    "exampleRG",
    "someRule",
    "somePerimeterConfiguration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNSPConfigByNameForScheduledQueryRule();
}

main().catch(console.error);

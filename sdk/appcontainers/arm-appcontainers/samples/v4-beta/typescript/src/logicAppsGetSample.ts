// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a logic app extension resource.
 *
 * @summary gets a logic app extension resource.
 * x-ms-original-file: 2025-10-02-preview/LogicApps_Get.json
 */
async function getLogicAppExtensionByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.logicApps.get("examplerg", "testcontainerApp0", "testcontainerApp0");
  console.log(result);
}

async function main(): Promise<void> {
  await getLogicAppExtensionByName();
}

main().catch(console.error);

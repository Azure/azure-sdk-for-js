// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the environment modes available to a subscription in a location.
 *
 * @summary gets the environment modes available to a subscription in a location.
 * x-ms-original-file: 2026-07-01/AvailableEnvironmentModes_List.json
 */
async function availableEnvironmentModesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableEnvironmentModes.list("East US")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await availableEnvironmentModesList();
}

main().catch(console.error);

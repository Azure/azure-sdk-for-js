// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Label History for a given Container App.
 *
 * @summary get the Label History for a given Container App.
 * x-ms-original-file: 2025-10-02-preview/LabelHistory_List.json
 */
async function listContainerAppAllLabelHistory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsLabelHistory.listLabelHistory(
    "rg",
    "testContainerApp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listContainerAppAllLabelHistory();
}

main().catch(console.error);

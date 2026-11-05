// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the revision history associated with a Container App label.
 *
 * @summary gets the revision history associated with a Container App label.
 * x-ms-original-file: 2026-07-01/LabelHistory_Get.json
 */
async function getContainerAppSingleLabelHistory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsLabelHistory.getLabelHistory(
    "rg",
    "testContainerApp",
    "dev",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getContainerAppSingleLabelHistory();
}

main().catch(console.error);

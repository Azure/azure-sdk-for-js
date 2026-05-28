// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an Action Version resource for a given location and action.
 *
 * @summary get an Action Version resource for a given location and action.
 * x-ms-original-file: 2026-05-01-preview/ActionVersions_Get.json
 */
async function getAnActionVersionForWestus2Location(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.actionVersions.get("westus2", "microsoft-compute-shutdown", "1.0");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnActionVersionForWestus2Location();
}

main().catch(console.error);

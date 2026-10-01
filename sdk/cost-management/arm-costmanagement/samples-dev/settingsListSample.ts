// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all cost management settings in the requested scope.
 *
 * @summary list all cost management settings in the requested scope.
 * x-ms-original-file: 2025-03-01/settingsList.json
 */
async function settingsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.settings.list("subscriptions/00000000-0000-0000-0000-000000000000");
  console.log(result);
}

async function main(): Promise<void> {
  await settingsList();
}

main().catch(console.error);

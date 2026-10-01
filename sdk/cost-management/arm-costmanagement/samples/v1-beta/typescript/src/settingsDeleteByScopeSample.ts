// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a setting within the given scope.
 *
 * @summary delete a setting within the given scope.
 * x-ms-original-file: 2025-03-01/setting-delete.json
 */
async function settingDeleteByScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.settings.deleteByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "taginheritance",
  );
}

async function main(): Promise<void> {
  await settingDeleteByScope();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a setting within the given scope.
 *
 * @summary create or update a setting within the given scope.
 * x-ms-original-file: 2025-03-01/settings-createOrUpdate.json
 */
async function createOrUpdateSettingByScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.settings.createOrUpdateByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "taginheritance",
    { kind: "taginheritance", properties: { preferContainerTags: false } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSettingByScope();
}

main().catch(console.error);

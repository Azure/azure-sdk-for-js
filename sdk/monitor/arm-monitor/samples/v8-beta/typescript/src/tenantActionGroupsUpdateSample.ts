// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing tenant action group's tags. To update other fields use the CreateOrUpdate method.
 *
 * @summary updates an existing tenant action group's tags. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: 2023-05-01-preview/patchTenantActionGroup.json
 */
async function patchATenantActionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.tenantActionGroups.update(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "testTenantActionGroup",
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    { enabled: false, tags: { key1: "value1", key2: "value2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchATenantActionGroup();
}

main().catch(console.error);

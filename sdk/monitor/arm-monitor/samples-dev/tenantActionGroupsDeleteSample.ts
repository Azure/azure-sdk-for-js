// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a tenant action group.
 *
 * @summary delete a tenant action group.
 * x-ms-original-file: 2023-05-01-preview/deleteTenantActionGroup.json
 */
async function deleteATenantActionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  await client.tenantActionGroups.delete(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "testTenantActionGroup",
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
  );
}

async function main(): Promise<void> {
  await deleteATenantActionGroup();
}

main().catch(console.error);

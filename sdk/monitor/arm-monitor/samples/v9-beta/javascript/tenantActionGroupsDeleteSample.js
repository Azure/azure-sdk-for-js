// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a tenant action group.
 *
 * @summary delete a tenant action group.
 * x-ms-original-file: 2023-05-01-preview/deleteTenantActionGroup.json
 */
async function deleteATenantActionGroup() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  await client.tenantActionGroups.delete(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "testTenantActionGroup",
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
  );
}

async function main() {
  await deleteATenantActionGroup();
}

main().catch(console.error);

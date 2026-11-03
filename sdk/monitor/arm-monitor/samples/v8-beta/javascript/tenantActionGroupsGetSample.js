// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a tenant action group.
 *
 * @summary get a tenant action group.
 * x-ms-original-file: 2023-05-01-preview/getTenantActionGroup.json
 */
async function getAnActionGroup() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.tenantActionGroups.get(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "testTenantActionGroup",
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
  );
  console.log(result);
}

async function main() {
  await getAnActionGroup();
}

main().catch(console.error);

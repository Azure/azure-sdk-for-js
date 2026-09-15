// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all tenant action groups in a management group.
 *
 * @summary get a list of all tenant action groups in a management group.
 * x-ms-original-file: 2023-05-01-preview/listTenantActionGroups.json
 */
async function listTenantActionGroupsAtManagementGroupLevel() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const resArray = new Array();
  for await (const item of client.tenantActionGroups.listByManagementGroupId(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTenantActionGroupsAtManagementGroupLevel();
}

main().catch(console.error);

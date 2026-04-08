// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a server trust group.
 *
 * @summary lists a server trust group.
 * x-ms-original-file: 2025-02-01-preview/ServerTrustGroupList.json
 */
async function listServerTrustGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverTrustGroups.listByLocation("Default", "Japan East")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listServerTrustGroups();
}

main().catch(console.error);

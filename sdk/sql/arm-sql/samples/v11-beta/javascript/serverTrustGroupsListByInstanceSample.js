// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a server trust groups by instance name.
 *
 * @summary gets a server trust groups by instance name.
 * x-ms-original-file: 2025-02-01-preview/ServerTrustGroupListByManagedInstance.json
 */
async function listServerTrustGroupsByManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverTrustGroups.listByInstance(
    "Default-SQL-SouthEastAsia",
    "managedInstance-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listServerTrustGroupsByManagedInstance();
}

main().catch(console.error);

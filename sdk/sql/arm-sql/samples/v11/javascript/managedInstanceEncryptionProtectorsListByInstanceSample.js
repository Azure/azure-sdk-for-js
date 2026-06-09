// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of managed instance encryption protectors
 *
 * @summary gets a list of managed instance encryption protectors
 * x-ms-original-file: 2025-01-01/ManagedInstanceEncryptionProtectorList.json
 */
async function listEncryptionProtectorsByManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstanceEncryptionProtectors.listByInstance(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEncryptionProtectorsByManagedInstance();
}

main().catch(console.error);
